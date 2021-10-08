package com.cola.magazine.rest.modular.auth.filter;

import com.cola.magazine.core.base.tips.ErrorTip;
import com.cola.magazine.core.util.RenderUtil;
import com.cola.magazine.rest.common.exception.BizExceptionEnum;
import com.cola.magazine.rest.config.WebInterceptUrlConfig;
import com.cola.magazine.rest.config.properties.JwtProperties;
import com.cola.magazine.rest.modular.auth.util.JwtTokenUtil;
import com.cola.magazine.rest.modular.wxuser.service.WxUser2Service;
import com.cola.magazine.rest.userinfo.LoginUser;
import com.cola.magazine.rest.userinfo.ThreadUserLocal;
import io.jsonwebtoken.JwtException;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.filter.OncePerRequestFilter;

import javax.annotation.Resource;
import javax.servlet.FilterChain;
import javax.servlet.ServletException;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import java.io.IOException;
import java.util.Enumeration;

/**
 * 对客户端请求的jwt token验证过滤器
 *
 * @author 可乐
 * @Date 2017/8/24 14:04
 */
public class AuthFilter extends OncePerRequestFilter {

    private static final Logger LOGGER  = LoggerFactory.getLogger(AuthFilter.class);

    @Autowired
    private JwtTokenUtil jwtTokenUtil;

    @Autowired
    private JwtProperties jwtProperties;

    @Resource
    private WxUser2Service wxUser2Service;

    @Override
    protected void doFilterInternal(HttpServletRequest request, HttpServletResponse response, FilterChain chain) throws IOException, ServletException {

        Enumeration enumeration = request.getParameterNames();
        StringBuilder sb = new StringBuilder();
        while (enumeration.hasMoreElements()) {
            String name = enumeration.nextElement().toString();
            sb.append(name).append("->").append(request.getParameter(name)).append(" ");

        }
        LOGGER.info("请求URL: {} 参数:{}",request.getRequestURI(),sb.toString());

        if(request.getServletPath().contains("webjars")){
            chain.doFilter(request, response);
            return;
        }

        //过滤无需登录信息的接口地址
        if (WebInterceptUrlConfig.RULE_NO_INTERCEPT_LIST.contains(request.getServletPath())) {
            ThreadUserLocal.setUserLocal(null);
            chain.doFilter(request, response);
            return;
        }

        final String requestHeader = request.getHeader(jwtProperties.getHeader());
        String authToken;
        if (requestHeader != null && requestHeader.startsWith("bearer")) {
            authToken = requestHeader.substring(6);
            LOGGER.info("请求URL: {} authToken:{}",request.getRequestURI(),authToken);

            //验证token是否过期,包含了验证jwt是否正确
            try {
                boolean flag = jwtTokenUtil.isTokenExpired(authToken);
                if (flag) {
                    //如果登录过期了 && 不需要登录的时候知己放过
                    if (WebInterceptUrlConfig.RULE_NO_INTERCEPT_LIST.contains(request.getServletPath())) {
                        ThreadUserLocal.setUserLocal(null);
                        chain.doFilter(request, response);
                        return;
                    }

                    RenderUtil.renderJson(response, new ErrorTip(BizExceptionEnum.TOKEN_EXPIRED.getCode(), BizExceptionEnum.TOKEN_EXPIRED.getMessage()));
                    return;
                }

                /***
                 * 处理登录用户信息
                 */
                LoginUser loginUser = wxUser2Service.getLoginUserFromToken(authToken);
                if(loginUser == null) {
                    RenderUtil.renderJson(response, new ErrorTip(BizExceptionEnum.TOKEN_ERROR.getCode(), BizExceptionEnum.TOKEN_ERROR.getMessage()));
                    return;
                }
                ThreadUserLocal.setUserLocal(loginUser);

            } catch (JwtException e) {
                //有异常就是token解析失败
                RenderUtil.renderJson(response, new ErrorTip(BizExceptionEnum.TOKEN_ERROR.getCode(), BizExceptionEnum.TOKEN_ERROR.getMessage()));
                return;
            }
        }
        //这里需要 登录没有的 全部异常
        else {
            ThreadUserLocal.setUserLocal(null);
            //header没有带Bearer字段
            RenderUtil.renderJson(response, new ErrorTip(BizExceptionEnum.TOKEN_ERROR.getCode(), BizExceptionEnum.TOKEN_ERROR.getMessage()));
            return;
        }
        chain.doFilter(request, response);
        ThreadUserLocal.remove();

    }
}