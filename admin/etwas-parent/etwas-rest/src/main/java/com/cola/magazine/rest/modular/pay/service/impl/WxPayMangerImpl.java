package com.cola.magazine.rest.modular.pay.service.impl;

import com.cola.magazine.core.config.properties.WxSmallProgramProperties;
import com.cola.magazine.core.enums.WxUserAuthSourceTypeEnum;
import com.cola.magazine.core.exception.EtwasException;
import com.cola.magazine.core.util.IPHelper;
import com.cola.magazine.rest.common.exception.BizExceptionEnum;
import com.cola.magazine.rest.config.properties.WxMpProperties;
import com.cola.magazine.rest.modular.pay.dto.*;
import com.cola.magazine.rest.modular.pay.service.WxPayManger;
import com.github.binarywang.wxpay.bean.order.WxPayAppOrderResult;
import com.github.binarywang.wxpay.bean.order.WxPayMpOrderResult;
import com.github.binarywang.wxpay.bean.request.WxPayUnifiedOrderRequest;
import com.github.binarywang.wxpay.bean.result.WxPayUnifiedOrderResult;
import com.github.binarywang.wxpay.constant.WxPayConstants;
import com.github.binarywang.wxpay.exception.WxPayException;
import com.github.binarywang.wxpay.service.WxPayService;
import com.github.binarywang.wxpay.util.SignUtils;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.math.BigDecimal;
import java.util.HashMap;
import java.util.Map;
import java.util.UUID;

/**
 * Copyright (C),
 *
 * @author: Cola
 * @date: 2019/10/17 18:33
 * @description:
 */
@Service
public class WxPayMangerImpl implements WxPayManger {

    private static final Logger logger = LoggerFactory.getLogger(WxPayService.class);

    @Autowired
    WxPayService wxPayService;
    @Autowired
    WxSmallProgramProperties wxSmallProgramProperties;

    @Autowired
    WxMpProperties wxMpProperties;

    @Override
    public WxPayResultDTO unifiedPayOrder(WxPayJSAPIDto wxPayJSAPI) {

        WxPayUnifiedOrderRequest wxPayUnifiedOrderRequest = new WxPayUnifiedOrderRequest();
        wxPayUnifiedOrderRequest.setAppid(wxPayService.getConfig().getAppId());
        wxPayUnifiedOrderRequest.setOpenid(wxPayJSAPI.getOpenId());
        wxPayUnifiedOrderRequest.setBody("ceshi");
//        wxPayUnifiedOrderRequest.setBody(wxPayJSAPI.getOrderDesc());
        wxPayUnifiedOrderRequest.setOutTradeNo(wxPayJSAPI.getOrderNum());
        wxPayUnifiedOrderRequest.setTotalFee(wxPayJSAPI.getOrderMoney().multiply(new BigDecimal(100)).intValue());
        wxPayUnifiedOrderRequest.setSpbillCreateIp("10.128.5.9");
        wxPayUnifiedOrderRequest.setNotifyUrl(wxPayService.getConfig().getNotifyUrl());
        wxPayUnifiedOrderRequest.setTradeType("JSAPI");
        wxPayUnifiedOrderRequest.setSignType("MD5");

        WxPayUnifiedOrderResult requestResult = null;
        try {
            requestResult = wxPayService.unifiedOrder(wxPayUnifiedOrderRequest);
        } catch (WxPayException e) {
            logger.error("发起微信支付请求异常，原始请求内容:",wxPayUnifiedOrderRequest.toXML());
            logger.error("发起微信支付请求异常，返回状态码:[{}],返回信息:[{}],错误代码:[{}],错误描述:[{}]",e.getReturnCode(),e.getReturnMsg(),e.getErrCode(),e.getErrCodeDes());
            logger.error("发起微信支付请求异常，异常:",e);
            throw new EtwasException(BizExceptionEnum.WX_UNIFIED_PAY_ERROR);
        }

        WxPayResultDTO wxPayResultDTO = new WxPayResultDTO();
        wxPayResultDTO.setNonceStr(UUID.randomUUID().toString().replaceAll("-", ""));
        wxPayResultDTO.setPackageStr("prepay_id="+requestResult.getPrepayId());
        wxPayResultDTO.setTimeStamp(String.valueOf(System.currentTimeMillis()/1000));
        wxPayResultDTO.setSignType("MD5");
        //二次签名
        Map<String,String> params = new HashMap<>();
        params.put("timeStamp",wxPayResultDTO.getTimeStamp());
        params.put("nonceStr",wxPayResultDTO.getNonceStr());
        params.put("package",wxPayResultDTO.getPackageStr());
        params.put("signType",wxPayResultDTO.getSignType());
        params.put("appId",wxPayUnifiedOrderRequest.getAppid());

        String paySign = SignUtils.createSign(params,"MD5",wxPayService.getConfig().getMchKey(),null);
        wxPayResultDTO.setPaySign(paySign);

        return wxPayResultDTO;
    }

