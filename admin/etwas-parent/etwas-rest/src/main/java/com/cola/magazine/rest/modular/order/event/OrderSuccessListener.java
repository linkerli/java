package com.cola.magazine.rest.modular.order.event;

import com.cola.magazine.rest.modular.order.service.Trade2OrderService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.context.event.EventListener;
import org.springframework.scheduling.annotation.Async;
import org.springframework.stereotype.Component;

/**
 * @author: 可乐
 * @date: 2020/09/23 13:34
 * <p>
 * Copyright (C),
 */
@Component
public class OrderSuccessListener {

    @Autowired
    Trade2OrderService trade2OrderService;

    @Async
    @EventListener
    public void orderPaySuccess(OrderSuccessEvent event){
        //支付成功 TODO 异常补充逻辑
        trade2OrderService.orderPaySuccess(
                event.getOrderNum(),
                event.getActualPayAmount(),
                event.getCallBackTime(),
                event.getPayChanel(),
                event.getPayWay());
    }

}
