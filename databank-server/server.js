import express from 'express';
import cors from 'cors';
import { seed } from './src/seed.js';
import metaRoutes from './src/routes/meta.js';
import accountsRoutes from './src/routes/accounts.js';
import endorsersRoutes from './src/routes/endorsers.js';
import financeRoutes from './src/routes/finance.js';
import sandboxRoutes from './src/routes/sandbox.js';
import ledgerRoutes from './src/routes/ledger.js';

seed();

const app = express();
app.use(cors());
app.use(express.json());

const ENDPOINTS = [
  { method: 'GET', path: '/api/meta/health', desc: '健康检查' },
  { method: 'GET', path: '/api/meta/stats', desc: '整体统计' },
  { method: 'GET', path: '/api/accounts', desc: '协议账户列表' },
  { method: 'POST', path: '/api/accounts', desc: '创建协议账户（三权分立）' },
  { method: 'GET', path: '/api/accounts/:id', desc: '账户详情' },
  { method: 'POST', path: '/api/accounts/:id/usage-licenses', desc: '发放使用权许可证' },
  { method: 'POST', path: '/api/accounts/:id/close', desc: '账户解约' },
  { method: 'GET', path: '/api/endorsers', desc: '鉴权方列表' },
  { method: 'POST', path: '/api/endorsers', desc: '鉴权方申请准入' },
  { method: 'POST', path: '/api/endorsers/:did/approve', desc: '银行审批鉴权方准入' },
  { method: 'POST', path: '/api/endorsers/:did/endorse', desc: '鉴权方背书' },
  { method: 'GET', path: '/api/deposits', desc: '数据存款列表' },
  { method: 'POST', path: '/api/deposits', desc: '数据存款' },
  { method: 'POST', path: '/api/deposits/:id/interest', desc: '结算存款利息' },
  { method: 'GET', path: '/api/settlements', desc: '结算记录列表' },
  { method: 'POST', path: '/api/settlements', desc: '消费数据结算（70/20/10 分账）' },
  { method: 'GET', path: '/api/sandbox/jobs', desc: '数据沙箱任务列表' },
  { method: 'POST', path: '/api/sandbox/jobs', desc: '创建数据沙箱任务（模型进场）' },
  { method: 'GET', path: '/api/sandbox/jobs/:id', desc: '查询沙箱任务（计量+结果）' },
  { method: 'GET', path: '/api/ledger/blocks', desc: '链上账本锚定记录' },
];

app.get('/', (req, res) => {
  const rows = ENDPOINTS.map(
    (e) => `<tr><td><code>${e.method}</code></td><td><code>${e.path}</code></td><td>${e.desc}</td></tr>`
  ).join('');
  res.type('html').send(`<!doctype html><html lang="zh"><meta charset="utf-8">
<title>DataBank API</title>
<style>
body{font-family:-apple-system,Segoe UI,Microsoft YaHei,sans-serif;max-width:900px;margin:40px auto;padding:0 20px;color:#1f2937}
h1{font-size:22px}.sub{color:#6b7280;margin-top:-8px}
table{border-collapse:collapse;width:100%;margin-top:20px;font-size:14px}
th,td{border:1px solid #e5e7eb;padding:8px 10px;text-align:left}
th{background:#f3f4f6}
code{background:#f3f4f6;padding:1px 5px;border-radius:4px;font-size:12px}
td code{background:#eef2ff;color:#3730a3}
</style>
<h1>DataBank 数据银行 · MVP 后端</h1>
<p class="sub">协议账户三权分立 · 数据存款 · Token 结算（70/20/10） · 数据沙箱</p>
<table><thead><tr><th>方法</th><th>路径</th><th>说明</th></tr></thead><tbody>${rows}</tbody></table>`);
});

app.get('/api', (req, res) => res.json({ service: 'databank-server', endpoints: ENDPOINTS }));

app.use('/api/meta', metaRoutes);
app.use('/api/accounts', accountsRoutes);
app.use('/api/endorsers', endorsersRoutes);
app.use('/api', financeRoutes);
app.use('/api/sandbox', sandboxRoutes);
app.use('/api/ledger', ledgerRoutes);

app.use('/api', (req, res) => res.status(404).json({ error: '接口不存在' }));

const PORT = process.env.PORT || 4000;
app.listen(PORT, () => {
  console.log(`DataBank server 已启动: http://127.0.0.1:${PORT}`);
  console.log(`接口目录: http://127.0.0.1:${PORT}/api`);
});