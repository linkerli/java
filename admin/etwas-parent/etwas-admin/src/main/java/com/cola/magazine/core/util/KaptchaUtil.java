package com.cola.magazine.core.util;


import com.cola.magazine.config.properties.EtwasProperties;

/**
 * 验证码工具类
 */
public class KaptchaUtil {

    /**
     * 获取验证码开关
     */
    public static Boolean getKaptchaOnOff() {
        return SpringContextHolder.getBean(EtwasProperties.class).getKaptchaOpen();
    }
}