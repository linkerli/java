package com.cola.magazine.rest.modular.pay.dto;

import lombok.Data;

/**
 * Copyright (C),
 *
 * @author: 可乐
 * @date: 2019/04/14 16:09
 * @description:
 */
@Data
public class WxPayOnlineTradeInfoDTO extends PayOnlineTradeInfoDTO {

    String appId;

    String partnerId;

    String prepayId;

    String packageValue ;

    String nonceStr;

    String timeStamp;

    String sign;

    public WxPayOnlineTradeInfoDTO() {
    }

    public WxPayOnlineTradeInfoDTO(String appId, String partnerId, String prepayId, String packageValue, String nonceStr, String timeStamp, String sign) {
        this.appId = appId;
        this.partnerId = partnerId;
        this.prepayId = prepayId;
        this.packageValue = packageValue;
        this.nonceStr = nonceStr;
        this.timeStamp = timeStamp;
        this.sign = sign;
    }

    public WxPayOnlineTradeInfoDTO(String appId, String packageValue, String nonceStr, String timeStamp, String sign) {
        this.appId = appId;
        this.packageValue = packageValue;
        this.nonceStr = nonceStr;
        this.timeStamp = timeStamp;
        this.sign = sign;
    }
}
