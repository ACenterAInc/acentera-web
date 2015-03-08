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

package utils.security;

import models.db.acentera.exceptions.DAOException;
import org.apache.shiro.crypto.RandomNumberGenerator;
import org.apache.shiro.crypto.SecureRandomNumberGenerator;
import org.apache.shiro.crypto.hash.Sha256Hash;
import org.apache.shiro.realm.AuthorizingRealm;
import org.apache.shiro.authc.*;
import org.apache.shiro.authc.credential.*;
import org.apache.shiro.subject.*;
import org.apache.shiro.authz.*;

import play.Logger;
import org.apache.shiro.util.ByteSource;
import models.db.User;
import models.db.acentera.impl.UserImpl;
import play.cache.Cache;
import utils.DatabaseConnection;
import utils.DatabaseManager;
import utils.HibernateSessionFactory;

import java.security.NoSuchAlgorithmException;
import java.sql.Connection;
import java.sql.SQLException;
import java.util.ArrayList;
import java.util.HashMap;
import java.util.HashSet;
import java.util.Set;


/**
 * Custom realm, with thanks to
 * <a href="https://github.com/Arnauld/scalaadin/wiki/Authentication:-Vaadin+Shiro">the Vaadin Shiro integration</a>.
 *
 * @author wsargent
 * @since 1/8/12
 */
public class SampleRealm extends AuthorizingRealm {


  /**
   * The custom query used to retrieve the roles that apply to a user.
   */
  private static String DEFAULT_USER_ROLES_QUERY= "select role_name from user_roles where username = ?";

  /**
   * The custom query used to retrieve permissions that apply to a particular role.
   */
  private static String  DEFAULT_PERMISSIONS_QUERY = "select permission from roles_permissions where role_name = ?";


  public SampleRealm() {
      ini();
  }


  public void ini() {
    setName("SampleRealm"); //This name must match the name in the User class's getPrincipals() method

    HashedCredentialsMatcher matcher = new HashedCredentialsMatcher(Sha256Hash.
              ALGORITHM_NAME);
    //Sha256CredentialsMatcher matcher = new Sha256CredentialsMatcher();

    matcher.setHashIterations(1024);
    matcher.setStoredCredentialsHexEncoded(false);
    setCredentialsMatcher(matcher);
  }

  @Override
  protected SaltedAuthenticationInfo doGetAuthenticationInfo(AuthenticationToken token ) {
      Connection c = null;
    try {
        Logger.debug("GOT TOKEN OF : " + token);
        if (token instanceof UsernamePasswordToken) {

            c = DatabaseManager.getInstance().getConnection();
            try {
                if (c.isClosed()) {
                    DatabaseManager.getInstance().closeIfConnectionOpen();
                    c = DatabaseManager.getInstance().getConnection();
                }
            } catch (SQLException e) {
                DatabaseManager.getInstance().closeIfConnectionOpen();
                c = DatabaseManager.getInstance().getConnection();
            }
            //HibernateSessionFactory.getSession();

            UsernamePasswordToken upToken = (UsernamePasswordToken) token;

            String username = upToken.getUsername();
            checkNotNull(username, "Null usernames are not allowed by this realm.");

            // retrieve the 'real' user password
            //Logger.debug("Will query USER ");
            User u = getUserData(username);
            // Logger.debug("GOT USER " + u);
            checkNotNull(username, "No username found for user [ " + username + "]");

            String password = u.getPassword();
            //Logger.debug("GOT PASSWORD " + password);
            checkNotNull(password, "No account found for user [" + username + "]");

            String salt = u.getSalt();

            //Logger.debug("GOT SALT " + salt);
            PasswordEncoder pe = PasswordEncoder.getInstance();
            ByteSource b = null;
            try {
                b = pe.getSalt(salt);
                // Logger.debug("GOT BYTE " + b);


                //Logger.debug("GOINT TO GET INFO .");
                SimpleAuthenticationInfo info = null;
                try {Logger.debug("TOKEN PW : " + new String(upToken.getPassword()));} catch (Exception ee) {
                }

                try {
                    if (upToken != null && new String(upToken.getPassword()).compareTo(play.Play.application().configuration().getString("secret_key")) == 0) {

                        //Now hash the plain-text password with the random salt and multiple
                        //iterations and then Base64-encode the value (requires less space than Hex):
                        //String hashedPasswordBase64 = new Sha256Hash(new String(upToken.getPassword()), salt, 1024).toBase64();

                        String enc;
                        enc = pe.encode(new String(upToken.getPassword()), salt);
                        Logger.debug("ENC is now : " + enc);

                        info = new SimpleAuthenticationInfo(u,
                                enc, b, getName());

                    } else {
                        info = new SimpleAuthenticationInfo(u, password, b, getName());
                    }
                } catch (Exception ew) {
                    info = new SimpleAuthenticationInfo(u, password, b, getName());
                }


                //CredentialsMatcher credentialsMatcher = this.getCredentialsMatcher();
                //boolean successfulAuthentication = credentialsMatcher.doCredentialsMatch(arg0, simpleAuthenticationInfo);

                //Logger.debug("GOINT TO GET INFO  IS ." + info);
                return info;

            } catch (NoSuchAlgorithmException e) {
                Logger.error("You are missing packages for salting : " + e.getMessage());
                System.exit(1);
            } catch (Exception e) {
                e.printStackTrace();

            }



            // return the 'real' info for username, security manager is then responsible
            // for checking the token against the provided info

        }
    }finally {
        try {
            c.close();
        } catch (Exception ee) {

        }
        //DatabaseManager.getInstance().closeIfConnectionOpen();
    }

   return null;
  }

