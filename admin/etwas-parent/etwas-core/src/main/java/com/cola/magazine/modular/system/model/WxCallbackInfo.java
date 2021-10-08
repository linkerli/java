package com.cola.magazine.modular.system.model;

import com.baomidou.mybatisplus.activerecord.Model;
import com.baomidou.mybatisplus.annotations.TableField;
import com.baomidou.mybatisplus.annotations.TableId;
import com.baomidou.mybatisplus.annotations.TableName;
import com.baomidou.mybatisplus.enums.IdType;

import java.io.Serializable;
import java.util.Date;

/**
 * <p>
 * 微信支付回调信息表
 * </p>
 *
 * @author cola
 * @since 2020-09-23
 */
@TableName("wx_callback_info")
public class WxCallbackInfo extends Model<WxCallbackInfo> {

    private static final long serialVersionUID = 1L;

    /**
     * 主键
     */
    @TableId(value = "id", type = IdType.AUTO)
    private Long id;
    /**
     * 原始回调结果
     */
    @TableField("back_data")
    private String backData;
    /**
     * 支付成功时间
     */
    @TableField("back_time")
    private Date backTime;
    /**
     * 小程序ID
     */
    private String appid;
    /**
     * 商户号
     */
    @TableField("much_id")
    private String muchId;
    /**
     * 随机字符串
     */
    @TableField("nonce_str")
    private String nonceStr;
    /**
     * 签名
     */
    private String sign;
    /**
     * 业务结果
     */
    @TableField("result_code")
    private String resultCode;
    /**
     * 用户标识
     */
    private String openid;
    /**
     * 是否关注公众账号
     */
    @TableField("is_subscribe")
    private String isSubscribe;
    /**
     * 交易类型
     */
    @TableField("trade_type")
    private String tradeType;
    /**
     * 付款银行
     */
    @TableField("bank_type")
    private String bankType;
    /**
     * 订单金额
     */
    @TableField("total_fee")
    private Integer totalFee;
    /**
     * 现金支付金额
     */
    @TableField("cash_fee")
    private Integer cashFee;
    /**
     * 微信支付订单号
     */
    @TableField("transaction_id")
    private String transactionId;
    /**
     * 商户订单号
     */
    @TableField("out_trade_no")
    private String outTradeNo;
    /**
     * 支付完成时间
     */
    @TableField("time_end")
    private String timeEnd;
    /**
     * 商家数据包
     */
    private String attach;
    /**
     * 返回状态码
     */
    @TableField("return_code")
    private String returnCode;
    /**
     * 返回信息
     */
    @TableField("return_msg")
    private String returnMsg;
    /**
     * 错误代码
     */
    @TableField("err_code")
    private String errCode;
    /**
     * 错误代码描述
     */
    @TableField("err_code_des")
    private String errCodeDes;
    /**
     * 设备号
     */
    @TableField("device_info")
    private String deviceInfo;


    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public String getBackData() {
        return backData;
    }

    public void setBackData(String backData) {
        this.backData = backData;
    }

    public Date getBackTime() {
        return backTime;
    }

    public void setBackTime(Date backTime) {
        this.backTime = backTime;
    }

    public String getAppid() {
        return appid;
    }

    public void setAppid(String appid) {
        this.appid = appid;
    }

    public String getMuchId() {
        return muchId;
    }

    public void setMuchId(String muchId) {
        this.muchId = muchId;
    }

    public String getNonceStr() {
        return nonceStr;
    }

    public void setNonceStr(String nonceStr) {
        this.nonceStr = nonceStr;
    }

    public String getSign() {
        return sign;
    }

    public void setSign(String sign) {
        this.sign = sign;
    }

    public String getResultCode() {
        return resultCode;
    }

    public void setResultCode(String resultCode) {
        this.resultCode = resultCode;
    }

    public String getOpenid() {
        return openid;
    }

    public void setOpenid(String openid) {
        this.openid = openid;
    }

    public String getIsSubscribe() {
        return isSubscribe;
    }

    public void setIsSubscribe(String isSubscribe) {
        this.isSubscribe = isSubscribe;
    }

    public String getTradeType() {
        return tradeType;
    }

    public void setTradeType(String tradeType) {
        this.tradeType = tradeType;
    }

    public String getBankType() {
        return bankType;
    }

    public void setBankType(String bankType) {
        this.bankType = bankType;
    }

    public Integer getTotalFee() {
        return totalFee;
    }

    public void setTotalFee(Integer totalFee) {
        this.totalFee = totalFee;
    }

    public Integer getCashFee() {
        return cashFee;
    }

    public void setCashFee(Integer cashFee) {
        this.cashFee = cashFee;
    }

    public String getTransactionId() {
        return transactionId;
    }

    public void setTransactionId(String transactionId) {
        this.transactionId = transactionId;
    }

    public String getOutTradeNo() {
        return outTradeNo;
    }

    public void setOutTradeNo(String outTradeNo) {
        this.outTradeNo = outTradeNo;
    }

    public String getTimeEnd() {
        return timeEnd;
    }

    public void setTimeEnd(String timeEnd) {
        this.timeEnd = timeEnd;
    }

    public String getAttach() {
        return attach;
    }

    public void setAttach(String attach) {
        this.attach = attach;
    }

    public String getReturnCode() {
        return returnCode;
    }

    public void setReturnCode(String returnCode) {
        this.returnCode = returnCode;
    }

    public String getReturnMsg() {
        return returnMsg;
    }

    public void setReturnMsg(String returnMsg) {
        this.returnMsg = returnMsg;
    }

    public String getErrCode() {
        return errCode;
    }

    public void setErrCode(String errCode) {
        this.errCode = errCode;
    }

    public String getErrCodeDes() {
        return errCodeDes;
    }

    public void setErrCodeDes(String errCodeDes) {
        this.errCodeDes = errCodeDes;
    }

    public String getDeviceInfo() {
        return deviceInfo;
    }

    public void setDeviceInfo(String deviceInfo) {
        this.deviceInfo = deviceInfo;
    }

    @Override
    protected Serializable pkVal() {
        return this.id;
    }

    @Override
    public String toString() {
        return "WxCallbackInfo{" +
        "id=" + id +
        ", backData=" + backData +
        ", backTime=" + backTime +
        ", appid=" + appid +
        ", muchId=" + muchId +
        ", nonceStr=" + nonceStr +
        ", sign=" + sign +
        ", resultCode=" + resultCode +
        ", openid=" + openid +
        ", isSubscribe=" + isSubscribe +
        ", tradeType=" + tradeType +
        ", bankType=" + bankType +
        ", totalFee=" + totalFee +
        ", cashFee=" + cashFee +
        ", transactionId=" + transactionId +
        ", outTradeNo=" + outTradeNo +
        ", timeEnd=" + timeEnd +
        ", attach=" + attach +
        ", returnCode=" + returnCode +
        ", returnMsg=" + returnMsg +
        ", errCode=" + errCode +
        ", errCodeDes=" + errCodeDes +
        ", deviceInfo=" + deviceInfo +
        "}";
    }
}
