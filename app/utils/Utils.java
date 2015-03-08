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

import com.jcraft.jsch.JSch;
import models.ssh.KeyPair;
import net.sf.json.JSONObject;
import org.apache.shiro.crypto.RandomNumberGenerator;
import org.apache.shiro.crypto.SecureRandomNumberGenerator;
import org.apache.shiro.util.ByteSource;
import play.Logger;
import utils.security.PasswordEncoder;

import javax.xml.bind.annotation.adapters.HexBinaryAdapter;
import java.io.IOException;
import java.io.OutputStream;
import java.security.MessageDigest;
import java.security.NoSuchAlgorithmException;
import java.sql.*;
import java.text.DecimalFormat;
import java.text.NumberFormat;
import java.text.SimpleDateFormat;
import java.util.*;
import java.util.Date;

public class Utils {


    public static byte[] getMD5(String data) {

        MessageDigest md = null;
        try {
            md = MessageDigest.getInstance("MD5");
            md.reset();
            md.update(data.getBytes());
            return md.digest();
        } catch (NoSuchAlgorithmException e1) {
            e1.printStackTrace();
            return null;
        }
    }


    public static String getMd5FromByteArray(byte [] array) {

        StringBuilder sb = new StringBuilder(2*array.length);

        for (int i = 0; i < array.length; i++) {
            String hex = Integer.toHexString(array[i] & 0xff);

            if (hex.length() == 1) {
                sb.append('0');
            }

            sb.append(hex);
        }
        return sb.toString();
    }


    public static String getMD5InString(String fullName) {
        byte[] array = getMD5(fullName);
        StringBuilder sb = new StringBuilder(2*array.length);
        System.err.print("got md5 for : " + fullName);

        for (int i = 0; i < array.length; i++) {
            String hex = Integer.toHexString(array[i] & 0xff);

            if (hex.length() == 1) {
                sb.append('0');
            }

            sb.append(hex);
        }
        return sb.toString();
    }

    private static JSONObject getSingleGuid( Connection con ) {

        PreparedStatement stmt = null;
        ResultSet rs = null;
        String guid = "";
        Long guidid = new Long(0);
        try {
            stmt = con.prepareStatement("SELECT ID, GUID, RESERVED FROM GUID WHERE RESERVED=0 LIMIT 100", ResultSet.TYPE_SCROLL_SENSITIVE, ResultSet.CONCUR_UPDATABLE);
            rs = stmt.executeQuery();

            while (rs.next() && guidid == 0) {
                rs.updateInt("RESERVED", 1);
                try {
                    rs.updateRow();


                    byte[] guidBytes = rs.getBytes("GUID");
                    StringBuffer hexString = new StringBuffer("");

                    for (int i = 0; i < guidBytes.length; i++) {
                        String hex = Integer.toHexString(0xFF & guidBytes[i]);
                        if (hex.length() == 1) {
                            // could use a for loop, but we're only dealing with a single byte
                            hexString.append('0');
                        }
                        hexString.append(hex);
                    }
                    guid = hexString.toString().toUpperCase();
                    guidid = rs.getLong("ID");
                } catch (Exception e) {
                    e.printStackTrace();
                }
            }
        } catch (Exception e) {

        } finally {
            try {
                rs.close();
                stmt.close();
            } catch (Exception ee) {

            }
        }

        if (guidid != 0) {
            JSONObject res = new JSONObject();
            res.put("id", guidid);
            res.put("guid", guid);
            return res;
        }
        return null;
    }
    public static byte[] getUniqueGUID() {

        Connection con = DatabaseManager.getInstance().getConnection();

        Logger.debug("GETUNIQUEGUID - 1 ");
        String guid = "";
        try {
            con.setAutoCommit(false);

            Long guidid = new Long(0);
            Logger.debug("GETUNIQUEGUID - 2 ");
            JSONObject guidResponse = getSingleGuid(con);
            Logger.debug("GETUNIQUEGUID - 3 " + guidResponse);
            if (guidResponse != null) {
                guidid = guidResponse.getLong("id");
                guid = guidResponse.getString("guid");
            }

            Logger.debug("GETUNIQUEGUID - 4 " + guidid);
            if (guidid<=0) {

                Logger.debug("GETUNIQUEGUID - 5 " + guidid);
                //Hmm strange no more GUID that where Free Existed, lets generate some....
                String sql = "INSERT INTO GUID(ID, GUID,TS, RESERVED) VALUES(0, UNHEX(?), NOW(), 0)";
                PreparedStatement pstmt = con.prepareStatement(sql);

                try {
                    Logger.debug("initialize all 6");
                    for (int i = 1; i <= 20; i++) {
                        UUID idOne = UUID.randomUUID();
                        String theUuid = String.valueOf(idOne).replaceAll("-", "").toUpperCase();

                        pstmt.setString(1, theUuid);
                        pstmt.addBatch();
                    }
                    // Execute the batch
                    int[] updateCounts = pstmt.executeBatch();
                } catch (BatchUpdateException e) {
                    // Not all of the statements were successfully executed
                    //Its ok lets assume at least 1 worked
                    e.printStackTrace();
                } catch (Exception e1) {
                    e1.printStackTrace();
                } finally {
                    pstmt.close();
                }

                Logger.debug("GETUNIQUEGUID - 6 " + guidid);
                guidResponse = getSingleGuid(con);
                Logger.debug("GETUNIQUEGUID - 7 " + guidResponse);
                if (guidResponse != null) {
                    guidid = guidResponse.getLong("id");
                    guid = guidResponse.getString("guid");
                }
            }

        } catch (Exception e) {
            e.printStackTrace();
        } finally {
            //we must close as otherwise we take the same object again that was taken... even though we did an update row..
            try {
                 con.commit();
            } catch (Exception e) {

            }
        }

        Logger.debug("GETUNIQUEGUID - 8 " + guid);
        return guid.getBytes();
    }

