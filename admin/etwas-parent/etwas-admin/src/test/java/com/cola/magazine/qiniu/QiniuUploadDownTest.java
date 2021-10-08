package com.cola.magazine.qiniu;

import com.cola.magazine.base.BaseJunit;
import com.cola.magazine.core.config.QiNiuUploadConfig;
import com.cola.magazine.core.config.properties.QiNiuProperties;
import com.madgag.gif.fmsware.AnimatedGifEncoder;
import okhttp3.OkHttpClient;
import okhttp3.Request;
import okhttp3.Response;
import okhttp3.ResponseBody;
import org.junit.Test;
import org.springframework.beans.factory.annotation.Autowired;

import javax.imageio.ImageIO;
import java.awt.image.BufferedImage;
import java.io.*;
import java.nio.file.Files;
import java.util.ArrayList;
import java.util.List;

/**
 * @author: 可乐
 * @date: 2020/12/23 11:39
 * <p>
 * Copyright (C),
 */
public class QiniuUploadDownTest extends BaseJunit {

    @Autowired
    QiNiuUploadConfig qiNiuUploadConfig;
    @Autowired
    QiNiuProperties qiNiuProperties;

    @Test
    public void qiniuUpLoad() throws Exception {


        String filePath = "/Users/cola/IdeaProjects/etwas-parent/gif-test/";
        File file = new File(filePath);
        // get the folder list
        File[] array = file.listFiles();

        List<String> fileUrlList = new ArrayList<>();

        for (int i = 0; i < array.length; i++) {
            System.out.println(filePath + array[i].getName());
            if (array[i].getName().startsWith(".")) {
                continue;
            }
            File fileitem = new File(filePath + array[i].getName());
            byte[] bFile = Files.readAllBytes(fileitem.toPath());
            String fileUrlName = qiNiuUploadConfig.uploadImgDefaultName("gif-test", fileitem.getName(), bFile);

            fileUrlList.add(fileUrlName);

            System.out.println(fileUrlName);

        }

        //下载文件
        String filePathDown = "/Users/cola/IdeaProjects/etwas-parent/gif-new/";

        for (String fileNameUrl:fileUrlList) {
            //获取downloadUrl
            String downloadUrl = fileNameUrl + "?imageslim";
            //本地保存路径
            String fileName = fileNameUrl.split("/")[fileNameUrl.split("/").length -1];
            download(downloadUrl, filePathDown,fileName);
        }

    }


    /**
     * 通过发送http get 请求获取文件资源
     *
     * @param url
     * @param filepath
     * @return
     */
    private static void download(String url, String filepath,String fileName) {
        OkHttpClient client = new OkHttpClient();
        System.out.println(url);
        Request req = new Request.Builder().url(url).build();
        Response resp = null;
        try {
            resp = client.newCall(req).execute();
            System.out.println(resp.isSuccessful());
            if (resp.isSuccessful()) {
                ResponseBody body = resp.body();
                InputStream is = body.byteStream();
                byte[] data = readInputStream(is);
                //判断文件夹是否存在，不存在则创建
                File file = new File(filepath);
                if (!file.exists() && !file.isDirectory()) {
                    System.out.println("===文件夹不存在===创建====");
                    file.mkdir();
                }
                File imgFile = new File(filepath + fileName);
                FileOutputStream fops = new FileOutputStream(imgFile);
                fops.write(data);
                fops.close();
            }
        } catch (IOException e) {
            e.printStackTrace();
            System.out.println("Unexpected code " + resp);
        }
    }

    /**
     * 读取字节输入流内容
     *
     * @param is
     * @return
     */
    private static byte[] readInputStream(InputStream is) {
        ByteArrayOutputStream writer = new ByteArrayOutputStream();
        byte[] buff = new byte[1024 * 2];
        int len = 0;
        try {
            while ((len = is.read(buff)) != -1) {
                writer.write(buff, 0, len);
            }
            is.close();
        } catch (IOException e) {
            e.printStackTrace();
        }
        return writer.toByteArray();
    }

    /**
     * 把多张jpg图片合成一张
     * @param pic String[] 多个jpg文件名 包含路径
     * @param newPic String 生成的gif文件名 包含路径
     */
    private synchronized void jpgToGif(String pic[], String newPic) {
        try {
            AnimatedGifEncoder e = new AnimatedGifEncoder();  //请见本博客文章
            e.setRepeat(0);
            e.start(newPic);
            BufferedImage src[] = new BufferedImage[pic.length];
            for (int i = 0; i < src.length; i++) {
                e.setDelay(200); //设置播放的延迟时间
                src[i] = ImageIO.read(new File(pic[i])); // 读入需要播放的jpg文件
                e.addFrame(src[i]);  //添加到帧中
            }
            e.finish();
        } catch (Exception e) {
            System.out.println( "jpgToGif Failed:");
            e.printStackTrace();
        }
    }


    @Test
    public void testgif(){
        //下载文件
        String filePathDown = "/Users/cola/IdeaProjects/etwas-parent/gif-new/";

        File fileNew = new File(filePathDown);
        // get the folder list
        File[] arrayNew = fileNew.listFiles();

        List<String> fileUrlListNew = new ArrayList<>();

        for (int i = 0; i < arrayNew.length; i++) {
            System.out.println(filePathDown + arrayNew[i].getName());
            if (arrayNew[i].getName().startsWith(".")) {
                continue;
            }
            fileUrlListNew.add(filePathDown + arrayNew[i].getName());
        }


    }

}
