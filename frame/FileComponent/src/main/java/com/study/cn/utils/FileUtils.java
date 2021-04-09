package com.study.cn.utils;

import com.study.cn.entity.response.FileSaveResponse;
import org.springframework.web.multipart.MultipartFile;

import java.io.File;
import java.util.ArrayList;
import java.util.Date;
import java.util.List;


public class FileUtils {

    public static List<FileSaveResponse> save(List<MultipartFile> files, final String output) {
        List<FileSaveResponse> result = new ArrayList<>();
        files.stream().forEach(input -> {
            FileSaveResponse fileSaveResponse = new FileSaveResponse();
            File file = new File(output + input.getOriginalFilename());
            fileSaveResponse.setFilename(file.getName());
            try {
                if (!new File(output).exists()) file.mkdirs();
                if (file.exists()) {
                    file = new File(output + new Date().getTime() + input.getOriginalFilename());
                }
                input.transferTo(file);
                fileSaveResponse.setStatus(FileSaveResponse.Status.SUCCESS);
                fileSaveResponse.setReName(file.getName());
            } catch (Exception e) {
                fileSaveResponse.setStatus(FileSaveResponse.Status.ERROR);
            }
            result.add(fileSaveResponse);
        });
        return result;
    }
}
