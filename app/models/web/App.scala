/*
Copyright (c) 2013 - 2014 ACenterA Inc.

MIT License
Permission is hereby granted, free of charge, to any person obtaining a copy
of this software and associated documentation files (the "Software"), to deal
in the Software without restriction, including without limitation the rights
to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
copies of the Software, and to permit persons to whom the Software is
furnished to do so, subject to the following conditions:

The above copyright notice and this permission notice shall be included in all
copies or substantial portions of the Software.

THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE
SOFTWARE.

*/

package models.web

import scala.collection.JavaConversions._
import play.api._
import java.util.concurrent._
import java.util.UUID.randomUUID
import controllers.acentera._
import java.util.concurrent.atomic.AtomicInteger
import play.api.Play.current
import scala.concurrent.duration._
import scala.concurrent.{ExecutionContext, Future}
import models._
import scala.List
import ExecutionContext.Implicits.global
import net.sf.json.JSONObject
import java.util.Random
import org.apache.shiro.subject.Subject
import plugins.{PluginEvent, PluginManager}
import models.db.User

class AppObj private () {

}

class CompanyObject(var id: Long) {

}

class ProjectObject(var id: Long) {

}

object AppObj {

  var ActiveSession: ConcurrentHashMap[String, Option[WebSession]] = new ConcurrentHashMap[String, Option[WebSession]]

  def getConfigValue(v : String) : String = {
    current.configuration.getString(v).getOrElse(new String(""))
  }

  //Keep a reference of which Desktop are available (Used for faster comet push references..)
  var ActiveDesktop: ConcurrentHashMap[String, DesktopObject] = new ConcurrentHashMap[String, DesktopObject]

  //The desktop that was doing all the logic to send message to others
  var FakeDesktops: ConcurrentHashMap[Long, DesktopObject] = new ConcurrentHashMap[Long, DesktopObject]


  //Project Configs
  var ProjectConfigs: ConcurrentHashMap[Long, ProjectObject] = new ConcurrentHashMap[Long, ProjectObject]
  var ProjectDesktops: ConcurrentHashMap[Long, ConcurrentHashMap[String, DesktopObject]] = new ConcurrentHashMap[Long, ConcurrentHashMap[String, DesktopObject]]

  //Keep a reference to the Company's configuration tree ...
  var CompanyConfigs: ConcurrentHashMap[Long, CompanyObject] = new ConcurrentHashMap[Long, CompanyObject]

  //hash map would be as follow
  //  [   app-ProjectQueue, [ DesktopIdX -> ObsoleteDesktopObject, DesktopIdY -> DesktopOjbect ]]
  // Basically each desktop calling AppObj.subscribe('ProjectQueue', this) would would be added to the chat queue
  // Each desktop calling AppObj.unsubscribe(this) would unsubscribe from all and AppObj.unsubscribe('ProjectQUeue',this) would unsubscribe from ProjectQueue
  var SubscribedDesktops: ConcurrentHashMap[String, ConcurrentHashMap[String, DesktopObject]] = new ConcurrentHashMap[String, ConcurrentHashMap[String, DesktopObject]]

  private lazy val INSTANCE =  new AppObj()

  def instance = INSTANCE

  def initialize() {
  }


  def sendMessageToAllDesktopByPartnerId(partnerId: Long, text: String) = {
    val it = ActiveDesktop.values().iterator
    // val lstDesktops = List[DesktopObject]()
    while(it.hasNext() ) {
      val n = it.next()

      try {
        if (n.getPartnerId == partnerId) {

          val m:Message = Message(0, text, System.currentTimeMillis()/1000) ;
          n.addMessage(m)

          //lstDesktops.add(n)
          // lstDesktops = lstDesktops :: n
        }
      } catch {
        case e: Exception => {

        }
      }
    }
    //lstDesktops
  }



  def sendMessageToAllDesktopByProjectId(projectId: Long, text: String) = {

    //We should be using scala iteration instead...

    val it = ActiveDesktop.values().iterator
    while(it.hasNext() ) {
      val n = it.next()
      try {
        if (n.getProjectId == projectId) {
          val m:Message = Message(0, text, System.currentTimeMillis()/1000) ;
          n.addMessage(m)

        }
      } catch {
        case e: Exception => {

        }
      }
    }
    //lstDesktops
  }

