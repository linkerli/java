package com.cola.magazine.modular.system.controller;

import cn.binarywang.wx.miniapp.api.WxMaService;
import cn.binarywang.wx.miniapp.bean.WxMaCodeLineColor;
import com.baomidou.mybatisplus.enums.SqlLike;
import com.baomidou.mybatisplus.mapper.EntityWrapper;
import com.baomidou.mybatisplus.mapper.Wrapper;
import com.cola.magazine.core.base.controller.BaseController;
import com.cola.magazine.core.common.annotion.BussinessLog;
import com.cola.magazine.core.config.QiNiuUploadConfig;
import com.cola.magazine.core.enums.RMagazineCategroyEnum;
import com.cola.magazine.core.enums.RMagazinePersonEnum;
import com.cola.magazine.core.enums.RMagazineStatusEnum;
import com.cola.magazine.core.exception.EtwasException;
import com.cola.magazine.core.exception.EtwasExceptionEnum;
import com.cola.magazine.core.log.LogObjectHolder;
import com.cola.magazine.core.redis.RedisService;
import com.cola.magazine.core.util.DateUtil;
import com.cola.magazine.modular.system.model.RMagazine;
import com.cola.magazine.modular.system.service.IRMagazineService;
import com.cola.magazine.modular.system.warpper.RMagazineWarpper;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.ui.Model;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.ResponseBody;

import java.io.File;
import java.io.FileInputStream;
import java.io.InputStream;
import java.math.BigDecimal;
import java.util.Date;
import java.util.List;
import java.util.Map;

/**
 * 杂志管理控制器
 *
 * @author 可乐
 * @Date 2019-11-14 15:41:21
 */
@Controller
@RequestMapping("/magazine")
public class MagazineController extends BaseController {

    private String PREFIX = "/system/magazine/";

    @Autowired
    private IRMagazineService magazineService;
    @Autowired
    private WxMaService wxMaService;
    @Autowired
    QiNiuUploadConfig qiNiuUploadConfig;
    @Autowired
    RedisService redisService;



    /**
     * 跳转到杂志管理首页
     */
    @RequestMapping("")
    public String index() {
        return PREFIX + "magazine.html";
    }

    /**
     * 跳转到添加杂志管理
     */
    @RequestMapping("/magazine_add")
    public String magazineAdd() {
        return PREFIX + "magazine_add.html";
    }

    /**
     * 跳转到修改杂志管理
     */
    @RequestMapping("/magazine_update/{magazineId}")
    public String magazineUpdate(@PathVariable Integer magazineId, Model model) {
        RMagazine magazine = magazineService.selectById(magazineId);
        model.addAttribute("item",magazine);
        LogObjectHolder.me().set(magazine);
        return PREFIX + "magazine_edit.html";
    }

    /**
     * 获取杂志管理列表
     */
    @RequestMapping(value = "/list")
    @ResponseBody
    public Object list(String condition) {
        RMagazine rMagazine = new RMagazine();
        Wrapper<RMagazine> magazineWrapper = new EntityWrapper<>();
        magazineWrapper.like("title",condition,SqlLike.DEFAULT);
        magazineWrapper.orderBy("create_date",false);
        List<Map<String,Object>> mapList =  magazineService.selectMaps(magazineWrapper);
        return super.warpObject(new RMagazineWarpper(mapList));
    }

    /**
     * 新增杂志管理
     */
    @BussinessLog(value = "新增电子刊")
    @RequestMapping(value = "/add")
    @ResponseBody
    public Object add(RMagazine magazine) {
        checkAndChangeAttribute(magazine);
        magazineService.insert(magazine);

        //生成小程序码：TODO
        try {
            File erCodeFile1 = wxMaService.getQrcodeService().createWxaCodeUnlimit("magaId="+magazine.getId(), "pages/detail/index", 430, false, new WxMaCodeLineColor("0", "0", "0"), false);
            InputStream input = new FileInputStream(erCodeFile1);
            byte[] byt1 = new byte[input.available()];
            input.read(byt1);
            String picUrl1 = qiNiuUploadConfig.uploadImgDefaultName("/maga/ercode/", byt1);
            magazine.setPreSmallCode(picUrl1);
            magazineService.updateById(magazine);
        }catch (Exception e) {
            //throw  new EtwasException(EtwasExceptionEnum.PARAM_ERROR.getCode(),"小程序码生成异常");
        }



        return SUCCESS_TIP;
    }

    /**
     * 删除杂志管理
     */
    @RequestMapping(value = "/delete")
    @ResponseBody
    public Object delete(@RequestParam Integer magazineId) {
        magazineService.deleteById(magazineId);
        return SUCCESS_TIP;
    }

    /**
     * 修改杂志管理
     */
    @BussinessLog(value = "修改电子刊")
    @RequestMapping(value = "/update")
    @ResponseBody
    public Object update(RMagazine magazine) {
        checkAndChangeAttribute(magazine);


        if(magazine.getPreSmallCode() == null) {
            //生成小程序码：TODO
            try {
                File erCodeFile1 = wxMaService.getQrcodeService().createWxaCodeUnlimit("magaId="+magazine.getId(), "pages/detail/index", 430, false, new WxMaCodeLineColor("0", "0", "0"), false);
                InputStream input = new FileInputStream(erCodeFile1);
                byte[] byt1 = new byte[input.available()];
                input.read(byt1);
                String picUrl1 = qiNiuUploadConfig.uploadImgDefaultName("/maga/ercode/", byt1);
                magazine.setPreSmallCode(picUrl1);
            }catch (Exception e) {
                //throw new EtwasException(EtwasExceptionEnum.PARAM_ERROR.getCode(),"小程序码生成异常");
            }
        }

        magazineService.updateById(magazine);

        //清除redis
        String redisKey = "Magazine_" + magazine.getId();
        redisService.del(redisKey);

        return SUCCESS_TIP;
    }

    /**
     * 杂志管理详情
     */
    @RequestMapping(value = "/detail/{magazineId}")
    @ResponseBody
    public Object detail(@PathVariable("magazineId") Integer magazineId) {
        return magazineService.selectById(magazineId);
    }


    /**
     * 枚举转化
     * @param magazine
     */
    private void checkAndChangeAttribute(RMagazine magazine){
        try {
            //杂志分类
            if(magazine != null && magazine.getCategoryId() != null) {
                magazine.setCategoryName(RMagazineCategroyEnum.getEnumByValue(magazine.getCategoryId()).getName());
            }else{
                magazine.setCategoryName(RMagazineCategroyEnum.HOT.getName());
                magazine.setCategoryId(RMagazineCategroyEnum.HOT.getValue());
            }
            //杂志人物类别
            if(magazine != null && magazine.getPersonType() != null) {
                magazine.setPersonTypeName(RMagazinePersonEnum.getEnumByValue(magazine.getPersonType()).getName());
            }
            //更新杂志首次上架时间
            if(magazine != null && RMagazineStatusEnum.PUBLISH.getValue().equals(magazine.getStatus()) && magazine.getUpDate() == null) {
                magazine.setUpDate(new Date());
            }
            if(magazine.getPrice() == null) {
                magazine.setPrice(new BigDecimal(6));
            }
            magazine.setOpenRankList(true);
            magazine.setYear(DateUtil.getYear());

        }catch (Exception e){
           throw  new EtwasException(EtwasExceptionEnum.PARAM_ERROR);
        }
    }
}
