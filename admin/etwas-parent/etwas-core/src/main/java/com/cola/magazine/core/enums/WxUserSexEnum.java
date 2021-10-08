package com.cola.magazine.core.enums;

/**
 * Copyright (C),
 *
 * @author: Cola
 * @date: 2019/10/20 10:18
 * @description:
 */
public enum WxUserSexEnum {
    /***
     * 用户性别
     */
    MAN(1,"男"),
    /***
     * 用户性别
     */
    FEMAN(2,"女"),
    /***
     *
     */
    UN_KNOW(0,"未知"),
    ;
    WxUserSexEnum(Integer value, String name){
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

    public static WxUserSexEnum getEnumByValue(Integer value){
        for (WxUserSexEnum enumT: WxUserSexEnum.values()) {
            if(enumT.getValue().equals(value)){
                return enumT;
            }
        }
        return null;
    }
}
