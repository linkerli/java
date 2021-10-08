/**
 * 初始化订单管理详情对话框
 */
var TradeOrderInfoDlg = {
    tradeOrderInfoData : {}
};

/**
 * 清除数据
 */
TradeOrderInfoDlg.clearData = function() {
    this.tradeOrderInfoData = {};
}

/**
 * 设置对话框中的数据
 *
 * @param key 数据的名称
 * @param val 数据的具体值
 */
TradeOrderInfoDlg.set = function(key, val) {
    this.tradeOrderInfoData[key] = (typeof val == "undefined") ? $("#" + key).val() : val;
    return this;
}

/**
 * 设置对话框中的数据
 *
 * @param key 数据的名称
 * @param val 数据的具体值
 */
TradeOrderInfoDlg.get = function(key) {
    return $("#" + key).val();
}

/**
 * 关闭此对话框
 */
TradeOrderInfoDlg.close = function() {
    parent.layer.close(window.parent.TradeOrder.layerIndex);
}

/**
 * 收集数据
 */
TradeOrderInfoDlg.collectData = function() {
    this
    .set('id')
    .set('orderCode')
    .set('orderName')
    .set('userId')
    .set('userNickName')
    .set('userHeadPic')
    .set('sourceType')
    .set('sourceId')
    .set('sourceNum')
    .set('totalMoney')
    .set('payMoney')
    .set('actualMoney')
    .set('payType')
    .set('channelType')
    .set('status')
    .set('closeReason')
    .set('paySuccessDate')
    .set('closeDate')
    .set('versionNo');
}

/**
 * 提交添加
 */
TradeOrderInfoDlg.addSubmit = function() {

    this.clearData();
    this.collectData();

    //提交信息
    var ajax = new $ax(Feng.ctxPath + "/tradeOrder/add", function(data){
        Feng.success("添加成功!");
        window.parent.TradeOrder.table.refresh();
        TradeOrderInfoDlg.close();
    },function(data){
        Feng.error("添加失败!" + data.responseJSON.message + "!");
    });
    ajax.set(this.tradeOrderInfoData);
    ajax.start();
}

/**
 * 提交修改
 */
TradeOrderInfoDlg.editSubmit = function() {

    this.clearData();
    this.collectData();

    //提交信息
    var ajax = new $ax(Feng.ctxPath + "/tradeOrder/update", function(data){
        Feng.success("修改成功!");
        window.parent.TradeOrder.table.refresh();
        TradeOrderInfoDlg.close();
    },function(data){
        Feng.error("修改失败!" + data.responseJSON.message + "!");
    });
    ajax.set(this.tradeOrderInfoData);
    ajax.start();
}

$(function() {

});
