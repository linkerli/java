package com.cola.magazine.rest.modular.magazine.service;

import com.baomidou.mybatisplus.mapper.EntityWrapper;
import com.baomidou.mybatisplus.mapper.Wrapper;
import com.cola.magazine.core.enums.RMagazineReadCodeSourceEnum;
import com.cola.magazine.core.enums.RMagazineStatusEnum;
import com.cola.magazine.core.enums.ReadCodeActiveStatusEnum;
import com.cola.magazine.core.exception.EtwasException;
import com.cola.magazine.core.redis.RedisService;
import com.cola.magazine.core.redis.config.RedisConstant;
import com.cola.magazine.core.util.DateUtils;
import com.cola.magazine.modular.system.model.RMagazine;
import com.cola.magazine.modular.system.model.RMagazineReadCode;
import com.cola.magazine.modular.system.model.WxUser;
import com.cola.magazine.modular.system.service.IRMagazineReadCodeService;
import com.cola.magazine.modular.system.service.IRMagazineService;
import com.cola.magazine.rest.common.exception.BizExceptionEnum;
import com.cola.magazine.rest.modular.magazine.dto.MagazineDto;
import com.cola.magazine.rest.modular.magazine.dto.MagazineRankDto;
import com.cola.magazine.rest.modular.magazine.dto.MagazineReadCodeDto;
import com.cola.magazine.rest.modular.magazine.dto.MagazineViewDto;
import com.cola.magazine.rest.modular.magazine.param.MagazineCodeParam;
import com.cola.magazine.rest.modular.wxuser.service.WxUser2Service;
import com.cola.magazine.rest.userinfo.LoginUser;
import com.cola.magazine.rest.userinfo.ThreadUserLocal;
import org.apache.commons.collections.CollectionUtils;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.math.BigDecimal;
import java.util.ArrayList;
import java.util.Comparator;
import java.util.Date;
import java.util.List;
import java.util.stream.Collectors;

/**
 * @author: 可乐
 * @date: 2020/09/23 16:44
 * <p>
 * Copyright (C),
 */
@Transactional
@Service
public class Magazine2Service {


    private static final Logger LOGGER  = LoggerFactory.getLogger(Magazine2Service.class);


    public static final String REDIS_PRE_SUFFIX_MAGAZINE = "Magazine_" ;
    public static final String REDIS_PRE_SUFFIX_READ_CODE_ERROR = "ReadCodeError_" ;

    @Autowired
    RedisService redisService;
    @Autowired
    IRMagazineService magazineService;
    @Autowired
    IRMagazineReadCodeService magazineReadCodeService;
    @Autowired
    WxUser2Service wxUser2Service;


    public RMagazine getRMagazineFromRedis(Long magazineId) {
        String redisKey = REDIS_PRE_SUFFIX_MAGAZINE + magazineId;
        RMagazine magazine = redisService.hget(redisKey,RMagazine.class);
        if(magazine.getId() == null) {
            magazine = magazineService.selectById(magazineId);
            redisService.hmset(redisKey,magazine);
            redisService.expire(redisKey, RedisConstant.TEN_MINUTE_MILLISECOND);
        }
        if(magazine == null || magazine.getId() == null) {
            return null;
        }
        return magazine;
    }

    private MagazineDto getMagazineDto(RMagazine magazine){

        MagazineDto magazineDto = new MagazineDto();
        magazineDto.setMagId(magazine.getId());
        magazineDto.setTitle(magazine.getTitle());
        magazineDto.setItemCover(magazine.getItemCover());
        magazineDto.setItemDesc(magazine.getItemDesc());
        magazineDto.setIssue(magazine.getIssue());
        magazineDto.setItemPreviewPic(magazine.getItemPreviewPic());
        magazineDto.setYear(magazine.getYear());
        magazineDto.setMonth(DateUtils.date2String(magazine.getUpDate(),DateUtils.TIME_FORMAT_S));
        magazineDto.setReadCount(getReadCountToString(magazine.getReadCount() + magazine.getInitReadCount()));
        magazineDto.setPrice(magazine.getPrice());
        magazineDto.setShowRankOrNot(magazine.getOpenRankList());
        magazineDto.setPreSmallCode(magazine.getPreSmallCode());

        magazineDto.setRankIntroPic(magazine.getRankIntroPic());

        return magazineDto;
    }