  def getAllDesktopByProjectId(projectId: Integer): List[DesktopObject] = {
    val it = ActiveDesktop.values().iterator
    var lstDesktops = List[DesktopObject]()
    while(it.hasNext() ) {
      val n = it.next()
      Logger.debug("GOT  DESKTOP : " + n + " with pid : " + n.getPartnerId)
      if (n.getProjectId == projectId) {
          Logger.debug("ADDING TO LIST : " + lstDesktops);
          lstDesktops = lstDesktops :+  n
      //   lstDesktops :: n
      }
    }

    Logger.debug("RETUENING LIST : " + lstDesktops);
    lstDesktops
  }


  def getDesktop(desktopId: String): DesktopObject = {

    Logger.debug("getDkestop : " + desktopId + " size : " + ActiveDesktop.size + " desktop " + ActiveDesktop)
    if ( ActiveDesktop.containsKey("" + desktopId)) {

      val theDesktop = ActiveDesktop.get(desktopId)
      theDesktop.updateUsedTimestamp()

      Logger.debug("Desktop was found : " + desktopId);
      return theDesktop
    } else {

      Logger.debug("Dekstop was not found... NEW DESKTOP :" + " ( " + desktopId  + " ) " + " vs " + ActiveDesktop)
      null
    }
  }

  def destroyCompanyId(partnerId: Long) = {
    if (CompanyConfigs.containsKey(partnerId)) {
      CompanyConfigs.remove(partnerId);
    }
  }


  def getOrLoadCompanyInfo(companyId: Long): CompanyObject = {

    if (CompanyConfigs.containsKey(companyId)) {
      CompanyConfigs.get(companyId)
    } else {
      //Since we never had this project in our own memory and that we have clients, lets register to the update queue
      val cObj: CompanyObject = new CompanyObject(companyId)
      cObj
    }
  }


  def getOrLoadProjectId(projectId: Long): ProjectObject = {

    if (ProjectConfigs.containsKey(projectId)) {
      ProjectConfigs.get(projectId)
    } else {

      //Since we never had this project in our own memory and that we have clients, lets register to the update queue
      var cObj:ProjectObject = new ProjectObject(projectId)


      //Create a Fake Desktop for the Job Queue so we can do a subscribe to events... and  access to various methods
      val desktopObj: DesktopObject = new DesktopObject("FAKEDESKTOP", null);


      /*
      val l : RabbitMQWebsiteApplicationListener = RabbitMQWebsiteApplicationListener.getInstance();


      val p: EventListener[Event] = new EventListener[Event]  {

        override def onEvent( event: Event) {

          try {
            val j : JSONObject = JSONObject.fromObject(event.getMessage);
            if (j.has("status")) {
              val asyncRes:JSONObject = new JSONObject()

              val pid =  j.getInt("project_id");


              val res: JSONObject = new JSONObject();
              val s = j.getString("status");
              val ts = j.getLong("ts");

              res.put("msg", event.getMessage);
              asyncRes.put("data", res);


              //Get all Desktops on this Project
              val ll = AppObj.getAllDesktopByProjectId(pid);

              val itItem1 =   ll.iterator
              var itemCnt = 0;
              while( itItem1.hasNext ) {
                val ch : DesktopObject = itItem1.next()
                try {

                  Logger.debug("SENT MESSAGE TO DESKTOP : " + ch.getId  + " with MSG : " + asyncRes.toString);
                  msgActor.sendMessage(ch,asyncRes.toString);
                } catch {
                  case ee : Exception => {
                    ee.printStackTrace();
                  }
                }
              }

            }
          }  catch {
            case e : Exception => {
              Logger.error("Exception : " + e.getMessage);
              e.printStackTrace();
            }
          }



        }
      }

      //Subsribes to changes on this project...
      l.subscribe(desktopObj, "update." + projectId, p);
      FakeDesktops.put(projectId, desktopObj)
      */

      cObj;
    }

  }

  def addNewSession(token: String, user : WebUser) : String = {


    if (! ActiveSession.containsKey(token)) {
      Logger.debug("WebSession : Creating session using " + token + " for user : " + user)
      user.load()
      val k = Option(new WebSession(user,token))
      ActiveSession.put(token, k)
    }

    token
  }


  def removeSession(token: String) {



    if ( ActiveSession.containsKey(token)) {
      Logger.debug("WebSession : Remove session : " + token + "  " + ActiveSession)
      ActiveSession.remove(token)
    }

  }


  def getSession(token: String) : Option[WebSession] = {

    if ( ActiveSession.containsKey(token)) {
       Logger.debug("returning non-null webession : "+  ActiveSession.get(token))
       ActiveSession.get(token)
    } else {
      Logger.debug("returning null websession")
      //System.exit(1);
      Option(null)
    }

  }

}

