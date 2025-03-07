import express from "express";
import * as ProductControllers from "../controllers/products-controller";

const router = express.Router();

router.get("/", ProductControllers.getProducts);

router.get("/:productId", ProductControllers.getProduct);

router.post("/", ProductControllers.creatProduct);

router.patch("/:productId", ProductControllers.updateProduct);

router.delete("/:productId", ProductControllers.deleteProduct);

export default router;
