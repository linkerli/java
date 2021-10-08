package com.cola.magazine.rest.modular.wxuser.dto;

import io.swagger.annotations.ApiModel;
import io.swagger.annotations.ApiModelProperty;
import lombok.Data;

@ApiModel("WxUserDto：用户信息")
@Data
public class WxUserDto {

    @ApiModelProperty("用户昵称")
    private String userNickName;

    @ApiModelProperty("用户昵称")
    private String userHeadPic;

}
