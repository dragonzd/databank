import { Router } from 'express';
import { load, mutate } from '../store.js';
import { id, nowIso, splitAmount, computeInterest, round } from '../domain.js';

const router = Router();

// 数据存款（活期，Token 计息）
router.post('/deposits', (req, res) => {
  const { account_id, owner_did, data_volume, data_type, principal_token = 0, annual_rate = 0.03 } = req.body || {};
  if (!account_id) return res.status(400).json({ error: 'account_id 必填' });
  const deposit = {
    deposit_id: id('dep'),
    account_id,
    owner_did: owner_did || null,
    data_volume: data_volume || 0,
    data_type: data_type || '通用',
    principal_token,
    annual_rate,
    status: 'ACTIVE',
    created_at: nowIso(),
  };
  mutate((db) => {
    db.deposits.push(deposit);
    return deposit;
  });
  res.status(201).json(deposit);
});

router.get('/deposits', (req, res) => res.json(load().deposits));

// 结算利息
router.post('/deposits/:id/interest', (req, res) => {
  const { days = 30 } = req.body || {};
  const out = mutate((db) => {
    const d = db.deposits.find((x) => x.deposit_id === req.params.id);
    if (!d) return { error: '存款不存在', status: 404 };
    const interest = computeInterest(d.principal_token, d.annual_rate, days);
    return { deposit_id: d.deposit_id, principal_token: d.principal_token, annual_rate: d.annual_rate, days, interest };
  });
  if (out.error) return res.status(out.status).json({ error: out.error });
  res.json(out);
});

// 消费数据结算（70/20/10 分账，链上锚定）
router.post('/settlements', (req, res) => {
  const { account_id, consumer_did, data_volume, duration_sec, compute_units } = req.body || {};
  if (!account_id || !consumer_did) return res.status(400).json({ error: 'account_id 和 consumer_did 必填' });
  const token_amount = round((data_volume || 1) * 0.01 + (compute_units || 0) * 0.1);
  const settlement = {
    txn_id: id('txn'),
    account_id,
    consumer_did,
    usage_metrics: {
      data_volume: data_volume || 0,
      duration_sec: duration_sec || 0,
      compute_units: compute_units || 0,
    },
    token_amount,
    split: splitAmount(token_amount),
    block_height: 0,
    timestamp: nowIso(),
  };
  const out = mutate((db) => {
    db.settlements.push(settlement);
    const height = db.blocks.length + 1;
    settlement.block_height = height;
    db.blocks.push({ height, txn_id: settlement.txn_id, type: 'SETTLEMENT', anchored_at: nowIso() });
    return settlement;
  });
  res.status(201).json(out);
});

router.get('/settlements', (req, res) => res.json(load().settlements));

export default router;