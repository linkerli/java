package com.cola.magazine.rest.modular.auth.controller.dto;

import java.io.Serializable;

/**
 * 认证的请求dto
 *
 * @author cola
 * @Date 2017/8/24 14:00
 */
public class AuthRequest implements Serializable {

    private String code;

    private String encryptedData;
    private String iv;

    public String getCode() {
        return code;
    }

    public void setCode(String code) {
        this.code = code;
    }

    public String getEncryptedData() {
        return encryptedData;
    }

    public void setEncryptedData(String encryptedData) {
        this.encryptedData = encryptedData;
    }

    public String getIv() {
        return iv;
    }

    public void setIv(String iv) {
        this.iv = iv;
    }

    @Override
    public String toString() {
        return "AuthRequest{" +
                "code='" + code + '\'' +
                ", encryptedData='" + encryptedData + '\'' +
                ", iv='" + iv + '\'' +
                '}';
    }
}
