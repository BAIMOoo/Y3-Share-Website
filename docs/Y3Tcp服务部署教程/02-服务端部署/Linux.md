---
title: Linux部署教程
showLastUpdateAuthor:: true
---
# Linux部署教程
## 演示平台: Linux (Ubuntu 22.04 64位 UEFI版)
### 1. 安装Docker和Docker Compose
```
如果你的Linux系统还没有安装Docker和Docker Compose，需要先安装
# 更新包索引
sudo apt update

# 安装Docker(执行命令后会提示是否继续，输入Y然后回车即可)
sudo apt install docker.io

# 安装Docker Compose(执行命令后会提示是否继续，输入Y然后回车即可)
sudo apt install docker-compose

# 启动Docker服务
sudo systemctl start docker
sudo systemctl enable docker
```


### 2. **克隆服务端文件**
```
# 克隆项目
git clone https://gitee.com/baim00/y3-tcp-server.git

# 查看当前文件夹下所有文件
ls

# 进入项目文件夹
cd y3-tcp-server

# 修改服务端配置文件(可选)
主要是修改数据库的用户名、密码、端口
vi docker-compose.yml

以下是通常可能修改的地方：
ports:
  - "27017:27017"
environment:
  MONGO_INITDB_ROOT_USERNAME: admin
  MONGO_INITDB_ROOT_PASSWORD: password123

- MONGODB_URI=mongodb://admin:password123@mongodb:27017/
请自行确保配置文件修改正确
```


### 3. **构建和启动服务**
```
# 注意docker-compose命令都需要在项目路径下执行
# 构建并启动服务（后台运行）
docker-compose up --build -d

# 查看服务状态
docker-compose ps

# 如果执行第一步时报错可以参照这个文档解决：https://cloud.tencent.com/developer/article/2516747
sudo vi /etc/docker/daemon.json
#按i进入编辑模式
#将以下内容添加到配置文件中：
{
  "registry-mirrors" : [
    "https://docker.m.daocloud.io",
    "https://mirror.aliyuncs.com"
  ]
}
# 按Esc退出编辑模式，输入:wq保存并退出 
```


### 4. **验证部署**
```
检查服务是否正常运行：
# 查看服务器日志
docker-compose logs server
```
如果看到类似以下输出，说明服务端已经正常部署了
![img](../img/成功部署输出.png)


### 5. **管理服务**
```
# 停止服务
docker-compose stop

# 启动服务
docker-compose start

# 重启服务
docker-compose restart

#当服务端代码有更新，该如何操作？
1. docker-compose down
2. 更新代码
3. docker-compose up --build -d
```
TIPS:如果你使用的是云服务厂商的服务器，还需要在云服务厂商的后台页面设置安全组，确保所有玩家都能访问我们的服务器。
下图为阿里云的控制台页面
![img](../img/阿里云安全组页面.png)

