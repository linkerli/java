package com.cola.magazine.rest.modular.order.service;

import com.baomidou.mybatisplus.mapper.EntityWrapper;
import com.cola.magazine.core.config.properties.WxSmallProgramProperties;
import com.cola.magazine.core.enums.*;
import com.cola.magazine.core.exception.EtwasException;
import com.cola.magazine.core.util.ToolUtil;
import com.cola.magazine.modular.system.model.*;
import com.cola.magazine.modular.system.service.IRMagazineReadCodeService;
import com.cola.magazine.modular.system.service.IRMagazineService;
import com.cola.magazine.modular.system.service.ITradeOrderService;
import com.cola.magazine.modular.system.service.IWxCallbackInfoService;
import com.cola.magazine.rest.common.exception.BizExceptionEnum;
import com.cola.magazine.rest.config.properties.WxMpProperties;
import com.cola.magazine.rest.modular.magazine.service.Magazine2Service;
import com.cola.magazine.rest.modular.order.event.OrderSuccessEvent;
import com.cola.magazine.rest.modular.order.param.CreateTradeOrderParam;
import com.cola.magazine.rest.modular.order.util.OrderCodeGenetateUtil;
import com.cola.magazine.rest.modular.pay.dto.PayResultDTO;
import com.cola.magazine.rest.modular.pay.dto.WxPayJSAPIDto;
import com.cola.magazine.rest.modular.pay.service.WxPayManger;
import com.cola.magazine.rest.modular.wxuser.service.WxUser2Service;
import com.cola.magazine.rest.userinfo.LoginUser;
import com.cola.magazine.rest.userinfo.ThreadUserLocal;
import com.github.binarywang.wxpay.bean.notify.WxPayOrderNotifyResult;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.context.ApplicationEventPublisher;
import org.springframework.dao.DuplicateKeyException;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import javax.annotation.Resource;
import java.math.BigDecimal;
import java.util.ArrayList;
import java.util.Date;
import java.util.List;

/**
 * @author: 可乐
 * @date: 2020/09/23 10:55
 * <p>
 * Copyright (C),
 */
@Transactional
@Service
public class Trade2OrderService {

    private final Logger logger = LoggerFactory.getLogger(this.getClass());


    @Resource
    WxUser2Service wxUser2Service;
    @Resource
    ITradeOrderService tradeOrderService;
    @Resource
    Magazine2Service magazine2Service;
    @Autowired
    WxPayManger wxPayManger;
    @Autowired
    WxSmallProgramProperties wxSmallProgramProperties;
    @Autowired
    WxMpProperties wxMpProperties;
    @Resource
    IWxCallbackInfoService wxCallbackInfoService;
    @Autowired
    ApplicationEventPublisher applicationEventPublisher;
    @Autowired
    IRMagazineReadCodeService magazineReadCodeService;
    @Autowired
    IRMagazineService magazineService;