    /***
     * 阅读码验证
     * 1：错误5次之后需要等待 10分钟后 才能重试 避免阅读码被耍
     * 2：阅读码验证 分为两大类 一类是用户主动输入 一类是别人分享的阅读码自动提交接口验证
     * 3：分享的验证码需要有一个前端的提示窗口，确定后才能会被核销
     * 4：自己在公众号购买 ，然后进入小程序 这里会自动核销一个 阅读码核销的时机
     * @param magazineCodeParam
     * @return
     */
    public String verifyMagazineCode(MagazineCodeParam magazineCodeParam) {

        LOGGER.info("MagazineCodeParam>>{}",magazineCodeParam);

        LoginUser loginUser = ThreadUserLocal.getUserLocal();

        RMagazine magazine = this.getRMagazineFromRedis(magazineCodeParam.getMagaId());
        if(magazine == null){
            throw new EtwasException(BizExceptionEnum.BIZ_ERROR.getCode(),"电子刊不存在");
        }
        if(RMagazineStatusEnum.UN_PUBLISH.getValue().equals(magazine.getStatus())){
            //
            if("ETWAS".equalsIgnoreCase(magazineCodeParam.getReadCode())) {
                return magazine.getH5Path();
            }else{
                throw new EtwasException(BizExceptionEnum.BIZ_ERROR.getCode(),"电子刊暂未上架,或口令不存在");
            }
        }
        //校验用户 用户输入的 阅读码错误次数 目前限定在redis里面 用户一天只能输入错误 10次
        String errorRedisKey = REDIS_PRE_SUFFIX_READ_CODE_ERROR + loginUser.getUserId();
        String errorCountStr = redisService.get(errorRedisKey);
        Integer errorCount = Integer.parseInt(errorCountStr == null? "0" : errorCountStr);
        if(errorCount > 5 && magazineCodeParam.getUserInputOrNot()) {
            throw new EtwasException(BizExceptionEnum.BIZ_ERROR.getCode(),"阅读码错误次数过多，请稍后重试");
        }
        //读取阅读码
        Wrapper<RMagazineReadCode> readCodeWrapper = new EntityWrapper<>();
        readCodeWrapper.eq("mag_id",magazineCodeParam.getMagaId());
        readCodeWrapper.eq("read_code",magazineCodeParam.getReadCode());
        RMagazineReadCode rMagazineReadCode = magazineReadCodeService.selectOne(readCodeWrapper);
        if(rMagazineReadCode == null) {
            redisService.set(errorRedisKey,String.valueOf(errorCount + 1));
            redisService.expire(errorRedisKey,RedisConstant.TEN_MINUTE_MILLISECOND);
            throw new EtwasException(BizExceptionEnum.BIZ_ERROR.getCode(),"阅读码无效,多次错误会被锁定！");
        }
        if(ReadCodeActiveStatusEnum.ACTIVIE.getValue().equals(rMagazineReadCode.getStatus()) &&
                rMagazineReadCode.getUsedUserId().equals(rMagazineReadCode.getBuyUserId())) {
            throw new EtwasException(BizExceptionEnum.BIZ_ERROR.getCode(),"阅读码已使用");
        }
        if(ReadCodeActiveStatusEnum.ACTIVIE.getValue().equals(rMagazineReadCode.getStatus()) &&
                !rMagazineReadCode.getUsedUserId().equals(rMagazineReadCode.getBuyUserId())) {
            throw new EtwasException(BizExceptionEnum.BIZ_ERROR.getCode(),"阅读码已被领取");
        }

        //核销
        rMagazineReadCode.setUsedUserId(loginUser.getUserId());
        rMagazineReadCode.setUsedUserName(loginUser.getUserName());
        rMagazineReadCode.setUsedUserPic(loginUser.getUserHeadPic());
        rMagazineReadCode.setStatus(ReadCodeActiveStatusEnum.ACTIVIE.getValue());
        rMagazineReadCode.setActiviteTime(new Date());

        if(magazineReadCodeService.updateById(rMagazineReadCode)){
            return magazine.getH5Path();
        } else {
            throw new EtwasException(BizExceptionEnum.BIZ_ERROR);
        }
    }

