import express from 'express';

import { ganerateToken, paymentProcess } from '../controllers/braintreeController.js';

const router = express.Router();

router.post("/braintree/get-token", ganerateToken);
router.post("/braintree/payment", paymentProcess);

export default router;
