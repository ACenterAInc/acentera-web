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

package controllers.acentera

import play.api._
import play.api.mvc._
import play.api.libs.concurrent.Execution.Implicits._

import play.api.libs.concurrent.Akka
import java.util.concurrent.LinkedBlockingQueue


import java.util.concurrent.atomic.AtomicInteger


import akka.actor.{Actor, Props}
import akka.pattern.AskSupport
import play.api.Play.current

import scala.concurrent.duration._
import scala.concurrent.{Future, Promise, Await}


import play.api.libs.json.JsArray
import play.api.libs.json.JsString
import play.api.libs.json.JsNumber
import play.api.libs.json.JsObject
import models.web.{AppObj, DesktopObject}
import utils.{DatabaseManager, HibernateSessionFactory, AsyncJob}
import net.sf.json.JSONObject
import controllers.Authentication


/* This support the Comet / Long poolling logic */
/* it should be rewrite to be more "Scala like" */
object Comet extends Controller with Authentication {

  private def messagesToJson(messages: List[Message]): JsObject = {

    val jsObs = messages.map( msg => JsObject(Seq("id" -> JsNumber(msg.id), "data" -> JsString (msg.text) )) )
    JsObject(Seq("result" -> JsArray(jsObs)))
  }

  def getMessages(desktopId: String, lastMessageId: Int)  = Action.async { implicit request => {

    val desktop = currentDesktop;

    val futureData = scala.concurrent.Future {
      val promiseOfMessages = waitForNewMessages(desktop, lastMessageId)
    }
    val timeoutFuture = play.api.libs.concurrent.Promise.timeout("NoData", 60.second)
    Future.firstCompletedOf(Seq(futureData, timeoutFuture)).map {
      case messages: List[Message] => {
        Ok(messagesToJson(messages)).withHeaders("Access-Control-Allow-Origin" -> "*")
      }
      case i: Int => Ok("Got result: " + i)
      case c => {
        Logger.debug("In timeout Future... Timed out..");

        val i = desktop.inSequenceDesktopTimeout();
        var currTs = desktop.getLastUsedTimestamp()
        Logger.debug("In timeout Future case c... Timed out.. 1 currt s : " + currTs);
        val a = Message(i,"", System.currentTimeMillis()/1000)

        Logger.debug("In timeout Future case c... Timed out.. 2 : last id : " + i);

        //send an empty message to reset polling
        try {
          Ok(messagesToJson(List(a))).withHeaders("Access-Control-Allow-Origin" -> "*")
        } catch {
          case e: Exception => {
            Logger.debug("In exception ee")
            Ok("")
          }
        }
      }
    }
    }
  }

  def prior22_Good_getMessages(desktopId: String, lastMessageId: Int) = IsAuthenticated { (user, desktop) => implicit request => {

    val desktop = currentDesktop(request, desktopId)

    //val execManager: ExecutionManager = ExecutionManager.getInstance
    //execManager.setTreadDesktop(desktop);

    //touch the session keep alive
    SecurityController.getSession().touch();

    val promiseOfMessages = waitForNewMessages(desktop, lastMessageId)


    val messagesFuture = promiseOfMessages.future
    val timeoutFuture = play.api.libs.concurrent.Promise.timeout(desktop, 40.seconds)
    val timeoutDeadDesktopFuture = play.api.libs.concurrent.Promise.timeout(desktop, 25.seconds)

    /*Async {
      Future.firstCompletedOf(Seq(messagesFuture, timeoutFuture)).map {
        case messages: List[Message] => {
          DatabaseManager.getInstance().closeIfConnectionOpen();
          Ok(messagesToJson(messages)).withHeaders("Access-Control-Allow-Origin" -> "*")
        }
        case c => {
          Logger.debug("In timeout Future... Timed out..");

          val i = desktop.inSequenceDesktopTimeout();
          var currTs = desktop.getLastUsedTimestamp()
          Logger.debug("In timeout Future case c... Timed out.. 1 currt s : " + currTs);
          val a = Message(i,"", System.currentTimeMillis()/1000)

          Logger.debug("In timeout Future case c... Timed out.. 2 : last id : " + i);

          //send an empty message to reset polling
          try {
            DatabaseManager.getInstance().closeIfConnectionOpen();
            Ok(messagesToJson(List(a))).withHeaders("Access-Control-Allow-Origin" -> "*")
          } catch {
            case e: Exception => {
              Logger.debug("In exception ee")
              DatabaseManager.getInstance().closeIfConnectionOpen();
              Ok("")
            }
          }
        }
      }
    }*/
    Ok("")
  }
  }


