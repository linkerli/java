package com.cola.magazine.rest.modular.auth.filter;

import com.cola.magazine.rest.userinfo.UnifyHttpHeaderMapFromRequest;
import org.apache.commons.lang3.StringUtils;
import org.slf4j.MDC;
import org.springframework.web.filter.OncePerRequestFilter;
import org.springframework.web.util.ContentCachingRequestWrapper;

import javax.servlet.FilterChain;
import javax.servlet.ServletException;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import java.io.IOException;
import java.util.Map;
import java.util.UUID;

/**
 * Copyright (C),
 *
 * @author: 可乐
 * @date: 2018/11/16 15:13
 * @description:
 */
public class RequestWrapperFilter extends OncePerRequestFilter {
    @Override
    protected void doFilterInternal(HttpServletRequest request, HttpServletResponse response, FilterChain filterChain) throws ServletException, IOException {

        Map<String, String> headerUpperCaseNameValue = UnifyHttpHeaderMapFromRequest.getHeaderMap(request);

        String CLIENT_NAME = headerUpperCaseNameValue.get("CLIENTNAME");
        String CLIENT_TYPE = headerUpperCaseNameValue.get("CLIENTTYPE");
        String CLIENT_VERSION = headerUpperCaseNameValue.get("CLIENTVERSION");
        String UserRealIp = headerUpperCaseNameValue.get("X-FORWARDED-FOR");
        String DeviceKey = headerUpperCaseNameValue.get("DK");

        // 此处需要按照url的前缀类型，添加end-device
        if (StringUtils.isNotEmpty(CLIENT_TYPE)) {
            MDC.put("client-type", CLIENT_TYPE);
        }
        if (StringUtils.isNotEmpty(CLIENT_VERSION)) {
            MDC.put("client-version", CLIENT_VERSION);
        }
        if (StringUtils.isNotEmpty(CLIENT_NAME)) {
            MDC.put("client-name", CLIENT_NAME);
        }
        if (StringUtils.isNotEmpty(UserRealIp)) {
            MDC.put("user-ip", UserRealIp);
        }
        if (StringUtils.isNotEmpty(DeviceKey)) {
            MDC.put("device-key", DeviceKey);
        }

        MDC.put("zowm-trace-id", UUID.randomUUID().toString());

        filterChain.doFilter(new ContentCachingRequestWrapper(request), response);
    }
}


