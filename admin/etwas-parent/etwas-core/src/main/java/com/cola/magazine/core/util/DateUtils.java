package com.cola.magazine.core.util;

import org.apache.commons.lang3.StringUtils;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;

import java.text.ParseException;
import java.text.SimpleDateFormat;
import java.util.*;

public class DateUtils {
    private static final Logger logger = LoggerFactory.getLogger(DateUtil.class);
    public static final String DATE_FORMAT = "yyyy-MM-dd";
    public static final String DATE_FORMAT_A = "yyyyMMdd";
    public static final String TIME_FORMAT_A = "yyyy-MM-dd HH:mm:ss";
    public static final String TIME_FORMAT_B = "yyyyMMddHHmmssSSS";
    public static final String TIME_FORMAT_C = "yyyy-MM-dd HH:mm:ss:SSS";
    public static final String TIME_FORMAT_D = "yyyyMMdd";
    public static final String TIME_FORMAT_E = "yyyy年MM月dd日";
    public static final String TIME_FORMAT_F = "yyyyMMddHHmm";
    public static final String TIME_FORMAT_G = "yyyy年MM月dd日HH时mm分ss秒";
    public static final String TIME_FORMAT_H = "yyyy-MM-dd HH:mm";
    public static final String TIME_FORMAT_I = "HH:mm:ss";
    public static final String TIME_FORMAT_J = "yyyyMMddHHmmssSSS";
    public static final String TIME_FORMAT_K = "yy-M-d";
    public static final String TIME_FORMAT_L = "HH:mm";
    public static final String TIME_FORMAT_M = "MM月dd日 HH:mm";
    public static final String DATE_FORMAT_B = "yyyy.MM.dd";
    public static final String YEAR_FORMAT = "yyyy";
    public static final String YEAR_MONTH_FORMAT = "yyyy-MM";
    public static final String MONTH_DAY_FORMAT = "MM-dd";
    public static final String FORMAT_1 = ",##0.00";
    public static final String FORMAT_2 = "0.00";
    public static final String FORMAT_3 = ",###";
    public static final String FIRST_TIME = "1970-01-01 00:00:00";
    public static final String FORMAT_4 = "dd";
    public static final String DATE_FORMAT_N = "MM.dd";
    public static final String DATE_FORMAT_P = "MM.dd HH:mm";
    public static final String TIME_FORMAT_Q = "yyyy.MM.dd HH:mm";
    public static final String TIME_FORMAT_R = "MM月";
    public static final String TIME_FORMAT_S = "MM";


    public DateUtils() {
    }

    public static String today() {
        return getDateFormat("yyyy-MM-dd").format(new Date());
    }

    public static String today(String format) {
        return getDateFormat(format).format(new Date());
    }

    public static String time() {
        return getDateFormat("HH:mm:ss").format(new Date());
    }

    public static String todayTime() {
        return getDateFormat("yyyy-MM-dd HH:mm:ss").format(new Date());
    }

    /**
     * 秒级时间戳转日期对象
     *
     * @param timestamp
     * @return
     */
    public static Date timestamp2Date(Long timestamp) {
        Calendar calendar = Calendar.getInstance();
        calendar.setTimeInMillis(timestamp * 1000);
        return calendar.getTime();
    }

    public static String date2String(Date date, String format) {
        String dateStr = null;

        try {
            if (date != null) {
                SimpleDateFormat ex = new SimpleDateFormat(format);
                dateStr = ex.format(date);
            }
        } catch (Exception var4) {
            logger.error("date to string failure. The detail information is: ", var4);
        }

        return dateStr;
    }

    public static Date string2Date(String dateStr, String format) {
        if (!StringUtils.isBlank(dateStr) && !StringUtils.isBlank(format)) {
            Date date = null;

            try {
                SimpleDateFormat ex = new SimpleDateFormat(format);
                date = ex.parse(dateStr);
            } catch (ParseException var4) {
                logger.error("string to date failure. The detail information is ", var4);
            }

            return date;
        } else {
            return null;
        }
    }

    public static Date getBeginOfTheDay(Date date) {
        return null == date ? null : string2Date(date2String(date, "yyyy-MM-dd"), "yyyy-MM-dd");
    }

    public static Date getEndOfTheDay(Date date) {
        if (null == date) {
            return null;
        } else {
            Date beginningOfTheDay = getBeginOfTheDay(date);
            Calendar calendar = Calendar.getInstance(Locale.CHINA);
            calendar.setTimeInMillis(beginningOfTheDay.getTime() + 86400000L - 1L);
            return calendar.getTime();
        }
    }

    public static boolean hasBetweenDate(String begin, String end, String format) {
        try {
            SimpleDateFormat e = new SimpleDateFormat(format);
            Date beginDate = e.parse(begin);
            Date endDate = e.parse(end);
            Date currentDate = new Date();
            Date current = e.parse(e.format(currentDate));
            return current.before(endDate) && current.after(beginDate);
        } catch (ParseException var8) {
            var8.printStackTrace();
            return false;
        }
    }

