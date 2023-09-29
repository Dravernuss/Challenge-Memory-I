import express from "express";
import cors from "cors";
import {
  clientRouter,
  inventoryRouter,
  productsRouter,
  storeRouter,
  transactionRouter,
} from "./api/routes/index.js";

const app = express();

//Middleware
app.use(cors());
app.use(express.json());

//Routes
app.get("/", (req, res) => {
  res.send("CHALLENGE-I");
});
app.use("/api", productsRouter);
app.use("/api", clientRouter);
app.use("/api", inventoryRouter);
app.use("/api", storeRouter);
app.use("/api", transactionRouter);

const PORT = process.env.PORT || 5000;

// Launch server
app.listen(PORT, () => {
  console.log(`Initialized server in port http://localhost:${PORT}`);
});