class WebSession(var webUser : WebUser, token : String) {

  var shiroSubject: Subject = null;
  var oldSessTS : Long = 0
  var oldSessCTR : Long = 0
  var lastUsed : Long = java.lang.System.currentTimeMillis()

  def isSessionDead() : Boolean = {
    if (oldSessTS == lastUsed) {
      oldSessCTR = oldSessCTR + 1
    }  else {
      oldSessTS = lastUsed
      oldSessCTR = 0
    }
      if (oldSessCTR >= 4) {
      true
    } else {
      false
   }
  }

  def destroy() = {
    removeAllDesktop()
    AppObj.removeSession(token)
    true
  }

  def setLastUsed(l: Long) = {
    lastUsed = l
    lastUsed
  }

  def getUser(): User = {
         this.webUser.load()
         this.webUser.getUser();

  }

  def getSubject() : Subject = {
    webUser.getSubject()
  }

  var ActiveDesktop: ConcurrentHashMap[String, DesktopObject] = new ConcurrentHashMap[String, DesktopObject]
  var session = null


  def getToken() : String = {
    token
  }

  def addDesktop() : String = {

    var desktopId : String = null
    while(desktopId == null) {
      desktopId = randomUUID().toString()
      if ( ActiveDesktop.containsKey(desktopId)) {
        desktopId = null;
      }
    }

    desktopId = "" + desktopId

    if (ActiveDesktop.containsKey(desktopId)) {
      Logger.debug("ACTIVE DESKTOP CREATE -- RETURN EMPTY ALRAEDY EXISTS returning ''")
      ""
    } else {
      val desktop = new DesktopObject(desktopId, this)
      desktop.setShiroSubject(getSubject)
      ActiveDesktop.put(desktopId,desktop)
      AppObj.ActiveDesktop.put(desktopId,desktop)

      desktopId
    }
  }


  //In the case we use the same desktop and it was not loaded on that play instance..
  def addDesktopStaticId(dtid : String) : String = {
    var desktopId : String = dtid

    desktopId = "" + desktopId

    if (ActiveDesktop.containsKey(desktopId)) {
      null
    } else {
      val desktop = new DesktopObject(desktopId, this)

      ActiveDesktop.put(desktopId,desktop)

      //add Its Referenced desktop
      AppObj.ActiveDesktop.put(desktopId,desktop)

      desktopId
    }
  }



  def removeDesktopFromProject( projectId : Long, desktopId : String) {

    if (AppObj.ProjectDesktops.containsKey(projectId)) {
      val hmDesktops = AppObj.ProjectDesktops.get(projectId)
      if (hmDesktops.contains(desktopId)) {
          hmDesktops.remove(desktopId)
      }

      //Nobody else in this project.. lets unsubscribe
      if (hmDesktops.size() <= 0 ) {
            AppObj.ProjectDesktops.remove(projectId)
            val desktopObj = AppObj.FakeDesktops.remove(projectId)
            /*val l : RabbitMQWebsiteApplicationListener = RabbitMQWebsiteApplicationListener.getInstance();
            l.unsubscribeFromAll(desktopObj);*/
      }
    }
  }


  def removeDesktop(desktopId : String) {

    if (ActiveDesktop.containsKey(desktopId)) {
      ActiveDesktop.remove(desktopId)
      AppObj.ActiveDesktop.remove(desktopId)
    }

    if (AppObj.ActiveDesktop.size() <= 0 ) {
      if (webUser != null) {
        if (webUser.getUser() != null) {
          //TODO:FIX AppObj.destroyCompanyId(webUser.getUser().getPartnerId);
        }
      }

    }
  }


  def removeAllDesktop() {
    //TODO: Send a desktop signout event to all of them

    Logger.debug("REMOVE ALL DESKTOP")
    ActiveDesktop.mapValues(d =>  removeDesktop(d.getId()) )

    if (webUser != null) {
      if (webUser.getUser() != null) {
        //TODO:FIX AppObj.destroyCompanyId(webUser.getUser().getPartnerId);
      }
    }

  }

  def removeSession() {
    AppObj.removeSession(token)
  }


}


// date time : http://alvinalexander.com/scala/scala-get-current-date-time-hour-calendar-example

class DesktopObject(id : String, session: WebSession) extends Serializable {

  var shiroSubject: Subject = null;
  @volatile
  var clientUuid: ConcurrentHashMap[AbstractUuid, String] = new ConcurrentHashMap[AbstractUuid, String]
  @volatile
  var clientItemByUuid: ConcurrentHashMap[String, AbstractUuid] = new ConcurrentHashMap[String, AbstractUuid]

