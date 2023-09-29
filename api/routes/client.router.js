import express from "express";
import { clientCtrl } from "../controllers/index.js";

const {
  getAllClients,
  getOneClient,
  createClient,
  updateClient,
  deleteClient,
} = clientCtrl;

const router = express.Router();

const clientRoutes = {
  GET_ALL_CLIENTS: "/client",
  GET_ONE_CLIENT: "/client/:id",
  CREATE_CLIENT: "/client/create",
  UPDATE_CLIENT: "/client/update/:id",
  DELETE_CLIENT: "/client/delete/:id",
};

router.get(clientRoutes.GET_ALL_CLIENTS, getAllClients);
router.get(clientRoutes.GET_ONE_CLIENT, getOneClient);
router.post(clientRoutes.CREATE_CLIENT, createClient);
router.put(clientRoutes.UPDATE_CLIENT, updateClient);
router.delete(clientRoutes.DELETE_CLIENT, deleteClient);

export default router;
