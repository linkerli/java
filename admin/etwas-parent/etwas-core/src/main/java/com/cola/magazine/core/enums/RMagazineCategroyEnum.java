package com.cola.magazine.core.enums;

/**
 * Copyright (C),
 *
 * @author: Cola
 * @date: 2019/10/20 10:18
 * @description: 杂志分类
 */
public enum RMagazineCategroyEnum {
    /***
     * 杂志分类:热门期刊
     */
    HOT(1,"期刊"),
    /***
     * 杂志分类:专刊
     */
    SPECIAL(2,"特刊"),
    ;
    RMagazineCategroyEnum(Integer value, String name){
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

    public static RMagazineCategroyEnum getEnumByValue(Integer value){
        for (RMagazineCategroyEnum enumT: RMagazineCategroyEnum.values()) {
            if(enumT.getValue().equals(value)){
                return enumT;
            }
        }
        return null;
    }
}
