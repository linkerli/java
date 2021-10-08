package com.cola.magazine.rest.modular.pay;

import com.cola.magazine.rest.modular.order.service.Trade2OrderService;
import com.github.binarywang.wxpay.bean.notify.WxPayNotifyResponse;
import com.github.binarywang.wxpay.bean.notify.WxPayOrderNotifyResult;
import com.github.binarywang.wxpay.bean.notify.WxPayRefundNotifyResult;
import com.github.binarywang.wxpay.exception.WxPayException;
import com.github.binarywang.wxpay.service.WxPayService;
import io.swagger.annotations.Api;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import javax.annotation.Resource;

@Api(tags = "微信回调模块")
@RestController
@RequestMapping("/wx/pay")
public class WxPayPortalController {

    @Resource
    private WxPayService wxPayService;
    @Resource
    private Trade2OrderService trade2OrderService;


    @PostMapping("/notify/order")
    public String parseOrderNotifyResult(@RequestBody String xmlData) throws WxPayException {
        final WxPayOrderNotifyResult notifyResult = wxPayService.parseOrderNotifyResult(xmlData);
        trade2OrderService.paySuccessTradeOrder(notifyResult);
        return WxPayNotifyResponse.success("成功");
    }

    @PostMapping("/notify/refund")
    public String parseRefundNotifyResult(@RequestBody String xmlData) throws WxPayException {
        final WxPayRefundNotifyResult result = wxPayService.parseRefundNotifyResult(xmlData);
        //tradeService.weChatRefundCallBackNotify(result);
        return WxPayNotifyResponse.success("成功");
    }

}
