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

package controllers

import play.api._
import play.api.mvc._
import play.api.mvc.Results._
import play.api.libs.Crypto
import play.api.Play.current
import play.api.libs.json.{JsString, JsBoolean, Json}
import play.i18n.Messages
import play.api.libs.json.JsString
import play.api.libs.json.JsBoolean
import play.api.libs.json.JsString
import play.api.libs.json.JsBoolean
import net.sf.json.JSONObject
import play.api.libs.json.JsString
import play.api.libs.json.JsBoolean
import utils.security.PasswordEncoder
import models.web.{WebUser, WebSession, AppObj, DesktopObject}
import org.apache.shiro.authc.UsernamePasswordToken
import play.cache.Cache
import models.db.acentera.impl.UserImpl
import models.db.User

trait Authentication {

  def OkJsonResult( j : JSONObject) : Result = {
      Ok(j.toString()).as("application/json")
  }

  def NotFoundJsonResult( j : JSONObject) : Result = {
    NotFound(j.toString()).as("application/json")
  }

  def BadRequestFoundJsonResult( j : JSONObject) : Result = {
    BadRequest(j.toString()).as("application/json")
  }


  def confirmUserPassword(u : User, password: String) : Boolean = {
    return false;//TODOFIX: (PasswordEncoder.getInstance().encode(password, u.getSalt).compareTo(u.getPassword) == 0)
  }

  def authToken(request: RequestHeader) = request.session.get("token").getOrElse(request.cookies.get("token").getOrElse("").toString)

  def desktopToken(request: RequestHeader) = request.headers.get("dtid")

  def uuid(implicit request: RequestHeader)  = {
    authToken(request)
  }
  def setStringCacheValue( request : RequestHeader, key : String, value: String) = {
    val keyCache: String = uuid(request) + "." + key
    Cache.set(keyCache, value, 120)

  }

  def getStringCacheValue( request : RequestHeader, key : String ) : String = {
        val keyCache: String = uuid(request) + "." + key
        Cache.get(keyCache).asInstanceOf[String]
  }

  /**
   * Action for authenticated users.
   */

  //Same logic as in SecurityController (Java)
  private def isAuthenticated(request: RequestHeader) =  {

    //val secret = Crypto.sign(request.session.get("token").get + "-" + Play.configuration.getString("customSecret") );

    val cacheValue : String = getStringCacheValue(request, "token")
    Logger.debug("cache value : " + cacheValue + "");

    Logger.debug("tokensecret  azz is : " + request.session.get("tokensecret"))
    if ( cacheValue != null ) {
      Logger.debug("cacheValue IS NOT NULL " + cacheValue);
      if (cacheValue.compareTo(request.session.get("email").getOrElse(request.cookies.get("email").getOrElse("").toString)) == 0) {
        Option(cacheValue)
      } else {
        //Stay logged in if hit another server (or in dev by using token secret...)
        val user = UserImpl.getUserByEmail(request.session.get("email").getOrElse(request.cookies.get("email").getOrElse("").toString))
        if (user == null) {
          Option(null)
        } else {
          Option(request.session.get("email").getOrElse(request.cookies.get("email").getOrElse("")))
          /*val k = Crypto.sign(user.getEmail + "-" + user.getSalt + "-" + user.getPassword);
          Logger.debug("the crypto sign was : " + k)
          if (k.compareTo(request.session.get("tokensecret").getOrElse(request.cookies.get("tokensecret").getOrElse("").toString)) == 0) {
            Option(user.getEmail)
          } else {
            Option(null)
          }*/
        }
      }
    } else {
      Logger.debug("cacheValue IS NULL " + cacheValue);
      //Stay logged in if hit another server (or in dev by using token secret...)
      Option(request.session.get("email").getOrElse(null))
      /*
      val user = UserImpl.getUserByEmail(request.session.get("email").getOrElse(null))
      if (user == null) {
        Logger.debug("ret option NULL");
        Option(null)
      } else {

        //val k = Crypto.sign(user.getEmail + "-" + user.getSalt + "-" + user.getPassword);
        //Logger.debug("crypto of : " + user.getEmail + "-" + user.getSalt + "-" + user.getPassword)
        //Logger.debug("the crypto sign was : " + k)
        //Logger.debug("the crypto tokensecret was : " + request.session.get("tokensecret"))

        //if (k.compareTo(request.session.get("tokensecret").getOrElse("")) == 0) {
          //Logger.debug("TOEKN EHRE AA EMAIL");
          //setStringCacheValue(request, "token", request.session.get("email").get)
          Option(request.session.get("email"))
        //} else {
//          Logger.debug("TOEKN EHRE AA EMAIL BB");
    //      Option(null)
  //      }
      }
      */
    }
  }

