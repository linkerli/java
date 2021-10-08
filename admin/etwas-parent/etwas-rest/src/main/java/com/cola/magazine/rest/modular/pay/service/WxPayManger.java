package com.cola.magazine.rest.modular.pay.service;

import com.cola.magazine.rest.modular.pay.dto.PayResultDTO;
import com.cola.magazine.rest.modular.pay.dto.WxAppPayDto;
import com.cola.magazine.rest.modular.pay.dto.WxPayJSAPIDto;
import com.cola.magazine.rest.modular.pay.dto.WxPayResultDTO;
import com.github.binarywang.wxpay.bean.request.WxPayUnifiedOrderRequest;

/**
 * Copyright (C),
 *
 * @author: Cola
 * @date: 2019/10/17 18:32
 * @description:
 */
public interface WxPayManger {

    /***
     * 微信公众号支付统一下单接口
     * @param wxPayJSAPI
     * @return wxPayResultDTO 支付必要参数信息
     */
    WxPayResultDTO unifiedPayOrder(WxPayJSAPIDto wxPayJSAPI);

    /***
     * 微信统一下单 通用接口
     * @param orderRequest
     * @return
     */
    <T> T createWxTradeInfo(WxPayUnifiedOrderRequest orderRequest);


    /***
     * 微信 APP支付
     * @param wxAppPayDto
     * @return
     */
    PayResultDTO createWxAppTradeInfo(WxAppPayDto wxAppPayDto);


    /***
     * 微信 公众号支付
     * @param wxPayJSAPIDto
     * @return
     */
    PayResultDTO createWxJsapiTradeInfo(WxPayJSAPIDto wxPayJSAPIDto);


}
