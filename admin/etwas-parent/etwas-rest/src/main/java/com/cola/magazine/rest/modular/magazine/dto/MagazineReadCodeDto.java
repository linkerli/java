package com.cola.magazine.rest.modular.magazine.dto;

import io.swagger.annotations.ApiModel;
import io.swagger.annotations.ApiModelProperty;
import lombok.Data;

/**
 * @author: 可乐
 * @date: 2020/09/23 17:21
 * <p>
 * Copyright (C),
 */
@Data
@ApiModel("MagazineReadCodeDto：阅读码列表")
public class MagazineReadCodeDto {

    @ApiModelProperty("阅读码")
    private String readCode;

    @ApiModelProperty("阅读码状态（2：未激活 1已激活）")
    private Integer status;

    @ApiModelProperty("使用人的头像")
    private String usedUserHeadPic;
}
