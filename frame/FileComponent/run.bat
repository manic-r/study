@REM https://blog.csdn.net/lubin100/article/details/103123124
@REM https://baijiahao.baidu.com/s?id=1639741003585442513&wfr=spider&for=pc
@REM [java -version 结果字符串中获取 java 版本](https://codingdict.com/questions/111208)
@REM [if 语法](http://bang.ykit.cn/6727.html)
@REM [截取字符串](https://blog.csdn.net/liangxy2014/article/details/78879745)
@REM [字符串查询](https://blog.csdn.net/zhouzihan520xj/article/details/40301041)

@ECHO OFF
SETLOCAL

::==============================================================
@REM 执行命令
SET CMD_SCRIPT=

@REM @REM 本地jre文件夹名称
SET LOCAL_JRE=jre
@REM @REM 本地重定向配置文件名称
SET LOCAL_CONFIG_YAML=.\customer.application.yaml
@REM 运行jar名称
SET RUN_JAR_NAME=.\file-domain.jar

@REM 使用Java路径，[全局] | [本地] :: JAVA_PATH
@REM 判断当前文件目录是否存在jre
IF EXIST %LOCAL_JRE% (
  SET JAVA_PATH=%LOCAL_JRE%\bin\java
) ELSE (
  SET JAVA_PATH=java
)

@REM 执行`-version`命令, 获取Java版本号 :: JAVAVER
FOR /f "tokens=3" %%g in ('%JAVA_PATH% -version 2^>^&1 ^| findstr /i "version"') do (
  SET JAVAVER=%%g
)

@REM 验证Java是否存在
IF NOT DEFINED JAVAVER (
  @ECHO Java environment does not exist !
  PAUSE
  EXIT
)

@REM 获取Java大版本号 :: JAVA_VERSION
SET JAVAVER=%JAVAVER:"=%
FOR /f "delims=. tokens=1-3" %%v in ("%JAVAVER%") do (
  SET JAVA_VERSION=%%v
)

@REM 判断是否是Java11以上，低于11停止运行
IF %JAVA_VERSION% LSS 11 (
  @ECHO Java version need more then 11 !
  PAUSE
  EXIT
)

SET CMD_SCRIPT=%JAVA_PATH% -jar

@REM 判断是否包含自定义配置文件
IF EXIST %LOCAL_CONFIG_YAML% (
  SET CMD_SCRIPT=%CMD_SCRIPT% -Dspring.config.location="%LOCAL_CONFIG_YAML%"
)

SET CMD_SCRIPT=%CMD_SCRIPT% %RUN_JAR_NAME%

@REM 运行脚本
%CMD_SCRIPT% &
::==============================================================
ENDLOCAL

PAUSE