    /***
     * 创建订单并返回订单支付所需的必要信息
     * @param createTradeOrderParam
     * @return
     */
    public PayResultDTO createTradeOrder(CreateTradeOrderParam createTradeOrderParam) {
        LoginUser loginUser = ThreadUserLocal.getUserLocal();
        //读取产品

        //构建请求支付的对象
        WxPayJSAPIDto jsapiDto = new WxPayJSAPIDto();
        //判断用户来源类别 获取对应的openid
        if(WxUserAuthSourceTypeEnum.MP_OPENID.getValue().equals(createTradeOrderParam.getSourceType())) {
            WxUserAuths wxUserAuths = wxUser2Service.getWxWxUserAuthsByUserType(loginUser.getUserId(),WxUserAuthSourceTypeEnum.MP_OPENID);
            jsapiDto.setOpenId(wxUserAuths.getIdentifier());
            jsapiDto.setSourceTypeEnum(WxUserAuthSourceTypeEnum.MP_OPENID);
        }
        if(WxUserAuthSourceTypeEnum.MINI_PROGRAM_OPENID.getValue().equals(createTradeOrderParam.getSourceType())) {
            WxUserAuths wxUserAuths = wxUser2Service.getWxWxUserAuthsByUserType(loginUser.getUserId(),WxUserAuthSourceTypeEnum.MINI_PROGRAM_OPENID);
            jsapiDto.setOpenId(wxUserAuths.getIdentifier());
            jsapiDto.setSourceTypeEnum(WxUserAuthSourceTypeEnum.MINI_PROGRAM_OPENID);
        }

        //
        RMagazine rMagazine = magazine2Service.getRMagazineFromRedis(createTradeOrderParam.getProductId());
        if(rMagazine == null ) {
            throw new EtwasException(BizExceptionEnum.BIZ_ERROR.getCode(),"电子刊不存在");
        }
        if(RMagazineStatusEnum.UN_PUBLISH.getValue().equals(rMagazine.getStatus()) ) {
            throw new EtwasException(BizExceptionEnum.BIZ_ERROR.getCode(),"电子刊暂未上架，敬请期待");
        }

        TradeOrder tradeOrder= new TradeOrder();
        tradeOrder.setOrderCode(OrderCodeGenetateUtil.getOrderCode());
        tradeOrder.setStatus(TradeOrderStatusEnum.WAITING_PAY.getValue());
        tradeOrder.setSourceId(rMagazine.getId());
        tradeOrder.setSourceNum(rMagazine.getTitle());
        tradeOrder.setOrderName("订阅《"+ rMagazine.getTitle() + "》");
        tradeOrder.setActualMoney(rMagazine.getPrice().multiply(new BigDecimal(createTradeOrderParam.getCount())));
        tradeOrder.setProductCount(createTradeOrderParam.getCount());

        tradeOrder.setUserId(loginUser.getUserId());
        tradeOrder.setUserNickName(loginUser.getUserName());
        tradeOrder.setUserHeadPic(loginUser.getUserHeadPic());

        //默认自己给自己助力
        if(createTradeOrderParam.getHelpUserId() == null) {
            tradeOrder.setOrderExtra(loginUser.getUserId().toString());
        }else {
            tradeOrder.setOrderExtra(createTradeOrderParam.getHelpUserId().toString());
        }

        tradeOrderService.insert(tradeOrder);

        jsapiDto.setOrderNum(tradeOrder.getOrderCode());
        jsapiDto.setOrderDesc(tradeOrder.getOrderName());
        jsapiDto.setOrderMoney(tradeOrder.getActualMoney());
        //请求创建订单
        PayResultDTO payResultDTO = wxPayManger.createWxJsapiTradeInfo(jsapiDto);

        return payResultDTO;
    }

    public void paySuccessTradeOrder(WxPayOrderNotifyResult notifyResult) {
        //保存回调结果
        WxCallbackInfo callbackInfoDO = new WxCallbackInfo();
        callbackInfoDO.setBackData(notifyResult.toString());
        callbackInfoDO.setBackTime(new Date());
        callbackInfoDO.setAppid(notifyResult.getAppid());
        callbackInfoDO.setMuchId(notifyResult.getMchId());
        callbackInfoDO.setNonceStr(notifyResult.getNonceStr());
        callbackInfoDO.setSign(notifyResult.getSign());
        callbackInfoDO.setResultCode(notifyResult.getResultCode());
        callbackInfoDO.setOpenid(notifyResult.getOpenid());
        callbackInfoDO.setIsSubscribe(notifyResult.getIsSubscribe());
        callbackInfoDO.setTradeType(notifyResult.getTradeType());
        callbackInfoDO.setBankType(notifyResult.getBankType());
        callbackInfoDO.setTotalFee(notifyResult.getTotalFee());
        callbackInfoDO.setCashFee(notifyResult.getCashFee());
        callbackInfoDO.setTransactionId(notifyResult.getTransactionId());
        callbackInfoDO.setOutTradeNo(notifyResult.getOutTradeNo());
        callbackInfoDO.setTimeEnd(notifyResult.getTimeEnd());
        callbackInfoDO.setAttach(notifyResult.getAttach());
        callbackInfoDO.setReturnCode(notifyResult.getReturnCode());
        callbackInfoDO.setReturnMsg(notifyResult.getReturnMsg());
        callbackInfoDO.setErrCode(notifyResult.getErrCode());
        callbackInfoDO.setErrCodeDes(notifyResult.getErrCodeDes());
        callbackInfoDO.setDeviceInfo(notifyResult.getDeviceInfo());
        wxCallbackInfoService.insert(callbackInfoDO);

        //微信支付回调，回调通知支付单状态变更
        if (callbackInfoDO.getReturnCode().equalsIgnoreCase("SUCCESS")
                && callbackInfoDO.getResultCode().equalsIgnoreCase("SUCCESS")) {
            BigDecimal payActual = new BigDecimal(callbackInfoDO.getTotalFee()).divide(new BigDecimal("100"));
            OrderSuccessEvent event = new OrderSuccessEvent(callbackInfoDO.getOutTradeNo(),payActual,callbackInfoDO.getBackTime());
            if(wxMpProperties.getAppid().equals(callbackInfoDO.getAppid())) {
                event.setPayChanel(PayWayAndChanelEnum.PayChanel.WECHAT_JSAPI);
            }else if(wxSmallProgramProperties.getAppid().equals(callbackInfoDO.getAppid())) {
                event.setPayChanel(PayWayAndChanelEnum.PayChanel.WECHAT_MINIAPP);
            }else {
                //打印日志记录
            }
            event.setPayWay(PayWayAndChanelEnum.PayWay.ONLINE);
            applicationEventPublisher.publishEvent(event);
        }
    }


