package com.cola.magazine.rest.modular.magazine.dto;

import io.swagger.annotations.ApiModel;
import io.swagger.annotations.ApiModelProperty;
import lombok.Data;

import java.util.List;

/**
 * @author: 可乐
 * @date: 2020/09/23 17:21
 * <p>
 * Copyright (C),
 */
@Data
@ApiModel("MagazineViewDto：杂志总览信息")
public class MagazineViewDto {

    @ApiModelProperty("关键字")
    private String titleDoc;

    @ApiModelProperty("置顶的杂志")
    private MagazineDto recMagazineDto;

    @ApiModelProperty("热门期刊列表")
    private List<MagazineDto> magazineDtoList;
}
