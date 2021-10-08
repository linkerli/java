package com.cola.magazine.modular.system.service.impl;

import com.baomidou.mybatisplus.service.impl.ServiceImpl;
import com.cola.magazine.modular.system.dao.WxCallbackInfoMapper;
import com.cola.magazine.modular.system.model.WxCallbackInfo;
import com.cola.magazine.modular.system.service.IWxCallbackInfoService;
import org.springframework.stereotype.Service;

/**
 * <p>
 * 微信支付回调信息表 服务实现类
 * </p>
 *
 * @author cola
 * @since 2020-09-23
 */
@Service
public class WxCallbackInfoServiceImpl extends ServiceImpl<WxCallbackInfoMapper, WxCallbackInfo> implements IWxCallbackInfoService {

}