    public static String getRandomSalt() {
        PasswordEncoder pe = PasswordEncoder.getInstance();

        return getRandomGUID();
    }

    public static class TimeDiff {
        public long years;
        public long months;
        public long days;
        public long hours;
        public long minutes;
        public long seconds;
    }

    public static TimeDiff CalculateDurationDiff(long diffInMillis, boolean max23) {
        if (diffInMillis<0) {
            diffInMillis = 0;
        }


        TimeDiff timeDiff = new TimeDiff();

        long diffInSeconds = diffInMillis/1000;

		    /* sec */
        long diffInSecs = (diffInSeconds >= 60 ? diffInSeconds % 60 : diffInSeconds);
		    /* min */
        long diffInMins = (diffInSeconds = (diffInSeconds / 60)) >= 60 ? diffInSeconds % 60 : diffInSeconds;
		    /* hours */
        long diffInHours = (diffInSeconds = (diffInSeconds / 60)) >= 24 ? diffInSeconds % 24 : diffInSeconds;
		    /* days */
        long diffInDays = (diffInSeconds = (diffInSeconds / 24));

        if (max23!= true) {
            //otherwise its 00:00 until 22:59??
            diffInHours +=1;
        }

        timeDiff.days=diffInDays;
        timeDiff.hours=diffInHours;
        timeDiff.minutes=diffInMins;
        timeDiff.seconds=diffInSeconds;


        return timeDiff;
    }

    public static Calendar getCalendarDateTime(long time) {

        Calendar calendar = Calendar.getInstance(TimeZone.getTimeZone("UTC"));
        //calendar.setLenient(false);
        calendar.setTimeInMillis(time);

        return calendar;
    }

    public static TimeDiff getDurationTimeObject(long end_time, long start_time, boolean b) {
        return CalculateDurationDiff((end_time - start_time)*1000, true);
    }

    private static Random myRand = new Random();

