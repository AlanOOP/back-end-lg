import express from 'express';    
import {
    getAllOrders,
    getOrderByUser,
    postCreateOrder,
    postUpdateOrder,
    postDeleteOrder
} from '../controllers/ordersController.js';

const router = express();

router.get("/get-all-orders", getAllOrders);
router.post("/order-by-user", getOrderByUser);

router.post("/create-order", postCreateOrder);
router.post("/update-order", postUpdateOrder);
router.post("/delete-order", postDeleteOrder);


export default router ;