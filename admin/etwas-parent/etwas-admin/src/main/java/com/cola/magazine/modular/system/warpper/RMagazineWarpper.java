package com.cola.magazine.modular.system.warpper;

import com.cola.magazine.core.base.warpper.BaseControllerWarpper;
import com.cola.magazine.core.common.constant.factory.ConstantFactory;

import java.util.List;
import java.util.Map;

/**
 * 角色列表的包装类
 *
 * @author cola
 * @date 2017年2月19日10:59:02
 */
public class RMagazineWarpper extends BaseControllerWarpper {

    public RMagazineWarpper(List<Map<String, Object>> list) {
        super(list);
    }

    @Override
    public void warpTheMap(Map<String, Object> map) {
        map.put("statusName", ConstantFactory.me().getMagazineStatusName((Integer) map.get("status")));
    }

}