  private def waitForNewMessages(desktopObject: DesktopObject, lastMessageId: Int): Promise[List[Message]] = {
    Await.result(msgActor.ask(ListenForMessages(desktopObject, lastMessageId)).mapTo[Promise[List[Message]]], 30.seconds)
  }


}


class msgActor  private () {

}


object msgActor extends AskSupport {

  lazy val messagingActor = {

    val actor = Akka.system.actorOf(Props[MessagingActor])

    Akka.system.scheduler.schedule(0 seconds, 90.milliseconds, actor, BroadcastMessages())
    Akka.system.scheduler.schedule(0 seconds, 30 milliseconds, actor, DoJobs());
    Akka.system.scheduler.schedule(0 seconds, 30.seconds, actor, KillDesktops())

    actor
  }

  def restart = {
  }


  def ask(m: ListenForMessages): Future[scala.Any] = {
    implicit val timeout = akka.util.Timeout(20.seconds) // needed for ask below
    messagingActor.ask(m)
  }


  private lazy val INSTANCE =  new msgActor()

  def instance = INSTANCE

  def addMessage(s: String) {
    Akka.system.scheduler.scheduleOnce(0 seconds, messagingActor, AddMessage(s))
  }

  def restartRabbitListener(t: Thread) {
    Akka.system.scheduler.scheduleOnce(5 seconds, messagingActor, RestartRabbitListener(t))
  }

  def sendModelUpdateMessage(d: DesktopObject, obj: JSONObject) {

    Akka.system.scheduler.scheduleOnce(0 seconds, messagingActor, SendMessage(d, "{ \"js\": \"updateModel(" + obj.toString.replaceAll("\"","\\\\\"") + ");\" }" ));
  }

  def sendModelUpdateMessage(d: DesktopObject, obj: String) {

    Akka.system.scheduler.scheduleOnce(0 seconds, messagingActor, SendMessage(d, "{ \"js\": \"updateModel(" + obj.toString.replaceAll("\"","\\\\\"") + ");\" }" ));
  }

  def sendMessage(d: DesktopObject, s: String) {
    Logger.debug("Sending message to : " + d + " is : " + s)
    Akka.system.scheduler.scheduleOnce(0 seconds, messagingActor, SendMessage(d, s))
  }

/*  def addAsyncJob(j: JobMessage) {
    Akka.system.scheduler.scheduleOnce(0 seconds, messagingActor, AddAsyncJob(j))
  }
*/
  def addAsyncJob(j: AsyncJob) {
    Akka.system.scheduler.scheduleOnce(0 seconds, messagingActor, AddAsyncJob(j))
  }

}


case class JobMessage() {
  def executeJob(): Boolean = {
    true
  }

}

case class Message(var id: Int, var text: String, var ts: Long) {

  def sendMessage() : List[DesktopObject] = {
    null
  }

  def sendApplicationMessage()  {

    val it = AppObj.ActiveDesktop.values().iterator
    var lstDesktops = List[DesktopObject]()
    while(it.hasNext() ) {
      val n = it.next()
        n.addMessage(this)
     //   lstDesktops :: n
    }

  }

}



case class DesktopMessages(desktop: DesktopObject, promise: Promise[List[Message]]) {
  var id : Int = 0;
}

case class SendMessage(dobj: DesktopObject ,text: String)
case class RestartRabbitListener(t: Thread)
//case class AddAsyncJob(j: JobMessage)
case class AddAsyncJob(j: AsyncJob)

