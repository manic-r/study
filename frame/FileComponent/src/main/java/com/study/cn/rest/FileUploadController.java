package com.study.cn.rest;

import org.springframework.beans.factory.annotation.Value;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;

import java.io.File;
import java.io.IOException;

@CrossOrigin(origins = {"http://172.28.3.19:4201", "null"})
@RestController
@RequestMapping("/file")
public class FileUploadController {

    @Value("${file.root.path}")
    private String fileRootPath;

    @PostMapping("/upload")
    public void fileUpload(@RequestParam("files") MultipartFile[] files) {
        String filePath = "";
        // 多文件上传
        for (MultipartFile file : files){
            // 上传简单文件名
            String originalFilename = file.getOriginalFilename();
            // 存储路径
            filePath = new StringBuilder(fileRootPath)
                    .append(System.currentTimeMillis())
                    .append(originalFilename)
                    .toString();
            System.err.println(filePath);
            try {
                // 保存文件
                file.transferTo(new File(filePath));
            } catch (IOException e) {
                e.printStackTrace();
            }
        }
    }
}
