package com.cola.magazine.rest.modular.auth.controller.dto;

import lombok.Data;

/**
 * 认证的请求dto
 *
 * @author cola
 * @Date 2017/8/24 14:00
 */
@Data
public class WxSignatureDto {

    private String appId;
    private String nonceStr;
    private long timestamp;
    private String url;
    private String signature;

}
