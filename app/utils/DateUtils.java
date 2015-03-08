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

import java.security.MessageDigest;
import java.security.NoSuchAlgorithmException;
import java.sql.Timestamp;
import java.text.DecimalFormat;
import java.text.NumberFormat;
import java.text.SimpleDateFormat;
import java.util.Calendar;
import java.util.Date;
import java.util.TimeZone;

public class DateUtils {


    static SimpleDateFormat dateFormatYM = new SimpleDateFormat("yyyyMM");
    static SimpleDateFormat dateFormatfull = new SimpleDateFormat("yyyy-MM-dd HH:mm:ss");
    static SimpleDateFormat dateFormatshort = new SimpleDateFormat("yyyy-MM-dd");
    static NumberFormat TwoDigitFormat = new DecimalFormat("00");
    static Calendar local = Calendar.getInstance(TimeZone.getTimeZone("UTC"));

    static {
        //dateFormatfull.setLenient(false);
        dateFormatfull.setTimeZone(TimeZone.getTimeZone("UTC"));
        dateFormatshort.setTimeZone(TimeZone.getTimeZone("UTC"));
    }


    public static Long getDateTimeYearMonth(Date dt) {

        if (dt != null) {
            try {
                return Long.parseLong(dateFormatYM.format(dt));
            } catch (Exception e) {
                return null;
            }
        } else {
            return null;
        }

    }


    public static String getDateTimeShort(Date dt) {

        if (dt != null) {
            try {
                return dateFormatshort.format(dt);
            } catch (Exception e) {
                return null;
            }
        } else {
            return null;
        }

    }


    public static String getDateTime(Date dt) {

        if (dt != null) {
            try {
                return dateFormatfull.format(dt);
            } catch (Exception e) {
                return null;
            }
        } else {
            return null;
        }

    }

    public static Date getDateTimeFromUnixTs(long unixts) {

        local.clear();
        local.set(1970, Calendar.JANUARY, 1, 0, 0, 0);
        unixts += local.getTimeInMillis();

        return new Date(unixts);
    }

    public static String getDurationNiceTime(String  dateMaxStr, String dateMinStr,  boolean max23) {
        try {
            long dateMaxlong = Long.valueOf(dateMaxStr).longValue();
            long dateMinlong = Long.valueOf(dateMinStr).longValue();
            //	//////////////////System.out.printlnln("diff : " + (dateMaxlong-dateMinlong));
            return getDurationNiceTime(dateMaxlong, dateMinlong, max23);
        } catch (Exception e) {
            //they are not long'
        }
        return "";
    }

    public static String getDurationNiceTime(long dateMaxLong, long dateMinLong, boolean max23) {
        long diff = dateMaxLong - dateMinLong;
        return formatDurationNiceTimeFromDiff(diff, max23);
    }

    public static String formatDurationNiceTimeFromDiff(long diffInMillis, boolean max23) {

        if (diffInMillis<0) {
            diffInMillis = 0;
        }

        long diffInSeconds = diffInMillis/1000;

		    /* sec */
        long diffInSecs = (diffInSeconds >= 60 ? diffInSeconds % 60 : diffInSeconds);
		    /* min */
        long diffInMins = (diffInSeconds = (diffInSeconds / 60)) >= 60 ? diffInSeconds % 60 : diffInSeconds;
		    /* hours */
        long diffInHours = (diffInSeconds = (diffInSeconds / 60)) >= 24 ? diffInSeconds % 24 : diffInSeconds;
		    /* days */
        long diffInDays = (diffInSeconds = (diffInSeconds / 24));

        if (max23 != true) {
            //otherwise its 00:00 until 22:59??
            diffInHours +=1;
        }
        return ""  + TwoDigitFormat.format(diffInDays) + "d " + TwoDigitFormat.format(diffInHours) + "h " + TwoDigitFormat.format(diffInMins) + "m " + TwoDigitFormat.format(diffInSecs) + "s";
    }

    public static String getDurationNiceTime(Date dateMax, Date dateMin, boolean max23) {
        long diff = dateMax.getTime() - dateMin.getTime();
        return formatDurationNiceTimeFromDiff(diff, max23);
    }

    public static long getDateTimeToUnixts(Timestamp timestamp) {

        return timestamp.getTime();
    }

    public static String getStringUnixDateToTimesamp(String strUnixDate) {
        if (strUnixDate.length()==10) {
            strUnixDate = strUnixDate.concat("000");
        }
        long unixts = Long.parseLong(strUnixDate);
        local.clear();
        local.set(1970, Calendar.JANUARY, 1, 0, 0, 0);
        unixts += local.getTimeInMillis();

        return getDateTime(new Date(unixts));
    }

    public static String getStringUnixDateToTimesampString(String strUnixDate) {
        return getStringUnixDateToTimesamp(strUnixDate);
    }

    public static Calendar getDateTimeFromUnixTsMinCurrentMonthDate(
            long today) {

        Calendar calendar = Calendar.getInstance(TimeZone.getTimeZone("UTC"));
        //calendar.setLenient(false);
        calendar.setTimeInMillis(today);

        int minDay = calendar.getActualMinimum(Calendar.DAY_OF_MONTH);

        calendar.set(Calendar.DAY_OF_MONTH, minDay);
        calendar.set(Calendar.HOUR_OF_DAY, 0);
        calendar.set(Calendar.MINUTE, 0);
        calendar.set(Calendar.SECOND, 0);
        calendar.set(Calendar.MILLISECOND, 0);

        return calendar;
    }

    public static Calendar getDateTimeFromUnixTsMaxCurrentMonthDate(
            long today) {

        Calendar calendar = Calendar.getInstance(TimeZone.getTimeZone("UTC"));
        //calendar.setLenient(false);
        calendar.setTimeInMillis(today);

        calendar.add(Calendar.MONTH,1);
        calendar = getDateTimeFromUnixTsMinCurrentMonthDate(calendar.getTimeInMillis());
        return calendar;
    }

    public static String getDurationXAgo(long end_time, long start_time) {
        // TODO Auto-generated method stub

        TimeDiff td = CalculateDurationDiff((end_time - start_time)*1000, true);

        StringBuffer strB = new StringBuffer();
        long nbMinutes = 0;
        if (td.days>0) {
            nbMinutes += td.days * 24 * 60;

            strB.append(td.days + "d");
        }

        if (td.hours> 0) {
            nbMinutes += td.hours * 60;
            strB.append(td.hours + "h");
        }

        if (td.minutes > 0) {
            nbMinutes += td.minutes;
            strB.append(td.minutes + "m");
        }

        return strB.toString();//"" + nbMinutes + "m";
    }

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

}
