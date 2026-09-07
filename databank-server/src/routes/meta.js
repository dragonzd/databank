import { Router } from 'express';
import { load } from '../store.js';

const router = Router();

router.get('/health', (req, res) => {
  res.json({ status: 'ok', time: new Date().toISOString() });
});

router.get('/stats', (req, res) => {
  const db = load();
  res.json({
    users: db.users.length,
    accounts: db.accounts.length,
    endorsers: db.endorsers.length,
    deposits: db.deposits.length,
    settlements: db.settlements.length,
    sandboxJobs: db.sandboxJobs.length,
    blocks: db.blocks.length,
  });
});

export default router;