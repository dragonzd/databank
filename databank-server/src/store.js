import fs from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const DATA_DIR = path.join(__dirname, '..', 'data');
const DB_FILE = path.join(DATA_DIR, 'db.json');

const EMPTY_DB = {
  seeded: false,
  users: [],
  endorsers: [],
  accounts: [],
  deposits: [],
  settlements: [],
  sandboxJobs: [],
  blocks: [],
};

function ensure() {
  if (!fs.existsSync(DATA_DIR)) fs.mkdirSync(DATA_DIR, { recursive: true });
  if (!fs.existsSync(DB_FILE)) {
    fs.writeFileSync(DB_FILE, JSON.stringify(EMPTY_DB, null, 2), 'utf-8');
  }
}

export function load() {
  ensure();
  try {
    return JSON.parse(fs.readFileSync(DB_FILE, 'utf-8'));
  } catch {
    return JSON.parse(JSON.stringify(EMPTY_DB));
  }
}

export function save(db) {
  ensure();
  fs.writeFileSync(DB_FILE, JSON.stringify(db, null, 2), 'utf-8');
}

// 读-改-写变更多个集合，返回 fn 的返回值
export function mutate(fn) {
  const db = load();
  const result = fn(db);
  save(db);
  return result;
}