import express from "express";
import { storesCtrl } from "../controllers/index.js";

const { getAllStores, getOneStore, createStore, updateStore, deleteStore } =
  storesCtrl;

const router = express.Router();

const storeRoutes = {
  GET_ALL_STORES: "/stores",
  GET_ONE_STORE: "/stores/:id",
  CREATE_STORE: "/stores/create",
  UPDATE_STORE: "/stores/update/:id",
  DELETE_STORE: "/stores/delete/:id",
};

router.get(storeRoutes.GET_ALL_STORES, getAllStores);
router.get(storeRoutes.GET_ONE_STORE, getOneStore);
router.post(storeRoutes.CREATE_STORE, createStore);
router.put(storeRoutes.UPDATE_STORE, updateStore);
router.delete(storeRoutes.DELETE_STORE, deleteStore);

export default router;
