import { v4 as uuidv4 } from "uuid";
import { dataStores } from "./stores.controller.js";
import { dataProducts } from "./products.controller.js";
import { dataClients } from "./client.controller.js";
import { dataInventories } from "./inventory.controller.js";

//------MEMORY---------
const dataCart = [];
const dataOrder = [];
//---------------------

export const getAllCarts = async (req, res) => {
  try {
    const carts = dataCart;
    if (carts.length === 0) res.status(204).send();
    else res.status(200).json(carts);
  } catch (err) {
    res.status(500).json({ error: "No carts found" });
  }
};

export const createCart = async (req, res) => {
  const cartId = uuidv4();
  try {
    const { clientDni, productId, storeId, amount } = req.body;

    const clientExists = dataClients.find(
      (client) => client.dni === Number(clientDni)
    );
    const productExists = dataProducts.find(
      (product) => product.id === productId
    );

    const storeInfo = storeId
      ? dataStores.find((p) => p.id === storeId)
      : dataStores[0];

    if (!clientExists || !productExists) {
      res.status(404).send({ message: "Client or product not founded" });
      return;
    }

    // Verify if there is enough inventory available in store
    const inventory = dataInventories.find(
      (inventory) =>
        inventory.productId === productId && inventory.storeId === storeInfo.id
    );

    if (
      !inventory ||
      inventory.designedAmount < amount + inventory.reservedAmount
    ) {
      res.status(403).send({ message: "Not enough inventory available" });
      return;
    }

    const newCart = {
      id: cartId,
      clientDni,
      productId,
      storeId: storeInfo.id,
      amount,
    };

    inventory.reservedAmount += amount;

    dataCart.push(newCart);
    res.status(201).json({ message: "Cart created successfully!", newCart });
  } catch (error) {
    res.status(500).json({ message: "Internal server error" });
  }
};

export const getAllOrders = async (req, res) => {
  try {
    const order = dataOrder;
    if (order.length === 0) res.status(204).send();
    else res.status(200).json(order);
  } catch (err) {
    res.status(500).json({ error: "No order found" });
  }
};

export const createOrder = async (req, res) => {
  const orderId = uuidv4();
  try {
    const { clientDni, cartId } = req.body;

    // Verify if client and shopping cart exists
    const clientExists = dataClients.find((client) => client.dni === clientDni);
    const cart = dataCart.find((cart) => cart.id === cartId);

    if (!clientExists || !cart) {
      res.status(404).json({ message: "Client or cart not founded" });
      return;
    }

    const { productId, storeId, amount } = cart;

    // Verify if there is enough product on inventory
    const inventory = dataInventories.find(
      (inventory) =>
        inventory.productId === productId && inventory.storeId === storeId
    );

    if (!inventory || inventory.cantidadAsignada < amount) {
      res.status(400).send({ message: "Not enough inventory available" });
      return;
    }

    const storeInfo = dataStores.find((store) => store.id === storeId);

    const newOrder = {
      id: orderId,
      clientDni,
      productId,
      storeId,
      storeAddress: storeInfo.address,
      amount,
    };

    dataOrder.push(newOrder);

    // Removing shopping cart
    const cartIndex = dataCart.findIndex((cart) => cart.id === cartId);
    dataCart.splice(cartIndex, 1);

    // Updating inventory values
    inventory.reservedAmount -= amount;
    inventory.designedAmount -= amount;

    res.status(201).json({ message: "Order created successfully", newOrder });
  } catch (error) {
    res.status(500).json({ message: "Internal server error" });
  }
};
