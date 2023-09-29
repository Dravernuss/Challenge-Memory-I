import express from "express";
import { transactionCtrl } from "../controllers/index.js";

const { getAllCarts, createCart, getAllOrders, createOrder } = transactionCtrl;

const router = express.Router();

const transactionRoutes = {
  GET_ALL_CARTS: "/cart",
  CREATE_CART: "/cart/create",
  GET_ALL_ORDERS: "/order",
  CREATE_ORDER: "/order/create",
};

router.get(transactionRoutes.GET_ALL_CARTS, getAllCarts);
router.post(transactionRoutes.CREATE_CART, createCart);
router.get(transactionRoutes.GET_ALL_ORDERS, getAllOrders);
router.post(transactionRoutes.CREATE_ORDER, createOrder);

export default router;
