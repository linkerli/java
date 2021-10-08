package com.cola.magazine.rest.modular.order.util;


/**
 * @author: 可乐
 * @date: 2020/06/04 20:27
 * <p>
 * Copyright (C),
 */
public class OrderCodeGenetateUtil {

    /**
     * 订单编号：前端用户可见 按照 业务类型 + 时间戳 + 随机数
     */

    public static String getOrderCode() {
        //业务类型
        StringBuilder stringBuilder = new StringBuilder();
        //时间戳
        stringBuilder.append(System.currentTimeMillis());
        //随机3位
        stringBuilder.append((int)(Math.random() * 1000));

        return stringBuilder.toString();
    }

    /**
     * 订单编号：前端用户可见 按照 业务类型 + 时间戳 + 随机数
     */

    public static String getOrderWithdrawCode() {
        //业务类型
        StringBuilder stringBuilder = new StringBuilder("W");
        //时间戳
        stringBuilder.append(System.currentTimeMillis());
        //随机3位
        stringBuilder.append((int)(Math.random() * 1000));

        return stringBuilder.toString();
    }
}
