package com.cola.magazine.rest.modular.order.event;

import com.cola.magazine.core.enums.PayWayAndChanelEnum;
import lombok.Data;

import java.math.BigDecimal;
import java.util.Date;

/**
 * @author: 可乐
 * @date: 2020/09/23 13:33
 * <p>
 * Copyright (C),
 */
@Data
public class OrderSuccessEvent {

    private String orderNum;

    private BigDecimal actualPayAmount;

    private Date callBackTime;

    private PayWayAndChanelEnum.PayWay payWay;

    private PayWayAndChanelEnum.PayChanel payChanel;

    public OrderSuccessEvent(String orderNum, BigDecimal actualPayAmount, Date callBackTime) {
        this.orderNum = orderNum;
        this.actualPayAmount = actualPayAmount;
        this.callBackTime = callBackTime;
    }

    public OrderSuccessEvent() {
    }


}