  def currwebSession(implicit request: RequestHeader) : WebSession = {
    var currSession = AppObj.getSession(authToken(request))
    if (currSession == null) {
      //OK Session is null, but...............................................
      //If we got here is because we where authenticated.. we can check again....
      val isAuth = isAuthenticated( request )
      if (isAuth.isEmpty) {
        Logger.error("Weird the user was not authenticated?");

        //Logger.debug("CurrSession is null")
        currSession = Option(new WebSession(new WebUser("","",null),""))
      } else {
        val email = isAuth.getOrElse("").toString;

        val token = request.session.get("token").getOrElse("")
        val u : User = UserImpl.getUserByEmail(email)

        Logger.debug("USER u is : " + u)
        /*try {
          val wu = new WebUser(u.getEmail, u.getPassword, new UsernamePasswordToken(u.getEmail, u.getPassword))
          AppObj.addNewSession(token, wu)
          currSession = AppObj.getSession(authToken(request))
        } catch {
          case e: Exception => {
            if (email.trim.length >= 2) {
              //user was valid... lets try again...
              val u : User = UserImpl.getUserByEmail(email)
              val wu = new WebUser(u.getEmail, u.getPassword, new UsernamePasswordToken(u.getEmail, u.getPassword))
              AppObj.addNewSession(token, wu)
              currSession = AppObj.getSession(authToken(request))
            }
          }
        }*/
      }
    }
    currSession.getOrElse(new WebSession(new WebUser("","",null),""))
  }


  def user(implicit request: RequestHeader) = {
    /*val webSession = Cache.get(uuid + "-user-model")
    webSession match {
      case u: User => u
      case _ => {
        val u = currwebSession.getUser()
        Cache.set(uuid + "-user-model", u, 120)
        u
      }
    }*/
    currwebSession.getUser()
  }

  private def onUnauthorized(request: RequestHeader) = {
    if (!  ( (request.uri.contains("/api/")) || (request.uri.contains("/ajax/"))))  {

      Results.Redirect(Play.configuration.getString("application.url").getOrElse("/") + "login")
    } else {
      Results.Unauthorized("{ \"status\": \"Not Authorized\" }").as("application/json")
    }
  }


  def FailedMessage(message : String) = NotFound(Json.toJson(Map("success" -> JsBoolean(false), "message" -> JsString(Messages.get(message))))).as("application/json")

  def IsAuthenticated(f: ( User, DesktopObject) => Request[AnyContent] => Result ) = Security.Authenticated(isAuthenticated,onUnauthorized) { username =>
    Action(implicit request => {
      try {
        f(user,currentDesktop)(request)
      } catch {
        case e : Exception => {
          e.printStackTrace();
          FailedMessage("EXCEPTION_OCCURED")
        }
      } finally {
        Logger.trace(this + "  isAuthenticated commit")
      }
    })
  }


  /*
  def IsAsyncAuthenticated(f: ( User, DesktopObject) => Request[AnyContent] => Result ) = Security.Authenticated(isAuthenticated,onUnauthorized) { username =>
    Action.async (implicit request => {
      try {
        f(user,currentDesktop)(request)
      } catch {
        case e : Exception => {
          e.printStackTrace();
          FailedMessage("EXCEPTION_OCCURED")
        }
      } finally {
        Logger.trace(this + "  isAuthenticated commit")
      }
    })
  }*/