    public static Date setMonthFirstDay(Date date) {
        Calendar calendar = Calendar.getInstance();
        calendar.setTime(date);
        calendar.set(5, 1);
        calendar.set(11, 0);
        calendar.set(12, 0);
        calendar.set(13, 0);
        date = calendar.getTime();
        return date;
    }

    public static Date setMonthLastDay(Date date) {
        Calendar calendar = Calendar.getInstance();
        calendar.setTime(date);
        calendar.add(2, 1);
        calendar.set(5, 1);
        calendar.add(5, -1);
        calendar.set(11, 23);
        calendar.set(12, 59);
        calendar.set(13, 59);
        date = calendar.getTime();
        return date;
    }

    public static Date setMonth(Date date, Integer month) {
        Calendar calendar = Calendar.getInstance();
        calendar.setTime(date);
        calendar.add(2, month.intValue());
        date = calendar.getTime();
        return date;
    }

    public static Date setYear(Date date, Integer year) {
        Calendar calendar = Calendar.getInstance();
        calendar.setTime(date);
        calendar.add(1, year.intValue());
        date = calendar.getTime();
        return date;
    }

    public static Date setDate(Date date, Integer num) {
        Calendar calendar = Calendar.getInstance();
        calendar.setTime(date);
        calendar.add(5, num.intValue());
        date = calendar.getTime();
        return date;
    }

    public static Date setDayOfYear(Date date, Integer num) {
        Calendar calendar = Calendar.getInstance();
        calendar.setTime(date);
        calendar.add(Calendar.DAY_OF_YEAR, num.intValue());
        date = calendar.getTime();
        return date;
    }

    public static Date setHour(Date date, Integer num) {
        Calendar calendar = Calendar.getInstance();
        calendar.setTime(date);
        calendar.add(11, num.intValue());
        date = calendar.getTime();
        return date;
    }

    public static Date setMinute(Date date, Integer num) {
        Calendar calendar = Calendar.getInstance();
        calendar.setTime(date);
        calendar.add(12, num.intValue());
        date = calendar.getTime();
        return date;
    }

    public static Date setSecond(Date date, Integer num) {
        Calendar calendar = Calendar.getInstance();
        calendar.setTime(date);
        calendar.add(13, num.intValue());
        date = calendar.getTime();
        return date;
    }

    public static int getMonthDiff(Date date1, Date date2) {
        Calendar c1 = Calendar.getInstance();
        Calendar c2 = Calendar.getInstance();
        c1.setTime(date1);
        c2.setTime(date2);
        int y1 = c1.get(1);
        int m1 = c1.get(2);
        int y2 = c2.get(1);
        int m2 = c2.get(2);
        return Math.abs((y1 - y2) * 12 + (m1 - m2));
    }

    public static int getDaysDiff(Date date1, Date date2) {
        Calendar c1 = Calendar.getInstance();
        Calendar c2 = Calendar.getInstance();
        c1.setTime(date1);
        c2.setTime(date2);
        Long between_days = Long.valueOf((c2.getTimeInMillis() - c1.getTimeInMillis()) / 86400000L);
        return Math.abs(between_days.intValue());
    }

    public static int getDaysDiffUp(Date date1, Date date2) {
        Calendar c1 = Calendar.getInstance();
        Calendar c2 = Calendar.getInstance();
        c1.setTime(date1);
        c2.setTime(date2);
        Long between_days = Long.valueOf((c2.getTimeInMillis() - c1.getTimeInMillis()) / 86400000L);
        return between_days.intValue();
    }

    public static int getDaysDiffWithoutMinSec(Date date1, Date date2) {
        Calendar c1 = Calendar.getInstance();
        Calendar c2 = Calendar.getInstance();
        c1.setTime(date1);
        c2.setTime(date2);
        c1.set(Calendar.HOUR_OF_DAY, 0);
        c1.set(Calendar.MINUTE, 0);
        c1.set(Calendar.SECOND, 0);
        c1.set(Calendar.MILLISECOND, 0);
        c2.set(Calendar.HOUR_OF_DAY, 0);
        c2.set(Calendar.MINUTE, 0);
        c2.set(Calendar.SECOND, 0);
        c2.set(Calendar.MILLISECOND, 0);
        Long between_days = Long.valueOf((c2.getTimeInMillis() - c1.getTimeInMillis()) / 86400000L);
        return Math.abs(between_days.intValue());
    }

    public static long getMilliSecondsDiff(Date date1, Date date2) {
        Calendar c1 = Calendar.getInstance();
        Calendar c2 = Calendar.getInstance();
        c1.setTime(date1);
        c2.setTime(date2);
        Long milliSeconds = c2.getTimeInMillis() - c1.getTimeInMillis();
        return milliSeconds;
    }

