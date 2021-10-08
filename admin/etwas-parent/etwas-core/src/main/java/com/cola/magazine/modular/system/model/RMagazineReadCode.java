package com.cola.magazine.modular.system.model;

import com.baomidou.mybatisplus.activerecord.Model;
import com.baomidou.mybatisplus.annotations.TableField;
import com.baomidou.mybatisplus.annotations.TableId;
import com.baomidou.mybatisplus.annotations.TableName;
import com.baomidou.mybatisplus.enums.IdType;

import java.io.Serializable;
import java.util.Date;

/**
 * <p>
 * 杂志购买阅读码
 * </p>
 *
 * @author cola
 * @since 2020-09-23
 */
@TableName("r_magazine_read_code")
public class RMagazineReadCode extends Model<RMagazineReadCode> {

    private static final long serialVersionUID = 1L;

    /**
     * 主键
     */
    @TableId(value = "id", type = IdType.AUTO)
    private Long id;
    /**
     * 杂志id
     */
    @TableField("mag_id")
    private Long magId;
    /**
     * 杂志标题
     */
    @TableField("mag_title")
    private String magTitle;
    /**
     * 阅读码产生来源（1：系统管理员生成 2：用户购买）
     */
    @TableField("source_type")
    private Integer sourceType;
    /**
     * 阅读码产生来源（2：用户购买 r_magazine_order的主键 ）
     */
    @TableField("source_id")
    private Long sourceId;
    /**
     * 阅读码
     */
    @TableField("read_code")
    private String readCode;
    /**
     * 阅读码状态（1：未激活 2已激活）
     */
    private Integer status;
    /**
     * 激活时间
     */
    @TableField("activite_time")
    private Date activiteTime;
    /**
     * 使用用户
     */
    @TableField("used_user_id")
    private Long usedUserId;
    /**
     * 使用用户名
     */
    @TableField("used_user_name")
    private String usedUserName;
    /**
     * 使用用户头像
     */
    @TableField("used_user_pic")
    private String usedUserPic;
    /**
     * 购买人
     */
    @TableField("buy_user_id")
    private Long buyUserId;
    /**
     * 购买人昵称
     */
    @TableField("buy_user_name")
    private String buyUserName;
    /**
     * 购买人头像
     */
    @TableField("buy_user_pic")
    private String buyUserPic;
    /**
     * 助力人id
     */
    @TableField("help_user_id")
    private Long helpUserId;
    /**
     * 备注
     */
    private String remark;
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
     * 修改时间
     */
    @TableField("modify_date")
    private Date modifyDate;


    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public Long getMagId() {
        return magId;
    }

    public void setMagId(Long magId) {
        this.magId = magId;
    }

    public String getMagTitle() {
        return magTitle;
    }

    public void setMagTitle(String magTitle) {
        this.magTitle = magTitle;
    }

    public Integer getSourceType() {
        return sourceType;
    }

    public void setSourceType(Integer sourceType) {
        this.sourceType = sourceType;
    }

    public Long getSourceId() {
        return sourceId;
    }

    public void setSourceId(Long sourceId) {
        this.sourceId = sourceId;
    }

    public String getReadCode() {
        return readCode;
    }

    public void setReadCode(String readCode) {
        this.readCode = readCode;
    }

    public Integer getStatus() {
        return status;
    }

    public void setStatus(Integer status) {
        this.status = status;
    }

    public Date getActiviteTime() {
        return activiteTime;
    }

    public void setActiviteTime(Date activiteTime) {
        this.activiteTime = activiteTime;
    }

    public Long getUsedUserId() {
        return usedUserId;
    }

    public void setUsedUserId(Long usedUserId) {
        this.usedUserId = usedUserId;
    }

    public String getUsedUserName() {
        return usedUserName;
    }

    public void setUsedUserName(String usedUserName) {
        this.usedUserName = usedUserName;
    }

    public String getUsedUserPic() {
        return usedUserPic;
    }

    public void setUsedUserPic(String usedUserPic) {
        this.usedUserPic = usedUserPic;
    }

    public Long getBuyUserId() {
        return buyUserId;
    }

    public void setBuyUserId(Long buyUserId) {
        this.buyUserId = buyUserId;
    }

    public String getBuyUserName() {
        return buyUserName;
    }

    public void setBuyUserName(String buyUserName) {
        this.buyUserName = buyUserName;
    }

    public String getBuyUserPic() {
        return buyUserPic;
    }

    public void setBuyUserPic(String buyUserPic) {
        this.buyUserPic = buyUserPic;
    }

    public Long getHelpUserId() {
        return helpUserId;
    }

    public void setHelpUserId(Long helpUserId) {
        this.helpUserId = helpUserId;
    }

    public String getRemark() {
        return remark;
    }

    public void setRemark(String remark) {
        this.remark = remark;
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
        return "RMagazineReadCode{" +
        "id=" + id +
        ", magId=" + magId +
        ", magTitle=" + magTitle +
        ", sourceType=" + sourceType +
        ", sourceId=" + sourceId +
        ", readCode=" + readCode +
        ", status=" + status +
        ", activiteTime=" + activiteTime +
        ", usedUserId=" + usedUserId +
        ", usedUserName=" + usedUserName +
        ", usedUserPic=" + usedUserPic +
        ", buyUserId=" + buyUserId +
        ", buyUserName=" + buyUserName +
        ", buyUserPic=" + buyUserPic +
        ", helpUserId=" + helpUserId +
        ", remark=" + remark +
        ", valid=" + valid +
        ", createDate=" + createDate +
        ", modifyDate=" + modifyDate +
        "}";
    }
}
