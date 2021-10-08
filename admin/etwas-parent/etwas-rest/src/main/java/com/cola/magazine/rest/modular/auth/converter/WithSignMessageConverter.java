package com.cola.magazine.rest.modular.auth.converter;

import com.alibaba.fastjson.JSON;
import com.alibaba.fastjson.support.spring.FastJsonHttpMessageConverter;
import com.cola.magazine.core.exception.EtwasException;
import com.cola.magazine.core.support.HttpKit;
import com.cola.magazine.core.util.MD5Util;
import com.cola.magazine.rest.common.exception.BizExceptionEnum;
import com.cola.magazine.rest.config.properties.JwtProperties;
import com.cola.magazine.rest.modular.auth.security.DataSecurityAction;
import com.cola.magazine.rest.modular.auth.util.JwtTokenUtil;
import com.cola.magazine.rest.userinfo.LoginUser;
import com.cola.magazine.rest.userinfo.ThreadUserLocal;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpInputMessage;
import org.springframework.http.converter.HttpMessageNotReadableException;

import java.io.IOException;
import java.io.InputStream;
import java.lang.reflect.Type;

/**
 * 带签名的http信息转化器
 *
 * @author 可乐
 * @date 2017-08-25 15:42
 */
public class WithSignMessageConverter extends FastJsonHttpMessageConverter {

    @Autowired
    JwtProperties jwtProperties;

    @Autowired
    JwtTokenUtil jwtTokenUtil;

    @Autowired
    DataSecurityAction dataSecurityAction;

    @Override
    public Object read(Type type, Class<?> contextClass, HttpInputMessage inputMessage) throws IOException, HttpMessageNotReadableException {

        InputStream in = inputMessage.getBody();
        Object o = JSON.parseObject(in, super.getFastJsonConfig().getCharset(), BaseTransferEntity.class, super.getFastJsonConfig().getFeatures());

        //先转化成原始的对象
        BaseTransferEntity baseTransferEntity = (BaseTransferEntity) o;

        //校验签名
        String token = HttpKit.getRequest().getHeader(jwtProperties.getHeader()).substring(7);
        String md5KeyFromToken = jwtTokenUtil.getMd5KeyFromToken(token);

        /***
         * 处理登录用户信息
         */
        String userId =  jwtTokenUtil.getUsernameFromToken(token);
        LoginUser user = new LoginUser();
        user.setUserId(Long.parseLong(userId));
        ThreadUserLocal.setUserLocal(user);

        String object = baseTransferEntity.getObject();
        String json = dataSecurityAction.unlock(object);
        String encrypt = MD5Util.encrypt(json + md5KeyFromToken);

        if (encrypt.equals(baseTransferEntity.getSign())) {
            System.out.println("签名校验成功!");
        } else {
            System.out.println("签名校验失败,数据被改动过!");
            throw new EtwasException(BizExceptionEnum.SIGN_ERROR);
        }

        //校验签名后再转化成应该的对象
        return JSON.parseObject(json, type);
    }
}
