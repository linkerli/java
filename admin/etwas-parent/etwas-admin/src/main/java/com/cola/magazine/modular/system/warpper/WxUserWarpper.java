package com.cola.magazine.modular.system.warpper;

import com.cola.magazine.core.base.warpper.BaseControllerWarpper;
import com.cola.magazine.core.common.constant.factory.ConstantFactory;

import java.util.List;
import java.util.Map;

/**
 * 用户管理的包装类
 *
 * @author COLA
 * @date 2019年10月20日 下午10:47:03
 */
public class WxUserWarpper extends BaseControllerWarpper {

    public WxUserWarpper(List<Map<String, Object>> list) {
        super(list);
    }

    @Override
    public void warpTheMap(Map<String, Object> map) {
        map.put("status", ConstantFactory.me().getWxUserStatusName((Integer) map.get("status")));
        map.put("gender", ConstantFactory.me().getWxUserSexName((String) map.get("gender")));
    }

}
