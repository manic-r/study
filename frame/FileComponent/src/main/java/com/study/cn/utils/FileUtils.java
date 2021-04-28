package com.study.cn.utils;

import com.study.cn.entity.response.FileSaveResponse;
import org.springframework.web.multipart.MultipartFile;

import java.io.File;
import java.text.SimpleDateFormat;
import java.util.ArrayList;
import java.util.Arrays;
import java.util.Date;
import java.util.List;


public class FileUtils {

    /**
     * 创建文件
     * @param files 文件集合
     * @param output 输出位置
     * @return List<FileSaveResponse>
     */
    public static List<FileSaveResponse> save(List<MultipartFile> files, final String output) {
        List<FileSaveResponse> result = new ArrayList<>();
        files.stream().forEach(input -> {
            FileSaveResponse fileSaveResponse = new FileSaveResponse();
            File file = new File(output + input.getOriginalFilename());
            fileSaveResponse.setFilename(input.getOriginalFilename());
            try {
                // 创建文件夹
                String newPath = FileUtils.filePathHandle(output, input);
                if (file.exists()) {
                    file = new File(newPath + System.currentTimeMillis() + input.getOriginalFilename().substring(input.getOriginalFilename().lastIndexOf("/") + 1));
                }
                input.transferTo(file);
                fileSaveResponse.setStatus(FileSaveResponse.Status.SUCCESS);
                fileSaveResponse.setReName(file.getName());
            } catch (Exception e) {
                fileSaveResponse.setStatus(FileSaveResponse.Status.ERROR);
                e.printStackTrace();
            }
            result.add(fileSaveResponse);
        });
        return result;
    }

    /**
     * 创建文件夹
     * @param output 输出位置
     * @param file file对象
     */
    public static String filePathHandle(String output, MultipartFile file) {
        String fileName = file != null ? file.getOriginalFilename() : "";
        String dirName = "";
        StringBuilder fileDirPath = new StringBuilder(output);
        if (fileName.lastIndexOf("/") > 0) {
            dirName = fileName.substring(0, fileName.lastIndexOf("/"));
            fileDirPath.append(dirName);
        }
        File fileDir = new File(fileDirPath.toString());
        if (!fileDir.exists()) {
            fileDir.mkdirs();
        }
        return fileDirPath.append("\\").toString();
    }

    /**
     * 删除全部文件
     * @param path 路径
     */
    public static void deleteOfDir(String path) {
        if (!new File(path).exists()) return;
        File[] files = new File(path).listFiles();
        for (File file : files) {
            if (file.isDirectory()) {
                deleteOfDir(file.getPath());
                file.delete();
            } else if (file.isFile()) {
                file.delete();
            }
        }
    }

    /**
     * 备份所有文件（包括文件夹）到新文件夹： 新文件夹为当前 [年-月-日]
     * @param path 路径
     */
    public static String backup(String path, boolean isAll) {
        Date date = new Date();
        String dirName;
        if (isAll) {
            String strDateFormat = "yyyy-MM-dd";
            SimpleDateFormat sdf = new SimpleDateFormat(strDateFormat);
            dirName = sdf.format(date);
        } else {
            dirName = String.valueOf(date.getTime());
        }
        String output = new StringBuilder(path).append("\\").append(dirName).append("\\").toString();
        filePathHandle(output, null);
        File[] files = new File(path).listFiles();
        Arrays.stream(files)
                .filter(file -> isAll || file.isFile())
                .forEach(file -> {
                    File newFile = new File(output + file.getName());
                    if (newFile.exists()) {
                        newFile = new File(output + "(" + System.currentTimeMillis() + ")" + file.getName());
                    }
                    file.renameTo(newFile);
                });
        return dirName;
    }
}
