package com.cola.magazine.rest.modular.wxuser.param;

import io.swagger.annotations.ApiModel;
import io.swagger.annotations.ApiModelProperty;
import lombok.Data;

@ApiModel("WxUserParam：app的用户信息")
@Data
public class WxUserParam {

    @ApiModelProperty("用户昵称")
    private String userNickName;

    @ApiModelProperty("用户昵称")
    private String userHeadPic;

}
