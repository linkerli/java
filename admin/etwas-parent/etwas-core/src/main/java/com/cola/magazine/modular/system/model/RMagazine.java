package com.cola.magazine.modular.system.model;

import com.baomidou.mybatisplus.activerecord.Model;
import com.baomidou.mybatisplus.annotations.TableField;
import com.baomidou.mybatisplus.annotations.TableId;
import com.baomidou.mybatisplus.annotations.TableName;
import com.baomidou.mybatisplus.enums.IdType;

import java.io.Serializable;
import java.math.BigDecimal;
import java.util.Date;

/**
 * <p>
 * 杂志资源表
 * </p>
 *
 * @author cola
 * @since 2020-10-11
 */
@TableName("r_magazine")
public class RMagazine extends Model<RMagazine> {

    private static final long serialVersionUID = 1L;

    /**
     * 主键
     */
    @TableId(value = "id", type = IdType.AUTO)
    private Long id;
    /**
     * 杂志名称
     */
    private String title;
    /**
     * 杂志种类
     */
    @TableField("category_id")
    private Integer categoryId;
    /**
     * 杂志种类名称
     */
    @TableField("category_name")
    private String categoryName;
    /**
     * 杂志类别（1：个人 2：团体多个个人）
     */
    @TableField("person_type")
    private Integer personType;
    /**
     * 类别名称
     */
    @TableField("person_type_name")
    private String personTypeName;
    /**
     * 杂志h5链接
     */
    @TableField("H5_path")
    private String h5Path;
    /**
     * 排行榜背景图
     */
    @TableField("rank_intro_pic")
    private String rankIntroPic;
    /**
     * 是否开放排行榜
     */
    @TableField("is_open_rank_list")
    private Boolean isOpenRankList;
    /**
     * 是否推荐
     */
    @TableField("is_recommend")
    private Boolean isRecommend;
    /**
     * 年份
     */
    private String year;
    /**
     * 出版号
     */
    private String issue;
    /**
     * 杂志封面
     */
    @TableField("item_cover")
    private String itemCover;
    /**
     * 杂志预览图（1-4张）
     */
    @TableField("item_preview_pic")
    private String itemPreviewPic;
    /**
     * 初始值
     */
    @TableField("init_read_count")
    private Integer initReadCount;
    /**
     * 订阅数量
     */
    @TableField("read_count")
    private Integer readCount;
    /**
     * H5zip包
     */
    @TableField("h5_source_zip")
    private String h5SourceZip;
    /**
     * 杂志介绍
     */
    @TableField("item_desc")
    private String itemDesc;
    /**
     * 杂志状态（1未发布，2已发布）
     */
    private Integer status;
    /**
     * 预览二维码
     */
    @TableField("pre_small_code")
    private String preSmallCode;
    /**
     * 发布时间
     */
    @TableField("up_date")
    private Date upDate;
    /**
     * 单价
     */
    private BigDecimal price;
    /**
     * 是否有效业务(1:有效 0无效)
     */
    private Integer valid;
    /**
     * 创建时间
     */
    @TableField("create_date")
    private Date createDate;
    /**
     * 最后一次修改时间
     */
    @TableField("modify_date")
    private Date modifyDate;


    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public String getTitle() {
        return title;
    }

    public void setTitle(String title) {
        this.title = title;
    }

    public Integer getCategoryId() {
        return categoryId;
    }

    public void setCategoryId(Integer categoryId) {
        this.categoryId = categoryId;
    }

    public String getCategoryName() {
        return categoryName;
    }

    public void setCategoryName(String categoryName) {
        this.categoryName = categoryName;
    }

    public Integer getPersonType() {
        return personType;
    }

    public void setPersonType(Integer personType) {
        this.personType = personType;
    }

    public String getPersonTypeName() {
        return personTypeName;
    }

    public void setPersonTypeName(String personTypeName) {
        this.personTypeName = personTypeName;
    }

    public String getH5Path() {
        return h5Path;
    }

