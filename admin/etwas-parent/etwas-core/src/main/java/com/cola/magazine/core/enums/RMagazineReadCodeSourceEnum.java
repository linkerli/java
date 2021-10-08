package com.cola.magazine.core.enums;

/**
 * Copyright (C),
 *
 * @author: Cola
 * @date: 2019/10/20 10:18
 * @description: 阅读码来源
 */
public enum RMagazineReadCodeSourceEnum {
    /***
     * 阅读码来源:系统生成
     */
    SYSTEM(1,"系统生成"),
    /***
     * 阅读码来源:公众号购买
     */
    PUBLIC_JSPI(2,"公众号购买"),
    /***
     * 阅读码来源:公众号购买
     */
    SMALL_PROGRAM(3,"小程序购买"),
    /***
     * 阅读码来源:抖音购买
     */
    DOUYIN(4,"抖音购买"),
    ;
    RMagazineReadCodeSourceEnum(Integer value, String name){
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

    public static RMagazineReadCodeSourceEnum getEnumByValue(Integer value){
        for (RMagazineReadCodeSourceEnum enumT: RMagazineReadCodeSourceEnum.values()) {
            if(enumT.getValue().equals(value)){
                return enumT;
            }
        }
        return null;
    }
}