    public static Date getNextHourStart(Date date) {
        Calendar calendar = Calendar.getInstance();
        calendar.setTime(date);
        calendar.set(11, calendar.get(11) + 1);
        calendar.set(12, 0);
        calendar.set(13, 0);
        calendar.set(14, 0);
        return calendar.getTime();
    }

    public static Date geLastWeekMonday(Date date) {
        Calendar cal = Calendar.getInstance();
        cal.setTime(getThisWeekMonday(date));
        cal.add(Calendar.DATE, -7);
        return cal.getTime();
    }


    public static Date getThisWeekMonday(Date date) {
        Calendar cal = Calendar.getInstance();
        cal.setTime(date);
        // 获得当前日期是一个星期的第几天
        int dayWeek = cal.get(Calendar.DAY_OF_WEEK);
        if (1 == dayWeek) {
            cal.add(Calendar.DAY_OF_MONTH, -1);
        }
        // 设置一个星期的第一天，按中国的习惯一个星期的第一天是星期一
        cal.setFirstDayOfWeek(Calendar.MONDAY);
        // 获得当前日期是一个星期的第几天
        int day = cal.get(Calendar.DAY_OF_WEEK);
        // 根据日历的规则，给当前日期减去星期几与一个星期第一天的差值
        cal.add(Calendar.DATE, cal.getFirstDayOfWeek() - day);
        return cal.getTime();
    }

    public static Date getThisMonthBegin(Date date){
        Calendar cal_1=Calendar.getInstance();
        cal_1.setTime(date);
        cal_1.add(Calendar.MONTH, 0);
        cal_1.set(Calendar.DAY_OF_MONTH,1);
        return cal_1.getTime();

    }
    public static Date getThisMonthEnd(Date date){
        Calendar cale = Calendar.getInstance();
        cale.setTime(date);
        cale.set(Calendar.DAY_OF_MONTH,cale.getActualMaximum(Calendar.DAY_OF_MONTH));
        return cale.getTime();
    }

    /**
          *
          * 描述:获取下一个月的第一天.
          *
          * @return
          */
        public static Date getPerFirstDayOfMonth(Date date) {
        Calendar calendar = Calendar.getInstance();
        calendar.setTime(date);
        calendar.add(Calendar.MONTH, -1);
        calendar.set(Calendar.DAY_OF_MONTH, calendar.getActualMinimum(Calendar.DAY_OF_MONTH));
        return calendar.getTime();
        }

    /**
      *
      * 描述:获取上个月的最后一天.
      *
      * @return
      */
      public static Date getLastMaxMonthDate(Date date) {
        Calendar calendar = Calendar.getInstance();
        calendar.setTime(date);
        calendar.add(Calendar.MONTH, -1);
        calendar.set(Calendar.DAY_OF_MONTH, calendar.getActualMaximum(Calendar.DAY_OF_MONTH));
        return calendar.getTime();
      }

    private static SimpleDateFormat getDateFormat(String format) {
        return new SimpleDateFormat(format);
    }


    public static final String[] weekDaysEn = {"周日", "周一", "周二", "周三", "周四", "周五", "周六"};

    public static final String[] weekDaysCH = {"周一", "周二", "周三", "周四", "周五", "周六", "周日"};

    public static String getWeekOfDate(Date dt) {

        Calendar cal = Calendar.getInstance();
        cal.setTime(dt);
        int w = cal.get(Calendar.DAY_OF_WEEK) - 1;
        if (w < 0)
            w = 0;
        return weekDaysEn[w];
    }

    public static int getDaysWeekOfDate(Date start, Date end, List<Integer> weekIndex) {
        int result = 0;
        int dayDiff = getDaysDiff(start, end);
        for (int i = 0; i <= dayDiff; i++) {

            Date date = setDate(start, i);
            Calendar cal = Calendar.getInstance();
            cal.setTime(date);
            int w = cal.get(Calendar.DAY_OF_WEEK) - 1;
            if (weekIndex.contains(w)) {
                result++;
            }
        }
        return result;
    }

    public static Date min(Date... dates) {
        List<Date> dateList = new ArrayList<>(dates.length);
        for (Date date : dates) {
            dateList.add(date);
        }
        return min(dateList);
    }

    public static Date min(List<Date> dates) {
        List<Date> toSortList = new ArrayList<>(dates.size());
        toSortList.addAll(dates);
        toSortList.sort(Date::compareTo);
        return toSortList.get(0);
    }

    public static Date max(Date... dates) {
        List<Date> dateList = new ArrayList<>(dates.length);
        for (Date date : dates) {
            dateList.add(date);
        }
        return max(dateList);
    }

    public static Date max(List<Date> dates) {
        List<Date> toSortList = new ArrayList<>(dates.size());
        toSortList.addAll(dates);
        toSortList.sort(Comparator.reverseOrder());
        return toSortList.get(0);
    }

}