    public void setH5Path(String h5Path) {
        this.h5Path = h5Path;
    }

    public String getRankIntroPic() {
        return rankIntroPic;
    }

    public void setRankIntroPic(String rankIntroPic) {
        this.rankIntroPic = rankIntroPic;
    }

    public Boolean getOpenRankList() {
        return isOpenRankList;
    }

    public void setOpenRankList(Boolean openRankList) {
        isOpenRankList = openRankList;
    }

    public Boolean getRecommend() {
        return isRecommend;
    }

    public void setRecommend(Boolean recommend) {
        isRecommend = recommend;
    }

    public String getYear() {
        return year;
    }

    public void setYear(String year) {
        this.year = year;
    }

    public String getIssue() {
        return issue;
    }

    public void setIssue(String issue) {
        this.issue = issue;
    }

    public String getItemCover() {
        return itemCover;
    }

    public void setItemCover(String itemCover) {
        this.itemCover = itemCover;
    }

    public String getItemPreviewPic() {
        return itemPreviewPic;
    }

    public void setItemPreviewPic(String itemPreviewPic) {
        this.itemPreviewPic = itemPreviewPic;
    }

    public Integer getInitReadCount() {
        return initReadCount;
    }

    public void setInitReadCount(Integer initReadCount) {
        this.initReadCount = initReadCount;
    }

    public Integer getReadCount() {
        return readCount;
    }

    public void setReadCount(Integer readCount) {
        this.readCount = readCount;
    }

    public String getH5SourceZip() {
        return h5SourceZip;
    }

    public void setH5SourceZip(String h5SourceZip) {
        this.h5SourceZip = h5SourceZip;
    }

    public String getItemDesc() {
        return itemDesc;
    }

    public void setItemDesc(String itemDesc) {
        this.itemDesc = itemDesc;
    }

    public Integer getStatus() {
        return status;
    }

    public void setStatus(Integer status) {
        this.status = status;
    }

    public String getPreSmallCode() {
        return preSmallCode;
    }

    public void setPreSmallCode(String preSmallCode) {
        this.preSmallCode = preSmallCode;
    }

    public Date getUpDate() {
        return upDate;
    }

    public void setUpDate(Date upDate) {
        this.upDate = upDate;
    }

    public BigDecimal getPrice() {
        return price;
    }

    public void setPrice(BigDecimal price) {
        this.price = price;
    }

    public Integer getValid() {
        return valid;
    }

    public void setValid(Integer valid) {
        this.valid = valid;
    }

    public Date getCreateDate() {
        return createDate;
    }

    public void setCreateDate(Date createDate) {
        this.createDate = createDate;
    }

    public Date getModifyDate() {
        return modifyDate;
    }

    public void setModifyDate(Date modifyDate) {
        this.modifyDate = modifyDate;
    }

    @Override
    protected Serializable pkVal() {
        return this.id;
    }

    @Override
    public String toString() {
        return "RMagazine{" +
        "id=" + id +
        ", title=" + title +
        ", categoryId=" + categoryId +
        ", categoryName=" + categoryName +
        ", personType=" + personType +
        ", personTypeName=" + personTypeName +
        ", h5Path=" + h5Path +
        ", rankIntroPic=" + rankIntroPic +
        ", isOpenRankList=" + isOpenRankList +
        ", isRecommend=" + isRecommend +
        ", year=" + year +
        ", issue=" + issue +
        ", itemCover=" + itemCover +
        ", itemPreviewPic=" + itemPreviewPic +
        ", initReadCount=" + initReadCount +
        ", readCount=" + readCount +
        ", h5SourceZip=" + h5SourceZip +
        ", itemDesc=" + itemDesc +
        ", status=" + status +
        ", preSmallCode=" + preSmallCode +
        ", upDate=" + upDate +
        ", price=" + price +
        ", valid=" + valid +
        ", createDate=" + createDate +
        ", modifyDate=" + modifyDate +
        "}";
    }
}
