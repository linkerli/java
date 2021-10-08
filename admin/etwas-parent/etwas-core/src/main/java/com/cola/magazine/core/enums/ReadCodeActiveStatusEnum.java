package com.cola.magazine.core.enums;

/**
 * Copyright (C),
 *
 * @author: Cola
 * @date: 2019/10/20 10:18
 * @description: 阅读码状态
 */
public enum ReadCodeActiveStatusEnum {
    /***
     * 阅读码状态:已激活
     */
    ACTIVIE(1,"已激活"),
    /***
     * 阅读码状态:未激活
     */
    UN_ACTIVIE(2,"未激活"),
    ;
    ReadCodeActiveStatusEnum(Integer value, String name){
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

    public static ReadCodeActiveStatusEnum getEnumByValue(Integer value){
        for (ReadCodeActiveStatusEnum enumT: ReadCodeActiveStatusEnum.values()) {
            if(enumT.getValue().equals(value)){
                return enumT;
            }
        }
        return null;
    }
}
