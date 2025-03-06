import {
  GraphQLObjectType,
  GraphQLSchema,
  GraphQLInt,
  GraphQLString,
  GraphQLList,
} from "graphql";
import { AppDataSource } from "../data-source";
import { Product } from "../entities/product";
import { Order } from "../entities/order";
import { User } from "../entities/user";

const UserType = new GraphQLObjectType({
  name: "User",
  fields: {
    id: { type: GraphQLInt },
    name: { type: GraphQLString },
    email: { type: GraphQLString },
  },
});

const ProductType = new GraphQLObjectType({
  name: "Product",
  fields: {
    id: { type: GraphQLInt },
    name: { type: GraphQLString },
    price: { type: GraphQLString },
  },
});

const OrderType = new GraphQLObjectType({
  name: "Order",
  fields: {
    id: { type: GraphQLInt },
    user: { type: UserType },
    productId: { type: GraphQLInt },
    quantity: { type: GraphQLInt },
  },
});

const RootQuery = new GraphQLObjectType({
  name: "RootQueryType",
  fields: {
    users: {
      type: new GraphQLList(UserType),
      resolve: async () => {
        const userRepo = AppDataSource.getRepository(User);
        return await userRepo.find();
      },
    },
    products: {
      type: new GraphQLList(ProductType),
      resolve: async () => {
        const productRepo = AppDataSource.getRepository(Product);
        return await productRepo.find();
      },
    },
    orders: {
      type: new GraphQLList(OrderType),
      resolve: async () => {
        const orderRepo = AppDataSource.getRepository(Order);
        return await orderRepo.find({ relations: ["user"] });
      },
    },
  },
});

const Mutation = new GraphQLObjectType({
  name: "Mutation",
  fields: {
    addUser: {
      type: UserType,
      args: {
        name: { type: GraphQLString },
        email: { type: GraphQLString },
      },
      resolve: async (_, { name, email }) => {
        const userRepo = AppDataSource.getRepository(User);
        const user = userRepo.create({ name, email });
        return await userRepo.save(user);
      },
    },
    addProduct: {
      type: ProductType,
      args: {
        name: { type: GraphQLString },
        price: { type: GraphQLString },
      },
      resolve: async (_, { name, price }) => {
        const productRepo = AppDataSource.getRepository(Product);
        const product = productRepo.create({ name, price });
        return await productRepo.save(product);
      },
    },
    addOrder: {
      type: OrderType,
      args: {
        userId: { type: GraphQLInt },
        productId: { type: GraphQLInt },
        quantity: { type: GraphQLInt },
      },
      resolve: async (_, { userId, productId, quantity }) => {
        const orderRepo = AppDataSource.getRepository(Order);
        const order = orderRepo.create({
          user: { id: userId },
          productId,
          quantity,
        });
        return await orderRepo.save(order);
      },
    },
  },
});

export default new GraphQLSchema({
  query: RootQuery,
  mutation: Mutation,
});
