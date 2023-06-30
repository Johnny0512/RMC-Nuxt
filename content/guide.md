# TongWeb 部署指南

Assignee: 屹 张
Due: June 19, 2023
Status: Done

## 服务器环境

服务器：鲲鹏920
操作系统：麒麟
JDK版本: OpenJDK 1.8
中间件：东方通TongWeb
数据库：达梦DM8.0

### 连接服务器（达梦数据库已经预装）

```bash
ssh root@172.20.112.254 #密码ectcectc+123
```

### TongWeb7.0企业版安装

1. 上传东方通提供的压缩包至服务器
2. 解压缩到任意位置
3. 执行目录中bin文件夹下的installservice.sh安装服务，也可以执行startserver.sh直接启动TongWeb
4. 防火墙设置
    
    为在本地访问控制台，需要开放控制台端口（默认为9060）：
    
    ```bash
    firewall-cmd --add-port=9060/tcp --permanent
    #若成功应提示'success'
    firewall-cmd --reload
    #若成功应提示'success'
    ```
    
5. 访问控制台：http://172.20.112.254:9060/console
    
    密钥：thanos/Zrsy@tongweb7 （初始为thanos/thanos@123.com）
    
    ![Untitled](TongWeb%20%E9%83%A8%E7%BD%B2%E6%8C%87%E5%8D%97%20b0e64a37a4934dfcbd7735a7ac2fbdd5/Untitled.png)
    

### 后端文件修改（后端使用TongWeb嵌入式版）

1. 修改Pom.xml
    1. 排除tomcat依赖
    
    ```xml
    <dependency>
        <groupId>org.springframework.boot</groupId>
        <artifactId>spring-boot-starter-web</artifactId>
        <!-- 排除tomcat依赖 -->
        <exclusions>
            <exclusion>
                <groupId>org.springframework.boot</groupId>
                <artifactId>spring-boot-starter-tomcat</artifactId>
            </exclusion>
        </exclusions>
    </dependency>
    ```
    
    b. 加入TongWeb依赖
    
    <aside>
    ⚠️ TongWeb包需从东方通销售获取，执行东方通提供的安装脚本后相关jar包将会导入本地maven仓库
    
    </aside>
    
    ```xml
    <dependency>
        <groupId>com.tongweb.springboot</groupId>
        <artifactId>tongweb-spring-boot-starter-2.x</artifactId>
        <version>7.0.E.5_P3</version>
    </dependency>
    <dependency>
        <groupId>com.tongweb</groupId>
        <artifactId>tongweb-embed</artifactId>
        <version>7.0.E.5_P3</version>
    </dependency>
    <dependency>
        <groupId>org.springframework.boot</groupId>
        <artifactId>spring-boot-starter-data-jpa</artifactId>
    </dependency>
    <dependency>
        <groupId>com.tongweb.springboot</groupId>
        <artifactId>tongweb-spring-boot-data-jdbc-starter-2.x</artifactId>
        <version>7.0.E.5_P3</version>
    </dependency>
    ```
    
    <aside>
    ❗ 现在使用的7.0.E.5_P3版本的TongWeb依赖存在问题，tongweb-embed依赖需要修改tongweb-embed-7.0.E.5_P3.pom文件（在maven仓库中），剔除所有子依赖中的parent标签，并把maven-shade-plugin的版本更改至最新版。并且子依赖中的artifactId需要手动更改。官方最新版本是7.0.6，更换版本后是否会解决问题还没研究。
    
    </aside>
    
    c. 添加DM8.0 Hibernate方言包
    
    <aside>
    ⚠️ 方言包文件可在服务器中dm8安装文件夹中drivers/dialect目录下找到，需要拷贝到本地目录后导入到本地仓库
    
    </aside>
    
    ```bash
    mvn install:install-file -DgroupId=org.hibernate -DartifactId=DmDialect -Dversion=1.0.0 -Dpackaging=jar -Dfile=/Users/johnny/ZRSY/DmDialect-for-hibernate5.6.jar
    ```
    
    ```xml
    <dependency>
        <groupId>org.hibernate</groupId>
        <artifactId>DmDialect</artifactId>
        <version>1.0.0</version>
    </dependency>
    ```
    
    d. 添加达梦数据库driver依赖
    
    ```xml
    <dependency>
      <groupId>com.dameng</groupId>
      <artifactId>DmJdbcDriver18</artifactId>
      <version>8.1.1.193</version>
    </dependency>
    ```
    
