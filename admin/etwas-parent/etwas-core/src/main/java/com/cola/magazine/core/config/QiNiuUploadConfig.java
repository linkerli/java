package com.cola.magazine.core.config;

import com.cola.magazine.core.config.properties.QiNiuProperties;
import com.cola.magazine.core.util.DateUtils;
import com.google.gson.Gson;
import com.qiniu.common.Region;
import com.qiniu.common.Zone;
import com.qiniu.http.Response;
import com.qiniu.storage.Configuration;
import com.qiniu.storage.UploadManager;
import com.qiniu.storage.model.DefaultPutRet;
import com.qiniu.util.Auth;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.context.annotation.Bean;
import org.springframework.stereotype.Component;

import java.util.Date;
import java.util.UUID;

/**
 * Copyright (C),
 *
 * @author: Cola
 * @date: 2018/09/13 16:57
 * @description:
 */
@Component
@org.springframework.context.annotation.Configuration
public class QiNiuUploadConfig {

    private static final Logger logger = LoggerFactory.getLogger(QiNiuUploadConfig.class);

    @Autowired
    QiNiuProperties qiNiuProperties;

    private static Auth auth;
    private static Configuration configuration;
    private static UploadManager uploadManager;

    @Bean
    public Auth qiniuAuth() {
        if (auth == null) {
            auth = Auth.create(qiNiuProperties.getAccessKey(), qiNiuProperties.getSecretKey());
        }
        return auth;
    }

    @Bean
    public Configuration qiniuConfiguration() {
        if (configuration == null) {
            //第二种方式: 自动识别要上传的空间(bucket)的存储区域是华东、华北、华南。
            Region z = Zone.autoZone();
            configuration = new Configuration(z);
        }
        return configuration;
    }

    @Bean
    public UploadManager qiniuUploadManager(){
        if(uploadManager==null){
            uploadManager = new UploadManager(qiniuConfiguration());
        }
        return uploadManager;
    }


    private String upload(byte[] file, String key) throws Exception {

        //创建上传对象
        Response res = qiniuUploadManager().put(file, key, qiniuAuth().uploadToken(qiNiuProperties.getBucket()));
        //打印返回的信息
        logger.info("【七牛文件上传】返回信息{}", res.bodyString());
        if (!res.isOK()) {
            logger.error("【七牛文件上传】文件上传失败，原因：{}", res);
        }
        //解析上传成功的结果
        DefaultPutRet putRet = new Gson().fromJson(res.bodyString(), DefaultPutRet.class);
        String returnFilePath = qiNiuProperties.getBucketUrl() + putRet.key;
        logger.info("【七牛文件上传】文件上传成功，路径：{}", returnFilePath);
        return returnFilePath;
    }

    /***
     * 上传文件不指定上传后的名称，系统生成唯一名称
     * @param file
     * @return 上传后的全路径
     * @throws Exception
     */
    public String uploadImgDefaultName(byte[] file) throws Exception {
        String key = UUID.randomUUID().toString() + ".jpg";
        return upload(file, key);
    }

    /***
     * 上传文件指定名称 注意名称不能在buket重复
     * @param file
     * @param fileName
     * @return 上传后的全路径
     * @throws Exception
     */
    public String uploadNewName(byte[] file, String fileName) throws Exception {
        return upload(file, fileName);
    }

    /***
     * 上传文件指定扩展名
     * @param file
     * @param format
     * @return 上传后的全路径
     * @throws Exception
     */
    public String uploadFormatName(byte[] file, String format) throws Exception {
        String prefixDate = DateUtils.date2String(new Date(),DateUtils.DATE_FORMAT_A);
        String key = "public"+"/"+prefixDate + "/"+ UUID.randomUUID().toString() + "." + format;
        return upload(file, key);
    }


    /***
     * 上传文件不指定上传后的名称，系统生成唯一名称
     * @param file
     * @return 上传后的全路径
     * @throws Exception
     */
    public String uploadImgDefaultName(String pathPrefix, byte[] file) throws Exception {
        String key = "public"+"/"+pathPrefix + "/"+UUID.randomUUID().toString() + ".jpg";
        return upload(file, key);
    }

    /***
     * 上传文件不指定上传后的名称，系统生成唯一名称
     * @param file
     * @return 上传后的全路径
     * @throws Exception
     */
    public String uploadImgDefaultName(String pathPrefix,String fileName, byte[] file) throws Exception {
        String key = pathPrefix + "/" + fileName;
        return upload(file, key);
    }


}
