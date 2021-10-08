package com.cola.magazine.rest.modular.magazine.param;

import io.swagger.annotations.ApiModel;
import io.swagger.annotations.ApiModelProperty;
import lombok.Data;

@ApiModel("MagazineCodeParam 验证券码")
@Data
public class MagazineCodeParam {

    @ApiModelProperty("电子刊主键 必填")
    private Long magaId;

    @ApiModelProperty("券码")
    private String readCode;

    @ApiModelProperty("是否是用户手动输入的券码")
    private Boolean userInputOrNot;
}
