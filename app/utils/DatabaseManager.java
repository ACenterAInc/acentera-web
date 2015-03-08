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


import play.Logger;

import java.sql.Connection;
import java.sql.SQLException;
import java.util.Iterator;
import java.util.Map.Entry;
import java.util.concurrent.ConcurrentHashMap;

public class DatabaseManager {

    static DatabaseManager _instance = null;
    static ConcurrentHashMap<String, DatabaseConnection> _instances = null;

    static private ThreadLocal<Connection> threadConnection = new ThreadLocal<Connection>();
    String theName = "default";

    static private boolean isInDev = false;

    //org.hsqldb.jdbcDriver drv;
    private DatabaseManager() {
        try {
            // load the database driver (make sure this is in your classpath!)
            _instances = new  ConcurrentHashMap<String, DatabaseConnection>();

            if (play.Play.application().isDev()) {
                 isInDev = true;
            }

        } catch (Exception e) {
            e.printStackTrace();
            return;
        }

    }

    public  DatabaseConnection initialize(String DBName) {
        DatabaseConnection dbcon = null;
        String DBNameTmp = DBName.trim();
        if (!_instances.containsKey(DBNameTmp)) {
            dbcon = new DatabaseConnection(DBNameTmp);
            _instances.put(DBNameTmp, dbcon);
        } else {
            dbcon = _instances.get(DBNameTmp);
        }
        if (dbcon.initialize() <= 0) {
            return dbcon;
        } else{
            return null;
        }

    }

    public  DatabaseConnection getDbCon() {
        DatabaseConnection dc = _instances.get(theName);
        if (dc == null) {
            initialize(theName);
            dc = _instances.get(theName);
        }
        return dc;
    }


    static public DatabaseManager getInstance() {
        if (_instance == null) {
            synchronized (DatabaseManager.class) {
                if (_instance == null) {
                    _instance = new DatabaseManager();
                }
            }
        }

        return _instance;
    }

    public void unloadAll() {
        if (_instance != null) {
            try {
                this.finalize();
            } catch (Throwable e) {
                e.printStackTrace();
            }
        }
    }

    protected void finalize() throws Throwable
    {
        Iterator itr =_instances.entrySet().iterator();
        while (itr.hasNext()) {
            Entry e = (Entry) itr.next();
            DatabaseConnection con = (DatabaseConnection) e.getValue();
            con.unloadAll();
        }
        _instance = null;
    }

    public synchronized  void rollback() {

        try {
            if (threadConnection.get() != null) {
                Connection tmpConnection = null;
                try {
                    tmpConnection = threadConnection.get();
                    try {
                        tmpConnection.rollback();
                    } catch (Exception ignore) {

                    }

                } finally {
                    try {
                        tmpConnection.close();
                    } catch (Exception ee) {

                    }
                }
            }
        } catch (Exception ewww) {
            //ewww.printStackTrace();
        }
        HibernateSessionFactory.closeSession();
        threadConnection.set(null);
    }

    public synchronized  void closeIfConnectionOpen() {

        try {
            HibernateSessionFactory.closeSession();

            if (threadConnection.get() != null) {
                try {
                    Connection tmpConnection = threadConnection.get();
                    try {
                        tmpConnection.commit();
                    } catch (Exception ignore) {

                    }

                    tmpConnection.close();
                } catch (SQLException e) {
                } finally {
                }
            }
            //throw new Exception("WTFZ");
        } catch (Exception eww) {
            //eww.printStackTrace();
        }

        threadConnection.set(null);

        //Obsolete, this used to be some problem that got fixed after few configuration changes
        /*if (!isInDev) {
            try {
                HibernateSessionFactory.getSession().flush();
            } catch (Exception e) {

            }
            try {
                HibernateSessionFactory.closeSession();
            } catch (Exception e) {

            }
        }*/
    }

    public synchronized Connection getConnection() {
         try {
        if (threadConnection.get() == null) {

            DatabaseConnection dconnection = _instances.get(theName);
            if (dconnection == null) {
                dconnection = initialize(theName);
            }
            Connection con = dconnection.getConnectionOnlyFromDatabaseManager();

            if (con == null ) {
                dconnection = initialize(theName);
                con = dconnection.getConnectionOnlyFromDatabaseManager();
                if (con == null ) {
                    return null;
                } else {

                    con.setAutoCommit(false);
                    threadConnection.set(con);
                }
            } else {
                con.setAutoCommit(false);
                threadConnection.set(con);
            }
        } else {
            try {
                if (threadConnection.get().isClosed()) {
                    //WERID... something closed the connection ??
                    try {
                        /*try {
                            //throw new Exception("Connection was closed but the transaction is not fully completed??");
                        } catch (Exception ee) {
                            ee.printStackTrace();
                        }*/
                        //threadConnection.get().close();
                        DatabaseConnection dconnection = _instances.get(theName);
                        Connection con = dconnection.getConnectionOnlyFromDatabaseManager();

                        if (con == null ) {
                            return null;
                        } else {
                            con.setAutoCommit(false);
                            threadConnection.set(con);
                        }

                    }  catch ( Exception eee ) {
                        eee.printStackTrace();
                    }
                }

            } catch (SQLException e) {
                e.printStackTrace();

                DatabaseConnection dconnection = _instances.get(theName);
                Connection con = dconnection.getConnectionOnlyFromDatabaseManager();
                if (con == null ) {
                    return null;
                } else {
                    con.setAutoCommit(false);
                    threadConnection.set(con);
                }
            }
        }

        return  threadConnection.get();
         } catch (Exception eee) {
             eee.printStackTrace();
         }
        return null;
    }


}
