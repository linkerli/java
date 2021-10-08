package com.cola.magazine.rest.modular.pay.dto;

import java.io.Serializable;

/**
 *
 * @date: 2019/04/14 16:10
 * @description: 微信支付交易信息
 */
public class WxPayResultDTO implements Serializable {

    private String timeStamp;
    private String nonceStr;
    private String packageStr;
    private String signType;
    private String paySign;

    public WxPayResultDTO() {
    }

    public String getTimeStamp() {
        return timeStamp;
    }

    public void setTimeStamp(String timeStamp) {
        this.timeStamp = timeStamp;
    }

    public String getNonceStr() {
        return nonceStr;
    }

    public void setNonceStr(String nonceStr) {
        this.nonceStr = nonceStr;
    }

    public String getPackageStr() {
        return packageStr;
    }

    public void setPackageStr(String packageStr) {
        this.packageStr = packageStr;
    }

    public String getSignType() {
        return signType;
    }

    public void setSignType(String signType) {
        this.signType = signType;
    }

    public String getPaySign() {
        return paySign;
    }

    public void setPaySign(String paySign) {
        this.paySign = paySign;
    }

    @Override
    public String toString() {
        return "PayOnlineWXTradeInfoDTO{" +
                "timeStamp='" + timeStamp + '\'' +
                ", nonceStr='" + nonceStr + '\'' +
                ", packageStr='" + packageStr + '\'' +
                ", signType='" + signType + '\'' +
                ", paySign='" + paySign + '\'' +
                '}';
    }
}