    @Override
    public <T> T createWxTradeInfo(WxPayUnifiedOrderRequest orderRequest) {
        try {
            return wxPayService.createOrder(orderRequest);
        }catch (WxPayException e){
            logger.error("微信发起统一下单接口失败，失败原因：{}",e);
            throw new EtwasException(BizExceptionEnum.BIZ_ERROR.getCode(),"微信支付发起失败");
        }
    }



    @Override
    public PayResultDTO createWxAppTradeInfo(WxAppPayDto wxAppPayDto) {

        WxPayUnifiedOrderRequest orderRequest = new WxPayUnifiedOrderRequest();
        //动态设置appid 微信支付 ： 此处使用的是app第三方支付
        //wxPayService.getConfig().setAppId(zowmAppWxOpService.getWxOpenConfigStorage().getComponentAppId());
        orderRequest.setBody(wxAppPayDto.getOrderDesc());
        orderRequest.setOutTradeNo(wxAppPayDto.getOrderId());
        orderRequest.setTotalFee(wxAppPayDto.getOrderMoney().multiply(new BigDecimal("100")).intValue());
        orderRequest.setSpbillCreateIp(IPHelper.getIpAddr());
        orderRequest.setNotifyUrl(wxPayService.getConfig().getNotifyUrl());
        orderRequest.setTradeType(WxPayConstants.TradeType.APP);
        orderRequest.setOpenid(wxAppPayDto.getOpenId());
        WxPayAppOrderResult wxAppPayResultDTO = this.createWxTradeInfo(orderRequest);

        WxPayOnlineTradeInfoDTO wxPayOnlineTradeInfoDTO = new WxPayOnlineTradeInfoDTO(wxAppPayResultDTO.getAppId(),wxAppPayResultDTO.getPartnerId(),
                wxAppPayResultDTO.getPrepayId(),wxAppPayResultDTO.getPackageValue(),
                wxAppPayResultDTO.getNonceStr(),wxAppPayResultDTO.getTimeStamp(),wxAppPayResultDTO.getSign());

        return new PayResultDTO(wxAppPayDto.getOrderId(),wxAppPayDto.getOrderMoney(),wxPayOnlineTradeInfoDTO);
    }

    @Override
    public PayResultDTO createWxJsapiTradeInfo(WxPayJSAPIDto wxPayJSAPIDto) {

        WxPayUnifiedOrderRequest orderRequest = new WxPayUnifiedOrderRequest();
        //动态设置appid
        if (WxUserAuthSourceTypeEnum.MINI_PROGRAM_OPENID.equals(wxPayJSAPIDto.getSourceTypeEnum())) {
            wxPayService.getConfig().setAppId(wxSmallProgramProperties.getAppid());
        }
        if (WxUserAuthSourceTypeEnum.MP_OPENID.equals(wxPayJSAPIDto.getSourceTypeEnum())) {
            wxPayService.getConfig().setAppId(wxMpProperties.getAppid());
        }
        orderRequest.setBody(wxPayJSAPIDto.getOrderDesc());
        orderRequest.setOutTradeNo(wxPayJSAPIDto.getOrderNum());
        orderRequest.setTotalFee(wxPayJSAPIDto.getOrderMoney().multiply(new BigDecimal("100")).intValue());
        orderRequest.setSpbillCreateIp(IPHelper.getIpAddr());
        orderRequest.setNotifyUrl(wxPayService.getConfig().getNotifyUrl());
        orderRequest.setTradeType(WxPayConstants.TradeType.JSAPI);
        orderRequest.setOpenid(wxPayJSAPIDto.getOpenId());
        WxPayMpOrderResult wxAppPayResultDTO = this.createWxTradeInfo(orderRequest);

        WxPayOnlineTradeInfoDTO wxPayOnlineTradeInfoDTO = new WxPayOnlineTradeInfoDTO(wxAppPayResultDTO.getAppId(),
                wxAppPayResultDTO.getPackageValue(),wxAppPayResultDTO.getNonceStr(),wxAppPayResultDTO.getTimeStamp(),wxAppPayResultDTO.getPaySign());

        return new PayResultDTO(wxPayJSAPIDto.getOrderNum(),wxPayJSAPIDto.getOrderMoney(),wxPayOnlineTradeInfoDTO);

    }

}
