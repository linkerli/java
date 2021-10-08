package com.cola.magazine.rest.common.exception;

import com.cola.magazine.core.exception.ServiceExceptionEnum;

/**
 * 所有业务异常的枚举
 *
 * @author cola
 * @date 2016年11月12日 下午5:04:51
 */
public enum BizExceptionEnum implements ServiceExceptionEnum {

    /***
     * 缺少参数
     */
    PARAM_NO_ERROR(400,"接口缺少必要参数"),
    /**
     * token异常
     */
    TOKEN_EXPIRED(700, "token过期"),
    TOKEN_ERROR(700, "token验证失败"),

    /**
     * 签名异常
     */
    SIGN_ERROR(700, "签名验证失败"),

    /**
     * 账户登录
     */
    AUTH_REQUEST_ERROR(600, "账号密码错误"),

    /**
     * 账户登录
     */
    AUTH_REQUEST_NO_USER_ERROR(601, "用户未注册"),

    /***
     * 系统内部异常
     */
    SYSTEM_ERROR(500,"系统内部异常"),


    /***
     * 业务异常
     */
    BIZ_ERROR(1000, "业务异常"),

    /***
     * 统一下单错误
     */
    WX_UNIFIED_PAY_ERROR(1001, "微信支付统一下单接口异常"),

    /***
     * 微信授权缺少个人信息
     */
    WX_AUTH_NO_USER_INFO_ERROR(1002, "微信授权缺少个人信息"),

    ;

    BizExceptionEnum(int code, String message) {
        this.code = code;
        this.message = message;
    }

    private Integer code;

    private String message;

    @Override
    public Integer getCode() {
        return code;
    }

    public void setCode(Integer code) {
        this.code = code;
    }

    @Override
    public String getMessage() {
        return message;
    }

    public void setMessage(String message) {
        this.message = message;
    }
}
