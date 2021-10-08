/**
 * web-upload 工具类
 *
 * 约定：
 * 上传按钮的id = 图片隐藏域id + 'BtnId'
 * 图片预览框的id = 图片隐藏域id + 'PreId'
 *
 * @author cola
 */
(function() {

    var $WebMutiUpload = function(pictureId) {
        this.pictureId = pictureId;
        this.uploadBtnId = pictureId + "BtnId";
        this.uploadPreId = pictureId + "PreId";
        this.uploadUrl = Feng.ctxPath + '/upload/uploadFile';
        this.fileSizeLimit = 100 * 1024 * 1024;
        this.picWidth = 800;
        this.picHeight = 800;
        this.uploadBarId = null;
        this.filePaths = [];
    };

    $WebMutiUpload.prototype = {
        /**
         * 初始化webUploader
         */
        init : function(options) {
            var config = options || {};
            var uploader = this.create(config);
            this.bindEvent(uploader);
            return uploader;
        },

        /**
         * 创建webuploader对象
         */
        create : function(config) {
            var multiple = !!config.multiple;
            var webUploader = WebUploader.create({
                auto : true,
                pick : {
                    id : '#' + this.uploadBtnId,
                    multiple : multiple,// 只上传一个
                },
                accept : {
                    title : 'Images',
                    extensions : 'gif,jpg,jpeg,bmp,png',
                    mimeTypes : 'image/gif,image/jpg,image/jpeg,image/bmp,image/png'
                },
                swf : Feng.ctxPath
                + '/static/js/plugins/webuploader/Uploader.swf',
                disableGlobalDnd : true,
                duplicate : true,
                server : this.uploadUrl,
                fileSingleSizeLimit : this.fileSizeLimit
            });

            return webUploader;
        },

        /**
         * 绑定事件
         */
        bindEvent : function(bindedObj) {
            var me =  this;
            var $uploadPreId = $('#' + me.uploadPreId);

            // 删除图片事件
            $uploadPreId.on('click', '.del',function () {
                $(this).parent().remove();
                var imgSrc = $(this).parent().find('img').attr('src');
                var index = me.getIndexByIndex(imgSrc);
                console.log(imgSrc, index);
                if(index > -1) {
                    me.filePaths.splice(index, 1);
                    $("#" + me.pictureId).val(me.filePaths.join(','));
                }

            })

            bindedObj.on('fileQueued', function(file) {
                // var $li = $('<div style="display:inline-block;margin: 0 5px 5px 0;position: relative;">' +
                //     '<div class="del" style="position: absolute;top: -10px;right: -10px;width: 20px;height: 20px;background-color: #000;border-radius: 10px;z-index: 1000;color: #fff;">x</div>' +
                //     '<img width="100px" height="100px">' +
                //     '</div>');
                // var $img = $li.find('img');

                // $('#' + me.uploadPreId + ' .preview-icon').remove();
                // $("#" + me.uploadPreId).append($li);

                // 生成缩略图
                // bindedObj.makeThumb(file, function(error, src) {
                //     if (error) {
                //         $img.replaceWith('<span>不能预览</span>');
                //         return;
                //     }
                //     $img.attr('src', src);
                // }, me.picWidth, me.picHeight);
            });

            // 文件上传过程中创建进度条实时显示。
            bindedObj.on('uploadProgress', function(file, percentage) {
                $("#"+me.uploadBarId).css("width",percentage * 100 + "%");
            });

            // 文件上传成功，给item添加成功class, 用样式标记上传成功。
            bindedObj.on('uploadSuccess', function(file,response) {
                // Feng.success("上传成功");
                me.filePaths = me.filePaths || [];
                me.filePaths.push(response);

                var imgList = [];
                me.filePaths.forEach(function (imgItem) {
                    imgList.push('<div style="display:inline-block;margin: 0 5px 5px 0;position: relative;">' +
                        '<div class="del" style="position: absolute;top: -10px;right: -10px;width: 20px;height: 20px;line-height: 20px;text-align: center;opacity: .6;background-color: #000;border-radius: 10px;z-index: 1000;color: #fff;cursor: pointer;">x</div>' +
                        '<img src='+ imgItem +' width="100px" height="100px">' +
                        '</div>');
                });

                $("#" + me.uploadPreId).html(imgList.join(''));
                $("#" + me.pictureId).val(me.filePaths.join(','));
            });

            // 文件上传失败，显示上传出错。
            bindedObj.on('uploadError', function(file) {
                Feng.error("上传失败");
            });

            // 其他错误
            bindedObj.on('error', function(type) {
                if ("Q_EXCEED_SIZE_LIMIT" == type) {
                    Feng.error("文件大小超出了限制");
                } else if ("Q_TYPE_DENIED" == type) {
                    Feng.error("文件类型不满足");
                } else if ("Q_EXCEED_NUM_LIMIT" == type) {
                    Feng.error("上传数量超过限制");
                } else if ("F_DUPLICATE" == type) {
                    Feng.error("图片选择重复");
                } else {
                    Feng.error("上传过程中出错");
                }
            });

            // 完成上传完了，成功或者失败
            bindedObj.on('uploadComplete', function(file) {
            });
        },

        /**
         * 设置图片上传的进度条的id
         */
        setUploadBarId: function (id) {
            this.uploadBarId = id;
        },

        getIndexByIndex: function (imgSrc) {
            var me = this;
            for(var i = 0; i < me.filePaths.length; i++) {
                if(imgSrc == me.filePaths[i]) {
                    return i
                }
            }

            return -1;
        }
    };

    window.$WebMutiUpload = $WebMutiUpload;

}());