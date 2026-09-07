# DataBank 数据银行 · MVP 后端

按 `Data-Bank/输出物/02-技术设计.md` 的限界上下文与 P0 功能落地的一个**单体 MVP 后端**（Node.js + Express），用 JSON 文件存储 + 模拟区块链/沙箱，先打通端到端核心闭环，后续再替换为真实组件。

## 设计文档 → 代码映射

| 设计（02-技术设计 / 01-产品分析） | 本工程实现 |
|----------------------------------|-----------|
| Account 限界上下文（协议账户三权分立、生命周期、纠纷仲裁基础） | `src/routes/accounts.js` + `src/domain.js` |
| Identity 限界上下文（DID、鉴权方注册、信誉质押、背书） | `src/routes/endorsers.js` |
| Settlement / Finance 限界上下文（Token 计量、70/20/10 分账、出入金） | `src/routes/finance.js` |
| Privacy 限界上下文（数据沙箱：模型进场、数据不出域、可信计量、有效期） | `src/routes/sandbox.js` |
| 联盟链信任锚点（链上锚定） | `src/routes/ledger.js`（模拟区块账本） |
| 数据模型（ProtocolAccount / SettlementRecord / EndorserProfile） | `src/seed.js` 种子 + 路由中的对象结构 |

## 快速开始

```bash
npm install
npm start          # 默认端口 4000
# 开发热重载：npm run dev
```

启动后访问：
- 接口目录：http://127.0.0.1:4000/api
- 健康检查：http://127.0.0.1:4000/api/meta/health

## 核心流程演示（curl）

```bash
# 1. 创建协议账户（三权分立）
curl -X POST http://127.0.0.1:4000/api/accounts \
  -H "Content-Type: application/json" \
  -d '{"owner_did":"did-owner-b","data_manifest":{"data_volume":10,"data_types":["经营数据"]}}'

# 2. 发放使用权许可证
curl -X POST http://127.0.0.1:4000/api/accounts/acct-demo-001/usage-licenses \
  -H "Content-Type: application/json" \
  -d '{"consumer_did":"did-consumer-1","data_scope":["健康心率"],"price_per_unit":0.01}'

# 3. 数据存款
curl -X POST http://127.0.0.1:4000/api/deposits \
  -H "Content-Type: application/json" \
  -d '{"account_id":"acct-demo-001","data_volume":2.0,"principal_token":5000,"annual_rate":0.03}'

# 4. 消费数据结算（70/20/10 分账）
curl -X POST http://127.0.0.1:4000/api/settlements \
  -H "Content-Type: application/json" \
  -d '{"account_id":"acct-demo-001","consumer_did":"did-consumer-1","data_volume":1.0,"compute_units":4}'

# 5. 数据沙箱任务（模型进场）
curl -X POST http://127.0.0.1:4000/api/sandbox/jobs \
  -H "Content-Type: application/json" \
  -d '{"account_id":"acct-demo-001","consumer_did":"did-consumer-1","model_ref":"gpt-fin-7b","task_type":"INFER","isolation_level":"L1"}'
```

## 说明与后续演进

- **存储**：当前为 `data/db.json` 的 JSON 文件存储，MVP 演示足够；生产替换为 MySQL/PostgreSQL。
- **区块链**：`ledger.js` 目前是模拟账本，后续替换为 FISCO BCOS / Substrate 真实锚定。
- **数据沙箱**：`sandbox.js` 目前模拟执行 + 计量，L1 容器 / L2 TEE / L3 MPC 的分级与七道闸在 `domain.js` 中预留。
- **前端接入**：三平台静态原型（`Data-Bank/源码/` 三个目录）下一步通过 `fetch` 对接本后端 API，或改造为 Vue3 单页应用。

## 目录结构

```
databank-server/
├── server.js              # Express 入口 + 路由挂载 + 接口目录页
├── package.json
└── src/
    ├── store.js           # JSON 文件存储（load/save/mutate）
    ├── domain.js          # 领域逻辑（ID、分账比例、利息、状态枚举）
    ├── seed.js            # 种子数据
    └── routes/
        ├── meta.js        # 健康检查 + 统计
        ├── accounts.js    # 协议账户（三权分立）
        ├── endorsers.js   # 鉴权方准入 + 背书
        ├── finance.js     # 数据存款 + Token 结算
        ├── sandbox.js     # 数据沙箱
        └── ledger.js      # 模拟链上账本
```