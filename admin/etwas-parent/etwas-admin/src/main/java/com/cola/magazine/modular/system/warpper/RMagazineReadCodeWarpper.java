package com.cola.magazine.modular.system.warpper;

import com.cola.magazine.core.base.warpper.BaseControllerWarpper;
import com.cola.magazine.core.common.constant.factory.ConstantFactory;

import java.util.List;
import java.util.Map;

/**
 * 阅读码列表的包装类
 *
 * @author cola
 * @date 2019年11月19日10:59:02
 */
public class RMagazineReadCodeWarpper extends BaseControllerWarpper {

    public RMagazineReadCodeWarpper(List<Map<String, Object>> list) {
        super(list);
    }

    @Override
    public void warpTheMap(Map<String, Object> map) {
        map.put("status", ConstantFactory.me().getReadCodeActiveStatus((Integer) map.get("status")));
        map.put("sourceType", ConstantFactory.me().getReadCodeSourceType((Integer) map.get("sourceType")));
    }

}
