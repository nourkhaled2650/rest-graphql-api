import { RequestHandler } from "express";
import createHttpError from "http-errors";
import { AppDataSource } from "../../data-source";
import { Product } from "../../entities/product";

// Get all products

const productRepo = AppDataSource.getRepository(Product);
export const getProducts: RequestHandler = async (req, res, next) => {
  try {
    const products = await productRepo.find();
    res.status(200).json(products);
  } catch (error) {
    next(error);
  }
};

// Get a single product by ID
export const getProduct: RequestHandler = async (req, res, next) => {
  try {
    const { id } = req.params;
    const product = await productRepo.findOne({ where: { id: Number(id) } });
    if (!product) {
      throw createHttpError(404, `Product with ID ${id} is not found`);
    }
    res.status(200).json(product);
  } catch (error) {
    next(error);
  }
};

// Create a new product
export const creatProduct: RequestHandler = async (req, res, next) => {
  try {
    const { name, price } = req.body;

    if (!name || price === undefined) {
      throw createHttpError(400, "Name and price are required");
    }

    const newProduct = productRepo.create({ name, price });
    await productRepo.save(newProduct);

    res.status(201).json(newProduct);
  } catch (error) {
    next(error);
  }
};

// Update an existing product
export const updateProduct: RequestHandler = async (req, res, next) => {
  try {
    const { id } = req.params;
    const { name, price } = req.body;

    const product = await productRepo.findOne({ where: { id: Number(id) } });

    if (!product) {
      throw createHttpError(404, `Product with ID ${id} not found`);
    }

    product.name = name ?? product.name;
    product.price = price ?? product.price;

    await productRepo.save(product);
    res.status(200).json(product);
  } catch (error) {
    next(error);
  }
};

// Delete a product
export const deleteProduct: RequestHandler = async (req, res, next) => {
  try {
    const { id } = req.params;

    const product = await productRepo.findOne({ where: { id: Number(id) } });

    if (!product) {
      throw createHttpError(404, `Product with ID ${id} not found`);
    }

    await productRepo.remove(product);
    res.status(204).send();
  } catch (error) {
    next(error);
  }
};