    public static String getRandomGUID() {
        MessageDigest md5 = null;
        StringBuffer sbValueBeforeMD5 = new StringBuffer();
        String guid="";
        try {
            md5 = MessageDigest.getInstance("MD5");
        } catch (NoSuchAlgorithmException e) {
            e.printStackTrace();
        }

        try {
            long time = System.currentTimeMillis();
            long rand = 0;

            rand = myRand.nextLong();

            // This StringBuffer can be a long as you need; the MD5
            // hash will always return 128 bits.  You can change
            // the seed to include anything you want here.
            // You could even stream a file through the MD5 making
            // the odds of guessing it at least as great as that
            // of guessing the contents of the file!
            sbValueBeforeMD5.append("" + new Date());
            sbValueBeforeMD5.append(":");
            sbValueBeforeMD5.append(Long.toString(time));
            sbValueBeforeMD5.append(":");
            sbValueBeforeMD5.append(Long.toString(rand));

            String valBefore = sbValueBeforeMD5.toString();
            md5.update(valBefore.getBytes());

            byte[] array = md5.digest();
            StringBuffer sb = new StringBuffer();
            for (int j = 0; j < array.length; ++j) {
                int b = array[j] & 0xFF;
                if (b < 0x10) sb.append('0');
                sb.append(Integer.toHexString(b));
            }

            guid = sb.toString();

        } catch (Exception e) {
            e.printStackTrace();
        }

        return guid;
    }

    static private final int  BASELENGTH   = 128;
    static private final int  LOOKUPLENGTH = 16;
    static final private byte [] hexNumberTable    = new byte[BASELENGTH];
    static final private char [] lookUpHexAlphabet = new char[LOOKUPLENGTH];


    public static byte[] hexStringToByteArray(String s) {

        HexBinaryAdapter adapter = new HexBinaryAdapter();
        byte[] bytes = adapter.unmarshal(s);
        return bytes;
    }


    public static byte[] decode(String encoded) {

        if (encoded == null)
            return null;

        int lengthData = encoded.length();

        if (lengthData % 2 != 0)
            return null;

        char[] binaryData = encoded.toCharArray();
        int lengthDecode = lengthData / 2;
        byte[] decodedData = new byte[lengthDecode];
        byte temp1, temp2;
        char tempChar;
        for( int i = 0; i<lengthDecode; i++ ){
            tempChar = binaryData[i*2];
            temp1 = (tempChar < BASELENGTH) ? hexNumberTable[tempChar] : -1;
            if (temp1 == -1)
                return null;
            tempChar = binaryData[i*2+1];
            temp2 = (tempChar < BASELENGTH) ? hexNumberTable[tempChar] : -1;
            if (temp2 == -1)
                return null;
            decodedData[i] = (byte)((temp1 << 4) | temp2);
        }
        return decodedData;
    }

    public static KeyPair generateSshKey(String name) {

        JSch jsch=new JSch();

        String passphrase="";

        OutputStream output = new OutputStream()
        {
            private StringBuilder string = new StringBuilder();
            @Override
            public void write(int b) throws IOException {
                this.string.append((char) b );
            }

            //Netbeans IDE automatically overrides this toString()
            public String toString(){
                return this.string.toString();
            }
        };

        OutputStream puboutput = new OutputStream()
        {
            private StringBuilder string = new StringBuilder();
            @Override
            public void write(int b) throws IOException {
                this.string.append((char) b );
            }

            //Netbeans IDE automatically overrides this toString()
            public String toString(){
                return this.string.toString();
            }
        };


        try{
            com.jcraft.jsch.KeyPair kpair=com.jcraft.jsch.KeyPair.genKeyPair(jsch, com.jcraft.jsch.KeyPair.RSA, 2048);
            kpair.setPassphrase(passphrase);
            kpair.writePrivateKey(output);
            kpair.writePublicKey(puboutput, "ACenterA_Automation");
            kpair.dispose();
        }
        catch(Exception e){
            System.out.println(e);
        }

        models.ssh.KeyPair k = new models.ssh.KeyPair();
        k.setPrivateKey(output.toString());
        k.setPublicKey(puboutput.toString());
        return k;
    }

}
