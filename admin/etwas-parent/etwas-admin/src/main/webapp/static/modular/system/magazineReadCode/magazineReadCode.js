/**
 * 杂志阅读码管理管理初始化
 */
var MagazineReadCode = {
    id: "MagazineReadCodeTable",	//表格id
    seItem: null,		//选中的条目
    table: null,
    layerIndex: -1
};

/**
 * 初始化表格的列
 */
MagazineReadCode.initColumn = function () {
    return [
        {field: 'selectItem', radio: true},
            {title: '主键', field: 'id', visible: false, align: 'center', valign: 'middle'},
            {title: '杂志id', field: 'magId', visible: false, align: 'center', valign: 'middle'},
            {title: '杂志标题', field: 'magTitle', visible: true, align: 'center', valign: 'middle'},
            {title: '阅读码', field: 'readCode', visible: true, align: 'center', valign: 'middle'},
            {title: '来源', field: 'sourceType', visible: true, align: 'center', valign: 'middle'},
            {title: '备注', field: 'remark', visible: true, align: 'center', valign: 'middle'},
            {title: '来源id', field: 'sourceId', visible: false, align: 'center', valign: 'middle'},
            {title: '激活状态', field: 'status', visible: true, align: 'center', valign: 'middle'},
            {title: '激活时间', field: 'activiteTime', visible: true, align: 'center', valign: 'middle'},
            {title: '购买人', field: 'buyUserId', visible: false, align: 'center', valign: 'middle'},
            {title: '购买人昵称', field: 'buyUserName', visible: true, align: 'center', valign: 'middle'},
            {title: '购买人头像', visible: false, align: 'center', valign: 'middle',formatter: function(value,row,index){
                return '<img style="width: 40px;height: 40px" src="'+row.buyUserPic+'"/>';
            }},
            {title: '使用用户', field: 'usedUserId', visible: false, align: 'center', valign: 'middle'},
            {title: '使用人昵称', field: 'usedUserName', visible: true, align: 'center', valign: 'middle'},
            {title: '使用人头像', visible: false, align: 'center', valign: 'middle',formatter: function(value,row,index){
                    return '<img style="width: 40px;height: 40px" src="'+row.usedUserPic+'"/>';
            }},
            {title: '是否有效', field: 'valid', visible: false, align: 'center', valign: 'middle'},
            {title: '创建时间', field: 'createDate', visible: true, align: 'center', valign: 'middle'},
            {title: '更新时间', field: 'modifyDate', visible: false, align: 'center', valign: 'middle'}
    ];
};

/**
 * 检查是否选中
 */
MagazineReadCode.check = function () {
    var selected = $('#' + this.id).bootstrapTable('getSelections');
    if(selected.length == 0){
        Feng.info("请先选中表格中的某一记录！");
        return false;
    }else{
        MagazineReadCode.seItem = selected[0];
        return true;
    }
};

/**
 * 点击添加杂志阅读码管理
 */
MagazineReadCode.openAddMagazineReadCode = function () {
    var index = layer.open({
        type: 2,
        title: '添加杂志阅读码管理',
        area: ['800px', '420px'], //宽高
        fix: false, //不固定
        maxmin: true,
        content: Feng.ctxPath + '/magazineReadCode/magazineReadCode_add'
    });
    this.layerIndex = index;
};

/**
 * 打开查看杂志阅读码管理详情
 */
MagazineReadCode.openMagazineReadCodeDetail = function () {
    if (this.check()) {
        var index = layer.open({
            type: 2,
            title: '杂志阅读码管理详情',
            area: ['800px', '420px'], //宽高
            fix: false, //不固定
            maxmin: true,
            content: Feng.ctxPath + '/magazineReadCode/magazineReadCode_update/' + MagazineReadCode.seItem.id
        });
        this.layerIndex = index;
    }
};

/**
 * 删除杂志阅读码管理
 */
MagazineReadCode.delete = function () {
    if (this.check()) {
        var ajax = new $ax(Feng.ctxPath + "/magazineReadCode/delete", function (data) {
            Feng.success("删除成功!");
            MagazineReadCode.table.refresh();
        }, function (data) {
            Feng.error("删除失败!" + data.responseJSON.message + "!");
        });
        ajax.set("magazineReadCodeId",this.seItem.id);
        ajax.start();
    }
};

/**
 * 查询杂志阅读码管理列表
 */
MagazineReadCode.search = function () {
    var queryData = {};
    queryData['sourceType'] = $("#sourceType").val();
    queryData['status'] = $("#status").val();
    queryData['magaTitle'] = $("#magaTitle").val();
    queryData['remark'] = $("#remark").val();
    MagazineReadCode.table.refresh({query: queryData});
};

$(function () {
    var defaultColunms = MagazineReadCode.initColumn();
    var table = new BSTable(MagazineReadCode.id, "/magazineReadCode/list", defaultColunms);
    table.setPaginationType("client");
    MagazineReadCode.table = table.init();
});
