package com.cola.magazine.rest.config;

import com.cola.magazine.rest.config.properties.RestProperties;
import com.cola.magazine.rest.modular.auth.filter.AuthFilter;
import com.cola.magazine.rest.modular.auth.filter.RequestWrapperFilter;
import com.cola.magazine.rest.modular.auth.security.DataSecurityAction;
import com.cola.magazine.rest.modular.auth.security.impl.Base64SecurityAction;
import org.springframework.boot.autoconfigure.condition.ConditionalOnProperty;
import org.springframework.boot.web.servlet.FilterRegistrationBean;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;

/**
 * web配置
 *
 * @author cola
 * @date 2017-08-23 15:48
 */
@Configuration
public class WebConfig {

    @Bean
    @ConditionalOnProperty(prefix = RestProperties.REST_PREFIX, name = "auth-open", havingValue = "true", matchIfMissing = true)
    public AuthFilter jwtAuthenticationTokenFilter() {
        return new AuthFilter();
    }

    @Bean
    public DataSecurityAction dataSecurityAction() {
        return new Base64SecurityAction();
    }


    @Bean
    public FilterRegistrationBean requestWrapperFilter(){
        FilterRegistrationBean filterBean = new FilterRegistrationBean();
        filterBean.setFilter(new RequestWrapperFilter());
        filterBean.setName("requestWrapperFilter");
        filterBean.addUrlPatterns("/api/*");
        filterBean.setOrder(FilterRegistrationBean.REQUEST_WRAPPER_FILTER_MAX_ORDER);
        return filterBean;
    }
}


