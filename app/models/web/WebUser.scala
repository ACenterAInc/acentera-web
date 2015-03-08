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

import play.api.Logger
import java.security.{MessageDigest, SecureRandom}
import java.util.Random
import org.apache.shiro.SecurityUtils
import org.apache.shiro.authc.{AuthenticationException, UsernamePasswordToken}
import models.db.acentera.impl.UserImpl
import org.apache.shiro.subject.Subject
import play.cache.Cache
import javax.crypto.spec.SecretKeySpec
import javax.crypto.Cipher
import controllers.acentera.SecurityController
import org.apache.shiro.session.UnknownSessionException
import models.db.User


object WebUser {

  def authenticate(email: String, cred: String) : Boolean = {

    val token =  new UsernamePasswordToken(email, cred)
    // Use shiro to pass through a username cred token.

    val tk = new UsernamePasswordToken(email,cred)
    //tk.setRememberMe(true)

    var currentUser = SecurityUtils.getSubject
    try {
      token.setRememberMe(true);
      currentUser.login(token)


      true
    } catch {
      case z : UnknownSessionException => {
        currentUser = new Subject.Builder().buildSubject();
        token.setRememberMe(true);
        currentUser.login(token);
        val session = currentUser.getSession(true);
        try {
          token.setRememberMe(true);
          currentUser.login(token)
          true
        } catch {
          case e: AuthenticationException => {
            false
          }
        }
      }
      case e: AuthenticationException => {
        false
      }
    }

  }

  def findByEmail(email: String) : Boolean  =  {
    val u: User = UserImpl.getUserByEmailExcludeInvited(email);
    if (u != null) {
      true
    } else {
      false
    }
  }

 }

case class WebUser(email: String, cred: String, shiroToken : UsernamePasswordToken) {

  var shiroSubject : Subject = null;

  def setSubject(subject: Subject ) {
    //TODO: Set the cache..
    Cache.set(user.getEmail + "_subject", subject)
    this.shiroSubject = subject
  }

  def getSubject() : Subject = {
    if (this.shiroSubject == null) {
      Cache.get(getUser().getEmail + "_subject").asInstanceOf[Subject];
    } else {
      this.shiroSubject;
    }
  }


  val user: User = UserImpl.getUserByEmail(email)

  def load() = {
  }

  def getUser() = {
     user
  }


  def authenticate() : Boolean = {
    val token = new UsernamePasswordToken(email, cred)
    // Use shiro to pass through a username cred token.

    //tk.setRememberMe(true)

    var currentUser = SecurityUtils.getSubject
    try {
      try {
        token.setRememberMe(true);
        Logger.debug("TRYING TO CONNECT TO : " + email + " with cred :" + cred);
        currentUser.login(token)
      } catch {
        case err : Exception => {
          err.printStackTrace();
          currentUser = new Subject.Builder().buildSubject();
          currentUser.login(token);
        }

      }

      Logger.debug("SHIRO AUTHENTICATE IS :  " + currentUser);
      Logger.debug("SHIRO AUTHENTICATE  PRINCIPAL IS : " + currentUser.getPrincipal)

      //TODO: We should use a salted method...
      //http://stackoverflow.com/questions/4319496/how-to-encrypt-and-decrypt-data-in-java
      val passphrase: String = play.Play.application.configuration.getString("privatekey")
      val digest : MessageDigest = MessageDigest.getInstance("SHA");
      digest.update(passphrase.getBytes());
      val key : SecretKeySpec = new SecretKeySpec(digest.digest(), 0, 16, "AES");
      val aes : Cipher = Cipher.getInstance("AES/ECB/PKCS5Padding");
      aes.init(Cipher.ENCRYPT_MODE, key);
      val ciphertext = aes.doFinal(cred.getBytes());

      Cache.set(email + "_pass", ciphertext);


      this.setSubject(shiroSubject);

      true
    } catch {
      case e: AuthenticationException => {
        Logger.debug("Authentication Exception");
        e.printStackTrace();
        false
      }
    }
  }


}














