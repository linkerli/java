/**
 * 订单管理管理初始化
 */
var TradeOrder = {
    id: "TradeOrderTable",	//表格id
    seItem: null,		//选中的条目
    table: null,
    layerIndex: -1
};

/**
 * 初始化表格的列
 */
TradeOrder.initColumn = function () {
    return [
        {field: 'selectItem', radio: true},
            {title: '主键', field: 'id', visible: false, align: 'center', valign: 'middle'},
            {title: '订单号', field: 'orderCode', visible: false, align: 'center', valign: 'middle'},
            {title: '订单名称', field: 'orderName', visible: true, align: 'center', valign: 'middle'},
            {title: '用户主键', field: 'userId', visible: false, align: 'center', valign: 'middle'},
            {title: '用户昵称', field: 'userNickName', visible: true, align: 'center', valign: 'middle'},
            {title: '用户头像', visible: false, align: 'center', valign: 'middle',formatter: function(value,row,index){
                    return '<img style="width: 40px;height: 40px" src="'+row.userHeadPic+'"/>';
                }},
            {title: '业务来源（1：杂志阅读码）', field: 'sourceType', visible: false, align: 'center', valign: 'middle'},
            {title: '业务id', field: 'sourceId', visible: false, align: 'center', valign: 'middle'},
            {title: '业务来源', field: 'sourceNum', visible: true, align: 'center', valign: 'middle'},
            {title: '总计金额', field: 'totalMoney', visible: false, align: 'center', valign: 'middle'},
            {title: '应付金额', field: 'payMoney', visible: false, align: 'center', valign: 'middle'},
            {title: '实付金额', field: 'actualMoney', visible: true, align: 'center', valign: 'middle'},
            {title: '支付方式（1：微信 2：支付宝）', field: 'payType', visible: false, align: 'center', valign: 'middle'},
            {title: '支付渠道', field: 'channelType', visible: false, align: 'center', valign: 'middle'},
            {title: '支付状态', field: 'status', visible: true, align: 'center', valign: 'middle'},
            {title: '关闭原因', field: 'closeReason', visible: false, align: 'center', valign: 'middle'},
            {title: '订单创建时间', field: 'createDate', visible: true, align: 'center', valign: 'middle'},
            {title: '支付成功时间', field: 'paySuccessDate', visible: false, align: 'center', valign: 'middle'},
            {title: '关闭时间', field: 'closeDate', visible: false, align: 'center', valign: 'middle'},
            {title: '乐观锁', field: 'versionNo', visible: false, align: 'center', valign: 'middle'}
    ];
};

/**
 * 检查是否选中
 */
TradeOrder.check = function () {
    var selected = $('#' + this.id).bootstrapTable('getSelections');
    if(selected.length == 0){
        Feng.info("请先选中表格中的某一记录！");
        return false;
    }else{
        TradeOrder.seItem = selected[0];
        return true;
    }
};
/**
 * 查询订单管理列表
 */
TradeOrder.search = function () {
    var queryData = {};
    queryData['sourceNum'] = $("#sourceNum").val();
    queryData['beginTime'] = $("#beginTime").val();
    queryData['endTime'] = $("#endTime").val();
    queryData['status'] = $("#status").val();
    queryData['userNickName'] = $("#userNickName").val();
    TradeOrder.table.refresh({query: queryData});
};

$(function () {
    var defaultColunms = TradeOrder.initColumn();
    var table = new BSTable(TradeOrder.id, "/tradeOrder/list", defaultColunms);
    table.setPaginationType("client");
    TradeOrder.table = table.init();
});