    public String checkUserGetMagazine(Long magaId) {
        LoginUser loginUser = ThreadUserLocal.getUserLocal();

        RMagazine magazine = this.getRMagazineFromRedis(magaId);

        //读取用户和该杂志的关系
        Wrapper<RMagazineReadCode> readCodeWrapper = new EntityWrapper<>();
        readCodeWrapper.eq("mag_id",magaId);
        readCodeWrapper.eq("used_user_id",loginUser.getUserId());
        RMagazineReadCode rMagazineReadCode = magazineReadCodeService.selectOne(readCodeWrapper);
        //该用户没有使用过该杂志
        if(rMagazineReadCode == null) {
            //判断用户是否购买而且没有激活过该杂志
            Wrapper<RMagazineReadCode> readCodeWrapperBuy = new EntityWrapper<>();
            readCodeWrapperBuy.eq("mag_id",magaId);
            readCodeWrapperBuy.eq("buy_user_id",loginUser.getUserId());
            readCodeWrapperBuy.eq("status",ReadCodeActiveStatusEnum.UN_ACTIVIE.getValue());
            RMagazineReadCode rMagazineReadCodeBuy = magazineReadCodeService.selectOne(readCodeWrapperBuy);
            if(rMagazineReadCodeBuy == null) {
                //说明用户没有可用的阅读码 直接返回 null 前端显示输入阅读码
                return null;
            }
            //核销
            rMagazineReadCodeBuy.setStatus(ReadCodeActiveStatusEnum.ACTIVIE.getValue());
            //使用人就是自己
            rMagazineReadCodeBuy.setUsedUserId(loginUser.getUserId());
            rMagazineReadCodeBuy.setUsedUserName(loginUser.getUserName());
            rMagazineReadCodeBuy.setUsedUserPic(loginUser.getUserHeadPic());

            rMagazineReadCodeBuy.setActiviteTime(new Date());

            magazineReadCodeService.updateById(rMagazineReadCodeBuy);

            return magazine.getH5Path();
        } else {
            return magazine.getH5Path();
        }
    }

    public MagazineViewDto getMagazineViewDto() {
        //读取所有已上线的杂志期刊
        List<RMagazine> rMagazineList = magazineService.selectList(
                new EntityWrapper<RMagazine>()
                        .eq("status",RMagazineStatusEnum.PUBLISH.getValue())
                .orderBy("create_date",false)
        );
        //期刊列表
        MagazineViewDto magazineViewDto = new MagazineViewDto();
        //首页推荐期刊
        List<MagazineDto> magazineDtoList = new ArrayList<>();

        for (int i = 0; i < rMagazineList.size(); i++) {
            RMagazine item = rMagazineList.get(i);
            magazineDtoList.add(getMagazineDto(item));
            //这样保证了最新的第一个推荐被填充 避免后端人员忘记取消历史的推荐
            if(magazineViewDto.getRecMagazineDto() == null && item.getRecommend()) {
                magazineViewDto.setRecMagazineDto(getMagazineDto(item));
            }
        }
        magazineViewDto.setMagazineDtoList(magazineDtoList);
        if(magazineViewDto.getRecMagazineDto() == null && CollectionUtils.isNotEmpty(magazineDtoList)) {
            magazineViewDto.setRecMagazineDto(magazineDtoList.get(0));
        }

        magazineViewDto.setTitleDoc("热门期刊");

        return magazineViewDto;
    }

