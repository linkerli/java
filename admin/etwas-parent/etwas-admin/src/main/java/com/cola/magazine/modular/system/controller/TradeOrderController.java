package com.cola.magazine.modular.system.controller;

import com.baomidou.mybatisplus.mapper.EntityWrapper;
import com.baomidou.mybatisplus.mapper.Wrapper;
import com.cola.magazine.core.base.controller.BaseController;
import com.cola.magazine.modular.system.model.TradeOrder;
import com.cola.magazine.modular.system.service.ITradeOrderService;
import com.cola.magazine.modular.system.warpper.TradeOrderWarpper;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.util.StringUtils;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.ResponseBody;

import java.util.List;
import java.util.Map;

/**
 * 订单管理控制器
 *
 * @author 可乐
 * @Date 2019-10-20 16:52:36
 */
@Controller
@RequestMapping("/tradeOrder")
public class TradeOrderController extends BaseController {

    private String PREFIX = "/system/tradeOrder/";

    @Autowired
    private ITradeOrderService tradeOrderService;

    /**
     * 跳转到订单管理首页
     */
    @RequestMapping("")
    public String index() {
        return PREFIX + "tradeOrder.html";
    }

    /**
     * 获取订单管理列表
     */
    @RequestMapping(value = "/list")
    @ResponseBody
    public Object list(@RequestParam(required = false) String sourceNum,@RequestParam(required = false) String userNickName, @RequestParam(required = false) String beginTime, @RequestParam(required = false) String endTime, @RequestParam(required = false) Integer status) {

        TradeOrder tradeOrder = new TradeOrder();
        Wrapper<TradeOrder> tradeOrderWrapper = new EntityWrapper<>(tradeOrder);
        if(!StringUtils.isEmpty(sourceNum)) {
            tradeOrder.setSourceNum(sourceNum);
        }
        if(!StringUtils.isEmpty(beginTime)) {
            tradeOrderWrapper.ge("create_date",beginTime);
        }
        if(!StringUtils.isEmpty(endTime)) {
            tradeOrderWrapper.le("create_date",endTime);
        }
        if(status != null) {
            tradeOrder.setStatus(status);
        }
        if(!StringUtils.isEmpty(userNickName)) {
            tradeOrder.setUserNickName(userNickName);
        }
        tradeOrderWrapper.orderBy("create_date",false);


        List<Map<String,Object>> mapList = tradeOrderService.selectMaps(tradeOrderWrapper);

        return new TradeOrderWarpper(mapList).warp();
    }

}
