package com.cola.magazine.system;

import org.junit.Test;

import java.io.File;
import java.util.LinkedList;

/**
 * Copyright (C),
 *
 * @author: Cola
 * @date: 2019/11/15 13:41
 * @description:
 */
public class UpFilePath7Niu {


    @Test
    public void test(){
        traverseFolder1("/Users/cola/IdeaProjects/magazine");
    }

    public void traverseFolder1(String path) {
        int fileNum = 0, folderNum = 0;
        LinkedList<File> listFile = new LinkedList<File>();
        File file = new File(path);
        if (file.exists()) {
            LinkedList<File> list = new LinkedList<File>();
            File[] files = file.listFiles();
            for (File file2 : files) {
                if (file2.isDirectory()) {
                    //System.out.println("文件夹:" + file2.getAbsolutePath());
                    list.add(file2);
                    fileNum++;
                } else {
                    //System.out.println("文件:" + file2.getAbsolutePath());
                    folderNum++;
                    listFile.add(file2);
                }
            }
            File temp_file;
            while (!list.isEmpty()) {
                temp_file = list.removeFirst();
                files = temp_file.listFiles();
                for (File file2 : files) {
                    if (file2.isDirectory()) {
                        list.add(file2);
                        fileNum++;
                    } else {
                        folderNum++;
                        listFile.add(file2);
                    }
                }
            }
            System.out.println(listFile);
        } else {
            System.out.println("文件不存在!");
        }
        //System.out.println("文件夹共有:" + folderNum + ",文件共有:" + fileNum);


    }
}