    public void orderPaySuccess(String orderNum, BigDecimal actualPayAmount, Date callBackTime, PayWayAndChanelEnum.PayChanel payChanel, PayWayAndChanelEnum.PayWay payWay) {
        TradeOrder tradeOrder = new TradeOrder();
        tradeOrder.setOrderCode(orderNum);
        tradeOrder = tradeOrderService.selectOne(new EntityWrapper<>(tradeOrder));
        if(tradeOrder == null) {
            logger.error("订单丢失,外部交易单号:[{}]", orderNum);
            return;
        }
        if(TradeOrderStatusEnum.PAID.getValue().equals(tradeOrder.getStatus())) {
            logger.error("外部交易号为[{}]的支付单已经支付过，重复通知，不做后续处理...",tradeOrder);
            return;
        }
        //金额校验 区分一下 在外部就需要将微信的转化好金额
        if(tradeOrder.getActualMoney().compareTo(actualPayAmount) != 0) {
            logger.error("外部交易单回调金额与订单金额不一致... 外部信息 ：[{}],订单信息：[{}]",actualPayAmount,tradeOrder);
            return;
        }
        tradeOrder.setPayMoney(actualPayAmount);
        tradeOrder.setStatus(TradeOrderStatusEnum.PAID.getValue());
        tradeOrder.setPaySuccessDate(callBackTime);
        tradeOrder.setChannelType(payChanel.value);
        tradeOrder.setPayType(payWay.value);
        if(!tradeOrderService.updateById(tradeOrder)){
            logger.error("乐观锁生效，没有更新成功 ：订单信息：[{}]",tradeOrder);
            return;
        }

        RMagazine magazine = magazine2Service.getRMagazineFromRedis(tradeOrder.getSourceId());
        if(magazine == null) {
            logger.error("电子刊不存在 ：订单信息：[{}]",tradeOrder);
            return;
        }
        //发放阅读码
        try {
            initRMagazine(magazine,tradeOrder);
        }catch (DuplicateKeyException e){
            logger.error("DuplicateKeyException：{}",e);
            initRMagazine(magazine,tradeOrder);
        }
        //更新
       int count = magazineService.updateRMagazineReadCount(magazine.getId(),tradeOrder.getProductCount());

       logger.info("更新杂志订阅数量：{} 影响行数：{}",magazine,count);

    }

    /***
     *
     * @param magazine
     */
    private void initRMagazine(RMagazine magazine,TradeOrder tradeOrder){
        List<RMagazineReadCode> readCodeList = new ArrayList<>();
        for (int i = 0; i < tradeOrder.getProductCount(); i++) {
            RMagazineReadCode rMagazineReadCode = new RMagazineReadCode();

            rMagazineReadCode.setSourceId(tradeOrder.getId());
            if(PayWayAndChanelEnum.PayChanel.WECHAT_MINIAPP.getValue().equals(tradeOrder.getChannelType())){
                rMagazineReadCode.setSourceType(RMagazineReadCodeSourceEnum.SMALL_PROGRAM.getValue());
            }
            if(PayWayAndChanelEnum.PayChanel.WECHAT_JSAPI.getValue().equals(tradeOrder.getChannelType())){
                rMagazineReadCode.setSourceType(RMagazineReadCodeSourceEnum.PUBLIC_JSPI.getValue());
            }
            rMagazineReadCode.setStatus(ReadCodeActiveStatusEnum.UN_ACTIVIE.getValue());
            rMagazineReadCode.setMagTitle(magazine.getTitle());
            rMagazineReadCode.setMagId(magazine.getId());
            rMagazineReadCode.setBuyUserId(tradeOrder.getUserId());
            rMagazineReadCode.setBuyUserName(tradeOrder.getUserNickName());
            rMagazineReadCode.setBuyUserPic(tradeOrder.getUserHeadPic());

            //助力人id
            rMagazineReadCode.setHelpUserId(Long.parseLong(tradeOrder.getOrderExtra()));

            //阅读码 假如真的出现了 重复 怎么处理
            rMagazineReadCode.setReadCode(ToolUtil.getRandomString(magazine.getId().toString()));

            rMagazineReadCode.setCreateDate(new Date());
            rMagazineReadCode.setValid(1);
            readCodeList.add(rMagazineReadCode);
        }
        magazineReadCodeService.insertBatch(readCodeList);
    }

}
