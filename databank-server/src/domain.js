import crypto from 'node:crypto';

// 唯一 ID 生成
export function id(prefix = '') {
  return (prefix ? prefix + '-' : '') + crypto.randomUUID().slice(0, 8);
}

// 分账比例（设计文档：所有方 70% + 鉴权方 20% + 银行 10%）
export const SPLIT = { owner: 0.7, endorser: 0.2, bank: 0.1 };

export function round(n, d = 4) {
  const f = 10 ** d;
  return Math.round((n + Number.EPSILON) * f) / f;
}

export function splitAmount(tokenAmount) {
  return {
    owner_share: round(tokenAmount * SPLIT.owner),
    endorser_share: round(tokenAmount * SPLIT.endorser),
    bank_share: round(tokenAmount * SPLIT.bank),
  };
}

export function nowIso() {
  return new Date().toISOString();
}

// 数据存款利息：token = 本金 * 年化 * (天数 / 365)
export function computeInterest(principal, annualRate, days) {
  return round(principal * annualRate * (days / 365));
}

// 账户生命周期状态
export const ACCOUNT_STATES = ['ACTIVE', 'FROZEN', 'ARBITRATION', 'CLOSED'];

// 沙箱隔离分级（L1 容器 / L2 TEE / L3 MPC）
export const ISOLATION_LEVELS = ['L1', 'L2', 'L3'];