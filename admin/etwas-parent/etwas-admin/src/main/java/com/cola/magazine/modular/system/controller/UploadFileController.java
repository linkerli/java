package com.cola.magazine.modular.system.controller;

import com.cola.magazine.core.base.controller.BaseController;
import com.cola.magazine.core.common.exception.BizExceptionEnum;
import com.cola.magazine.core.config.QiNiuUploadConfig;
import com.cola.magazine.core.exception.EtwasException;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.RequestPart;
import org.springframework.web.bind.annotation.ResponseBody;
import org.springframework.web.multipart.MultipartFile;

import java.io.File;
import java.io.FileOutputStream;
import java.util.zip.ZipEntry;
import java.util.zip.ZipInputStream;

/**
 * 系统管理员控制器
 *
 * @author 可乐
 * @Date 2017年1月11日 下午1:08:17
 */
@Controller
@RequestMapping("/upload")
public class UploadFileController extends BaseController {

    @Autowired
    QiNiuUploadConfig qiNiuUploadConfig;

    /**
     * 上传图片
     */
    @RequestMapping(method = RequestMethod.POST, path = "/uploadFile")
    @ResponseBody
    public String upload(@RequestPart("file") MultipartFile multipartFile) {

        String fileUrlName = null;
        try {
            String suffix = multipartFile.getOriginalFilename().substring(multipartFile.getOriginalFilename().lastIndexOf(".") + 1);
            //目前必须上传带有后缀的文件
            fileUrlName = qiNiuUploadConfig.uploadFormatName(multipartFile.getBytes(),suffix);
        }catch (Exception e) {
            throw new EtwasException(BizExceptionEnum.UPLOAD_ERROR);
        }
        return fileUrlName;
    }



    /**
     * 上传图片
     */
    @RequestMapping(method = RequestMethod.POST, path = "/uploadH5ZipFile")
    @ResponseBody
    public String uploadH5ZipFile(@RequestPart("file") MultipartFile multipartFile) {

        String fileUrlName = null;
        try {

                ZipInputStream in = new ZipInputStream(multipartFile.getInputStream());
                ZipEntry entry = null;
                while ((entry = in.getNextEntry()) != null) {
                    String entryName = entry.getName();
                    if (entry.isDirectory()) {
                        File file = new File("/" + entryName);
                        file.mkdirs();
                        System.out.println("创建文件夹" + entryName);
                    } else {
                        FileOutputStream os = new FileOutputStream("/" + entryName);
                        // Transfer bytes from the ZIP file to the output file
                        byte[] buf = new byte[1024];
                        int len;
                        while ((len = in.read(buf)) > 0) {
                            os.write(buf, 0, len);
                        }
                        os.close();
                        in.closeEntry();
                    }
                }


            String suffix = multipartFile.getOriginalFilename().substring(multipartFile.getOriginalFilename().lastIndexOf(".") + 1);
            //目前必须上传带有后缀的文件
            fileUrlName = qiNiuUploadConfig.uploadFormatName(multipartFile.getBytes(),suffix);
        }catch (Exception e) {
            throw new EtwasException(BizExceptionEnum.UPLOAD_ERROR);
        }
        return fileUrlName;
    }

}
