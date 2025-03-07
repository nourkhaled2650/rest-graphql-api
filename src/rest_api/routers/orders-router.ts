import express from "express";
import * as OrderControllers from "../controllers/orders-controller";

const router = express.Router();

router.get("/", OrderControllers.getOrders);

router.get("/:id", OrderControllers.getOrder);

router.post("/", OrderControllers.creatOrder);

router.delete("/:id", OrderControllers.deleteOrder);

export default router;
