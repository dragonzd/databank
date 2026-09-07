import { Router } from 'express';
import { load, mutate } from '../store.js';
import { id, nowIso, round } from '../domain.js';

const router = Router();

// 创建数据沙箱任务（模型进场、数据不出域）
router.post('/jobs', (req, res) => {
  const { account_id, consumer_did, model_ref, task_type = 'INFER', isolation_level = 'L1', duration_min = 30 } = req.body || {};
  if (!account_id || !consumer_did) return res.status(400).json({ error: 'account_id 和 consumer_did 必填' });
  const now = Date.now();
  const job = {
    job_id: id('job'),
    account_id,
    consumer_did,
    model_ref: model_ref || 'model-' + id('m'),
    task_type,
    isolation_level,
    status: 'RUNNING',
    usage_metrics: { data_volume: 0, duration_sec: 0, compute_units: 0 },
    result: null,
    cost_token: 0,
    created_at: nowIso(),
    expires_at: new Date(now + duration_min * 60000).toISOString(),
  };
  mutate((db) => {
    db.sandboxJobs.push(job);
    return job;
  });
  res.status(201).json(job);
});

// 查询任务（模拟执行完成 + 可信计量 + 结果出域管控）
router.get('/jobs/:id', (req, res) => {
  const out = mutate((db) => {
    const j = db.sandboxJobs.find((x) => x.job_id === req.params.id);
    if (!j) return null;
    if (j.status === 'RUNNING') {
      j.status = 'COMPLETED';
      j.usage_metrics = {
        data_volume: round(10 + Math.random() * 90),
        duration_sec: round(Math.random() * 300),
        compute_units: round(1 + Math.random() * 20),
      };
      j.cost_token = round(j.usage_metrics.data_volume * 0.01 + j.usage_metrics.compute_units * 0.1);
      j.result = {
        summary: j.task_type === 'TRAIN' ? '训练完成，模型产出（差分隐私保护）' : '推理完成，返回脱敏结果',
        exit_controls: '结果经结果闸门脱敏审查通过，原始数据不出域',
      };
    }
    return j;
  });
  if (!out) return res.status(404).json({ error: '任务不存在' });
  res.json(out);
});

router.get('/jobs', (req, res) => res.json(load().sandboxJobs));

export default router;