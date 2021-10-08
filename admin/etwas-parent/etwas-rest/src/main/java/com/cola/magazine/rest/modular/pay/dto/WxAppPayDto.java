package com.cola.magazine.rest.modular.pay.dto;

import lombok.Data;

import java.io.Serializable;
import java.math.BigDecimal;

@Data
public class WxAppPayDto implements Serializable {

    private String orderId;
    private String orderDesc;
    private BigDecimal orderMoney;
    private String openId;

    public WxAppPayDto(String orderId, String orderDesc, BigDecimal orderMoney, String openId) {
        this.orderId = orderId;
        this.orderDesc = orderDesc;
        this.orderMoney = orderMoney;
        this.openId = openId;
    }

    public WxAppPayDto() {
    }
}
