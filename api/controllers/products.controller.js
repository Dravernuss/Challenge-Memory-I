import { v4 as uuidv4 } from "uuid";

//------MEMORY---------
export const dataProducts = [];
//---------------------

export const getAllProducts = async (req, res) => {
  try {
    const products = dataProducts;
    if (products.length === 0) res.status(204).send();
    else res.status(200).json(products);
  } catch (err) {
    res.status(500).json({ error: "No products found" });
  }
};

export const createProduct = async (req, res) => {
  const productId = uuidv4();
  try {
    const { name, price } = req.body;
    const newProduct = {
      id: productId,
      name,
      price,
    };
    if (name == null || price == null) {
      res.status(403).send({ message: "Name or price cannot be null" });
      throw new Error();
    }
    dataProducts.push(newProduct);
    res
      .status(201)
      .send({ message: `Product ${name} created sucessfully!`, newProduct });
  } catch (error) {
    res.status(403).send();
  }
};

export const getOneProduct = async (req, res) => {
  const { id } = req.params;
  try {
    const product = dataProducts.find((p) => p.id === id);

    if (!product) {
      res.status(404).send({ message: "Product not founded" });
    } else {
      res.status(200).json(product);
    }
  } catch (error) {
    res.status(404).send();
  }
};

export const updateProduct = async (req, res) => {
  const { id } = req.params;
  const { name, price } = req.body;

  try {
    const productIndex = dataProducts.findIndex((p) => p.id === id);

    if (productIndex === -1) {
      res.status(404).send({ message: "Product not founded" });
    } else {
      dataProducts[productIndex] = {
        id,
        name: name || dataProducts[productIndex].name,
        price: price || dataProducts[productIndex].price,
      };

      res
        .status(200)
        .json({ message: "success", product: dataProducts[productIndex] });
    }
  } catch (error) {
    res.status(500).json({ message: "Internal Server Error" });
  }
};

export const deleteProduct = async (req, res) => {
  const { id } = req.params;
  try {
    const productIndex = dataProducts.findIndex((p) => p.id === id);
    if (productIndex === -1) {
      res.status(404).send({ message: "Product not founded" });
    } else {
      dataProducts.splice(productIndex, 1);
      res.status(200).json({ message: "success" });
    }
  } catch (error) {
    res.status(500).json({ message: "Internal Server Error" });
  }
};
