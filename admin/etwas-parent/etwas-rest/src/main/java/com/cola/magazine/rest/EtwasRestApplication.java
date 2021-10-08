package com.cola.magazine.rest;

import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.context.annotation.ComponentScan;

@SpringBootApplication
@ComponentScan(basePackages = {"com.cola.magazine"})
public class EtwasRestApplication {

    public static void main(String[] args) {
        SpringApplication.run(EtwasRestApplication.class, args);
    }
}
