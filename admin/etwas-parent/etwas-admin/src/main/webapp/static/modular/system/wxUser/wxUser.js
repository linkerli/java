/**
 * 微信用户管理管理初始化
 */
var WxUser = {
    id: "WxUserTable",	//表格id
    seItem: null,		//选中的条目
    table: null,
    layerIndex: -1
};

/**
 * 初始化表格的列
 */
WxUser.initColumn = function () {
    return [
        {field: 'selectItem', radio: true},
            {title: '用户ID', field: 'id', visible: true, align: 'center', valign: 'middle'},
            {title: 'unionId', field: 'unionId', visible: true, align: 'center', valign: 'middle'},
            {title: '昵称', field: 'userNickName', visible: true, align: 'center', valign: 'middle'},
            {title: '头像', visible: true, align: 'center', valign: 'middle',
                formatter: function(value,row,index){
                    return '<img style="width: 40px;height: 40px" src="'+row.userHeadPic+'"/>';
                }},
            {title: '性别', field: 'gender', visible: true, align: 'center', valign: 'middle'},
            {title: '语言', field: 'language', visible: true, align: 'center', valign: 'middle'},
            {title: '城市', field: 'city', visible: true, align: 'center', valign: 'middle'},
            {title: '省份', field: 'province', visible: true, align: 'center', valign: 'middle'},
            {title: '国家', field: 'country', visible: true, align: 'center', valign: 'middle'},
            {title: '用户状态', field: 'status', visible: true, align: 'center', valign: 'middle'},
            {title: '是否有效业务', field: 'valid', visible: false, align: 'center', valign: 'middle'},
            {title: '创建时间', field: 'createDate', visible: true, align: 'center', valign: 'middle'},
            {title: '修改时间', field: 'modifyDate', visible: false, align: 'center', valign: 'middle'}
    ];
};

/**
 * 检查是否选中
 */
WxUser.check = function () {
    var selected = $('#' + this.id).bootstrapTable('getSelections');
    if(selected.length == 0){
        Feng.info("请先选中表格中的某一记录！");
        return false;
    }else{
        WxUser.seItem = selected[0];
        return true;
    }
};

/**
 * 点击添加微信用户管理
 */
WxUser.openAddWxUser = function () {
    var index = layer.open({
        type: 2,
        title: '添加微信用户管理',
        area: ['800px', '420px'], //宽高
        fix: false, //不固定
        maxmin: true,
        content: Feng.ctxPath + '/wxUser/wxUser_add'
    });
    this.layerIndex = index;
};

/**
 * 打开查看微信用户管理详情
 */
WxUser.openWxUserDetail = function () {
    if (this.check()) {
        var index = layer.open({
            type: 2,
            title: '微信用户管理详情',
            area: ['800px', '420px'], //宽高
            fix: false, //不固定
            maxmin: true,
            content: Feng.ctxPath + '/wxUser/wxUser_update/' + WxUser.seItem.id
        });
        this.layerIndex = index;
    }
};

/**
 * 删除微信用户管理
 */
WxUser.delete = function () {
    if (this.check()) {
        var ajax = new $ax(Feng.ctxPath + "/wxUser/delete", function (data) {
            Feng.success("删除成功!");
            WxUser.table.refresh();
        }, function (data) {
            Feng.error("删除失败!" + data.responseJSON.message + "!");
        });
        ajax.set("wxUserId",this.seItem.id);
        ajax.start();
    }
};

/**
 * 查询微信用户管理列表
 */
WxUser.search = function () {
    var queryData = {};
    queryData['condition'] = $("#condition").val();
    WxUser.table.refresh({query: queryData});
};

$(function () {
    var defaultColunms = WxUser.initColumn();
    var table = new BSTable(WxUser.id, "/wxUser/list", defaultColunms);
    table.setPaginationType("client");
    WxUser.table = table.init();
});
