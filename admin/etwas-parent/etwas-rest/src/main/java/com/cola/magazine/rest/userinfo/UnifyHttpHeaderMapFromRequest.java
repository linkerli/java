package com.cola.magazine.rest.userinfo;

import javax.servlet.http.HttpServletRequest;
import java.util.Enumeration;
import java.util.HashMap;
import java.util.Map;

/**
 * Copyright (C),
 *
 * @author: 可乐
 * @date: 2019/05/23 17:29
 * @description:
 */
public final class UnifyHttpHeaderMapFromRequest {

    public static Map<String,String> getHeaderMap(HttpServletRequest request){
        Map<String, String> headerUpperCaseNameValue = new HashMap<>();

        Enumeration<String> headerNames = request.getHeaderNames();
        while (null != headerNames && headerNames.hasMoreElements()) {
            String headerName = headerNames.nextElement();
            String tempHeaderValue = request.getHeader(headerName);
            headerUpperCaseNameValue.put(headerName.toUpperCase(), tempHeaderValue);
        }

        return headerUpperCaseNameValue;
    }

}
