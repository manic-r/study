package com.study.cn;

import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.context.ConfigurableApplicationContext;
import org.springframework.core.env.Environment;

import java.net.Inet4Address;
import java.net.UnknownHostException;

// https://blog.csdn.net/weixin_39807541/article/details/111360952
@SpringBootApplication
public class FileComponentApplication {

	public static void main(String[] args) throws UnknownHostException {
		ConfigurableApplicationContext context = SpringApplication.run(FileComponentApplication.class, args);
		Environment env = context.getBean(Environment.class);
		String port = env.getProperty("server.port") == null ? "8080" : env.getProperty("server.port");

		System.out.println("Server running at:");
		System.out.println("- Local:   " +  "http://localhost:" + port);
		System.out.println("- Network: " +  "http://" + Inet4Address.getLocalHost().getHostAddress() + ":" + port);
	}

}
