package com.cola.magazine.rest.config;

import cn.binarywang.wx.miniapp.api.WxMaService;
import cn.binarywang.wx.miniapp.bean.WxMaJscode2SessionResult;
import cn.binarywang.wx.miniapp.bean.WxMaUserInfo;
import com.cola.magazine.BaseTest;
import org.junit.Test;

import javax.annotation.Resource;

/**
 * Copyright (C),
 *
 * @author: Cola
 * @date: 2019/10/18 16:38
 * @description:
 */
public class WxMaConfigurationTest extends BaseTest {

    @Resource(name = "wxMaServiceSmallProgram")
    WxMaService wxMaServiceSmallProgram;

    @Resource(name = "wxMaServiceSubscription")
    WxMaService wxMaServiceSubscription;


    @Test
    public void wxMaServiceSmallProgram()throws Exception {
        WxMaJscode2SessionResult sessionResult = wxMaServiceSmallProgram.getUserService().
                getSessionInfo("081QLo8n00RMMl19649n0eAz8n0QLo8o");

        WxMaUserInfo wxMaUserInfo = wxMaServiceSmallProgram.getUserService().
                getUserInfo(sessionResult.getSessionKey(),
                        "YPZIAuit3A7vS0IYAnhyXwgKX+EAUgHd4x0thHs4PX7TEayG4f6jpn/9cnwCpJcpsotAGE9dGAWsINHh2//8uOyhRfANw8IdEcAmzA1iLKMfa44z1+UHpCCwpccVRgRyrDeKG5d9G6e9m9PlpWaarufheBBMJ7HZRAOeksmstMjC6yKBH49z1AQ+5jxAUIF3FpEz4NQ4TMfV+Xnl8qugkmNzlrvt615UgtzCsHPbPJl/tK5yPqCX05X+WAIUDmJHGbYTs+jEr8u1c7QVYgqLCHrdenVCMZF1DSmdMcaBy0KpiWlF7b/YBWUitHk+fccVQoBH2AlQGqmt497VcZ8ZwauC3sB2B+kMCUdyobbGYRuC5cTcD/+0cLxQImMW5IXOy7dYxcC+6pL/srzLifdBOBil4Djb+/Pp1eShRWHpQpPk8DNc+FMD7xtio80IDEs66sXGEj62Brq66NCUvAObcTX5lrIgNarJR9OoeRi6siZ2Cv1kL1vEv+okchQLM6Egqzf6X7+BgkbWVy9LdzOrYA==",
                        "wUBPez9TnjyNyXd4r3pOUg==");

        //验证成功：只要使用默认的小程序初始化页面即可验证。
    }

    @Test
    public void wxMaServiceSubscription() {
    }
}