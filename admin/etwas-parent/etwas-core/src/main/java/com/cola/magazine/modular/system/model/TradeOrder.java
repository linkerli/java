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
 * 交易记录表
 * </p>
 *
 * @author cola
 * @since 2020-09-23
 */
@TableName("trade_order")
public class TradeOrder extends Model<TradeOrder> {

    private static final long serialVersionUID = 1L;

    /**
     * 主键
     */
    @TableId(value = "id", type = IdType.AUTO)
    private Long id;
    /**
     * 订单号
     */
    @TableField("order_code")
    private String orderCode;
    /**
     * 订单名称
     */
    @TableField("order_name")
    private String orderName;
    /**
     * 用户主键
     */
    @TableField("user_id")
    private Long userId;
    /**
     * 用户昵称
     */
    @TableField("user_nick_name")
    private String userNickName;
    /**
     * 用户头像
     */
    @TableField("user_head_pic")
    private String userHeadPic;
    /**
     * 业务来源（1：杂志阅读码）
     */
    @TableField("source_type")
    private Integer sourceType;
    /**
     * 业务id
     */
    @TableField("source_id")
    private Long sourceId;
    /**
     * 业务号码
     */
    @TableField("source_num")
    private String sourceNum;
    /**
     * 总计金额
     */
    @TableField("total_money")
    private BigDecimal totalMoney;
    /**
     * 应付金额
     */
    @TableField("pay_money")
    private BigDecimal payMoney;
    /**
     * 实付金额
     */
    @TableField("actual_money")
    private BigDecimal actualMoney;
    /**
     * 产品总数量
     */
    @TableField("product_count")
    private Integer productCount;
    /**
     * 支付方式（1：微信 2：支付宝）
     */
    @TableField("pay_type")
    private Integer payType;
    /**
     * 支付渠道
     */
    @TableField("channel_type")
    private Integer channelType;
    /**
     * 支付状态
     */
    private Integer status;
    /**
     * 关闭原因
     */
    @TableField("close_reason")
    private String closeReason;
    /**
     * 外部订单号
     */
    @TableField("out_order_code")
    private String outOrderCode;
    /**
     * 支付成功时间
     */
    @TableField("pay_success_date")
    private Date paySuccessDate;
    /**
     * 订单附加信息
     */
    @TableField("order_extra")
    private String orderExtra;
    /**
     * 关闭时间
     */
    @TableField("close_date")
    private Date closeDate;
    /**
     * 创建时间
     */
    @TableField("create_date")
    private Date createDate;
    /**
     * 乐观锁
     */
    @TableField("version_no")
    private Integer versionNo;


    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public String getOrderCode() {
        return orderCode;
    }

    public void setOrderCode(String orderCode) {
        this.orderCode = orderCode;
    }

    public String getOrderName() {
        return orderName;
    }

    public void setOrderName(String orderName) {
        this.orderName = orderName;
    }

    public Long getUserId() {
        return userId;
    }

    public void setUserId(Long userId) {
        this.userId = userId;
    }

    public String getUserNickName() {
        return userNickName;
    }

    public void setUserNickName(String userNickName) {
        this.userNickName = userNickName;
    }

    public String getUserHeadPic() {
        return userHeadPic;
    }

    public void setUserHeadPic(String userHeadPic) {
        this.userHeadPic = userHeadPic;
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

    public String getSourceNum() {
        return sourceNum;
    }

    public void setSourceNum(String sourceNum) {
        this.sourceNum = sourceNum;
    }

    public BigDecimal getTotalMoney() {
        return totalMoney;
    }

    public void setTotalMoney(BigDecimal totalMoney) {
        this.totalMoney = totalMoney;
    }

    public BigDecimal getPayMoney() {
        return payMoney;
    }

    public void setPayMoney(BigDecimal payMoney) {
        this.payMoney = payMoney;
    }

    public BigDecimal getActualMoney() {
        return actualMoney;
    }

    public void setActualMoney(BigDecimal actualMoney) {
        this.actualMoney = actualMoney;
    }

    public Integer getProductCount() {
        return productCount;
    }

    public void setProductCount(Integer productCount) {
        this.productCount = productCount;
    }

    public Integer getPayType() {
        return payType;
    }

    public void setPayType(Integer payType) {
        this.payType = payType;
    }

    public Integer getChannelType() {
        return channelType;
    }

    public void setChannelType(Integer channelType) {
        this.channelType = channelType;
    }

    public Integer getStatus() {
        return status;
    }

    public void setStatus(Integer status) {
        this.status = status;
    }

    public String getCloseReason() {
        return closeReason;
    }

    public void setCloseReason(String closeReason) {
        this.closeReason = closeReason;
    }

    public String getOutOrderCode() {
        return outOrderCode;
    }

    public void setOutOrderCode(String outOrderCode) {
        this.outOrderCode = outOrderCode;
    }

    public Date getPaySuccessDate() {
        return paySuccessDate;
    }

    public void setPaySuccessDate(Date paySuccessDate) {
        this.paySuccessDate = paySuccessDate;
    }

    public String getOrderExtra() {
        return orderExtra;
    }

    public void setOrderExtra(String orderExtra) {
        this.orderExtra = orderExtra;
    }

    public Date getCloseDate() {
        return closeDate;
    }

    public void setCloseDate(Date closeDate) {
        this.closeDate = closeDate;
    }

    public Date getCreateDate() {
        return createDate;
    }

    public void setCreateDate(Date createDate) {
        this.createDate = createDate;
    }

    public Integer getVersionNo() {
        return versionNo;
    }

    public void setVersionNo(Integer versionNo) {
        this.versionNo = versionNo;
    }

    @Override
    protected Serializable pkVal() {
        return this.id;
    }

    @Override
    public String toString() {
        return "TradeOrder{" +
        "id=" + id +
        ", orderCode=" + orderCode +
        ", orderName=" + orderName +
        ", userId=" + userId +
        ", userNickName=" + userNickName +
        ", userHeadPic=" + userHeadPic +
        ", sourceType=" + sourceType +
        ", sourceId=" + sourceId +
        ", sourceNum=" + sourceNum +
        ", totalMoney=" + totalMoney +
        ", payMoney=" + payMoney +
        ", actualMoney=" + actualMoney +
        ", productCount=" + productCount +
        ", payType=" + payType +
        ", channelType=" + channelType +
        ", status=" + status +
        ", closeReason=" + closeReason +
        ", outOrderCode=" + outOrderCode +
        ", paySuccessDate=" + paySuccessDate +
        ", orderExtra=" + orderExtra +
        ", closeDate=" + closeDate +
        ", createDate=" + createDate +
        ", versionNo=" + versionNo +
        "}";
    }
}
