package com.cola.magazine.core.enums;

/**
 * Copyright (C),
 *
 * @author: Cola
 * @date: 2019/10/20 10:18
 * @description: 杂志发布状态
 */
public enum RMagazineStatusEnum {
    /***
     * 杂志发布状态:未发布
     */
    UN_PUBLISH(1,"未发布"),
    /***
     * 杂志发布状态:未发布
     */
    PUBLISH(2,"已上架"),
    ;
    RMagazineStatusEnum(Integer value, String name){
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

    public static RMagazineStatusEnum getEnumByValue(Integer value){
        for (RMagazineStatusEnum enumT: RMagazineStatusEnum.values()) {
            if(enumT.getValue().equals(value)){
                return enumT;
            }
        }
        return null;
    }
}
