import express from "express";
import * as ProductControllers from "../controllers/products-controller";

const router = express.Router();

router.get("/", ProductControllers.getProducts);

router.get("/:id", ProductControllers.getProduct);

router.post("/", ProductControllers.creatProduct);

router.patch("/:id", ProductControllers.updateProduct);

router.delete("/:id", ProductControllers.deleteProduct);

export default router;
