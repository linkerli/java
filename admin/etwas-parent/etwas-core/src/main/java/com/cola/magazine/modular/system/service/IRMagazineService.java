package com.cola.magazine.modular.system.service;

import com.baomidou.mybatisplus.service.IService;
import com.cola.magazine.modular.system.model.RMagazine;

/**
 * <p>
 * 杂志资源表 服务类
 * </p>
 *
 * @author cola
 * @since 2020-10-09
 */
public interface IRMagazineService extends IService<RMagazine> {

    Integer updateRMagazineReadCount(Long id,Integer readCount);

}
