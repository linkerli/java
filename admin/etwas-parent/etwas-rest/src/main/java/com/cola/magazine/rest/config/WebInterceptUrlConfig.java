package com.cola.magazine.rest.config;

import java.util.ArrayList;
import java.util.List;

/**
 * web配置
 *
 * @author cola
 * @date 2019-10-20 15:48
 */
public class WebInterceptUrlConfig {

    //无需登录拦截的URL地址
    public static List<String> RULE_NO_INTERCEPT_LIST = new ArrayList<>();

    static {
        RULE_NO_INTERCEPT_LIST.add("/ws/info");
        RULE_NO_INTERCEPT_LIST.add("/doc.html");
        RULE_NO_INTERCEPT_LIST.add("/doc.html");
        RULE_NO_INTERCEPT_LIST.add("/swagger-resources");
        RULE_NO_INTERCEPT_LIST.add("/v2/api-docs");

        RULE_NO_INTERCEPT_LIST.add("/api/magazine/getMagazineViewDto");
        RULE_NO_INTERCEPT_LIST.add("/api/magazine/getMagazineDetail");
        RULE_NO_INTERCEPT_LIST.add("/wxMpSignature");
        RULE_NO_INTERCEPT_LIST.add("/wx/pay/notify/order");
        RULE_NO_INTERCEPT_LIST.add("/wxMpSignature");
        RULE_NO_INTERCEPT_LIST.add("/checkMpLoginStatus");
        RULE_NO_INTERCEPT_LIST.add("/mpLogin");
        RULE_NO_INTERCEPT_LIST.add("/miniLogin");

    }

}