2. 修改application.yml
    1. 配置TongWeb证书文件目录
        
        ```yaml
        server:
          port: 8080
          servlet:
            context-path: /backend/discipline
          tongweb:
            license:
              type: file
              path: /Users/johnny/ZRSY/license-emb.dat
        ```
        
    2. 配置hibernate方言
        
        ```yaml
        spring:
          jpa:
            properties:
              hibernate:
                dialect: org.hibernate.dialect.DmDialect
        ```
        
    3. 配置数据库
        
        ```yaml
        datasource:
                xueke:
                  url: jdbc:dm://172.20.112.254:5236
                  username: SYSDBA
                  password: SYSDBA
                  driver-class-name: dm.jdbc.driver.DmDriver
                  type: com.zaxxer.hikari.HikariDataSource
        ```
        
3. 修改启动类
    
    ```java
    //继承SpringBootServletInitializer类
    public class Application extends SpringBootServletInitializer {
        @Override
        protected SpringApplicationBuilder configure(SpringApplicationBuilder application) {
            return application.sources(Application.class);
        }
    		public static void main(String[] args) {
            SpringApplication.run(Application.class, args);
    				...
        }
    		...
    ```
    

### 后端部署到服务器

1. 使用maven打包为jar文件，和license文件一起上传到服务器
2. 上传到服务器后用nohup命令后台启动
    
    ```bash
    nohup java -Dserver.tongweb.license.type=file -Dserver.tongweb.license.path=./license-emb.dat -jar backend-discipline-1.0.jar --server.port=8080&
    ```
    
    <aside>
    ❗ 因为我在本地的时候没有把license放在项目文件夹里，所以在服务器端部署时需要再次添加license。
    
    </aside>
    
3. 如果需要本地测试接口则需要开放端口
    
    ```bash
    firewall-cmd --add-port=8080/tcp --permanent
    firewall-cmd --reload
    # 同理如果需要访问数据库则开启5236
    ```
    

### 前端部署到服务器

1. 修改.env.producion（因为代理设置不会被打包）
    
    ```xml
    # just a flag
    ENV = 'production'
    
    # base api
    VUE_APP_BASE_API = 'http://172.20.112.254:8080/backend/discipline'
    ```
    
2. 打包项目文件
3. 在打包后的dist文件夹下用jar命令压缩成war文件
    
    ```bash
    jar -cvf web.war *
    ```
    
4. war文件上传至服务器
5. 打开控制台，进入Web容器配置-HTTP通道管理，选择创建HTTP通道。通道名称自定，监听端口与前端项目配置一致，其他默认
    
    ![Untitled](TongWeb%20%E9%83%A8%E7%BD%B2%E6%8C%87%E5%8D%97%20b0e64a37a4934dfcbd7735a7ac2fbdd5/Untitled%201.png)
    
6. 进入应用管理-部署应用，选择上传的war包，设置应用前缀和名称，其余默认
    
    ![Untitled](TongWeb%20%E9%83%A8%E7%BD%B2%E6%8C%87%E5%8D%97%20b0e64a37a4934dfcbd7735a7ac2fbdd5/Untitled%202.png)
    
7. 部署完成，点击http访问即可访问前端应用
    
    ![Untitled](TongWeb%20%E9%83%A8%E7%BD%B2%E6%8C%87%E5%8D%97%20b0e64a37a4934dfcbd7735a7ac2fbdd5/Untitled%203.png)
    

### 跨域问题处理

<aside>
⚠️ 如果出现403错误则说明前端应用因为和与后端接口端口不一致而没有权限后端接口，需要处理跨域问题

</aside>

后端项目中添加配置类CorsConfig：

```java
package com.zrsy.kpi.core.config;

import org.springframework.context.annotation.Configuration;
import org.springframework.web.servlet.config.annotation.CorsRegistry;
import org.springframework.web.servlet.config.annotation.WebMvcConfigurer;

@Configuration // 一定不要忽略此注解
public class CorsConfig implements WebMvcConfigurer {
    @Override
    public void addCorsMappings(CorsRegistry registry) {
        registry.addMapping("/**") // 所有接口
                .allowCredentials(true) // 是否发送 Cookie
                .allowedOriginPatterns("http://172.20.112.254:9528") // 支持域
                .allowedMethods(new String[]{"GET", "POST", "PUT", "DELETE"}) // 支持方法
                .allowedHeaders("*")
                .exposedHeaders("*");
    }
}
```

<aside>
⚠️ 支持域填写“*”则表示支持来自所有域的访问，不建议在生产环境中使用。

</aside>

## 👏Done！