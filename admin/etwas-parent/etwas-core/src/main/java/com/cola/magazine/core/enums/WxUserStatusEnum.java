package com.cola.magazine.core.enums;

/**
 * Copyright (C),
 *
 * @author: Cola
 * @date: 2019/10/20 10:18
 * @description:
 */
public enum WxUserStatusEnum {
    /***
     * 用户状态
     */
    NORMAL(1,"正常"),
    /***
     * 用户状态
     */
    FORBIDDEN(2,"禁用"),
    ;
    WxUserStatusEnum(Integer value, String name){
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

    public static WxUserStatusEnum getEnumByValue(Integer value){
        for (WxUserStatusEnum enumT: WxUserStatusEnum.values()) {
            if(enumT.getValue().equals(value)){
                return enumT;
            }
        }
        return null;
    }
}
