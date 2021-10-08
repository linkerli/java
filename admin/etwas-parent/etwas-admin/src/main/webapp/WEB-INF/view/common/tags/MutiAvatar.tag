@/*
    头像参数的说明:
    name : 名称
    id : 头像的id
@*/
<div class="form-group">
    <label class="col-sm-3 control-label head-scu-label">${name}</label>
    <div class="col-sm-7">
        <div id="${id}PreId">
            @if(isEmpty(avatarImg)){
            <div class="preview-icon">
                <img width="80px" height="80px"
                      src="${ctxPath}/static/img/upload.png">
            </div>
            @}else{
                @for(item in tool.splitToArray(avatarImg,',')){
                <div style="display:inline-block;margin: 0 5px 5px 0;position: relative;">
                    <div class="del" style="position: absolute;top: -10px;right: -10px;width: 20px;height: 20px;line-height: 20px;text-align: center;opacity: .6;background-color: #000;border-radius: 10px;z-index: 1000;color: #fff;cursor: pointer;">x</div>
                    <img src='${item}' width="100px" height="100px">
                </div>
                @}
            @}
        </div>
    </div>
    <div class="col-sm-2">
        <div class="head-scu-btn upload-btn" id="${id}BtnId">
            <i class="fa fa-upload"></i>&nbsp;上传
        </div>
    </div>
    <input type="hidden" id="${id}" value="${avatarImg!}"/>
</div>
@if(isNotEmpty(underline) && underline == 'true'){
    <div class="hr-line-dashed"></div>
@}


