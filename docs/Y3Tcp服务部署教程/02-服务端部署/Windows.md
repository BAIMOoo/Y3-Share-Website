---
title: Windows部署教程
showLastUpdateAuthor:: true
---
# Windows部署教程
## 演示平台: Windows 11 24H2
### 1. 根据自己的电脑架构确定下载哪个docker客户端
如何确认自己电脑的架构: [如何查看自己电脑的架构是 ARM 还是 AMD？ - AlphaGeek - 博客园](https://www.cnblogs.com/geekbruce/articles/18554682)

docker下载地址: [Docker Desktop: The #1 Containerization Tool for Developers | Docker](https://www.docker.com/products/docker-desktop/)
![img](../img/docker下载页面.png)

### 2. 安装好后运行程序，一路下一步跳过即可，等待应用初始化
初始化后如下图
![img](../img/docker初始化页面.png)
### 3. 克隆服务端项目
   方法1：打开项目网址：https://gitee.com/baim00/y3-tcp-server.git ，选择下载压缩包，解压即可
    ![img](../img/下载服务端项目压缩包.png)
   
   方法2：在cmd终端中执行命令git clone https://gitee.com/baim00/y3-tcp-server.git

### 4. 修改服务端配置文件docker-compose.yml(可选)
主要是修改数据库的用户名、密码、端口
以下是通常可能修改的地方：
```
ports:
  - "27017:27017"
environment:
  MONGO_INITDB_ROOT_USERNAME: admin
  MONGO_INITDB_ROOT_PASSWORD: password123

- MONGODB_URI=mongodb://admin:password123@mongodb:27017/
- DB_NAME=TESTDB  #数据库名称
请自行确保配置文件修改正确
```
### 5. 打开项目文件夹
![img](../img/服务端项目文件夹.png)
### 6. 在空白处同时按下shift+鼠标右键，在下拉列表中选择“在此处打开Powershell窗口”
### 7. 构建和部署服务端
```
# 构建并启动服务（后台运行）

docker-compose up --build -d

# 查看服务状态
docker-compose ps

# 如果执行第一步时报错可以参照这个文档解决：https://cloud.tencent.com/developer/article/2516747

#当服务端代码需要更新，该如何操作？(下面的命令需要在服务端文件夹下执行)
1. docker-compose down
2. 更新代码
3. docker-compose up --build -d
```
执行完命令后，窗口输出应该如下图，此时服务器已经成功部署
![img](../img/windows成功部署.png)
### 8. 内网穿透
   如果你使用的是自己的电脑部署，那么你大概率是没有公网ip的，这意味着其他玩家没法链接到你的服务器,针对这个情况,可以尝试使用netapp内网穿透来解决

   详见教程: [NATAPP1分钟快速新手图文教程 - NATAPP-内网穿透 基于ngrok的国内高速内网映射工具](https://natapp.cn/article/natapp_newbie)