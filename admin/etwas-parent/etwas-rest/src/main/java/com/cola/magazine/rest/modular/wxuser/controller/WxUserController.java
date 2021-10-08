package com.cola.magazine.rest.modular.wxuser.controller;

import com.cola.magazine.rest.modular.magazine.dto.MagazineDto;
import com.cola.magazine.rest.modular.magazine.dto.MagazineReadCodeDto;
import com.cola.magazine.rest.modular.magazine.service.Magazine2Service;
import com.cola.magazine.rest.modular.wxuser.dto.QiNiuUploadTokenDto;
import com.cola.magazine.rest.modular.wxuser.dto.WxUserDto;
import com.cola.magazine.rest.modular.wxuser.param.WxUserParam;
import com.cola.magazine.rest.modular.wxuser.service.WxUser2Service;
import com.cola.magazine.rest.userinfo.LoginUser;
import com.cola.magazine.rest.userinfo.ThreadUserLocal;
import io.swagger.annotations.Api;
import io.swagger.annotations.ApiOperation;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

/***
 * @author 可乐
 */
@RequestMapping("api/userCenter")
@Api(tags = "个人中心我的")
@RestController
public class WxUserController {

    @Autowired
    WxUser2Service wxUser2Service;
    @Autowired
    Magazine2Service magazine2Service;

    @ApiOperation(value = "[UC1]获取登录人用户信息", notes = "获取登录人用户信息")
    @GetMapping("getWxUserDto")
    public ResponseEntity<WxUserDto> getAppUserDto() {
        //登录信息中获取用户信息
        LoginUser loginUser = ThreadUserLocal.getUserLocal();

        WxUserDto wxUserDto = new WxUserDto();
        wxUserDto.setUserNickName(loginUser.getUserName());
        wxUserDto.setUserHeadPic(loginUser.getUserHeadPic());

        return ResponseEntity.ok(wxUserDto);
    }

    @ApiOperation(value = "[UC2]获取更新用户名称和头像", notes = "获取更新用户名称和头像")
    @PostMapping("updateUserInfo")
    public ResponseEntity<String> updateUserInfo(@RequestBody WxUserParam wxUserParam) {
        wxUser2Service.updateUserInfo(wxUserParam);
        return ResponseEntity.ok("更新成功");
    }


    @ApiOperation(value = "[UC3]获取七牛上传凭据", notes = "获取七牛上传凭据")
    @PostMapping("createQiNiuUploadToken")
    public ResponseEntity<QiNiuUploadTokenDto> createQiNiuUploadToken() {
        QiNiuUploadTokenDto tokenDto = wxUser2Service.createQiNiuUploadToken();
        return ResponseEntity.ok(tokenDto);
    }


    @ApiOperation(value = "[UC4]获取用户已订阅的杂志列表", notes = "包含了自己购买的和接受别人分享的")
    @GetMapping("getUserReadMagazineList")
    public ResponseEntity<List<MagazineDto>> getUserReadMagazineList() {
        LoginUser loginUser = ThreadUserLocal.getUserLocal();
        List<MagazineDto> magazineDtoList = magazine2Service.getUserReadMagazineList(loginUser.getUserId());
        return ResponseEntity.ok(magazineDtoList);
    }


    @ApiOperation(value = "[UC5]根据杂志id获取用户关联的阅读码列表", notes = "包含了自己购买的和接受别人分享的阅读码")
    @PostMapping("getMagazineReadCodeList")
    public ResponseEntity<List<MagazineReadCodeDto>> getMagazineReadCodeList(@RequestParam Long magaId) {
        LoginUser loginUser = ThreadUserLocal.getUserLocal();
        List<MagazineReadCodeDto> readMagazineList = magazine2Service.getMagazineReadCodeList(magaId,loginUser.getUserId());
        return ResponseEntity.ok(readMagazineList);
    }


}
