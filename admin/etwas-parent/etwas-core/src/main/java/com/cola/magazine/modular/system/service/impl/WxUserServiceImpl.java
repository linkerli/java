package com.cola.magazine.modular.system.service.impl;

import com.baomidou.mybatisplus.service.impl.ServiceImpl;
import com.cola.magazine.modular.system.dao.WxUserMapper;
import com.cola.magazine.modular.system.model.WxUser;
import com.cola.magazine.modular.system.service.IWxUserService;
import org.springframework.stereotype.Service;

/**
 * <p>
 * 微信用户表 服务实现类
 * </p>
 *
 * @author cola
 * @since 2020-09-23
 */
@Service
public class WxUserServiceImpl extends ServiceImpl<WxUserMapper, WxUser> implements IWxUserService {

}
