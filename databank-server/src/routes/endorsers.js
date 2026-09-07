import { Router } from 'express';
import { load, mutate } from '../store.js';
import { id, nowIso } from '../domain.js';

const router = Router();

// 鉴权方申请准入
router.post('/', (req, res) => {
  const { name, entity_type, did } = req.body || {};
  if (!name) return res.status(400).json({ error: 'name 必填' });
  const profile = {
    did: did || id('did'),
    name,
    entity_type: entity_type || '机构',
    staked_tokens: 0,
    total_endorsed: 0,
    dispute_rate: 0,
    confidence_score: 0,
    revenue_accumulated: 0,
    status: 'APPLIED',
    applied_at: nowIso(),
  };
  mutate((db) => {
    db.endorsers.push(profile);
    return profile;
  });
  res.status(201).json(profile);
});

router.get('/', (req, res) => res.json(load().endorsers));

// 银行审核：批准准入 + 信誉质押
router.post('/:did/approve', (req, res) => {
  const { staked_tokens = 1000 } = req.body || {};
  const p = mutate((db) => {
    const e = db.endorsers.find((x) => x.did === req.params.did);
    if (!e) return null;
    e.status = 'APPROVED';
    e.staked_tokens = staked_tokens;
    e.confidence_score = 80;
    return e;
  });
  if (!p) return res.status(404).json({ error: '鉴权方不存在' });
  res.json(p);
});

// 鉴权方背书：对协议账户的数据真实性打置信度标签
router.post('/:did/endorse', (req, res) => {
  const { account_id, confidence = 85 } = req.body || {};
  if (!account_id) return res.status(400).json({ error: 'account_id 必填' });
  const out = mutate((db) => {
    const e = db.endorsers.find((x) => x.did === req.params.did);
    const a = db.accounts.find((x) => x.account_id === account_id);
    if (!e || !a) return { error: '鉴权方或账户不存在', status: 404 };
    const endorsement = { did: e.did, confidence, endorced_at: nowIso() };
    if (!a.endorsements.some((x) => x.did === e.did)) {
      a.endorsements.push(endorsement);
    }
    e.total_endorsed += 1;
    return { endorsement };
  });
  if (out.error) return res.status(out.status).json({ error: out.error });
  res.status(201).json(out.endorsement);
});

export default router;