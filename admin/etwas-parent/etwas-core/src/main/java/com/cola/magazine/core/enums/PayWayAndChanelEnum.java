package com.cola.magazine.core.enums;

/**
 * Copyright (C),
 *
 * @author: 可乐
 * @date: 2019/04/13 21:35
 * @description:
 */
public class PayWayAndChanelEnum {

    /**
     * 支付方式
     */
    public enum PayWay {
        BALANCE("余额", 1),
        ONLINE("在线支付", 2),
        iOS_IAP("苹果IAP",3),
        VIRTUAL_CURRENCY("虚拟币",4),
        ;
        public String name;
        public Integer value;

        PayWay(String name, int value) {
            this.name = name;
            this.value = value;
        }

        public String getName() {
            return name;
        }

        public void setName(String name) {
            this.name = name;
        }

        public Integer getValue() {
            return value;
        }

        public void setValue(Integer value) {
            this.value = value;
        }

        public static PayWay getEnumByValue(Integer value) {
            for (PayWay enumT : PayWay.values()) {
                if (enumT.getValue().equals(value)) {
                    return enumT;
                }
            }
            return null;
        }
    }

    /**
     * 支付渠道
     */
    public enum PayChanel {
        WECHAT_MINIAPP("微信小程序", 1, PayWay.ONLINE),
        WECHAT_JSAPI("微信网页", 2, PayWay.ONLINE),
        WECHAT_APP("微信APP",3, PayWay.ONLINE),
        ALIPAY_APP("支付宝APP",4, PayWay.ONLINE),
        WU_MENG_BI_PAY("舞盟币",5, PayWay.VIRTUAL_CURRENCY),
        BALANCE_APP("余额",6, PayWay.BALANCE),
        ;
        public String name;
        public Integer value;
        public PayWay payWay;

        PayChanel(String name, int value, PayWay payWay) {
            this.name = name;
            this.value = value;
            this.payWay = payWay;
        }

        public String getName() {
            return name;
        }

        public void setName(String name) {
            this.name = name;
        }

        public Integer getValue() {
            return value;
        }

        public void setValue(Integer value) {
            this.value = value;
        }

        public PayWay getPayWay() {
            return payWay;
        }

        public void setPayWay(PayWay payWay) {
            this.payWay = payWay;
        }

        public static PayChanel getEnumByValue(Integer value) {
            for (PayChanel enumT : PayChanel.values()) {
                if (enumT.getValue().equals(value)) {
                    return enumT;
                }
            }
            return null;
        }
    }

}
