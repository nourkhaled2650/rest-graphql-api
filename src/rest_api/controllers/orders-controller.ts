import { RequestHandler } from "express";
import { Order } from "../../entities/order";
import { AppDataSource } from "../../data-source";
import createHttpError from "http-errors";

// Repository for Order entity
const orderRepository = AppDataSource.getRepository(Order);

// ✅ GET All Orders
export const getOrders: RequestHandler = async (req, res, next) => {
  try {
    const orders = await orderRepository.find({ relations: ["user"] });
    res.json(orders);
  } catch (error) {
    next(error);
  }
};

// ✅ GET Single Order by ID
export const getOrder: RequestHandler = async (req, res, next) => {
  try {
    const { id } = req.params;
    const order = await orderRepository.findOne({
      where: { id: Number(id) },
      relations: ["user"],
    });

    if (!order) throw createHttpError(404, "Order not found");

    res.json(order);
  } catch (error) {
    next(error);
  }
};

// ✅ CREATE New Order
export const creatOrder: RequestHandler = async (req, res, next) => {
  try {
    const { total, userId } = req.body;

    if (!total || !userId) {
      throw createHttpError(400, "Total and User ID are required");
    }

    const order = orderRepository.create({ total, user: { id: userId } });
    const savedOrder = await orderRepository.save(order);

    res.status(201).json(savedOrder);
  } catch (error) {
    next(error);
  }
};

// ✅ DELETE Order
export const deleteOrder: RequestHandler = async (req, res, next) => {
  try {
    const { id } = req.params;
    if (!id) {
      throw createHttpError(400, "invalid order Id");
    }
    const order = await orderRepository.findOne({ where: { id: Number(id) } });
    if (!order) {
      throw createHttpError(404, "rder not found");
    }

    await orderRepository.remove(order);
    res.status(204).send();
  } catch (error) {
    next(error);
  }
};
