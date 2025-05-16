# vue-bilibili-danmu-admin

本项目是 [`php-bilibili-danmu`](https://github.com/zxc7563598/php-bilibili-danmu) 的 **前端管理后台（独立构建版本）** ，用于配合弹幕服务端使用，实现**更完整的**后台控制功能。

## ❓ 为什么要单独开一个仓库？

原项目 [`php-bilibili-danmu`](https://github.com/zxc7563598/php-bilibili-danmu) 实际上已经内置了一个原生后台，**已可直接使用，此项目非刚需**。本项目的目标是为追求更强大后台功能的用户提供一个更完善的替代方案。

由于在推荐服务器配置时出于成本考虑，建议使用较低配置的服务器（如 **2核2G**）。这种配置在实际运行项目时并不会有明显问题，但如果尝试在服务器上直接构建本项目，性能压力会非常大，构建过程可能会失败甚至卡死。

因此，我们将前端后台代码单独抽离到此仓库，**建议用户在本地完成构建后再上传到服务器**。这并不是一项复杂的操作，欢迎动手尝试，如有困难也可以联系作者获取帮助。

---

## ✨ 功能特性

- ✅ 更细致的机器人控制
- ✅ 更优的用户交互体验
- ✅ 更清晰的使用逻辑
- ✅ 更丰富的信息展示（历史弹幕信息、礼物信息等）
- 🚧 持续扩展中...

---

## 📦 使用说明

> **本项目需要本地构建打包后上传部署，不建议在低配服务器上执行构建命令。**

### 1. 下载项目

```bash
git clone https://github.com/zxc7563598/vue-bilibili-danmu-admin.git
cd vue-bilibili-danmu-admin
```

### 2. 安装 Node.js

请前往官网下载安装适合你系统的版本：

👉 [https://nodejs.org/zh-cn](https://nodejs.org/zh-cn)

建议使用稳定的 LTS 版本。

### 3. 配置环境变量

复制 `.env.example` 为 `.env`：

```bash
cp .env.example .env
```

根据实际情况填写请求地址、密钥等信息，具体信息可在机器人控制台系统配置中查看。

### 4. 安装依赖 & 构建项目

```bash
npm install
npm run build
```

执行后将生成 `dist/` 目录，即为最终可部署版本。

---

## 🚀 部署方式

### ❓ 自动部署

联系作者，你总能联系到作者的

### ✅ 手动部署

将 `dist/` 文件夹复制到你的服务器上，并放置到原项目中：

```bash
# 一键部署的用户，把 dist 文件夹复制到该目录即可：
/opt/bilibili-robots/php/public/
```

默认会自动识别该目录下的静态文件并提供访问。

---

## 🧩 配套项目

- 🔗 后端服务：[php-bilibili-danmu](https://github.com/zxc7563598/php-bilibili-danmu)
