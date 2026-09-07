import { Router } from 'express';
import { load, mutate } from '../store.js';
import { id, nowIso } from '../domain.js';

const router = Router();

// 创建协议账户（三权分立：所有权/使用权/收益权分离）
router.post('/', (req, res) => {
  const { owner_did, name, type, data_manifest } = req.body || {};
  if (!owner_did) return res.status(400).json({ error: 'owner_did 必填' });
  const account = {
    account_id: id('acct'),
    owner_did,
    name: name || (data_manifest && data_manifest.data_types && data_manifest.data_types.length
      ? data_manifest.data_types.join(' · ')
      : '未命名账户'),
    type: type || '个人',
    ownership_token: id('own'),
    usage_licenses: [],
    revenue_certificates: [],
    data_manifest: {
      merkle_root: data_manifest && data_manifest.merkle_root ? data_manifest.merkle_root : id('mr'),
      data_volume: (data_manifest && data_manifest.data_volume) || 0,
      data_types: (data_manifest && data_manifest.data_types) || [],
    },
    lifecycle_state: 'ACTIVE',
    endorsements: [],
    created_at: nowIso(),
    updated_at: nowIso(),
  };
  mutate((db) => {
    db.accounts.push(account);
    return account;
  });
  res.status(201).json(account);
});

router.get('/', (req, res) => res.json(load().accounts));

router.get('/:id', (req, res) => {
  const acct = load().accounts.find((a) => a.account_id === req.params.id);
  if (!acct) return res.status(404).json({ error: '账户不存在' });
  res.json(acct);
});

// 发放使用权许可证（数据所有方授权使用方，含时间/数据范围/价格）
router.post('/:id/usage-licenses', (req, res) => {
  const { consumer_did, data_scope, valid_from, valid_until, price_per_unit } = req.body || {};
  if (!consumer_did) return res.status(400).json({ error: 'consumer_did 必填' });
  const license = {
    license_id: id('lic'),
    consumer_did,
    data_scope: data_scope || [],
    valid_from: valid_from || nowIso(),
    valid_until: valid_until || null,
    price_per_unit: price_per_unit ?? 0,
    issued_at: nowIso(),
  };
  const acct = mutate((db) => {
    const a = db.accounts.find((x) => x.account_id === req.params.id);
    if (!a) return null;
    a.usage_licenses.push(license);
    a.updated_at = nowIso();
    return a;
  });
  if (!acct) return res.status(404).json({ error: '账户不存在' });
  res.status(201).json(license);
});

// 解约（生命周期 → CLOSED）
router.post('/:id/close', (req, res) => {
  const acct = mutate((db) => {
    const a = db.accounts.find((x) => x.account_id === req.params.id);
    if (!a) return null;
    a.lifecycle_state = 'CLOSED';
    a.updated_at = nowIso();
    return a;
  });
  if (!acct) return res.status(404).json({ error: '账户不存在' });
  res.json(acct);
});

export default router;