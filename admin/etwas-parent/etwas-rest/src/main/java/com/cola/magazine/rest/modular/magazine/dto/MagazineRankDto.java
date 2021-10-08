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
@ApiModel("MagazineRankDto：订阅排行榜")
public class MagazineRankDto {

    @ApiModelProperty("用户id")
    private Long userId;

    @ApiModelProperty("用户名称")
    private String userName;

    @ApiModelProperty("用户头像")
    private String userHeadPic;

    @ApiModelProperty("助力总数")
    private Integer helpReadCount;
}
