import express from "express";
import * as OrderControllers from "../controllers/orders-controller";

const router = express.Router();

router.get("/", OrderControllers.getOrders);

router.get("/:orderId", OrderControllers.getOrder);

router.post("/", OrderControllers.creatOrder);

router.patch("/:orderId", OrderControllers.updateOrder);

router.delete("/:orderId", OrderControllers.deleteOrder);

export default router;
