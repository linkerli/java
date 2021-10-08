package com.cola.magazine.rest.modular.magazine.dto;

import io.swagger.annotations.ApiModel;
import io.swagger.annotations.ApiModelProperty;
import lombok.Data;

import java.math.BigDecimal;

/**
 * @author: 可乐
 * @date: 2020/09/23 17:21
 * <p>
 * Copyright (C),
 */
@Data
@ApiModel("MagazineDto：杂志信息")
public class MagazineDto {

    @ApiModelProperty("主键")
    private Long magId;

    @ApiModelProperty("杂志名称")
    private String title;

    @ApiModelProperty("年份")
    private String year;

    @ApiModelProperty("月份")
    private String month;

    @ApiModelProperty("出版号")
    private String issue;

    @ApiModelProperty("封面")
    private String itemCover;

    @ApiModelProperty("预览图")
    private String itemPreviewPic;

    @ApiModelProperty("订阅数量（包含单位）")
    private String readCount;

    @ApiModelProperty("介绍")
    private String itemDesc;

    @ApiModelProperty("单价")
    private BigDecimal price;

    @ApiModelProperty("小程序二维码")
    private String preSmallCode;

    @ApiModelProperty("是否已订阅")
    private Boolean showBuyBtnOrNot;

    @ApiModelProperty("是否展示排行榜")
    private Boolean showRankOrNot;

    @ApiModelProperty("排行榜背景图")
    private String rankIntroPic;

    @ApiModelProperty("个人中心暂时订阅本书专用")
    private String userReadCodeCount;

}
