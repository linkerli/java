package com.cola.magazine.rest.modular.order;

import com.cola.magazine.rest.modular.order.param.CreateTradeOrderParam;
import com.cola.magazine.rest.modular.order.service.Trade2OrderService;
import com.cola.magazine.rest.modular.pay.dto.PayResultDTO;
import io.swagger.annotations.Api;
import io.swagger.annotations.ApiOperation;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

/**
 * @author: 可乐
 * @date: 2020/09/23 10:54
 * <p>
 * Copyright (C),
 */
@RestController
@RequestMapping("api/order")
@Api(tags = "订单模块")
public class OrderController {

    @Autowired
    Trade2OrderService trade2OrderService;


    @ApiOperation(value = "[OR1]根据业务场景创建订单返回订单id", notes = "根据业务场景创建订单返回订单id")
    @PostMapping("createTradeOrder")
    public ResponseEntity<PayResultDTO> createTradeOrder(@RequestBody CreateTradeOrderParam createTradeOrderParam) {
        PayResultDTO payResultDTO = trade2OrderService.createTradeOrder(createTradeOrderParam);
        return ResponseEntity.ok(payResultDTO);
    }
}
