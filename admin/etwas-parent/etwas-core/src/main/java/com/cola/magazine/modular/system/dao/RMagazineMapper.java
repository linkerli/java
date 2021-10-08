package com.cola.magazine.modular.system.dao;

import com.baomidou.mybatisplus.mapper.BaseMapper;
import com.cola.magazine.modular.system.model.RMagazine;
import org.apache.ibatis.annotations.Param;

/**
 * <p>
 * 杂志资源表 Mapper 接口
 * </p>
 *
 * @author cola
 * @since 2020-10-11
 */
public interface RMagazineMapper extends BaseMapper<RMagazine> {

    int updateRMagazineReadCount(@Param("id") Long id, @Param("readCount") Integer readCount);

}
