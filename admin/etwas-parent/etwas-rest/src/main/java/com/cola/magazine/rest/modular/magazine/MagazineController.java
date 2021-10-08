package com.cola.magazine.rest.modular.magazine;

import com.cola.magazine.rest.modular.magazine.dto.MagazineDto;
import com.cola.magazine.rest.modular.magazine.dto.MagazineRankDto;
import com.cola.magazine.rest.modular.magazine.dto.MagazineViewDto;
import com.cola.magazine.rest.modular.magazine.param.MagazineCodeParam;
import com.cola.magazine.rest.modular.magazine.service.Magazine2Service;
import io.swagger.annotations.Api;
import io.swagger.annotations.ApiOperation;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

/**
 * @author: 可乐
 * @date: 2020/09/23 10:54
 * <p>
 * Copyright (C),
 */
@RestController
@RequestMapping("api/magazine")
@Api(tags = "杂志模块")
public class MagazineController {

    @Autowired
    Magazine2Service magazine2Service;

    @ApiOperation(value = "[M1]检查当前用户是否有订阅过该杂志", notes = "检查当前用户是否有订阅过该杂志（点击阅读请求）返回空 弹窗阅读码输入")
    @PostMapping("checkUserGetMagazine")
    public ResponseEntity<String> checkUserGetMagazine(@RequestParam Long magaId) {
        String h5Path = magazine2Service.checkUserGetMagazine(magaId);
        return ResponseEntity.ok(h5Path);
    }

    @ApiOperation(value = "[M2]验证券码获取H5链接", notes = "验证券码获取H5链接,验证成功即返回H5地址")
    @PostMapping("verifyMagazineCode")
    public ResponseEntity<String> verifyMagazineCode(@RequestBody MagazineCodeParam magazineCodeParam) {
        String h5Path = magazine2Service.verifyMagazineCode(magazineCodeParam);
        return ResponseEntity.ok(h5Path);
    }

    @ApiOperation(value = "[M3]获取首页杂志数据", notes = "包含了置顶杂志对象和下面的杂志列表")
    @GetMapping("getMagazineViewDto")
    public ResponseEntity<MagazineViewDto> getMagazineViewDto() {
        MagazineViewDto magazineViewDto = magazine2Service.getMagazineViewDto();
        return ResponseEntity.ok(magazineViewDto);
    }

    @ApiOperation(value = "[M4]获取杂志详情页排行版列表", notes = "该接口根据杂志详情的是否展示字段来作为前置判断")
    @GetMapping("getMagazineRankList")
    public ResponseEntity<List<MagazineRankDto>> getMagazineRankList(@RequestParam Long magaId) {
        List<MagazineRankDto> magazineRankDtoList = magazine2Service.getMagazineRankList(magaId);
        return ResponseEntity.ok(magazineRankDtoList);
    }

    @ApiOperation(value = "[M5]获取指定杂志的详情数据", notes = "获取指定杂志的详情数据")
    @GetMapping("getMagazineDetail")
    public ResponseEntity<MagazineDto> getMagazineDetail(Long magaId) {
        MagazineDto magazineDto = magazine2Service.getMagazineDetail(magaId);
        return ResponseEntity.ok(magazineDto);
    }

}
