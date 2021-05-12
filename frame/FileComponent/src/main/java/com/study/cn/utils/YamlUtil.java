package com.study.cn.utils;

import org.thymeleaf.util.StringUtils;
import org.yaml.snakeyaml.DumperOptions;
import org.yaml.snakeyaml.Yaml;

import java.io.*;
import java.util.*;

// https://www.cnblogs.com/xiaoqi/p/SnakeYAML.html
// https://www.cnblogs.com/digod/p/12572265.html
// https://plugins.jenkins.io/snakeyaml-api/
// http://javadox.com/org.yaml/snakeyaml/1.13/org/yaml/snakeyaml/package-summary.html
public class YamlUtil {

    public static void SnakeYamlRead() throws FileNotFoundException {
        Yaml yaml = new Yaml();
        Map<String, Object> map = yaml.loadAs(new FileInputStream("/Contact2.yaml"), Map.class);
        System.err.println(map);
    }

    /**
     * 输出yaml文件
     * @param context
     * @param output
     * @param filename
     * @throws IOException
     */
    public static void writer(Object context, String output, String filename) throws IOException {
        if (StringUtils.isEmptyOrWhitespace(filename)) {
            filename = System.currentTimeMillis() + ".yaml";
        }
        File dir = new File(output);
        if (!dir.exists()) {
            dir.mkdirs();
        }
        String filePath = new StringBuilder(output).append("\\").append(filename).toString();
        DumperOptions options = new DumperOptions();
        options.setIndent(2);
        options.setTimeZone(TimeZone.getDefault());
        options.setDefaultFlowStyle(DumperOptions.FlowStyle.BLOCK);
        Yaml yaml = new Yaml(options);
        yaml.dump(context, new FileWriter(filePath));
    }

    public static void main(String[] args) throws IOException {
        SnakeYamlRead();
    }
}
