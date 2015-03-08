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

package utils;

import com.zaxxer.hikari.HikariConfig;
import com.zaxxer.hikari.HikariDataSource;
import play.Logger;
import play.api.Play;


import java.io.BufferedReader;
import java.io.File;
import java.io.FileReader;
import java.sql.*;

import com.mysql.jdbc.Driver;
import play.api.db.DB;

import javax.sql.DataSource;

/* We do not use JPA Since Scala / Play had problem with JPA */
public class DatabaseConnection {
    private String DBName = "";
    private DataSource ds = null;
    public DatabaseConnection(String dBName) {
        this.DBName = dBName;
    }

    public int initialize() {

        ds = DB.getDataSource("default",Play.current());

        return 0;
    }

    public int initializea() {
        try {
            //registering the jdbc driver here, your string to use
            //here depends on what driver you are using.
            Class.forName("com.mysql.jdbc.Driver");
        } catch (ClassNotFoundException e) {
            e.printStackTrace();
        }


        try {

        //Not great but since we are using play lets read its config file...
        String className = "";

        boolean mustCreateH2Func = false;
        File f = Play.current().getFile("conf/application.conf");
        FileReader fr = new FileReader( f );
        BufferedReader br = new BufferedReader(fr);
        String url = "";
        String user = "";
        String pass = "";
        String line = "";
        while ((line = br.readLine()) != null) { // while loop begins here

            if (!line.startsWith("#")) {

               if (line.contains("db." + DBName + ".user=")) {
                   line = line.replaceAll("db." + DBName + ".user=", "");
                   user = line;
               } else if (line.contains("db." + DBName + ".password=")) {
                   line = line.replaceAll("db." + DBName + ".password=","");
                   pass = line;
               } else if (line.contains("db." + DBName + ".url=")) {
                    line = line.replaceAll("db." + DBName + ".url=","").replaceAll("mem:", "/mem/").replaceFirst(";","?");//.replaceAll(";","&").replaceFirst("&","?");
                    if (line.contains("h2")) {
                        //url = "jdbc:h2:file:data/dev.db;MODE=MYSQL";
                        url = line;
                        mustCreateH2Func = true;
                    } else {
                        url = line;//"jdbc:mysql://be01/" + "app_info";
                    }

                } else if ( line.contains("db." + DBName + ".driver=")) {
                    line = line.replaceAll("db." + DBName + ".driver=","");
                    className = line;
                }
            }
        }
        br.close();
        br = null;
        try {
            fr.close();
        } catch (Exception eee) {

        }
        fr = null;
        f = null;
        if (url.charAt(0) == '"') {
            url = url.substring(1);
        }
        if (url.charAt(url.length()-1) == '"') {
            url = url.substring(0, url.length()-1);
        }

        Logger.debug("Connect to : " + url);


        if (className.charAt(0) == '"') {
            className = className.substring(1);
        }
        if (className.charAt(className.length()-1) == '"') {
            className = className.substring(0, className.length()-1);
        }

        if (user != null) {
            if ((user.charAt(0) == '"') && (user.charAt(user.length() - 1) == '"')) {
                user = user.substring(1, user.length() - 1);
            }
        } else {
            user = "";
        }

        if (pass != null) {
            if ((pass.charAt(0) == '"') && (pass.charAt(pass.length() - 1) == '"')) {
                pass = pass.substring(1, pass.length() - 1);
            }
        } else {
            pass = "";
        }

        try {
            //registering the jdbc driver here, your string to use
            //here depends on what driver you are using.
            Class.forName(className);
        } catch (ClassNotFoundException e) {
            e.printStackTrace();  //To change body of catch statement use File | Settings | File Templates.
        }



        Logger.debug("Read : " + new String(url) + " with user " + user);

        if (ds == null) {
            Driver dr;

            try {
                if (mustCreateH2Func) {
                    createMySQLH2Functions();
                }
            } catch (Exception eez) {
                eez.printStackTrace();
                return 1;
            }
        }
    } catch (Exception ee) {
       ee.printStackTrace();
    }
    return 0;


    }

    public static  int  unix_timestamp(java.sql.Timestamp timestamp) {
        return (int) (timestamp.getTime() / 1000);
    }

    public static  int  unix_timestamp() {
        return (int)System.currentTimeMillis() / 1000;
    }


    public void createMySQLH2Functions() {

        Connection conn = getConnection();
        Statement stmt = null;
        try {
            stmt = conn.createStatement();
            stmt.executeUpdate("CREATE ALIAS IF NOT EXISTS UNIX_TIMESTAMP FOR \"" + this.getClass().getName() + ".unix_timestamp\"");
        stmt.close();
        } catch (Exception ee) {

        } finally {
            try {
                conn.close();
            } catch (SQLException e) {
            }
        }
    }

    public Connection getConnectionOnlyFromDatabaseManager() {
       try {
           Connection con = ds.getConnection();
           if (con == null) {
               initialize();
           } else {
               if (con.isClosed()) {
                   con = null;
                   initialize();
               } else {
                   Statement stmt = con.createStatement();
                   if (stmt == null) {
                       try {
                           con.close();
                       } catch (Exception eee) {

                       }
                       con = null;
                       initialize();
                   } else {
                       stmt.close();
                   }
               }
           }
           if (con == null) {
                return ds.getConnection();
           } else {
               return con;
           }
       } catch (Exception e){
           initialize();
           try {
            return ds.getConnection();
           } catch (Exception ee){
           }
           return null;
       }
    }

    public Connection getConnection() {
        return DatabaseManager.getInstance().getConnection();
    }

    public void unloadAll() {
        if (ds!=null) {
            try {
                ds.getConnection().close();
            } catch ( Exception ee) {

            }
            ds = null;
        }
    }

}