  def currentDesktop(implicit request: RequestHeader, dtid: String = "") : DesktopObject = {
    var myDtid = dtid;
    if (dtid == "") {
      myDtid = request.headers.get("dtid").getOrElse("")
    }

    var tmp : DesktopObject = AppObj.getDesktop(myDtid)

    if (myDtid != "" ) {

      if (tmp == null)  {
        val isAuth = isAuthenticated( request )
        if (isAuth.isEmpty) {
          Logger.debug("AUTH IS EMPTY");
          //Not Authenticated..
          val d = new DesktopObject("", null)
          d
        } else {
          Logger.debug("ADDING new DTID : " + myDtid);
          val res = currwebSession.addDesktopStaticId(myDtid)
          if (res == null) {
            //Assume failure duplicate in guid..
            val d = new DesktopObject("", null)
            d
          } else {
            AppObj.getDesktop(myDtid)
          }
        }
      } else {
        tmp
      }
    } else {
      null
    }

  }

/*
  def userHaveRole( implicit request: RequestHeader, role : String ) : Boolean = {
      user.hasRole(role)
  }

  def isMasterSiteAdmin(f: (User, DesktopObject) => Request[AnyContent] => Result) = Security.Authenticated(isAuthenticated,onUnauthorized) {
    username => {

      Logger.trace(this + "  isMasterSiteAdmin Started")
      Action(implicit request => {
        try {
          f(user,currentDesktop)(request)
        } catch {
          case _ : Exception => {
          }
            FailedMessage("EXCEPTION_OCCURED")
        } finally {
          Logger.trace(this + "  isMasterSiteAdmin commit")
        }
      }
      )

    }
  }
*/
  case class AuthenticatedRequest(
   user: User, desktop: DesktopObject, private val request: Request[AnyContent]
   ) extends WrappedRequest(request)

  /*
  def currwebSession(implicit request: RequestHeader) : WebSession = {
    var currSession = AppObj.getSession(authToken(request))
    if (currSession == null) {
      //OK Session is null, but...............................................
      //If we got here is because we where authenticated.. we can check again....
      val isAuth = isAuthenticated( request )
      if (isAuth.isEmpty) {
        Logger.error("Weird the user was not authenticated?");

        //Logger.debug("CurrSession is null")
        currSession = Option(new WebSession(new WebUser("","",null),""))
      } else {
        val email = isAuth.getOrElse("");

        val token = request.session.get("token").getOrElse("")
        val u : User = UserImpl.getUserByEmail(email)

        Logger.debug("USER u is : " + u)
        try {
          val wu = new WebUser(u.getEmail, u.getPassword, new UsernamePasswordToken(u.getEmail, u.getPassword))
          AppObj.addNewSession(token, wu)
          currSession = AppObj.getSession(authToken(request))
        } catch {
          case e: Exception => {
            if (email.trim.length >= 2) {
              //user was valid... lets try again...
              val u : User = UserImpl.getUserByEmail(email)
              val wu = new WebUser(u.getEmail, u.getPassword, new UsernamePasswordToken(u.getEmail, u.getPassword))
              AppObj.addNewSession(token, wu)
              currSession = AppObj.getSession(authToken(request))
            }
          }
        }
      }
    }
    currSession.getOrElse(new WebSession(new WebUser("","",null),""))
  }
  */


/*  def user(implicit request: RequestHeader) = {
    currwebSession.getUser()
  }
*/
  /*
  def currentDesktop(implicit request: RequestHeader, dtid: String = "") : DesktopObject = {
    var myDtid = dtid;
    if (dtid == "") {
      myDtid = request.headers.get("dtid").getOrElse("")
    }

    var tmp : DesktopObject = AppObj.getDesktop(myDtid)

    if (myDtid != "" ) {

      if (tmp == null)  {
        val isAuth = isAuthenticated( request )
        if (isAuth.isEmpty) {
          Logger.debug("AUTH IS EMPTY");
          //Not Authenticated..
          val d = new DesktopObject("", null)
          d
        } else {
          Logger.debug("ADDING new DTID : " + myDtid);
          val res = currwebSession.addDesktopStaticId(myDtid)
          if (res == null) {
            //Assume failure duplicate in guid..
            val d = new DesktopObject("", null)
            d
          } else {
            AppObj.getDesktop(myDtid)
          }
        }
      } else {
        tmp
      }
    } else {
      null
    }

  }
*/
}
