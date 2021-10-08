@/*
    头像参数的说明:
    name : 名称
    id : 头像的id
@*/
<div class="form-group">
    <label class="col-sm-3 control-label head-scu-label">${name}</label>
    <div class="col-sm-7 head-scu-label">
        @if(isEmpty(avatarImg)){
        <div id="${id}PreId"> </div>
        @}else{
        <div id="${id}PreId">
        <a href="${avatarImg}" target="_blank">${avatarImg}</a>
        </div>
        @}
    </div>
    <div class="col-sm-2">
        <div class="head-scu-btn upload-btn" id="${id}BtnId">
            <i class="fa fa-upload"></i>&nbsp;上传
        </div>
    </div>
    <div class="col-sm-12" style="width: 0;padding: 0;background-color: green;height: 20px;text-align: center;color: #fff;" id="${progressBarId}">
    </div>
    <input type="hidden" id="${id}" value="${avatarImg!}"/>
</div>
@if(isNotEmpty(underline) && underline == 'true'){
    <div class="hr-line-dashed"></div>
@}


