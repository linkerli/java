package com.cola.magazine.rest.modular.pay.service.impl;

import com.baomidou.mybatisplus.mapper.EntityWrapper;
import com.cola.magazine.BaseTest;
import com.cola.magazine.core.enums.WxUserAuthSourceTypeEnum;
import com.cola.magazine.modular.system.model.WxUserAuths;
import com.cola.magazine.modular.system.service.IWxUserAuthsService;
import com.cola.magazine.rest.modular.pay.service.WxPayManger;
import org.junit.Test;
import org.springframework.beans.factory.annotation.Autowired;

import javax.annotation.Resource;

public class WxPayMangerImplTest extends BaseTest {

    @Autowired
    WxPayManger wxPayManger;

    @Resource
    IWxUserAuthsService wxUserAuthsService;

    @Test
    public void unifiedPayOrder() {
        //WxPayResultDTO wxPayResultDTO = wxPayManger.createWxJsapiTradeInfo(new WxPayJSAPI("test0001", "测试订单",BigDecimal.ONE,"odT_W5QDVmuKfLSVadlSRlBigR6w"));
    }


    @Test
    public void test(){
        WxUserAuths wxUserAuths = new WxUserAuths();
        wxUserAuths.setSourceType(WxUserAuthSourceTypeEnum.MINI_PROGRAM_OPENID.getValue());
        wxUserAuths.setIdentifier("111");
        wxUserAuths.setValid(1);
        wxUserAuths =  wxUserAuthsService.selectOne(new EntityWrapper<>(wxUserAuths));
    }
}