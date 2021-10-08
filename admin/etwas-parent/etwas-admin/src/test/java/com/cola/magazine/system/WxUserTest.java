package com.cola.magazine.system;

import com.baomidou.mybatisplus.mapper.EntityWrapper;
import com.cola.magazine.base.BaseJunit;
import com.cola.magazine.core.enums.WxUserAuthSourceTypeEnum;
import com.cola.magazine.modular.system.model.WxUserAuths;
import com.cola.magazine.modular.system.service.IWxUserAuthsService;
import org.junit.Test;

import javax.annotation.Resource;

/**
 * Copyright (C),
 *
 * @author: Cola
 * @date: 2019/10/22 10:01
 * @description:
 */
public class WxUserTest extends BaseJunit {


    @Resource
    IWxUserAuthsService wxUserAuthsService;

    @Test
    public void test(){
        WxUserAuths wxUserAuths = new WxUserAuths();
        wxUserAuths.setSourceType(WxUserAuthSourceTypeEnum.MINI_PROGRAM_OPENID.getValue());
        wxUserAuths.setIdentifier("111");
        wxUserAuths.setValid(1);
        wxUserAuths =  wxUserAuthsService.selectOne(new EntityWrapper<>(wxUserAuths));
    }
}
