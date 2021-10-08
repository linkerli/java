package com.cola.magazine.core.config.properties;

import org.springframework.boot.context.properties.ConfigurationProperties;
import org.springframework.stereotype.Component;

/**
 * Copyright (C),
 *
 * @author: 可乐
 * @date: 2018/08/14 10:27
 * @description:
 */
@Component
@ConfigurationProperties(prefix = "qiniu")
public class QiNiuProperties {

    private String accessKey;
    private String secretKey;
    private String bucket;
    private String bucketUrl;

    public QiNiuProperties() {
    }

    public String getAccessKey() {
        return accessKey;
    }

    public void setAccessKey(String accessKey) {
        this.accessKey = accessKey;
    }

    public String getSecretKey() {
        return secretKey;
    }

    public void setSecretKey(String secretKey) {
        this.secretKey = secretKey;
    }

    public String getBucket() {
        return bucket;
    }

    public void setBucket(String bucket) {
        this.bucket = bucket;
    }

    public String getBucketUrl() {
        return bucketUrl;
    }

    public void setBucketUrl(String bucketUrl) {
        this.bucketUrl = bucketUrl;
    }

    @Override
    public String toString() {
        return "QiNiuProperties{" +
                "accessKey='" + accessKey + '\'' +
                ", secretKey='" + secretKey + '\'' +
                ", bucket='" + bucket + '\'' +
                ", bucketUrl='" + bucketUrl + '\'' +
                '}';
    }
}
