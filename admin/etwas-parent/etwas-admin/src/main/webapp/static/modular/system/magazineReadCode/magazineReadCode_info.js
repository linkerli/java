/**
 * 初始化杂志阅读码管理详情对话框
 */
var MagazineReadCodeInfoDlg = {
    magazineReadCodeInfoData : {}
};

/**
 * 清除数据
 */
MagazineReadCodeInfoDlg.clearData = function() {
    this.magazineReadCodeInfoData = {};
}

/**
 * 设置对话框中的数据
 *
 * @param key 数据的名称
 * @param val 数据的具体值
 */
MagazineReadCodeInfoDlg.set = function(key, val) {
    this.magazineReadCodeInfoData[key] = (typeof val == "undefined") ? $("#" + key).val() : val;
    return this;
}

/**
 * 设置对话框中的数据
 *
 * @param key 数据的名称
 * @param val 数据的具体值
 */
MagazineReadCodeInfoDlg.get = function(key) {
    return $("#" + key).val();
}

/**
 * 关闭此对话框
 */
MagazineReadCodeInfoDlg.close = function() {
    parent.layer.close(window.parent.MagazineReadCode.layerIndex);
}

/**
 * 收集数据
 */
MagazineReadCodeInfoDlg.collectData = function() {
    this
    .set('id')
    .set('magId')
    .set('magTitle')
    .set('sourceType')
    .set('sourceId')
    .set('readCode')
    .set('status')
    .set('activiteTime')
    .set('usedUserId')
    .set('usedUserName')
    .set('usedUserPic')
    .set('buyUserId')
    .set('buyUserName')
    .set('buyUserPic')
    .set('remark')
    .set('valid')
    .set('createDate')
    .set('modifyDate');
}

/**
 * 提交添加
 */
MagazineReadCodeInfoDlg.addSubmit = function() {

    this.clearData();
    this.collectData();

    //提交信息
    var ajax = new $ax(Feng.ctxPath + "/magazineReadCode/add", function(data){
        Feng.success("生成成功!");
        //window.parent.MagazineReadCode.table.refresh();
        //$("#readcode").val(date);
        //MagazineReadCodeInfoDlg.close();
        parent.layer.close(window.parent.Magazine.layerIndex);
        Feng.alert("阅读码："+data);
    },function(data){
        Feng.error("生成失败!" + data.responseJSON.message + "!");
    });
    ajax.set(this.magazineReadCodeInfoData);
    ajax.start();
}

/**
 * 提交修改
 */
MagazineReadCodeInfoDlg.editSubmit = function() {

    this.clearData();
    this.collectData();

    //提交信息
    var ajax = new $ax(Feng.ctxPath + "/magazineReadCode/update", function(data){
        Feng.success("修改成功!");
        window.parent.MagazineReadCode.table.refresh();
        MagazineReadCodeInfoDlg.close();
    },function(data){
        Feng.error("修改失败!" + data.responseJSON.message + "!");
    });
    ajax.set(this.magazineReadCodeInfoData);
    ajax.start();
}

$(function() {

});
