<<<<<<< HEAD
# xuetu-web

#### 介绍
学途前端代码。

#### 软件架构
软件架构说明


#### 安装教程

1.  xxxx
2.  xxxx
3.  xxxx

#### 使用说明

1.  xxxx
2.  xxxx
3.  xxxx

#### 参与贡献

1.  Fork 本仓库
2.  新建 Feat_xxx 分支
3.  提交代码
4.  新建 Pull Request


#### 特技

1.  使用 Readme\_XXX.md 来支持不同的语言，例如 Readme\_en.md, Readme\_zh.md
2.  Gitee 官方博客 [blog.gitee.com](https://blog.gitee.com)
3.  你可以 [https://gitee.com/explore](https://gitee.com/explore) 这个地址来了解 Gitee 上的优秀开源项目
4.  [GVP](https://gitee.com/gvp) 全称是 Gitee 最有价值开源项目，是综合评定出的优秀开源项目
5.  Gitee 官方提供的使用手册 [https://gitee.com/help](https://gitee.com/help)
6.  Gitee 封面人物是一档用来展示 Gitee 会员风采的栏目 [https://gitee.com/gitee-stars/](https://gitee.com/gitee-stars/)
=======
# 学途知识共享平台

## 项目简介

本项目基于Vue.js + elementUI + SpringBoot + Mybatis开发的项目。

学途知识共享平台是面向社会各个群体各个年龄段各个行业的综合性在线教育平台。
本平台囊括了各个领域的专业教育资源，提供录播课、在线直播课等多种课程形式，
并提供一个开放性知识分享交流社区，供不同领域不同群体线上交流，促进学科交叉知识融合。
同时，本平台依托智能化算法，针对不同用户的不同学习习惯和个人特征，定制出一套个性化的学习方案，
提高用户学习效率，让用户逐渐养成终身学习的习惯。

## 项目安装

```
npm install
```

## 编译和热重装以进行开发

```
npm run serve
```

## 编译并最小化生产

```
npm run build
```

## 整理修复文件

```
npm run lint
```
## 前端查询数据格式
### 数据单个多个查询list
* queryList: { tableName: '' , id: '', tableKey: '' }
* header:用于配置数据库表名、主键名、主键值
* tableName:数据库表名(必配)
* id:主键值,如不需要id,需要置空即 id:''(选配)
* tableKey:主键名(选配)
* content:数据部分，根据实际需求按照 字段名: '字段值' 进行插值

## 前端更新插入数据格式
### 数据插入更新list
* updateList: { header: [{ tableName: '', id: '', tableKey: '' }], content: [{ id: '', 字段名: '字段值' }] }
* header:用于配置数据库表名、主键名、主键值
* tableName:数据库表名(必配)
* id:主键值(必配)
* tableKey:主键名(必配)
* content:数据部分，根据实际需求按照 字段名: '字段值' 进行插值(选配)

# 支付宝沙箱账户密码
* 买家账号 kwpifs2614@sandbox.com
* 登录密码 111111
* 支付密码 111111

# 七牛云账号密码
* 账号 13708373610
* 密码 Xueleme-2022

# 学了么网易邮箱账号密码
* 账号 XUELEME_Admin@163.com
* 密码 Xueleme2022
* 
vue.config.js中的proxy下配置后台服务器地址
>>>>>>> update
