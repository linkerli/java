package com.cola.magazine.rest.modular.pay.dto;

import lombok.Data;

import java.math.BigDecimal;

/**
 * Copyright (C),
 *
 * @author: 可乐
 * @date: 2020/03/04 11:50
 * @description:
 */
@Data
public class PayResultDTO {

    private String outTradeNo;

    private BigDecimal actualPayAmount;

    /**
     * 基类 具体返回的支付还是微信app jsapi等在次类基础上继承即可
     */
    private PayOnlineTradeInfoDTO onlineTradeInfo;

    public PayResultDTO() {
    }

    public PayResultDTO(String outTradeNo, BigDecimal actualPayAmount, PayOnlineTradeInfoDTO onlineTradeInfo) {
        this.outTradeNo = outTradeNo;
        this.actualPayAmount = actualPayAmount;
        this.onlineTradeInfo = onlineTradeInfo;
    }
}
