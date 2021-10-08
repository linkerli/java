package com.cola.magazine.modular.system.controller;

import com.baomidou.mybatisplus.mapper.EntityWrapper;
import com.cola.magazine.core.base.controller.BaseController;
import com.cola.magazine.core.log.LogObjectHolder;
import com.cola.magazine.modular.system.model.WxUser;
import com.cola.magazine.modular.system.service.IWxUserService;
import com.cola.magazine.modular.system.warpper.WxUserWarpper;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.ui.Model;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.ResponseBody;

import java.util.List;
import java.util.Map;

/**
 * 微信用户管理控制器
 *
 * @author cola
 * @Date 2019-10-20 11:19:13
 */
@Controller
@RequestMapping("/wxUser")
public class WxUserController extends BaseController {

    private String PREFIX = "/system/wxUser/";

    @Autowired
    private IWxUserService wxUserService;

    /**
     * 跳转到微信用户管理首页
     */
    @RequestMapping("")
    public String index() {
        return PREFIX + "wxUser.html";
    }

    /**
     * 跳转到添加微信用户管理
     */
    @RequestMapping("/wxUser_add")
    public String wxUserAdd() {
        return PREFIX + "wxUser_add.html";
    }

    /**
     * 跳转到修改微信用户管理
     */
    @RequestMapping("/wxUser_update/{wxUserId}")
    public String wxUserUpdate(@PathVariable Integer wxUserId, Model model) {
        WxUser wxUser = wxUserService.selectById(wxUserId);
        model.addAttribute("item",wxUser);
        LogObjectHolder.me().set(wxUser);
        return PREFIX + "wxUser_edit.html";
    }

    /**
     * 获取微信用户管理列表
     */
    @RequestMapping(value = "/list")
    @ResponseBody
    public Object list(String condition) {
        WxUser wxUser = new WxUser();
        wxUser.setUserNickName(condition);
        List<Map<String,Object>> wxUserList = wxUserService.selectMaps(new EntityWrapper<>(wxUser).orderBy("create_date",false));
        return new WxUserWarpper(wxUserList).warp();
    }

    /**
     * 新增微信用户管理
     */
    @RequestMapping(value = "/add")
    @ResponseBody
    public Object add(WxUser wxUser) {
        wxUserService.insert(wxUser);
        return SUCCESS_TIP;
    }

    /**
     * 删除微信用户管理
     */
    @RequestMapping(value = "/delete")
    @ResponseBody
    public Object delete(@RequestParam Integer wxUserId) {
        wxUserService.deleteById(wxUserId);
        return SUCCESS_TIP;
    }

    /**
     * 修改微信用户管理
     */
    @RequestMapping(value = "/update")
    @ResponseBody
    public Object update(WxUser wxUser) {
        wxUserService.updateById(wxUser);
        return SUCCESS_TIP;
    }

    /**
     * 微信用户管理详情
     */
    @RequestMapping(value = "/detail/{wxUserId}")
    @ResponseBody
    public Object detail(@PathVariable("wxUserId") Integer wxUserId) {
        return wxUserService.selectById(wxUserId);
    }
}
