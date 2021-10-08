package com.cola.magazine.modular.system.service.impl;

import com.baomidou.mybatisplus.service.impl.ServiceImpl;
import com.cola.magazine.modular.system.dao.RMagazineMapper;
import com.cola.magazine.modular.system.model.RMagazine;
import com.cola.magazine.modular.system.service.IRMagazineService;
import org.springframework.stereotype.Service;

/**
 * <p>
 * 杂志资源表 服务实现类
 * </p>
 *
 * @author cola
 * @since 2020-10-09
 */
@Service
public class RMagazineServiceImpl extends ServiceImpl<RMagazineMapper, RMagazine> implements IRMagazineService {

    @Override
    public Integer updateRMagazineReadCount(Long magaid,Integer readCount) {
        return this.baseMapper.updateRMagazineReadCount(magaid,readCount);
    }
}
