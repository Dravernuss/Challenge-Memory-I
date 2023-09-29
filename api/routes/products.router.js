import express from "express";
import { productCtrl } from "../controllers/index.js";

const {
  getAllProducts,
  getOneProduct,
  createProduct,
  updateProduct,
  deleteProduct,
} = productCtrl;

const router = express.Router();

const productsRoutes = {
  GET_ALL_PRODUCTS: "/products",
  GET_ONE_PRODUCT: "/products/:id",
  CREATE_PRODUCT: "/products/create",
  UPDATE_PRODUCT: "/products/update/:id",
  DELETE_PRODUCT: "/products/delete/:id",
};

router.get(productsRoutes.GET_ALL_PRODUCTS, getAllProducts);
router.get(productsRoutes.GET_ONE_PRODUCT, getOneProduct);
router.post(productsRoutes.CREATE_PRODUCT, createProduct);
router.put(productsRoutes.UPDATE_PRODUCT, updateProduct);
router.delete(productsRoutes.DELETE_PRODUCT, deleteProduct);

export default router;
