package com.study.cn.entity.response;

import lombok.Data;

@Data
public class FileSaveResponse {

    public enum Status {
        SUCCESS, ERROR
    }

    private String filename;
    private Status status;
    private String reName;
}
