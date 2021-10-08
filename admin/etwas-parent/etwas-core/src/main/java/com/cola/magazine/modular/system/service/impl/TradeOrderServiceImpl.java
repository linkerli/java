package com.cola.magazine.modular.system.service.impl;

import com.baomidou.mybatisplus.service.impl.ServiceImpl;
import com.cola.magazine.modular.system.dao.TradeOrderMapper;
import com.cola.magazine.modular.system.model.TradeOrder;
import com.cola.magazine.modular.system.service.ITradeOrderService;
import org.springframework.stereotype.Service;

/**
 * <p>
 * 交易记录表 服务实现类
 * </p>
 *
 * @author cola
 * @since 2020-09-23
 */
@Service
public class TradeOrderServiceImpl extends ServiceImpl<TradeOrderMapper, TradeOrder> implements ITradeOrderService {

}
