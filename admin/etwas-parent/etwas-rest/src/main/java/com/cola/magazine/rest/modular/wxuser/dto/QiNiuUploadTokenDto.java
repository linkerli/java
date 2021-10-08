package com.cola.magazine.rest.modular.wxuser.dto;

import io.swagger.annotations.ApiModel;
import io.swagger.annotations.ApiModelProperty;
import lombok.Data;

/**
 * @author: 可乐
 * @date: 2020/05/19 16:17
 * <p>
 * Copyright (C),
 */
@Data
@ApiModel("QiNiuUploadTokenDto七牛客户端上传返回凭据")
public class QiNiuUploadTokenDto {

    @ApiModelProperty("uptoken,七牛上传所需要的凭证")
    private String uptoken;

    @ApiModelProperty("domain:图片上传完成后需要拼接的前缀访问域名")
    private String domain;

    @ApiModelProperty("uploadUrl：上传到七牛的那个路径下面")
    private String uploadUrl;

    @ApiModelProperty("key的前缀，key值直接uuid生成即可,最终 上传到七牛的key是keyPrefix + uuid + .扩展名")
    private String keyPrefix;

    @ApiModelProperty("后端指定的文件上传的类型")
    private String fileType;

    @ApiModelProperty("后端指定的文件上传的大小")
    private int fileMaxSize;

}
