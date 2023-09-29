import express from "express";
import { inventoryCtrl } from "../controllers/index.js";

const { getAllInventories, getOneInventory, createInventory, deleteInventory } =
  inventoryCtrl;

const router = express.Router();

const inventoryRoutes = {
  GET_ALL_INVENTORIES: "/inventory",
  GET_ONE_INVENTORY: "/inventory/:id",
  CREATE_INVENTORY: "/inventory/create",
  DELETE_INVENTORY: "/inventory/delete/:id",
};

router.get(inventoryRoutes.GET_ALL_INVENTORIES, getAllInventories);
router.get(inventoryRoutes.GET_ONE_INVENTORY, getOneInventory);
router.post(inventoryRoutes.CREATE_INVENTORY, createInventory);
router.delete(inventoryRoutes.DELETE_INVENTORY, deleteInventory);

export default router;
