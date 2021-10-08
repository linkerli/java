package com.cola.magazine.qiniu;

import com.madgag.gif.fmsware.AnimatedGifEncoder;
import com.madgag.gif.fmsware.GifDecoder;
import com.sun.image.codec.jpeg.JPEGCodec;
import com.sun.image.codec.jpeg.JPEGImageEncoder;

import javax.imageio.ImageIO;
import java.awt.image.BufferedImage;
import java.io.File;
import java.io.FileOutputStream;
import java.util.ArrayList;
import java.util.Comparator;
import java.util.List;
import java.util.stream.Collectors;

/**
 * @author: 可乐
 * @date: 2020/12/23 13:40
 * <p>
 * Copyright (C), 在大理
 */
public class Test {


    /**
     * 把多张jpg图片合成一张
     * @param pic String[] 多个jpg文件名 包含路径
     * @param newPic String 生成的gif文件名 包含路径
     */
    private static synchronized void jpgToGif(String pic[], String newPic) {
        try {
            AnimatedGifEncoder e = new AnimatedGifEncoder();
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

    /**
     * 把gif图片按帧拆分成jpg图片
     * @param gifName String 小gif图片(路径+名称)
     * @param path String 生成小jpg图片的路径
     * @return String[] 返回生成小jpg图片的名称
     */
    private static synchronized String[] splitGif(String gifName,String path) {
        try {
            GifDecoder decoder = new GifDecoder();
            decoder.read(gifName);
            int n = decoder.getFrameCount(); //得到frame的个数
            String[] subPic = new String[n];
            for (int i = 0; i < n; i++) {
                BufferedImage frame = decoder.getFrame(i); //得到帧
                //int delay = decoder.getDelay(i); //得到延迟时间
                //生成小的JPG文件
                if(i<10){
                    subPic[i] = path +"0"+ i + ".jpg";
                }else{
                    subPic[i] = path + i + ".jpg";
                }

//                FileOutputStream out = new FileOutputStream(subPic[i]);
//                ImageIO.write(frame, "png", out);
                //JPEGImageEncoder encoder = JPEGCodec.createJPEGEncoder(out);
                //encoder.encode(frame); //存盘*/


                FileOutputStream out = new FileOutputStream(subPic[i]);
                ImageIO.write(frame, "jpeg", out);
                JPEGImageEncoder encoder = JPEGCodec.createJPEGEncoder(out);
                encoder.encode(frame); //存檔
                out.flush();
                out.close();
            }
            return subPic;
        } catch (Exception e) {
            System.out.println("splitGif Failed!");
            e.printStackTrace();
            return null;
        }
    }


    public static void main(String[] args) {

        //下载文件
        String filePathDown = "/Users/cola/IdeaProjects/etwas-parent/gif-new/";
        File fileNew = new File(filePathDown);
        // get the folder list
        File[] arrayNew = fileNew.listFiles();
        List<String> fileUrlListNew = new ArrayList<>();
        for (int i = 0; i < arrayNew.length; i++) {
           // System.out.println(filePathDown + arrayNew[i].getName());
            if (arrayNew[i].getName().startsWith(".")) {
                continue;
            }
            fileUrlListNew.add(filePathDown + arrayNew[i].getName());
        }
        //分割后的文件采用顺序命名 方便自动合成gif顺序
        List<String> fileUrlList = fileUrlListNew.stream().sorted(Comparator.comparing(item->item)).collect(Collectors.toList());
        String []array = new String[fileUrlList.size()];
        for (int i = 0; i < fileUrlList.size(); i++) {
            array[i] = fileUrlList.get(i);
        }
        //将gif分割成jpg
        splitGif("/Users/cola/IdeaProjects/etwas-parent/gif-split/1.gif","/Users/cola/IdeaProjects/etwas-parent/gif-test/");
        //使用压缩算法单张压缩每一帧图片 压缩保证图片分辨率和清晰度。
        compress();
        //重新将压缩后的每一帧图片进行组装成gif，需要设置单张帧动画的延时时间
        jpgToGif(array,"/Users/cola/IdeaProjects/etwas-parent/gif-new/1.gif");

    }





    private static void  compress(){

    }

}
