package com.cola.magazine.core.enums;

/**
 * Copyright (C),
 *
 * @author: Cola
 * @date: 2019/10/20 10:18
 * @description: 类型
 */
public enum RMagazinePersonEnum {
    /***
     * 类型:个人
     */
    ONE(1,"个人"),
    /***
     * 类型:团体
     */
    GROUP(2,"团体"),
    ;
    RMagazinePersonEnum(Integer value, String name){
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

    public static RMagazinePersonEnum getEnumByValue(Integer value){
        for (RMagazinePersonEnum enumT: RMagazinePersonEnum.values()) {
            if(enumT.getValue().equals(value)){
                return enumT;
            }
        }
        return null;
    }
}