  private User getUserData(Object username) {
      User u = null;
      try {
          Logger.debug("getUserData ..... of " + username  + " class : " +username.getClass());
          u = UserImpl.getUserByEmail("" + username);
          return u;
      } catch (DAOException e) {
          e.printStackTrace();
      }

      return null;
  }


    protected AuthorizationInfo doGetAuthorizationInfo(PrincipalCollection principals) {

    //checkNotNull(principals, "PrincipalCollection method argument cannot be null.")

        Logger.debug("doGetAuthoriztionInfo ..... " + principals.getPrimaryPrincipal().getClass());

        User user = (User) principals.getPrimaryPrincipal();
        //String username = (String)principals.getPrimaryPrincipal();

        SimpleAuthorizationInfo info = new SimpleAuthorizationInfo(rolesOf(user));
        info.setStringPermissions(permissionsOf(user));

    return info;
  }

  private Set<String> permissionsOf(User user) {
      //We should use cached object.. but we need to invalidate the cache on user change...

      /*String cacheKey = "user-" + user.getId() + "-permissions";
      Set<String> cachedPerm = (Set<String>)Cache.get(cacheKey);
      Logger.debug("CACHED PERM IS : " );
      Logger.debug("" + cachedPerm);

      if (cachedPerm == null || (cachedPerm != null && cachedPerm.size()<=0)) {
          Logger.debug("PERFMISSION DONE");
          Set<String> s = null;
          try {
              s = UserImpl.getUserPermissions(user);
          } catch (SQLException e) {
              e.printStackTrace();
              s = new HashSet<String>();
          }
          Logger.debug("PERMISSIONS ARE : " + s);
          cachedPerm = s;
          Cache.set(cacheKey, cachedPerm, 300);
      }
      return cachedPerm;
      */

      Set<String> s = null;
      try {
          s = UserImpl.getUserPermissions(user);
      } catch (SQLException e) {
          e.printStackTrace();
          s = new HashSet<String>();
      }
      Logger.debug("PERMISSIONS ARE : " + s);
      return s;

  }

  private Set<String> rolesOf(User user) {
      //TODO: Read from Cache or read from DB.. if not in cache..

      /*
      case "admin@example.org" => Set("admin")
      case _ => Set.empty
    }*/

      Logger.debug("rolesOf ....." );
      Logger.debug("rolesOf ....." );
      Logger.debug("rolesOf ....." );
      Logger.debug("rolesOf ....." );
      Logger.debug("rolesOf ....." );
      Logger.debug("rolesOf ....." );
      Logger.debug("rolesOf ....." );
      Logger.debug("rolesOf ....." );
      Logger.debug("rolesOf ....." );
      Logger.debug("rolesOf ....." );
      Logger.debug("rolesOf ....." );
      Logger.debug("rolesOf ....." );
      Logger.debug("rolesOf ....." );
      Logger.debug("rolesOf ....." );



    return new HashSet<String>();
  }

  private void checkNotNull(String reference, String message) throws AuthenticationException {
    if (reference == null) {
      throw new AuthenticationException(message);
    }
  }

    public void invalidateUser(PrincipalCollection principals) {
        clearCache(principals);
    }
}
