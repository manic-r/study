package com.study.cn.rest;

import com.study.cn.entity.request.FileSaveRequest;
import com.study.cn.entity.response.FileSaveResponse;
import com.study.cn.entity.response.SystemResponse;
import com.study.cn.utils.FileUtils;
import org.apache.commons.io.output.FileWriterWithEncoding;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;
import org.springframework.web.multipart.MultipartHttpServletRequest;
import org.thymeleaf.util.StringUtils;

import java.io.File;
import java.io.FileWriter;
import java.io.IOException;
import java.net.Inet4Address;
import java.net.InetAddress;
import java.net.UnknownHostException;
import java.util.List;
import java.util.Map;

//https://www.cnblogs.com/mmzs/p/9167743.html
//https://blog.csdn.net/zhangpower1993/article/details/89016503
//https://www.cnblogs.com/rinack/p/14173936.html
@RestController
@RequestMapping("/file")
public class FileUploadController {

    @Value("${file.root.path}")
    private String fileRootPath;

    private final String separator = "=======================================================";

    @GetMapping("/system")
    public SystemResponse rootPath() {
        SystemResponse response = new SystemResponse();
        response.setRootPath(this.fileRootPath);
        Map<String,String> map = System.getenv();
        // 获取计算机名
        response.setComputerName(map.get("COMPUTERNAME"));
        // 获取用户名
        response.setUserName(map.get("USERNAME"));
        // 获取计算机域名
        response.setUserDomain(map.get("USERDOMAIN"));
        InetAddress ip4 = null;
        try {
            ip4 = Inet4Address.getLocalHost();
            response.setIp4(ip4.getHostAddress());
        } catch (UnknownHostException e) {
            e.printStackTrace();
        }
        return response;
    }

    @PostMapping("/string")
    public FileSaveResponse stringUpload(@RequestBody List<String> inputs) {
        FileSaveResponse response = new FileSaveResponse();
        FileWriterWithEncoding fileWriter = null;
        try {
            String filename = new StringBuilder(String.valueOf(System.currentTimeMillis()))
                    .append(".txt").toString();
            String filePath = new StringBuilder(fileRootPath)
                    .append("\\").append(filename).toString();
            File file = new File(filePath);
            fileWriter = new FileWriterWithEncoding(file, "utf-8", true);
            for (String rowLine: inputs) {
                fileWriter
                        .append(System.getProperty("line.separator"))
                        .append(System.getProperty("line.separator"))
                        .append(separator)
                        .append(System.getProperty("line.separator"))
                        .append(System.getProperty("line.separator"))
                        .append(rowLine);
            }
            response.setFilename(filename);
            response.setReName(filename);
            response.setStatus(FileSaveResponse.Status.SUCCESS);
        } catch (Exception e) {
            response.setStatus(FileSaveResponse.Status.ERROR);
        } finally {
            try {
                fileWriter.close();
            } catch (Exception e) {
                e.printStackTrace();
            }
        }
        return response;
    }

    /**
     *
     * @param request: {
     *    files: "文件流",
     *    fileDir: "自定义存放的位置",
     *    deleteAll: "删除文件夹中已存在的所有文件",
     *    backupAll: “备份历史文件，统一存入一个文件夹（按照当天日期）”
     *    lastBackup: "备份文件夹内非文件夹的文件到新的文件夹（按照时间戳备份）"
     * }
     * @return
     */
    @PostMapping("/upload")
    public List<FileSaveResponse> fileUploadTest(MultipartHttpServletRequest request) {
        FileSaveRequest param = new FileSaveRequest(request, fileRootPath);
        // 删除全部
        if (param.getDeleteAll()) {
            FileUtils.deleteOfDir(fileRootPath);
        } else if (param.getBackupAll()) {
            FileUtils.backup(fileRootPath, true);
        } else if (param.getLastBackup()) {
            FileUtils.backup(fileRootPath, false);
        }
        return FileUtils.save(param.getFiles(), param.getOutput());
    }
}