  def getCluidUuid() = {
    clientUuid
  }
  var oldDesktopTS : Long = 0
  var oldDesktopCTR : Long = 0

  @volatile
  var desktopIsAlive : Boolean = true
  var future:Future[Unit] = null
  var isCometRunning : Boolean = true
  var commetError : Int = 0
  var lstTasks : ConcurrentLinkedQueue[IAsyncTaskExec] = new ConcurrentLinkedQueue[IAsyncTaskExec]()

  //Messages
  var lastUsed : Long = java.lang.System.currentTimeMillis()
  var seqCnt = new AtomicInteger()
  var messages : ConcurrentLinkedQueue[Message] = new ConcurrentLinkedQueue[Message]()
  var tmpMessages : ConcurrentLinkedQueue[Message] = new ConcurrentLinkedQueue[Message]()
  var currentMessages : DesktopMessages = null

  var lock : Boolean = false;
  var lastMsg : Long = 0;
  var currentProjectId: Long = 0

  def isDesktopDead() : Boolean = {
    if (oldDesktopTS == lastUsed) {
        oldDesktopCTR = oldDesktopCTR + 1
    }  else {
        oldDesktopTS = lastUsed
        oldDesktopCTR = 0
    }
    if (oldDesktopCTR >= 8) {
      true
    } else {
      false
    }
  }

  def addMessage(message : Message) {
    lastMsg = System.currentTimeMillis();
    messages.add(message)
  }

  def getMspObject: CompanyObject = {

    if (session == null) {
      null
    } else {
      if (session.getUser() == null) {
        null
      } else {
        //TODO:FIX AppObj.getOrLoadCompanyInfo(session.getUser().getPartnerId)
        null
      }
    }
  }

  def getProjectId() : Long = {
    currentProjectId
  }

  def setProjectId(projectId : Long) : Boolean = {

    if (currentProjectId != 0) {
      session.removeDesktopFromProject(currentProjectId, id)
    }

    currentProjectId = projectId

    //In the case we destroy this desktop we call setProjectId to 0
    if (projectId != 0) {
      AppObj.getOrLoadProjectId(projectId)
    }

    true
  }

  def setListenDesktop(msg: DesktopMessages): Boolean = {

    currentMessages = msg
    isCometRunning = true
    commetError = 0
    try {
      updateUsedTimestamp()

      if (future == null) {
        setFuture()
      }

    } catch {
      case _ : Exception => {
        commetError = commetError + 1;
        isCometRunning = false;
        sendMessagesToBrowser();
      }
    }


    if (! lock) {
      if (messages.size()>0) {
        sendMessagesToBrowser();
        isCometRunning = false
      } else {

      }
    } else {

    }

    isCometRunning
  }

  def setFuture(): Future[Unit] = {
    if (!desktopIsAlive) {
      null
    } else {

      if (commetError >= 5 ) {
        destroy
        null
      } else {
        commetError = commetError + 1
        val timeoutSixty = play.api.libs.concurrent.Promise.timeout(this, 15.seconds)

        future = Future.firstCompletedOf(Seq(timeoutSixty)).map {
           case _ => {
             executeAsyncTasks()
             setFuture
           }
         }

        future
      }
    }
  }



  def addAsynchTask(task:IAsyncTaskExec) = {
    //TODO: Get an ID ..
    lstTasks.add(task);

    if (future == null) {
      setFuture()
    }

  }



  def executeAsyncTasks(): List[Message] = {

    val currTime: Long = System.currentTimeMillis() / 1000L
    var res : List[Message] = List()
    val tasks = this.lstTasks;//getOrCreateDashboardData()

    tasks.foreach {
      case(value) => {
        if (value.canRun(currTime)) {
          //HibernateSessionFactory.getSession
          try {
            val t = value.execute(this)
            if ( t != null ) {
              res = res ++ List(t)
            }
          } finally {
            //HibernateSessionFactory.closeSession()
          }
        }
      }
    }

    res
  }

  def inSequenceDesktopTimeout(): Int  = {
    seqCnt.incrementAndGet()
  }

  def getNextSeq(): Long = {
    seqCnt.get() + 1
  }

  def getCurrentSeq(): Long = {
    seqCnt.get()
  }

  def getId(): String = id


