package com.cola.magazine.rest.modular.auth.controller;

import cn.binarywang.wx.miniapp.api.WxMaService;
import cn.binarywang.wx.miniapp.bean.WxMaJscode2SessionResult;
import cn.binarywang.wx.miniapp.bean.WxMaUserInfo;
import com.baomidou.mybatisplus.mapper.EntityWrapper;
import com.cola.magazine.core.enums.WxUserAuthSourceTypeEnum;
import com.cola.magazine.core.enums.WxUserStatusEnum;
import com.cola.magazine.core.exception.EtwasException;
import com.cola.magazine.modular.system.model.WxUser;
import com.cola.magazine.modular.system.model.WxUserAuths;
import com.cola.magazine.modular.system.service.IWxUserAuthsService;
import com.cola.magazine.modular.system.service.IWxUserService;
import com.cola.magazine.rest.common.exception.BizExceptionEnum;
import com.cola.magazine.rest.config.properties.JwtProperties;
import com.cola.magazine.rest.modular.auth.controller.dto.AuthRequest;
import com.cola.magazine.rest.modular.auth.controller.dto.AuthResponse;
import com.cola.magazine.rest.modular.auth.controller.dto.WxSignatureDto;
import com.cola.magazine.rest.modular.auth.util.JwtTokenUtil;
import com.cola.magazine.rest.modular.wxuser.service.WxUser2Service;
import com.cola.magazine.rest.userinfo.LoginUser;
import io.jsonwebtoken.JwtException;
import io.swagger.annotations.Api;
import me.chanjar.weixin.common.bean.WxJsapiSignature;
import me.chanjar.weixin.common.error.WxErrorException;
import me.chanjar.weixin.mp.api.WxMpService;
import me.chanjar.weixin.mp.bean.result.WxMpOAuth2AccessToken;
import me.chanjar.weixin.mp.bean.result.WxMpUser;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.BeanUtils;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

import javax.annotation.Resource;
import javax.servlet.http.HttpServletRequest;

/**
 * 请求验证的
 *
 * @author 可乐
 * @Date 2017/8/24 14:22
 */
@Api(tags = "登录授权模块")
@RestController
public class AuthController {

    private static final Logger logger = LoggerFactory.getLogger(AuthController.class);

    @Autowired
    private JwtTokenUtil jwtTokenUtil;
    @Autowired
    private WxMaService wxMaService;
    @Autowired
    private WxMpService wxMpService;
    @Resource
    private IWxUserAuthsService iWxUserAuthsService;
    @Resource
    private IWxUserService iWxUserService;
    @Autowired
    JwtProperties jwtProperties;
    @Autowired
    WxUser2Service wxUser2Service;

    @GetMapping(value = "miniLogin")
    public ResponseEntity<?> createMiniAuthenticationToken(AuthRequest authRequest) {
        if(authRequest.getCode() == null) {
            throw new EtwasException(BizExceptionEnum.PARAM_NO_ERROR);
        }
        WxMaJscode2SessionResult sessionResult;
        try {
            sessionResult = wxMaService.getUserService().getSessionInfo(authRequest.getCode());
        }catch (WxErrorException e) {
            logger.error("createAuthenticationToken=>code2openid error,reason :{}",e);
            throw new EtwasException(BizExceptionEnum.SYSTEM_ERROR);
        }
        //根据openid查询数据库中是否存在该openid
        WxUserAuths wxUserAuths = new WxUserAuths();
        wxUserAuths.setSourceType(WxUserAuthSourceTypeEnum.MINI_PROGRAM_OPENID.getValue());
        wxUserAuths.setIdentifier(sessionResult.getOpenid());
        wxUserAuths.setValid(1);
        wxUserAuths =  iWxUserAuthsService.selectOne(new EntityWrapper<>(wxUserAuths));
        //openid未找到系统对应的微信用户 调用用户注册逻辑
        if(wxUserAuths == null) {
            if(authRequest.getEncryptedData() == null || authRequest.getIv() == null) {
                //前端新用户授权需要提交用户信息参数
                logger.error("createAuthenticationToken=> lack necessary param : current param : " + authRequest.toString());
                throw new EtwasException(BizExceptionEnum.WX_AUTH_NO_USER_INFO_ERROR);
            }
            WxMaUserInfo wxMaUserInfo;
            try {
                wxMaUserInfo = wxMaService.getUserService().
                        getUserInfo(sessionResult.getSessionKey(),authRequest.getEncryptedData(),authRequest.getIv());
            }catch (Exception e) {
                logger.error("createAuthenticationToken=>wx get userinfo api error,reason :{}",e);
                throw new EtwasException(BizExceptionEnum.WX_AUTH_NO_USER_INFO_ERROR);
            }

            //判断用户是否已经是平台用户
            WxUser appUser = iWxUserService.selectOne(new EntityWrapper<WxUser>().eq("unionId",wxMaUserInfo.getUnionId()));
            if(appUser == null) {
                appUser = new WxUser();
                appUser.setUnionId(wxMaUserInfo.getUnionId());
                appUser.setUserNickName(wxMaUserInfo.getNickName());
                appUser.setUserHeadPic(wxMaUserInfo.getAvatarUrl());
                appUser.setGender(wxMaUserInfo.getGender());
                appUser.setLanguage(wxMaUserInfo.getLanguage());
                appUser.setCountry(wxMaUserInfo.getCountry());
                appUser.setProvince(wxMaUserInfo.getProvince());
                appUser.setCity(wxMaUserInfo.getCity());
                appUser.setStatus(WxUserStatusEnum.NORMAL.getValue());
                iWxUserService.insert(appUser);
            }
            //持久化新用户授权方式
            wxUserAuths = new WxUserAuths();
            wxUserAuths.setUserId(appUser.getId());
            wxUserAuths.setSourceType(WxUserAuthSourceTypeEnum.MINI_PROGRAM_OPENID.getValue());
            wxUserAuths.setIdentifier(sessionResult.getOpenid());
            wxUserAuths.setValid(1);
            iWxUserAuthsService.insert(wxUserAuths);
        }

        //userinfo => token
        final String randomKey = jwtTokenUtil.getRandomKey();
        final String token = jwtTokenUtil.generateToken(wxUserAuths.getUserId().toString(), randomKey);
        return ResponseEntity.ok(new AuthResponse(token, randomKey));
    }


