package com.cola.magazine;

import com.cola.magazine.rest.EtwasRestApplication;
import org.junit.runner.RunWith;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.test.context.junit4.SpringRunner;
import org.springframework.test.context.web.WebAppConfiguration;

/**
 * Copyright (C),
 *
 * @author: Cola
 * @date: 2018/08/14 09:25
 * @description:
 */

@RunWith(SpringRunner.class)
@SpringBootTest(classes = EtwasRestApplication.class)
@WebAppConfiguration
public class BaseTest {
}
