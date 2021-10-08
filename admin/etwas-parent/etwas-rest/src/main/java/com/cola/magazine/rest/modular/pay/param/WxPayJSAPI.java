package com.cola.magazine.rest.modular.pay.param;

import java.io.Serializable;
import java.math.BigDecimal;

public class WxPayJSAPI implements Serializable {

    private String orderNum;
    private String orderDesc;
    private BigDecimal orderMoney;
    private String openId;

    @Override
    public String toString() {
        return "WxPayJSAPI{" +
                "orderNum='" + orderNum + '\'' +
                ", orderDesc='" + orderDesc + '\'' +
                ", orderMoney=" + orderMoney +
                ", openId='" + openId + '\'' +
                '}';
    }

    public WxPayJSAPI() {
    }

    public WxPayJSAPI(String orderNum, String orderDesc, BigDecimal orderMoney, String openId) {
        this.orderNum = orderNum;
        this.orderDesc = orderDesc;
        this.orderMoney = orderMoney;
        this.openId = openId;
    }

    public String getOrderNum() {
        return orderNum;
    }

    public void setOrderNum(String orderNum) {
        this.orderNum = orderNum;
    }

    public String getOrderDesc() {
        return orderDesc;
    }

    public void setOrderDesc(String orderDesc) {
        this.orderDesc = orderDesc;
    }

    public BigDecimal getOrderMoney() {
        return orderMoney;
    }

    public void setOrderMoney(BigDecimal orderMoney) {
        this.orderMoney = orderMoney;
    }

    public String getOpenId() {
        return openId;
    }

    public void setOpenId(String openId) {
        this.openId = openId;
    }
}
