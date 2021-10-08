package com.cola.magazine.core.enums;

/**
 * Copyright (C),
 *
 * @author: Cola
 * @date: 2019/10/20 10:18
 * @description:
 */
public enum WxUserAuthSourceTypeEnum {
    /***
     * 用户授权来源:小程序OPENID
     */
    MINI_PROGRAM_OPENID(1,"小程序OPENID"),
    /***
     * 用户授权类型:公众号OPENID
     */
    MP_OPENID(2,"公众号OPENID"),
    ;
    WxUserAuthSourceTypeEnum(Integer value, String name){
        this.name = name;
        this.value = value;
    }
    private Integer value;
    private String name;

    public Integer getValue() {
        return value;
    }

    public void setValue(Integer value) {
        this.value = value;
    }

    public String getName() {
        return name;
    }

    public void setName(String name) {
        this.name = name;
    }

    public static WxUserAuthSourceTypeEnum getEnumByValue(Integer value){
        for (WxUserAuthSourceTypeEnum enumT: WxUserAuthSourceTypeEnum.values()) {
            if(enumT.getValue().equals(value)){
                return enumT;
            }
        }
        return null;
    }
}
