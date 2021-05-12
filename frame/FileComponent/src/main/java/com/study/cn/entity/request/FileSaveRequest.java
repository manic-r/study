package com.study.cn.entity.request;

import lombok.Data;
import org.springframework.util.ObjectUtils;
import org.springframework.util.StringUtils;
import org.springframework.web.multipart.MultipartFile;
import org.springframework.web.multipart.MultipartHttpServletRequest;

import java.util.List;

@Data
public class FileSaveRequest {

    private final String ofTrue = "1";

    /**
     * 文件流
     */
    private List<MultipartFile> files;

    /**
     * 自定义存放的位置
     */
    private String fileDir;

    /**
     * 删除文件夹中已存在的所有文件
     * type: 1 => true; 0 => false
     */
    private Boolean deleteAll;

    /**
     * 备份历史文件，统一存入一个文件夹（按照当天日期）
     * type: 1 => true; 0 => false
     */
    private Boolean backupAll;

    /**
     * 备份文件夹内非文件夹的文件到新的文件夹（按照时间戳备份）
     * type: 1 => true; 0 => false
     */
    private Boolean lastBackup;

    /**
     * 处理后的文件输出路径
     */
    private String output;

    public FileSaveRequest() { }

    public FileSaveRequest(MultipartHttpServletRequest request, String output) {
        this.files = request.getFiles("files");
        this.fileDir = request.getParameter("fileDir");
        this.deleteAll = request.getParameter("deleteAll") != null && ofTrue.equals(request.getParameter("deleteAll"));
        this.backupAll = request.getParameter("backupAll") != null && ofTrue.equals(request.getParameter("backupAll"));
        this.lastBackup = request.getParameter("lastBackup") != null && ofTrue.equals(request.getParameter("lastBackup"));
        StringBuilder fileOutput = new StringBuilder(output)
                .append("\\").append(ObjectUtils.isEmpty(fileDir) ? "": (fileDir + "\\"));
        this.output = fileOutput.toString();
    }
}
