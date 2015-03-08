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

package views


import java.util.Properties
import net.tanesha.recaptcha.ReCaptchaFactory
import net.tanesha.recaptcha.ReCaptchaImpl
import net.tanesha.recaptcha.ReCaptchaResponse
import play.api.Play.current
import play.api.Logger


object ReCaptcha {

def publicKey(): String = {
current.configuration.getString("recaptcha.publickey").get
}
def privateKey(): String = {
current.configuration.getString("recaptcha.privatekey").get
}
def render(): String = {
 val c : net.tanesha.recaptcha.ReCaptcha = ReCaptchaFactory.newSecureReCaptcha(publicKey(), privateKey(), false);
  c.asInstanceOf[ReCaptchaImpl].setRecaptchaServer("https://www.google.com/recaptcha/api"); 
  c.createRecaptchaHtml(null, new Properties)
}
}
