package com.cola.magazine.rest.config;

import com.cola.magazine.rest.config.properties.WxMpProperties;
import me.chanjar.weixin.mp.api.WxMpInRedisConfigStorage;
import me.chanjar.weixin.mp.api.WxMpMessageRouter;
import me.chanjar.weixin.mp.api.WxMpService;
import me.chanjar.weixin.mp.api.impl.WxMpServiceImpl;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.context.properties.EnableConfigurationProperties;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import redis.clients.jedis.JedisPool;

/**
 * wechat mp configuration
 *
 * @author Binary Wang(https://github.com/binarywang)
 */
@Configuration
@EnableConfigurationProperties(WxMpProperties.class)
public class WxMpConfiguration {

    @Autowired
    private WxMpProperties wxMpProperties;
    @Autowired
    private JedisPool jedisPool;

    @Bean
    public WxMpService wxMpService() {

        WxMpService service = new WxMpServiceImpl();

        WxMpInRedisConfigStorage configStorage = new WxMpInRedisConfigStorage(jedisPool);
        configStorage.setAppId(wxMpProperties.getAppid());
        configStorage.setSecret(wxMpProperties.getSecret());
        configStorage.setToken(wxMpProperties.getToken());
        configStorage.setAesKey(wxMpProperties.getAesKey());

        service.setWxMpConfigStorage(configStorage);
        return service;
    }

    @Bean
    public WxMpMessageRouter messageMpRouter(WxMpService wxMpService) {
        final WxMpMessageRouter newRouter = new WxMpMessageRouter(wxMpService);

        return newRouter;
    }
    
}