  def sendMessagesToBrowser() : Boolean = {

   this.synchronized {
    if (! lock ) {

      //TODO: At least 500 milliseconds between messages... or 10 messages ?? ...
      if (messages.size>0) {
      }

      //if ((System.currentTimeMillis() - lastMsg > 100) || messages.size() > 10) {
        if (messages.size > 0) {
          if (currentMessages != null) {
            lock = true

            try {
              var myMsg = List[Message]()
              lastMsg = 0
              var m = messages.poll();
              val test = currentMessages;
              currentMessages=null;
              var theCnt = 0;
              while (m != null) {
                //Logger.debug("IN WHILE LOOP" + m)
                theCnt = theCnt + 1;
                val msg = new Message(seqCnt.incrementAndGet(), m.text, m.ts);

                myMsg = (msg :: myMsg).sortBy( msg => msg.id )

                m = null

                //If a desktop receive too much message lets loop to give chance of others to receive some
                if (theCnt > 10) {
                  m = null;
                } else {
                  m = messages.poll();
                }
              }

              Logger.debug("Sending : " + myMsg)
              test.promise.success(myMsg)

              lock = false
              true
            } catch {
              case e : Exception => {
                  e.printStackTrace()
                }
            } finally {
              lock = false
            }
          }
        //}
      }
    }
   }
    false
  }



  def updateUsedTimestamp() {
    lastUsed =  java.lang.System.currentTimeMillis()
    if (session == null) {
        Logger.error("Error session was null ? ")
        try {
          throw new Exception("Error session null")
          destroy;
        } catch {
          case e : Exception => {
            e.printStackTrace();
          }
        }
    } else {
      session.setLastUsed(lastUsed)
    }
  }

  def getLastUsedTimestamp() : Long = {
    lastUsed
  }


  def destroy {
      if (session!= null) {

        //TOOD: What we do if we have running tasks ?

        //Destroy reference to the project
        setProjectId(0)

        desktopIsAlive = false
        //TODO:FIX RabbitMQWebsiteApplicationListener.getInstance().unsubscribeFromAll(this);
        session.removeDesktop(id);
      } else {
        //In case...
        //TODO:FIX  RabbitMQWebsiteApplicationListener.getInstance().unsubscribeFromAll(this);
      }
      desktopIsAlive = false
  }


  //This object is related to a Session...
  //A Session is One Browser object, a ObsoleteDesktopObject are every other tabs openned..
  def getPartnerId: Long = {
    /*
    try {
      //TODO:FIX  session.getUser().getPartnerId()
      Logger.debug("Tofixx");
    } catch {
      case e : Exception => {
        Logger.debug("This desktop should be removed shortly...");
        0
      }
    }*/
    0
  }


  def getUser: User = {
    try {
      return session.getUser()
    } catch {
      case e : Exception => {
        Logger.debug("This desktop should be removed shortly...");
      }
    }
    null
  }



    def getOrCreateUuid(d: AbstractUuid, s: String): String = {
      if (s != null) {
        if (clientUuid.containsKey(s)) {
          clientUuid.get(s)
        } else {
          Logger.debug("ChartClick : adding dashbaord Item with Uuid : " + d + " uuid : " + s);
          clientUuid.put(d, s);
          clientItemByUuid.put(s, d);
          s
        }
      } else {
        val r:Random  = new Random();
        val random_3_Char =  (97 + r.nextInt(3));

        val uuid:String = random_3_Char.toChar + "_" + randomUUID().toString().substring(0,6)
        if (clientUuid.containsKey(d)) {
             clientUuid.get(s)
        } else {
          Logger.debug("ChartClick : adding dashbaord Item with Uuid : " + d + " uuid : " + s);
            clientUuid.put(d, uuid);
            clientItemByUuid.put(uuid, d);
            uuid
        }
      }
    }


    def getUuid(d: Object): String = {

      if (clientUuid.containsKey(d)) {
        Logger.debug("ChartClick : get By Dashbaord Uuid : " + clientUuid.get(d));
        clientUuid.get(d)
      } else {
        val s = "UUID NOT FOUND";
        s
      }
    }


  def destroyUuid(d: AbstractUuid): Boolean = {

    if (clientUuid.containsKey(d)) {
         try {
             val uuid = clientUuid.get(d)
             Logger.debug("ChartClick : destroyUUid : " + uuid);

             if (clientUuid.containsKey(d)) {
                clientUuid.remove(d)
             }



             if (uuid != null) {
              if (clientItemByUuid.containsKey(uuid)) {
               clientItemByUuid.remove(uuid)
              }
             }

             d.doFinally(this)
             true
         } catch {
             case e : Exception  => { true }
         }
     } else {
        false
    }

  }

  def setShiroSubject(shiroSubject: Subject) {
    this.shiroSubject = shiroSubject
  }
}