    @GetMapping(value = "mpLogin")
    public ResponseEntity<?> createMpAuthenticationToken(AuthRequest authRequest) {
        WxMpUser outUser = null;
        try {
            WxMpOAuth2AccessToken accessToken = wxMpService.oauth2getAccessToken(authRequest.getCode());
            outUser = wxMpService.oauth2getUserInfo(accessToken, null);
            logger.info("AuthRequest:{},user:{}",authRequest,outUser);
        } catch (WxErrorException e) {
            logger.error("异常信息：{}",e);
            return ResponseEntity.ok("");
        }

        //根据openid查询数据库中是否存在该openid
        WxUserAuths wxUserAuths = new WxUserAuths();
        wxUserAuths.setSourceType(WxUserAuthSourceTypeEnum.MP_OPENID.getValue());
        wxUserAuths.setIdentifier(outUser.getOpenId());
        wxUserAuths.setValid(1);
        wxUserAuths =  iWxUserAuthsService.selectOne(new EntityWrapper<>(wxUserAuths));
        //openid未找到系统对应的微信用户 调用用户注册逻辑
        if(wxUserAuths == null) {
            //判断用户是否已经是平台用户
            WxUser appUser = iWxUserService.selectOne(new EntityWrapper<WxUser>().eq("unionId",outUser.getUnionId()));
            //新用户
            if(appUser == null) {
                //创建用户
                appUser = new WxUser();
                appUser.setUnionId(outUser.getUnionId());
                appUser.setUserNickName(outUser.getNickname());
                appUser.setUserHeadPic(outUser.getHeadImgUrl());
                appUser.setGender(outUser.getSex().toString());
                appUser.setLanguage(outUser.getLanguage());
                appUser.setCountry(outUser.getCountry());
                appUser.setProvince(outUser.getProvince());
                appUser.setCity(outUser.getCity());
                appUser.setStatus(WxUserStatusEnum.NORMAL.getValue());
                iWxUserService.insert(appUser);
            }
            //授权表是否存在
            wxUserAuths = new WxUserAuths();
            wxUserAuths.setUserId(appUser.getId());
            wxUserAuths.setSourceType(WxUserAuthSourceTypeEnum.MP_OPENID.getValue());
            wxUserAuths.setIdentifier(outUser.getOpenId());
            wxUserAuths.setValid(1);
            iWxUserAuthsService.insert(wxUserAuths);
        }
        //userinfo => token
        final String randomKey = jwtTokenUtil.getRandomKey();
        final String token = jwtTokenUtil.generateToken(wxUserAuths.getUserId().toString(), randomKey);
        return ResponseEntity.ok(new AuthResponse(token, randomKey));
    }


    @GetMapping(value = "wxMpSignature")
    public ResponseEntity<WxSignatureDto> wxMpSignature(@RequestParam String url) {

        WxSignatureDto wxSignatureDto = new WxSignatureDto();

        try {
            WxJsapiSignature wxJsapiSignature = wxMpService.createJsapiSignature(url);
            BeanUtils.copyProperties(wxJsapiSignature,wxSignatureDto);
        }catch (WxErrorException e) {
            logger.error("获取签名异常：{}",e.getError());
            throw new EtwasException(BizExceptionEnum.BIZ_ERROR);
        }

        return ResponseEntity.ok(wxSignatureDto);
    }

    @GetMapping(value = "checkMpLoginStatus")
    public ResponseEntity<Boolean> checkMpLoginStatus(HttpServletRequest request) {

        final String requestHeader = request.getHeader(jwtProperties.getHeader());
        String authToken;
        if (requestHeader != null && requestHeader.startsWith("bearer")) {
            authToken = requestHeader.substring(6);
            //验证token是否过期,包含了验证jwt是否正确
            try {
                boolean flag = jwtTokenUtil.isTokenExpired(authToken);
                if (flag) {
                    return ResponseEntity.ok(false);
                }
                /***
                 * 处理登录用户信息
                 */
                LoginUser loginUser = wxUser2Service.getLoginUserFromToken(authToken);
                if(loginUser == null) {
                    return ResponseEntity.ok(false);
                }

                return ResponseEntity.ok(true);
            } catch (JwtException e) {
                logger.error("checkMpLoginStatus>>异常:{}",e);
                return ResponseEntity.ok(false);
            }
        }
        return ResponseEntity.ok(false);
    }

}
