package com.cola.magazine;

import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;

/**
 * SpringBoot方式启动类
 *
 * @author cola
 * @Date 2017/5/21 12:06
 */
@SpringBootApplication
public class EtwasApplication {

    private final static Logger logger = LoggerFactory.getLogger(EtwasApplication.class);

    public static void main(String[] args) {
        SpringApplication.run(EtwasApplication.class, args);
        logger.info("EtwasApplication is success!");
    }
}
