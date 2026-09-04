# 数据银行 · Data Bank

**可信数据增值服务商，数据世界基础设施服务商** —— 把沉睡的数据唤醒，变成可抵押、可交易、可增值的新资产。

[![License: MIT](https://img.shields.io/badge/License-MIT-blue.svg)](LICENSE)

## 项目简介

数据银行是一个可信数据增值服务平台，通过「授权开放 → 隐私计算 → 计量分账」的闭环，让数据在**不出域**的前提下完成流通与增值：

- **存 · 让授权可获益** —— 用数据价值引导数据所有方授权开放数据，按价值自主存入，并设定开放的粒度与范围
- **用 · 让数据不出域** —— 隐私计算实现「可用不可见」，数据使用方能基于数据鉴权方的数据算出结果，却拿不到原始数据
- **增 · 让资产可计量** —— 区块链联合账户保障数据所有方、数据鉴权方、数据使用方各方权益与收益，数据资产可计量、可分账、可增值

## 三方角色

| 角色 | 定义 | 核心职责 |
|------|------|----------|
| 数据所有方 | 拥有数据权益的个人 / 家庭 / 企业 | 按价值自主存入数据，设定开放粒度与范围，获取收益 |
| 数据鉴权方 | 提供背书与可信鉴权的机构 | 数据打包、完整性校验、授权鉴权 |
| 数据使用方 | 需要数据价值的企业 / 研究机构 | 提交模型进沙箱训练 / 推理，按使用量付费 |

## 三平台

| 平台 | 面向用户 | 核心功能 | 主题色 | 端口 |
|------|----------|----------|--------|------|
| 用户应用平台 | 数据所有方 + 鉴权方 | 数据存款 / 理财 / 贷款、联合账户、鉴权方自服务 | 青 `#00d4ff` | 8081 |
| 银行业务平台 | 银行业务人员 | 产品配置、鉴权方准入准出、协议规则、驾驶舱、收益分析 | 金 `#f59e0b` | 8082 |
| 数据交易平台 | 数据使用方 | 数据 / 模型市场、Token 充值、会员订阅、交易记录 | 绿 `#34d399` | 8083 |

## 快速开始

三个平台均为静态 HTML 原型（`index.html` + `echarts.min.js`），用任意静态服务器即可预览；三者均为「登录即注册」，输入任意手机号 / 邮箱 / 用户名即可进入：

```bash
# 用户应用平台（数据所有方 + 鉴权方）
cd data-bank-prototype && python -m http.server 8081

# 银行业务平台（业务人员）
cd data-bank-banking-platform && python -m http.server 8082

# 数据交易平台（数据使用方）
cd data-bank-trading-platform && python -m http.server 8083
```

随后在浏览器访问：

- 用户应用平台 → http://127.0.0.1:8081
- 银行业务平台 → http://127.0.0.1:8082
- 数据交易平台 → http://127.0.0.1:8083

## 目录结构

```
databank/
├── Data-Bank/                          # 需求文档与输出物
│   ├── 需求文档/
│   │   └── 数据银行商业计划书.md         # 原始商业计划书
│   └── 输出物/
│       ├── 01-产品分析.md               # 产品经理分析输出
│       ├── 02-技术设计.md               # 软件架构师设计输出
│       └── 03-任务拆解.md               # 高级 PM 任务拆解输出
├── data-bank-prototype/                # 用户应用平台原型
├── data-bank-banking-platform/         # 银行业务平台原型
├── data-bank-trading-platform/         # 数据交易平台原型
├── business-scenario-evaluation/       # 业务场景评估报告
├── data-bank-platform-design/          # 平台建设方案
├── data-bank-implementation-plan/      # 实施落地方案
├── prototype-adjustment-plan/          # 原型设计调整方案
├── databank-architecture/              # 系统应用架构设计
├── databank-detailed-design-cloud/     # 详细设计方案与云端部署方案
├── databank-minimal-deploy/            # 最小测试环境部署与开源选型
├── databank-rapid-dev-deploy/          # 快速实现与部署方案
├── data-bank-summary/                  # 说明文案
└── data-bank-promo/                    # 宣传页 / 海报
```

## 核心文档导读

> HTML 报告均为自包含单文件，下载后用浏览器直接打开即可；也可用任意静态服务器本地预览。

| 主题 | 文档 | 位置 |
|------|------|------|
| 业务分析 | 商业计划书 | [Data-Bank/需求文档/数据银行商业计划书.md](Data-Bank/需求文档/数据银行商业计划书.md) |
| 业务分析 | 业务场景评估报告 | [business-scenario-evaluation/business-scenario-evaluation.html](business-scenario-evaluation/business-scenario-evaluation.html) |
| 业务分析 | 产品分析 | [Data-Bank/输出物/01-产品分析.md](Data-Bank/输出物/01-产品分析.md) |
| 架构设计 | 平台建设方案 | [data-bank-platform-design/data-bank-platform-design.html](data-bank-platform-design/data-bank-platform-design.html) |
| 架构设计 | 系统应用架构设计 | [databank-architecture/databank-architecture.html](databank-architecture/databank-architecture.html) |
| 架构设计 | 详细设计方案与云端部署方案 | [databank-detailed-design-cloud/databank-detailed-design-cloud.html](databank-detailed-design-cloud/databank-detailed-design-cloud.html) |
| 架构设计 | 技术设计 | [Data-Bank/输出物/02-技术设计.md](Data-Bank/输出物/02-技术设计.md) |
| 实施落地 | 快速实现与部署方案 | [databank-rapid-dev-deploy/databank-rapid-dev-deploy.html](databank-rapid-dev-deploy/databank-rapid-dev-deploy.html) |
| 实施落地 | 最小测试环境部署与开源选型 | [databank-minimal-deploy/databank-minimal-deploy.html](databank-minimal-deploy/databank-minimal-deploy.html) |
| 实施落地 | 实施落地方案 | [data-bank-implementation-plan/data-bank-implementation-plan.html](data-bank-implementation-plan/data-bank-implementation-plan.html) |
| 实施落地 | 任务拆解 | [Data-Bank/输出物/03-任务拆解.md](Data-Bank/输出物/03-任务拆解.md) |
| 实施落地 | 原型设计调整方案 | [prototype-adjustment-plan/prototype-adjustment-plan.html](prototype-adjustment-plan/prototype-adjustment-plan.html) |
| 宣传推广 | 说明文案 | [data-bank-summary/data-bank-summary.html](data-bank-summary/data-bank-summary.html) |
| 宣传推广 | 宣传页 / 海报 | [data-bank-promo/](data-bank-promo/) |

## 技术栈（目标架构）

- **前端**：Vue 3 + TypeScript + Vite + Element Plus + ECharts
- **后端**：Java 17 + Spring Boot 3（模块化单体 → 按需拆分微服务）
- **区块链**：FISCO BCOS（联盟链，存证 + 协议 / 分账合约）
- **隐私计算**：容器沙箱 → TEE 分级，MPC / 联邦学习后置
- **部署**：阿里云 ACK（K8s）+ RDS / Redis / OSS + Terraform IaC

## License

本项目基于 [MIT License](LICENSE) 开源。