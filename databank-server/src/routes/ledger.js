import { Router } from 'express';
import { load } from '../store.js';

const router = Router();

// 模拟链上账本（数据签名/结算锚定哈希）
router.get('/blocks', (req, res) => res.json(load().blocks));

export default router;