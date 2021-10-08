package com.cola.magazine.rest.modular.wxuser.service;

import com.baomidou.mybatisplus.mapper.EntityWrapper;
import com.cola.magazine.core.config.properties.QiNiuProperties;
import com.cola.magazine.core.enums.WxUserAuthSourceTypeEnum;
import com.cola.magazine.core.redis.RedisService;
import com.cola.magazine.core.redis.config.RedisConstant;
import com.cola.magazine.modular.system.model.WxUser;
import com.cola.magazine.modular.system.model.WxUserAuths;
import com.cola.magazine.modular.system.service.IWxUserAuthsService;
import com.cola.magazine.modular.system.service.IWxUserService;
import com.cola.magazine.rest.modular.auth.controller.AuthController;
import com.cola.magazine.rest.modular.auth.util.JwtTokenUtil;
import com.cola.magazine.rest.modular.wxuser.dto.QiNiuUploadTokenDto;
import com.cola.magazine.rest.modular.wxuser.param.WxUserParam;
import com.cola.magazine.rest.userinfo.LoginUser;
import com.cola.magazine.rest.userinfo.ThreadUserLocal;
import com.qiniu.util.Auth;
import com.qiniu.util.StringMap;
import org.apache.commons.collections.CollectionUtils;
import org.apache.commons.lang3.StringUtils;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import javax.annotation.Resource;
import java.util.ArrayList;
import java.util.List;

/**
 * @author: 可乐
 * @date: 2020/09/23 11:10
 * <p>
 * Copyright (C),
 */
@Transactional
@Service
public class WxUser2Service {


    private static final Logger logger = LoggerFactory.getLogger(AuthController.class);



    public static final String REDIS_PRE_SUFFIX_APP_USER = "AppUser_" ;

    @Autowired
    JwtTokenUtil jwtTokenUtil;
    @Autowired
    RedisService redisService;
    @Resource
    IWxUserService iWxUserService;
    @Resource
    IWxUserAuthsService iWxUserAuthsService;
    @Autowired
    Auth qiniuAuth;
    @Autowired
    QiNiuProperties qiNiuProperties;


    public WxUser getWxUserFromRedis(Long userId) {

        String redisKey = REDIS_PRE_SUFFIX_APP_USER + userId;
        WxUser appUser = redisService.hget(redisKey,WxUser.class);

        logger.error("WxUser from redis :{}",appUser);
        if(appUser.getId() == null) {
            appUser = iWxUserService.selectById(userId);
            logger.error("WxUser from mysql :{}",appUser);
            redisService.hmset(redisKey,appUser);
            redisService.expire(redisKey, RedisConstant.ONE_DAY_MILLISECOND);
        }
        if(appUser == null || appUser.getId() == null) {
            return null;
        }
        logger.error("WxUser from final :{}",appUser);
        return appUser;
    }

    public LoginUser getLoginUserFromToken(String token) {

        String userId = jwtTokenUtil.getUsernameFromToken(token);
        WxUser wxUser = this.getWxUserFromRedis(Long.valueOf(userId));
        if(wxUser != null) {
            LoginUser loginUser = new LoginUser();
            loginUser.setUserId(wxUser.getId());
            loginUser.setUserName(wxUser.getUserNickName());
            loginUser.setUserHeadPic(wxUser.getUserHeadPic());
            return loginUser;
        }
        return null;
    }

    public WxUserAuths getWxWxUserAuthsByUserType(Long userId, WxUserAuthSourceTypeEnum sourceTypeEnum) {
        WxUserAuths wxUserAuths = new WxUserAuths();
        wxUserAuths.setUserId(userId);
        wxUserAuths.setSourceType(sourceTypeEnum.getValue());
        wxUserAuths = iWxUserAuthsService.selectOne(new EntityWrapper<>(wxUserAuths));

        return wxUserAuths;
    }

    public QiNiuUploadTokenDto createQiNiuUploadToken() {

        StringMap putPolicy = new StringMap();
        putPolicy.put("fsizeLimit", 10 * 1024 * 1024);
        String upToken = qiniuAuth.uploadToken(qiNiuProperties.getBucket(), null, 10 * 60, putPolicy);

        QiNiuUploadTokenDto qiNiuUploadTokenDto = new QiNiuUploadTokenDto();
        qiNiuUploadTokenDto.setDomain(qiNiuProperties.getBucketUrl());
        qiNiuUploadTokenDto.setUptoken(upToken);
        qiNiuUploadTokenDto.setUploadUrl("https://upload.qiniup.com");
        qiNiuUploadTokenDto.setKeyPrefix("user/logo/");

        return qiNiuUploadTokenDto;
    }

    public void updateUserInfo(WxUserParam wxUserParam) {
        //登录信息中获取用户信息
        LoginUser loginUser = ThreadUserLocal.getUserLocal();
        WxUser wxUser = iWxUserService.selectById(loginUser.getUserId());
        if(StringUtils.isNotEmpty(wxUserParam.getUserNickName())) {
            wxUser.setUserNickName(wxUserParam.getUserNickName());
        }
        if(StringUtils.isNotEmpty(wxUserParam.getUserHeadPic())) {
            wxUser.setUserHeadPic(wxUserParam.getUserHeadPic()+"?imageMogr2/gravity/Center/crop/300x300");
        }
        iWxUserService.updateById(wxUser);

        //清除redis
        redisService.del(REDIS_PRE_SUFFIX_APP_USER+loginUser.getUserId());
    }

    public List<WxUser> getWxUserListOnlyNameAndPic(List<Long> userIdList){
        if(CollectionUtils.isEmpty(userIdList)) {
            return new ArrayList<>();
        }
        List<WxUser> wxUserList = iWxUserService.selectList(new EntityWrapper<WxUser>()
                .in("id",userIdList)
                .setSqlSelect("id as id,user_nick_name as userNickName,user_head_pic as userHeadPic"));
        return wxUserList;
    }
}
