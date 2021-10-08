package com.cola.magazine.core.enums;

/**
 * Copyright (C),
 *
 * @author: Cola
 * @date: 2019/10/20 10:18
 * @description:
 */
public enum TradeOrderStatusEnum {
    /***
     * 用户性别
     */
    WAITING_PAY(1,"待支付"),
    /***
     * 用户性别
     */
    PAID(2,"已支付"),
    /***
     *
     */
    CLOSED(3,"已关闭"),
    ;
    TradeOrderStatusEnum(Integer value, String name){
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

    public static TradeOrderStatusEnum getEnumByValue(Integer value){
        for (TradeOrderStatusEnum enumT: TradeOrderStatusEnum.values()) {
            if(enumT.getValue().equals(value)){
                return enumT;
            }
        }
        return null;
    }
}
