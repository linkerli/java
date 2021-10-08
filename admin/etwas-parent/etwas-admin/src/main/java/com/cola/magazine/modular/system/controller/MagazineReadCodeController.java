package com.cola.magazine.modular.system.controller;

import com.baomidou.mybatisplus.enums.SqlLike;
import com.baomidou.mybatisplus.mapper.EntityWrapper;
import com.baomidou.mybatisplus.mapper.Wrapper;
import com.cola.magazine.core.base.controller.BaseController;
import com.cola.magazine.core.common.annotion.BussinessLog;
import com.cola.magazine.core.enums.RMagazineReadCodeSourceEnum;
import com.cola.magazine.core.enums.RMagazineStatusEnum;
import com.cola.magazine.core.enums.ReadCodeActiveStatusEnum;
import com.cola.magazine.core.exception.EtwasException;
import com.cola.magazine.core.exception.EtwasExceptionCodeConstant;
import com.cola.magazine.core.exception.EtwasExceptionEnum;
import com.cola.magazine.core.log.LogObjectHolder;
import com.cola.magazine.core.util.ToolUtil;
import com.cola.magazine.modular.system.model.RMagazine;
import com.cola.magazine.modular.system.model.RMagazineReadCode;
import com.cola.magazine.modular.system.service.IRMagazineReadCodeService;
import com.cola.magazine.modular.system.service.IRMagazineService;
import com.cola.magazine.modular.system.warpper.RMagazineReadCodeWarpper;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.ui.Model;
import org.springframework.util.StringUtils;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.ResponseBody;

import java.util.List;
import java.util.Map;

/**
 * 杂志阅读码管理控制器
 *
 * @author 可乐
 * @Date 2019-11-14 15:50:55
 */
@Controller
@RequestMapping("/magazineReadCode")
public class MagazineReadCodeController extends BaseController {

    private String PREFIX = "/system/magazineReadCode/";

    @Autowired
    private IRMagazineReadCodeService magazineReadCodeService;
    @Autowired
    private IRMagazineService magazineService;

    /**
     * 跳转到杂志阅读码管理首页
     */
    @RequestMapping("")
    public String index() {
        return PREFIX + "magazineReadCode.html";
    }

    /**
     * 跳转到添加杂志阅读码管理
     */
    @RequestMapping("/magazineReadCode_add/{magazineId}")
    public String magazineReadCodeAdd(@PathVariable Long magazineId, Model model) {
        model.addAttribute("magId",magazineId);
        return PREFIX + "magazineReadCode_add.html";
    }

    /**
     * 跳转到修改杂志阅读码管理
     */
    @RequestMapping("/magazineReadCode_update/{magazineReadCodeId}")
    public String magazineReadCodeUpdate(@PathVariable Long magazineReadCodeId, Model model) {
        RMagazineReadCode magazineReadCode = magazineReadCodeService.selectById(magazineReadCodeId);
        model.addAttribute("item",magazineReadCode);
        LogObjectHolder.me().set(magazineReadCode);
        return PREFIX + "magazineReadCode_edit.html";
    }

    /**
     * 获取杂志阅读码管理列表
     */
    @RequestMapping(value = "/list")
    @ResponseBody
    public Object list(@RequestParam(required = false) Integer sourceType,
                       @RequestParam(required = false) Integer status,
                       @RequestParam(required = false) String magaTitle,
                       @RequestParam(required = false) String remark) {

        Wrapper<RMagazineReadCode> readCodeWrapper = new EntityWrapper<>();
        if(status != null) {
            readCodeWrapper.eq("status",status);
        }
        if(sourceType != null) {
            readCodeWrapper.eq("source_type",sourceType);
        }
        if(!StringUtils.isEmpty(magaTitle)) {
            readCodeWrapper.like("mag_title",magaTitle,SqlLike.DEFAULT);
        }
        if(!StringUtils.isEmpty(remark)) {
            readCodeWrapper.like("remark",remark,SqlLike.DEFAULT);
        }
        readCodeWrapper.orderBy("create_date",false);
        List<Map<String,Object>> mapList = magazineReadCodeService.selectMaps(readCodeWrapper);

        return new RMagazineReadCodeWarpper(mapList).warp();
    }

    /**
     * 新增杂志阅读码管理
     */
    @BussinessLog(value = "生成阅读码")
    @RequestMapping(value = "/add")
    @ResponseBody
    public Object add(RMagazineReadCode magazineReadCode) {

        //检查当前杂志是否是上架状态，非发布状态不能生成阅读码
        RMagazine magazine = magazineService.selectById(magazineReadCode.getMagId());
        if(magazine == null || !RMagazineStatusEnum.PUBLISH.getValue().equals(magazine.getStatus())) {
            throw new EtwasException(EtwasExceptionEnum.PARAM_ERROR);
        }
        //设置标题
        magazineReadCode.setMagTitle(magazine.getTitle());
        magazineReadCode.setSourceType(RMagazineReadCodeSourceEnum.SYSTEM.getValue());
        magazineReadCode.setStatus(ReadCodeActiveStatusEnum.UN_ACTIVIE.getValue());
        //生成阅读码 这里需要考虑同一个杂志下阅读码不能重复
        magazineReadCode.setReadCode(ToolUtil.getRandomString(magazine.getId().toString()));

        magazineReadCodeService.insert(magazineReadCode);
        return magazineReadCode.getReadCode();
    }

    /**
     * 删除杂志阅读码管理
     */
    @BussinessLog(value = "删除阅读码")
    @RequestMapping(value = "/delete")
    @ResponseBody
    public Object delete(@RequestParam Long magazineReadCodeId) {
        RMagazineReadCode rMagazineReadCode = magazineReadCodeService.selectById(magazineReadCodeId);
        if(!RMagazineReadCodeSourceEnum.SYSTEM.getValue().equals(rMagazineReadCode.getSourceType())) {
            throw new EtwasException(EtwasExceptionCodeConstant.ERROR_CODE,"来源不是" + RMagazineReadCodeSourceEnum.SYSTEM.getName());
        }
        if(!ReadCodeActiveStatusEnum.UN_ACTIVIE.getValue().equals(rMagazineReadCode.getStatus())) {
            throw new EtwasException(EtwasExceptionCodeConstant.ERROR_CODE,"激活状态不是" + ReadCodeActiveStatusEnum.UN_ACTIVIE.getName());
        }
        magazineReadCodeService.deleteById(magazineReadCodeId);
        return SUCCESS_TIP;
    }

    /**
     * 修改杂志阅读码管理
     */
    @RequestMapping(value = "/update")
    @ResponseBody
    public Object update(RMagazineReadCode magazineReadCode) {
        magazineReadCodeService.updateById(magazineReadCode);
        return SUCCESS_TIP;
    }

    /**
     * 杂志阅读码管理详情
     */
    @RequestMapping(value = "/detail/{magazineReadCodeId}")
    @ResponseBody
    public Object detail(@PathVariable("magazineReadCodeId") Integer magazineReadCodeId) {
        return magazineReadCodeService.selectById(magazineReadCodeId);
    }
}
