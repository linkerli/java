package com.cola.magazine.rest.modular;

import com.baomidou.mybatisplus.mapper.EntityWrapper;
import com.cola.magazine.BaseTest;
import com.cola.magazine.modular.system.model.RMagazineReadCode;
import com.cola.magazine.modular.system.service.IRMagazineReadCodeService;
import org.springframework.beans.factory.annotation.Autowired;

import java.util.List;

/**
 * @author: 可乐
 * @date: 2020/10/12 00:08
 * <p>
 * Copyright (C),
 */
public class Test extends BaseTest {

    @Autowired
    IRMagazineReadCodeService magazineReadCodeService;

    @org.junit.Test
    public void test(){

        List<RMagazineReadCode> readCodeList = magazineReadCodeService.selectList(
                new EntityWrapper<RMagazineReadCode>()
                        .eq("mag_id",8).andNew()
                        .eq("buy_user_id",2)
                        .or()
                        .eq("used_user_id",2).orderBy("status",false)
        );

    }
}
