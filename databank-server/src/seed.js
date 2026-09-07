import { load, save } from './store.js';
import { nowIso } from './domain.js';

export function seed() {
  const db = load();
  if (db.seeded) return;
  const now = nowIso();

  db.users = [
    { did: 'did-owner-a', name: '张三', type: '个人', role: '数据所有方' },
    { did: 'did-owner-b', name: '华宇科技', type: '企业', role: '数据所有方' },
    { did: 'did-consumer-1', name: '智算 AI 公司', type: '企业', role: '数据使用方' },
    { did: 'did-endorser-1', name: '灵脉穿戴设备', type: '机构', role: '数据鉴权方' },
    { did: 'did-endorser-2', name: '康宁体检中心', type: '机构', role: '数据鉴权方' },
    { did: 'did-endorser-3', name: '中诚信征信', type: '机构', role: '数据鉴权方' },
  ];

  db.endorsers = [
    { did: 'did-endorser-1', name: '灵脉穿戴设备', entity_type: '设备厂商', staked_tokens: 5000, total_endorsed: 3, dispute_rate: 0.01, confidence_score: 88, revenue_accumulated: 1250, status: 'APPROVED', applied_at: now },
    { did: 'did-endorser-2', name: '康宁体检中心', entity_type: '医疗机构', staked_tokens: 8000, total_endorsed: 5, dispute_rate: 0.005, confidence_score: 92, revenue_accumulated: 2400, status: 'APPROVED', applied_at: now },
    { did: 'did-endorser-3', name: '中诚信征信', entity_type: '征信机构', staked_tokens: 10000, total_endorsed: 8, dispute_rate: 0.002, confidence_score: 95, revenue_accumulated: 5100, status: 'APPLIED', applied_at: now },
  ];

  db.accounts = [
    {
      account_id: 'acct-demo-001',
      owner_did: 'did-owner-a',
      name: '个人健康数据',
      type: '个人',
      ownership_token: 'own-demo-001',
      usage_licenses: [
        {
          license_id: 'lic-demo-001',
          consumer_did: 'did-consumer-1',
          data_scope: ['健康心率', '睡眠质量'],
          valid_from: now,
          valid_until: null,
          price_per_unit: 0.01,
          issued_at: now,
        },
        {
          license_id: 'lic-demo-002',
          consumer_did: 'did-consumer-1',
          data_scope: ['运动步数'],
          valid_from: now,
          valid_until: null,
          price_per_unit: 0.008,
          issued_at: now,
        },
      ],
      revenue_certificates: [],
      data_manifest: {
        merkle_root: '0x' + 'a1b2'.repeat(8),
        data_volume: 2.4,
        data_types: ['健康心率', '睡眠质量', '运动步数'],
      },
      lifecycle_state: 'ACTIVE',
      endorsements: [{ did: 'did-endorser-1', confidence: 90, endorced_at: now }],
      created_at: now,
      updated_at: now,
    },
    {
      account_id: 'acct-demo-002',
      owner_did: 'did-owner-b',
      name: '企业设备运行数据',
      type: '企业',
      ownership_token: 'own-demo-002',
      usage_licenses: [
        {
          license_id: 'lic-demo-003',
          consumer_did: 'did-consumer-1',
          data_scope: ['设备运行状态', '能耗曲线'],
          valid_from: now,
          valid_until: null,
          price_per_unit: 0.02,
          issued_at: now,
        },
      ],
      revenue_certificates: [],
      data_manifest: {
        merkle_root: '0x' + 'b2c3'.repeat(8),
        data_volume: 18.7,
        data_types: ['设备运行状态', '能耗曲线', '故障日志'],
      },
      lifecycle_state: 'ACTIVE',
      endorsements: [{ did: 'did-endorser-3', confidence: 92, endorced_at: now }],
      created_at: now,
      updated_at: now,
    },
    {
      account_id: 'acct-demo-003',
      owner_did: 'did-owner-a',
      name: '家庭能源数据',
      type: '家庭',
      ownership_token: 'own-demo-003',
      usage_licenses: [],
      revenue_certificates: [],
      data_manifest: {
        merkle_root: '0x' + 'c3d4'.repeat(8),
        data_volume: 5.2,
        data_types: ['用电量', '用水量', '燃气用量'],
      },
      lifecycle_state: 'ACTIVE',
      endorsements: [{ did: 'did-endorser-2', confidence: 85, endorced_at: now }],
      created_at: now,
      updated_at: now,
    },
  ];

  db.deposits = [
    {
      deposit_id: 'dep-demo-001',
      account_id: 'acct-demo-001',
      owner_did: 'did-owner-a',
      data_volume: 2.4,
      data_type: '健康数据',
      principal_token: 10000,
      annual_rate: 0.032,
      status: 'ACTIVE',
      created_at: now,
    },
    {
      deposit_id: 'dep-demo-002',
      account_id: 'acct-demo-002',
      owner_did: 'did-owner-b',
      data_volume: 18.7,
      data_type: '设备运行数据',
      principal_token: 50000,
      annual_rate: 0.085,
      status: 'ACTIVE',
      created_at: now,
    },
    {
      deposit_id: 'dep-demo-003',
      account_id: 'acct-demo-003',
      owner_did: 'did-owner-a',
      data_volume: 5.2,
      data_type: '家庭能源数据',
      principal_token: 8000,
      annual_rate: 0.04,
      status: 'ACTIVE',
      created_at: now,
    },
  ];

  db.settlements = [
    {
      txn_id: 'txn-demo-001',
      account_id: 'acct-demo-001',
      consumer_did: 'did-consumer-1',
      usage_metrics: { data_volume: 0.5, duration_sec: 120, compute_units: 8 },
      token_amount: 5,
      split: { owner_share: 3.5, endorser_share: 1, bank_share: 0.5 },
      block_height: 1,
      timestamp: now,
    },
    {
      txn_id: 'txn-demo-002',
      account_id: 'acct-demo-002',
      consumer_did: 'did-consumer-1',
      usage_metrics: { data_volume: 3.0, duration_sec: 600, compute_units: 32 },
      token_amount: 30,
      split: { owner_share: 21, endorser_share: 6, bank_share: 3 },
      block_height: 2,
      timestamp: now,
    },
    {
      txn_id: 'txn-demo-003',
      account_id: 'acct-demo-001',
      consumer_did: 'did-consumer-1',
      usage_metrics: { data_volume: 0.2, duration_sec: 45, compute_units: 3 },
      token_amount: 2,
      split: { owner_share: 1.4, endorser_share: 0.4, bank_share: 0.2 },
      block_height: 3,
      timestamp: now,
    },
  ];

  db.sandboxJobs = [];
  db.blocks = [
    { height: 1, txn_id: 'txn-demo-001', type: 'SETTLEMENT', anchored_at: now },
    { height: 2, txn_id: 'txn-demo-002', type: 'SETTLEMENT', anchored_at: now },
    { height: 3, txn_id: 'txn-demo-003', type: 'SETTLEMENT', anchored_at: now },
  ];
  db.seeded = true;

  save(db);
}