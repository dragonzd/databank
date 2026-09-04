# 数据银行 · Data Bank

可信数据增值服务平台 —— 把沉睡的数据唤醒，变成可抵押、可交易、可增值的新资产。

## 定位

数据银行让 **数据所有方** 授权开放数据获取收益、**数据鉴权方** 提供背书与可信鉴权、**数据使用方** 在「数据不出域」的前提下基于加密数据完成建模与推理。存，用价值引导授权开放；用，隐私计算实现「可用不可见」；增，数据资产可计量、可分账、可增值。

## 三方角色

| 角色 | 职责 |
|------|------|
| 数据所有方 | 按价值自主存入数据，设定开放粒度与范围 |
| 数据鉴权方 | 背书、鉴权、数据打包与校验 |
| 数据使用方 | 提交模型进沙箱训练/推理，付费使用 |

## 目录结构

```
data-bank/
├── Data-Bank/                          # 主项目（需求/设计文档/三平台源码/输出物）
│   ├── 需求文档/                        # 商业计划书
│   ├── 设计文档/                        # 系统平台建设方案 / 实施落地方案 / 数据分类
│   ├── 源码/                           # 三平台原型（用户应用/银行业务/数据交易）
│   └── 输出物/                         # 产品分析 / 技术设计 / 任务拆解
├── data-bank-prototype/                # 用户应用平台（独立原型）
├── data-bank-banking-platform/         # 银行业务平台（独立原型）
├── data-bank-trading-platform/         # 数据交易平台（独立原型）
├── databank-architecture/              # 系统应用架构设计
├── databank-detailed-design-cloud/     # 详细设计方案与云端部署方案
├── databank-minimal-deploy/            # 最小测试环境部署与开源选型
├── databank-rapid-dev-deploy/          # 快速实现与部署方案
├── business-scenario-evaluation/       # 业务场景评估报告
├── data-bank-platform-design/          # 平台建设方案
├── data-bank-implementation-plan/      # 实施落地方案
├── prototype-adjustment-plan/          # 原型设计调整方案
├── data-bank-promo/                    # 宣传页 / 海报
└── data-bank-summary/                  # 说明文案
```

## 三平台快速启动

三个平台均为静态 HTML 原型，用任意静态服务器即可预览：

```bash
# 用户应用平台（数据所有方 + 鉴权方）· 青
cd Data-Bank/源码/用户应用平台 && python -m http.server 8081

# 银行业务平台（业务人员）· 金
cd Data-Bank/源码/银行业务平台 && python -m http.server 8082

# 数据交易平台（数据使用方）· 绿
cd Data-Bank/源码/数据交易平台 && python -m http.server 8083
```

## 技术栈（目标架构）

- 前端：Vue 3 + TypeScript + Vite + Element Plus + ECharts
- 后端：Java 17 + Spring Boot 3（模块化单体 → 微服务）
- 区块链：FISCO BCOS（联盟链，存证 + 协议/分账合约）
- 隐私计算：容器沙箱 → TEE 分级，MPC/联邦学习后置
- 部署：阿里云 ACK（K8s）+ RDS/Redis/OSS + Terraform IaC