    public List<MagazineRankDto> getMagazineRankList(Long magaId) {
        //读取指定杂志下的用户订阅总数 订阅总数暂存在status 字段上 数据规模大了会有性能问题 需要后期优化
        List<RMagazineReadCode> readCodeList = magazineReadCodeService.selectList(
                new EntityWrapper<RMagazineReadCode>()
                        .eq("mag_id",magaId)
                        .eq("source_type", RMagazineReadCodeSourceEnum.PUBLIC_JSPI.getValue())
                        .setSqlSelect("count(1) as status,help_user_id as helpUserId")
                        .groupBy("help_user_id")
        );
        readCodeList.sort(Comparator.comparing(RMagazineReadCode::getStatus).reversed());
        //截取前50名
        List<RMagazineReadCode> readCodeListTop50 = readCodeList.subList(0 , readCodeList.size() > 50 ? 50 : readCodeList.size());

        List<Long> userIdList = readCodeListTop50.stream().map(RMagazineReadCode::getHelpUserId).collect(Collectors.toList());

        //读取这批id 对应的最新的头像和昵称
        List<WxUser> wxUserList = wxUser2Service.getWxUserListOnlyNameAndPic(userIdList);

        List<MagazineRankDto> rankDtoList = new ArrayList<>();

        //遍历数组
        readCodeListTop50.forEach(item->{
            MagazineRankDto magazineRankDto = new MagazineRankDto();
            magazineRankDto.setUserId(item.getHelpUserId());
            //使用status 暂存的数据
            magazineRankDto.setHelpReadCount(item.getStatus());
            List<WxUser> wxUserListOne = wxUserList.stream().filter(DO->DO.getId().equals(item.getHelpUserId())).collect(Collectors.toList());
            if(CollectionUtils.isNotEmpty(wxUserListOne)) {
                magazineRankDto.setUserName(wxUserListOne.get(0).getUserNickName());
                magazineRankDto.setUserHeadPic(wxUserListOne.get(0).getUserHeadPic());
            }
            rankDtoList.add(magazineRankDto);
        });

        List<MagazineRankDto> rankDtoStream = rankDtoList.stream().sorted(Comparator.comparing(MagazineRankDto::getHelpReadCount).reversed()).collect(Collectors.toList());


        return rankDtoStream;
    }

    /***
     * 获取用户购买过或者阅读过的
     * @param userId
     * @return
     */
    public List<MagazineDto> getUserReadMagazineList(Long userId) {
        //读取指定杂志下的用户订阅总数 status 暂存 阅读码个数
        List<RMagazineReadCode> readCodeList = magazineReadCodeService.selectList(
                new EntityWrapper<RMagazineReadCode>().eq("buy_user_id",userId)
                        .or()
                        .eq("used_user_id",userId)
                        .setSqlSelect("mag_id as magId,count(1) as status")
                        .groupBy("mag_id")
        );

        List<MagazineDto> magazineDtoList = new ArrayList<>();

        readCodeList.forEach(item->{
            RMagazine rMagazine = this.getRMagazineFromRedis(item.getMagId());
            MagazineDto magazineDto = getMagazineDto(rMagazine);
            magazineDto.setUserReadCodeCount(item.getStatus() + "");
            //TODO 这里前端没有获取正确的字段在H5和小程序，小程序发版需要审核，前端又是统一的 使用 readCount 所以这里用这个值暂存
            //TODO  我已经将前端的字段调整了。不管是前端用哪个字段都可以获取到这个字段含义对应的数据
            magazineDto.setReadCount(item.getStatus() + "");

            magazineDtoList.add(magazineDto);
        });
        return magazineDtoList;

    }

    public List<MagazineReadCodeDto> getMagazineReadCodeList(Long magaId, Long userId) {

        //读取当前用户关联的杂志 阅读码
        //读取指定杂志下的用户订阅总数 status 暂存 阅读码个数
        List<RMagazineReadCode> readCodeList = magazineReadCodeService.selectList(
                new EntityWrapper<RMagazineReadCode>()
                        .eq("mag_id",magaId)
                        .andNew()
                        .eq("buy_user_id",userId)
                        .or()
                        .eq("used_user_id",userId).orderBy("status",false)
        );

        List<MagazineReadCodeDto> readCodeDtoList = new ArrayList<>();

        readCodeList.forEach(item->{
            MagazineReadCodeDto codeDto = new MagazineReadCodeDto();
            codeDto.setReadCode(item.getReadCode());
            codeDto.setUsedUserHeadPic(item.getUsedUserPic());
            codeDto.setStatus(item.getStatus());
            readCodeDtoList.add(codeDto);
        });

        return readCodeDtoList;
    }

    public MagazineDto getMagazineDetail(Long magaId) {
        RMagazine rMagazine = magazineService.selectById(magaId);
        if(rMagazine == null) {
            throw new EtwasException(BizExceptionEnum.BIZ_ERROR.getCode(),"电子刊不存在");
        }

        MagazineDto magazineDto = getMagazineDto(rMagazine);

        return magazineDto;
    }

    private String getReadCountToString(Integer readCount){
        if(readCount < 10000) {
            return String.valueOf(readCount);
        }
        String readCountStr =  new BigDecimal(readCount).divide(new BigDecimal(10000),1,BigDecimal.ROUND_HALF_EVEN).toString();

        return readCountStr + "万";
    }
}
