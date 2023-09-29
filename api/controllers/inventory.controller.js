import { v4 as uuidv4 } from "uuid";
import { dataProducts } from "./products.controller.js";
import { dataStores } from "./stores.controller.js";

//------MEMORY---------
export const dataInventories = [];
//---------------------

export const getAllInventories = async (req, res) => {
  try {
    const inventories = dataInventories;
    if (inventories.length === 0) res.status(204).send();
    else res.status(200).json(inventories);
  } catch (err) {
    res.status(500).json({ error: "No inventories found" });
  }
};

export const createInventory = async (req, res) => {
  const inventoryId = uuidv4();
  try {
    const { productId, storeId, designedAmount, reservedAmount } = req.body;
    const productInfo = dataProducts.find((p) => p.id === productId);
    const storeInfo = storeId
      ? dataStores.find((p) => p.id === storeId)
      : false;
    if (productId == null) {
      res.status(403).send({ message: "ProductId cannot be null" });
      throw new Error();
    }
    if (!productInfo) {
      res.status(403).send({ message: "Product not founded" });
      throw new Error();
    }
    const newInventory = {
      id: inventoryId,
      productId,
      productName: productInfo.name,
      storeId: storeInfo ? storeInfo.id : dataStores[0].id,
      storeName: storeInfo ? storeInfo.name : dataStores[0].name,
      designedAmount: designedAmount || 0,
      reservedAmount: reservedAmount || 0,
    };
    dataInventories.push(newInventory);
    res.status(201).send({
      message: `Inventory created sucessfully!`,
      newInventory,
    });
  } catch (error) {
    res.status(403).send();
  }
};

export const getOneInventory = async (req, res) => {
  const { id } = req.params;
  try {
    const inventory = dataInventories.find((p) => p.id === id);

    if (!inventory) {
      res.status(404).send({ message: "Inventory not founded" });
    } else {
      res.status(200).json(inventory);
    }
  } catch (error) {
    res.status(404).send();
  }
};

export const deleteInventory = async (req, res) => {
  const { id } = req.params;
  try {
    const inventoryIndex = dataInventories.findIndex((p) => p.id === id);
    if (inventoryIndex === -1) {
      res.status(404).send({ message: "Inventory not founded" });
    } else {
      dataInventories.splice(inventoryIndex, 1);
      res.status(200).json({ message: "success" });
    }
  } catch (error) {
    res.status(500).json({ message: "Internal Server Error" });
  }
};
