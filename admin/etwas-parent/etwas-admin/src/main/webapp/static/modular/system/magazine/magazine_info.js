/**
 * 初始化杂志管理详情对话框
 */
var MagazineInfoDlg = {
    magazineInfoData : {},
    validateFields: {
        title: {
            validators: {
                notEmpty: {
                    message: '杂志标题不能为空'
                }
            }
        },
        h5Path: {
            validators: {
                notEmpty: {
                    message: '杂志H5地址不能为空'
                }
            }
        },
        issue: {
            validators: {
                notEmpty: {
                    message: '版本号不能为空'
                }
            }
        },
        itemCover: {
            validators: {
                notEmpty: {
                    message: '杂志封面需要上传一张图片'
                }
            }
        },
        itemPreviewPic: {
            validators: {
                notEmpty: {
                    message: '至少上传一张预览图片'
                }
            }
        }

    }
};

/**
 * 验证数据是否为空
 */
MagazineInfoDlg.validate = function () {
    $('#magazineInfoForm').data("bootstrapValidator").resetForm();
    $('#magazineInfoForm').bootstrapValidator('validate');
    return $("#magazineInfoForm").data('bootstrapValidator').isValid();
};

/**
 * 清除数据
 */
MagazineInfoDlg.clearData = function() {
    this.magazineInfoData = {};
}

/**
 * 设置对话框中的数据
 *
 * @param key 数据的名称
 * @param val 数据的具体值
 */
MagazineInfoDlg.set = function(key, val) {
    this.magazineInfoData[key] = (typeof val == "undefined") ? $("#" + key).val() : val;
    return this;
}

/**
 * 设置对话框中的数据
 *
 * @param key 数据的名称
 * @param val 数据的具体值
 */
MagazineInfoDlg.get = function(key) {
    return $("#" + key).val();
}

/**
 * 关闭此对话框
 */
MagazineInfoDlg.close = function() {
    parent.layer.close(window.parent.Magazine.layerIndex);
}

/**
 * 收集数据
 */
MagazineInfoDlg.collectData = function() {
    this
        .set('id')
        .set('title')
        .set('categoryId')
        .set('personType')
        .set('h5Path')
        .set('issue')
        .set('itemCover')
        .set('itemPreviewPic')
        .set('h5SourceZip')
        .set('itemDesc')
        .set('rankIntroPic')
        .set('initReadCount')
        .set('price')
        .set('status');
}

/**
 * 提交添加
 */
MagazineInfoDlg.addSubmit = function() {

    this.clearData();
    this.collectData();
    if (!this.validate()) {
        return;
    }

    //提交信息
    var ajax = new $ax(Feng.ctxPath + "/magazine/add", function(data){
        Feng.success("添加成功!");
        window.parent.Magazine.table.refresh();
        MagazineInfoDlg.close();
    },function(data){
        Feng.error("添加失败!" + data.responseJSON.message + "!");
    });
    ajax.set(this.magazineInfoData);
    ajax.start();
}

/**
 * 提交修改
 */
MagazineInfoDlg.editSubmit = function() {

    this.clearData();
    this.collectData();
    if (!this.validate()) {
        return;
    }
    //提交信息
    var ajax = new $ax(Feng.ctxPath + "/magazine/update", function(data){
        Feng.success("修改成功!");
        window.parent.Magazine.table.refresh();
        MagazineInfoDlg.close();
    },function(data){
        Feng.error("修改失败!" + data.responseJSON.message + "!");
    });
    ajax.set(this.magazineInfoData);
    ajax.start();
}



$(function() {

    Feng.initValidator("magazineInfoForm", MagazineInfoDlg.validateFields);

    //初始化性别选项
    $("#personType").val($("#setpersonType").val());
    $("#categoryId").val($("#setcategoryId").val());
    $("#status").val($("#setstatus").val());

    var itemCoverUp = new $WebUpload("itemCover");
    itemCoverUp.setUploadBarId("progressBarItemCover");
    itemCoverUp.init();


    var itemPreviewPic = new $WebMutiUpload("itemPreviewPic");
    itemPreviewPic.setUploadBarId("progressBarPicMuti");
    itemPreviewPic.init({
        multiple: true
    });

    var itemPreviewZipUp = new $WebZipUpload('h5SourceZip');
    itemPreviewZipUp.setUploadBarId("progressBarZip");
    itemPreviewZipUp.init();

    var rankIntroPic = new $WebUpload("rankIntroPic");
    rankIntroPic.setUploadBarId("progressBarRankIntroPic");
    rankIntroPic.init();

});