case class AddMessage(text: String)
case class AddMessageToDesktop(desktop: DesktopObject, text: String)
case class ListenForMessages(desktop: DesktopObject, id: Int)
case class BroadcastMessages()
case class DoJobs()
case class KillDesktops()
//case class DesktopMessages(var id: Int, promise: Promise[List[Message]])

class MessagingActor extends Actor {

  val seqCnt = new AtomicInteger()
  var messages = new LinkedBlockingQueue[Message]()
  var jobMessages = new LinkedBlockingQueue[AsyncJob]()

  var desktops = Map.empty[String, DesktopObject]

  override def receive = {
    case DoJobs() => {
      var theMess : AsyncJob = jobMessages.poll();

      //Grab the next Message
      while ( theMess != null ) {

          try {
            Logger.debug("WILL SCHEDULE JOB OF :" + theMess);
            theMess.execute();
            /*Akka.system.scheduler.scheduleOnce(10 milliseconds, new Runnable {
              def run() {
                Logger.debug("EXCEUTE JOB OF :" + theMess);
                theMess.executeJob()
              }
            })*/

          } catch {
            case e: Exception => {
              e.printStackTrace()
            }
          }
        Logger.debug("Will call execute Job done")
        theMess = jobMessages.poll();
      }
    }
    case BroadcastMessages() => {

      val m = collection.immutable.HashMap
      var theMess = messages.poll()
      var hadMessages = false
      while ( theMess != null ) {
        theMess.sendApplicationMessage()
        //Grab the next Message

        theMess = messages.poll()
        hadMessages = true
    }

      //TODO: We could optimize
      desktops.foreach {
        case (key, desktop) => {

              if (desktop.sendMessagesToBrowser()) {
                desktops -= key
              }

            }
        }

    }
    case KillDesktops() => {

      desktops.foreach {
        case (key, desktop) => {

          Logger.debug("Desktop is detected as dead : " + desktop.getId())
          if (desktop.isDesktopDead()) {
            desktops -= key
            desktop.destroy
          }

        }
      }


      val it = AppObj.ActiveDesktop.values().iterator
      while(it.hasNext() ) {
        val n = it.next()
        try {
          if (n.isDesktopDead()) {
            n.destroy
          }
        } catch {
          case e: Exception => {
          }
        }
      }


      val its = AppObj.ActiveSession.values().iterator
      while(its.hasNext() ) {
        val wn = its.next().get

        try {
          if (wn.isSessionDead()) {
            wn.destroy
          }
        } catch {
          case e: Exception => {
          }
        }
      }

    }
    case RestartRabbitListener(t) => {
      try {
          t.stop();
      } catch {
        case e: Exception => {
            e.printStackTrace();
        }
      }

      try {
        t.start();
      } catch {
        case e: Exception => {
          e.printStackTrace();
        }
      }

    }
    case SendMessage(dobj, text) => {
      try {
        Logger.error("Will send Message : " + dobj.getId() + " for pid : " + dobj.getPartnerId + " with text : " + text)
        val msg = new Message(seqCnt.incrementAndGet(), text, System.currentTimeMillis()/1000)
        dobj.addMessage(msg);
      } catch {
        case _e : Exception => {

        }
      }
    }


    case AddAsyncJob(j: AsyncJob) => {

      jobMessages.add(j)
      Logger.debug("EXECUTED GOT ADDED ASYNC " + jobMessages)
    }

    case AddMessage(text) => {
      val msg = new Message(seqCnt.incrementAndGet(), text, System.currentTimeMillis()/1000);
      messages.add(msg)
    }


    case AddMessageToDesktop(desktop, text) => {
      val msg = new Message(seqCnt.incrementAndGet(), text, System.currentTimeMillis()/1000);
      messages.add(msg)
    }



    case ListenForMessages(desktop : DesktopObject, id : Int) => {
      val msg = DesktopMessages(desktop, Promise[List[Message]])
      desktops  = desktops + ( desktop.getId() -> desktop)

      desktop.setListenDesktop(msg)

      Logger.info("Messages requested by desktopId="+desktop.getId() +" starting from id="+id)
      sender ! msg.promise
    }


  }

}
