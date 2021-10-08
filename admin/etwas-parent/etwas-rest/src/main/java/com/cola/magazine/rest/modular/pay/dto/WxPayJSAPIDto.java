package com.cola.magazine.rest.modular.pay.dto;

import com.cola.magazine.core.enums.WxUserAuthSourceTypeEnum;

import java.io.Serializable;
import java.math.BigDecimal;

public class WxPayJSAPIDto implements Serializable {

    private String orderNum;
    private String orderDesc;
    private BigDecimal orderMoney;
    private String openId;

    private WxUserAuthSourceTypeEnum sourceTypeEnum;

    public WxPayJSAPIDto() {
    }


    public WxPayJSAPIDto(String orderNum, String orderDesc, BigDecimal orderMoney, String openId) {
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

    public WxUserAuthSourceTypeEnum getSourceTypeEnum() {
        return sourceTypeEnum;
    }

    public void setSourceTypeEnum(WxUserAuthSourceTypeEnum sourceTypeEnum) {
        this.sourceTypeEnum = sourceTypeEnum;
    }

    @Override
    public String toString() {
        final StringBuilder sb = new StringBuilder("WxPayJSAPIDto{");
        sb.append("orderNum='").append(orderNum).append('\'');
        sb.append(", orderDesc='").append(orderDesc).append('\'');
        sb.append(", orderMoney=").append(orderMoney);
        sb.append(", openId='").append(openId).append('\'');
        sb.append(", sourceTypeEnum=").append(sourceTypeEnum);
        sb.append('}');
        return sb.toString();
    }
}
