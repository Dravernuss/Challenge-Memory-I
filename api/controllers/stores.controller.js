import { v4 as uuidv4 } from "uuid";

//------MEMORY---------
export const dataStores = [];
//---------------------

export const getAllStores = async (req, res) => {
  try {
    const stores = dataStores;
    if (stores.length === 0) res.status(204).send();
    else res.status(200).json(stores);
  } catch (err) {
    res.status(500).json({ error: "No stores found" });
  }
};

export const createStore = async (req, res) => {
  const storeId = uuidv4();
  try {
    const { name, address } = req.body;
    const newStore = {
      id: storeId,
      name,
      address,
    };
    if (name == null || address == null) {
      res.status(403).send({ message: "name or address cannot be null" });
      throw new Error();
    }
    dataStores.push(newStore);
    res.status(201).send({
      message: `Store ${name} created sucessfully!`,
      newStore,
    });
  } catch (error) {
    res.status(403).send();
  }
};

export const getOneStore = async (req, res) => {
  const { id } = req.params;
  try {
    const store = dataStores.find((p) => p.id === id);

    if (!store) {
      res.status(404).send({ message: "Store not founded" });
    } else {
      res.status(200).json(store);
    }
  } catch (error) {
    res.status(404).send();
  }
};

export const updateStore = async (req, res) => {
  const { id } = req.params;
  const { name, address } = req.body;

  try {
    const storeIndex = dataStores.findIndex((p) => p.id === id);

    if (storeIndex === -1) {
      res.status(404).send({ message: "Store not founded" });
    } else {
      dataStores[storeIndex] = {
        id,
        name: name || dataStores[storeIndex].name,
        address: address || dataStores[storeIndex].address,
      };

      res
        .status(200)
        .json({ message: "success", product: dataStores[storeIndex] });
    }
  } catch (error) {
    res.status(500).json({ message: "Internal Server Error" });
  }
};

export const deleteStore = async (req, res) => {
  const { id } = req.params;
  try {
    const storeIndex = dataStores.findIndex((p) => p.id === id);
    if (storeIndex === -1) {
      res.status(404).send({ message: "Store not founded" });
    } else {
      dataStores.splice(storeIndex, 1);
      res.status(200).json({ message: "success" });
    }
  } catch (error) {
    res.status(500).json({ message: "Internal Server Error" });
  }
};
