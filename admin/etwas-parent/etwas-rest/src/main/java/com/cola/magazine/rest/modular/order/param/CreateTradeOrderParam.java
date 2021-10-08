package com.cola.magazine.rest.modular.order.param;

import io.swagger.annotations.ApiModel;
import io.swagger.annotations.ApiModelProperty;
import lombok.Data;

/**
 * @author: 可乐
 * @date: 2020/06/04 18:35
 * <p>
 * Copyright (C),
 */
@ApiModel("CreateTradeOrderParam创建订单参数")
@Data
public class CreateTradeOrderParam {

    @ApiModelProperty("产品Id")
    private Long productId;

    @ApiModelProperty("个数，默认1个")
    private Integer count=1;

    @ApiModelProperty("1 小程序 2 公众号")
    private Integer sourceType;

    @ApiModelProperty("助力人的id（选择为他们助力的时候才传值）")
    private Long helpUserId;
}
