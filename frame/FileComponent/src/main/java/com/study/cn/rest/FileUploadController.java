package com.study.cn.rest;

import com.study.cn.entity.response.FileSaveResponse;
import com.study.cn.utils.FileUtils;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;
import org.springframework.web.multipart.MultipartHttpServletRequest;
import org.thymeleaf.util.StringUtils;

import java.io.File;
import java.io.IOException;
import java.util.List;

//https://www.cnblogs.com/mmzs/p/9167743.html
//https://blog.csdn.net/zhangpower1993/article/details/89016503
@RestController
@RequestMapping("/file")
public class FileUploadController {

    @Value("${file.root.path}")
    private String fileRootPath;

    @PostMapping("/upload")
    public void fileUpload(@RequestParam("files") MultipartFile[] files) throws IOException {
        File dir = new File(fileRootPath);
        if (!dir.exists()) {
            dir.mkdirs();
        }
        String filePath = "";
        // 多文件上传
        File row = null;
        for (MultipartFile file : files){
            // 上传简单文件名
            String originalFilename = file.getOriginalFilename();
            // 存储路径
            filePath = new StringBuilder(fileRootPath)
                    .append(System.currentTimeMillis())
                    .append(originalFilename)
                    .toString();
            row = new File(filePath);
            // https://www.jianshu.com/p/d8666f2e698f
            if (!row.exists()) {
                row.mkdirs();
            }
            file.transferTo(row);
        }
    }

    /**
     *
     * @param request: {
     *    files: "文件流",
     *    fileDir: "自定义存放的位置",
     * }
     * @return
     */
    @PostMapping("/test/upload")
    public List<FileSaveResponse> fileUploadTest(MultipartHttpServletRequest request) {
        List<MultipartFile> files = request.getFiles("files");
        String fileDir = request.getParameter("fileDir");
        StringBuilder fileOutput = new StringBuilder(fileRootPath)
                .append("\\").append(StringUtils.isEmpty(fileDir) ? "": (fileDir + "\\"));
        return FileUtils.save(files, fileOutput.toString());
    }
}
