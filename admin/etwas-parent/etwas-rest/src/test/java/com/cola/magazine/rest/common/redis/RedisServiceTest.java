package com.cola.magazine.rest.common.redis;

import com.cola.magazine.BaseTest;
import com.cola.magazine.core.redis.RedisService;
import org.junit.Test;

import javax.annotation.Resource;
import java.util.ArrayList;
import java.util.List;

public class RedisServiceTest extends BaseTest {


    @Resource
    RedisService redisService;

    @Test
    public void set() {

        redisService.set("test","test");
        redisService.expire("test",20L);
    }

    @Test
    public void setList() {
        List<String> array = new ArrayList<>();
        array.add("test1");
        array.add("test2");
        array.add("test3");
        array.add("test4");
        redisService.setList("test-arrayList",array);

        redisService.expire("test-arrayList",60L);

        List<String> arrayResult = redisService.getList("test-arrayList",String.class);

        arrayResult.forEach(item->{
            System.out.println(item);
        });
    }
}