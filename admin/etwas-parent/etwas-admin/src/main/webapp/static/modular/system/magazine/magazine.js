/**
 * 杂志管理管理初始化
 */
var Magazine = {
    id: "MagazineTable",	//表格id
    seItem: null,		//选中的条目
    table: null,
    layerIndex: -1
};

/**
 * 初始化表格的列
 */
Magazine.initColumn = function () {
    return [
        {field: 'selectItem', radio: true},
        {title: '主键', field: 'id', visible: false, align: 'center', valign: 'middle'},
        {title: '杂志名称', field: 'title', visible: true, align: 'center', valign: 'middle'},
        {title: '分类', field: 'categoryId', visible: false, align: 'center', valign: 'middle'},
        {title: '分类名称', field: 'categoryName', visible: false, align: 'center', valign: 'middle'},
        {title: '杂志h5链接', field: 'h5Path', visible: true, align: 'center', valign: 'middle'},
        {title: '排行榜显示', field: 'isOpenRankList', visible: false, align: 'center', valign: 'middle'},
        {title: '是否推荐', field: 'isRecommend', visible: false, align: 'center', valign: 'middle'},
        {title: '年份', field: 'year', visible: true, align: 'center', valign: 'middle'},
        {title: '出版号', field: 'issue', visible: true, align: 'center', valign: 'middle'},
        {title: '杂志封面', field: 'itemCover', visible: false, align: 'center', valign: 'middle'},
        {title: '杂志预览图（1-4张）', field: 'itemPreviewPic', visible: false, align: 'center', valign: 'middle'},
        {title: '实际订阅量', field: 'readCount', visible: true, align: 'center', valign: 'middle'},
        {title: '初始订阅量', field: 'initReadCount', visible: true, align: 'center', valign: 'middle'},
        {title: 'H5zip包', field: 'h5SourceZip', visible: false, align: 'center', valign: 'middle'},
        {title: '杂志介绍', field: 'itemDesc', visible: false, align: 'center', valign: 'middle'},
        {title: '预览二维码', field: 'preSmallCode', visible: false, align: 'center', valign: 'middle'},
        {title: '发布状态', field: 'statusName', visible: true, align: 'center', valign: 'middle'},
        {title: '发布时间', field: 'upDate', visible: true, align: 'center', valign: 'middle'},
        {title: '是否有效业务(1:有效 0无效)', field: 'valid', visible: false, align: 'center', valign: 'middle'},
        {title: '创建时间', field: 'createDate', visible: false, align: 'center', valign: 'middle'},
        {title: '最后一次修改时间', field: 'modifyDate', visible: false, align: 'center', valign: 'middle'}
    ];
};

/**
 * 检查是否选中
 */
Magazine.check = function () {
    var selected = $('#' + this.id).bootstrapTable('getSelections');
    if(selected.length == 0){
        Feng.info("请先选中表格中的某一记录！");
        return false;
    }else{
        Magazine.seItem = selected[0];
        return true;
    }
};

/**
 * 点击添加杂志管理
 */
Magazine.openAddMagazine = function () {
    var index = layer.open({
        type: 2,
        title: '添加杂志管理',
        area: ['900px', '820px'], //宽高
        fix: false, //不固定
        maxmin: true,
        content: Feng.ctxPath + '/magazine/magazine_add'
    });
    this.layerIndex = index;
};

/**
 * 打开查看杂志管理详情
 */
Magazine.openMagazineDetail = function () {
    if (this.check()) {
        var index = layer.open({
            type: 2,
            title: '杂志管理详情',
            area: ['900px', '820px'], //宽高
            fix: false, //不固定
            maxmin: true,
            content: Feng.ctxPath + '/magazine/magazine_update/' + Magazine.seItem.id
        });
        this.layerIndex = index;
    }
};

/**
 * 删除杂志管理
 */
Magazine.delete = function () {
    if (this.check()) {
        var ajax = new $ax(Feng.ctxPath + "/magazine/delete", function (data) {
            Feng.success("删除成功!");
            Magazine.table.refresh();
        }, function (data) {
            Feng.error("删除失败!" + data.responseJSON.message + "!");
        });
        ajax.set("magazineId",this.seItem.id);
        ajax.start();
    }
};


/**
 * 手机预览
 */
Magazine.showErCode = function() {
    if (this.check()) {
        var index = layer.open({
            title: '手机预览二维码'
            ,content: '<img width="100px" height="100px" src='+ Magazine.seItem.preSmallCode+'>'
        });
        this.layerIndex = index;
    }
}

/**
 * 生成阅读码
 */
Magazine.generateReadCode = function() {
    if (this.check()) {
        if(this.seItem.status == 1){
            Feng.info("杂志未发布不可生成阅读码");
            return false;
        }
        var index = layer.open({
            type: 2,
            title: '生成阅读码',
            area: ['800px', '620px'], //宽高
            fix: false, //不固定
            maxmin: true,
            content: Feng.ctxPath + '/magazineReadCode/magazineReadCode_add/' + Magazine.seItem.id
        });
        this.layerIndex = index;
    }
}




/**
 * 检查是否选中
 */
Magazine.check = function () {
    var selected = $('#' + this.id).bootstrapTable('getSelections');
    if(selected.length == 0){
        Feng.info("请先选中表格中的某一记录！");
        return false;
    }else{
        Magazine.seItem = selected[0];
        return true;
    }
};

/**
 * 添加团体人员
 */
Magazine.magazinePerson = function() {
    if (this.check()) {
        if(this.seItem.personType == 1){
            Feng.info("成员类型为个人，无需添加成员！");
            return false;
        }
        var index = layer.open({
            type: 2,
            title: '团体成员',
            area: ['800px', '620px'], //宽高
            fix: false, //不固定
            maxmin: true,
            content: Feng.ctxPath + '/magazinePerson/' + Magazine.seItem.id
        });
        this.layerIndex = index;
        layer.full(index);
    }
}

/**
 * 查询杂志管理列表
 */
Magazine.search = function () {
    var queryData = {};
    queryData['condition'] = $("#condition").val();
    Magazine.table.refresh({query: queryData});
};

$(function () {
    var defaultColunms = Magazine.initColumn();
    var table = new BSTable(Magazine.id, "/magazine/list", defaultColunms);
    table.setPaginationType("client");
    Magazine.table = table.init();
});
