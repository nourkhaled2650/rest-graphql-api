import { AppDataSource } from "./data-source";
import { User } from "./entities/user";
import { Order } from "./entities/order";
import { Product } from "./entities/product";

const seedDatabase = async () => {
  await AppDataSource.initialize();
  console.log("Connected to database!");

  const userRepo = AppDataSource.getRepository(User);
  const productRepo = AppDataSource.getRepository(Product);
  const orderRepo = AppDataSource.getRepository(Order);

  // Clear existing data
  await orderRepo.delete({});
  await productRepo.delete({});
  await userRepo.delete({});

  console.log("Old data cleared!");

  // Create Users
  const users = userRepo.create([
    {
      email: "john@example.com",
      password: "password123",
      firstName: "John",
      lastName: "Doe",
    },
    {
      email: "jane@example.com",
      password: "password123",
      firstName: "Jane",
      lastName: "Doe",
    },
  ]);
  await userRepo.save(users);
  console.log("Users seeded!");

  // Create Products
  const products = productRepo.create([
    { name: "Laptop", price: 1200.0 },
    { name: "Phone", price: 800.0 },
    { name: "Tablet", price: 600.0 },
  ]);
  await productRepo.save(products);
  console.log("Products seeded!");

  // Create Orders
  const orders = orderRepo.create([
    {
      total: 2000,
      createdAt: new Date(),
      user: users[0],
      products: [products[0], products[1]],
    },
    {
      total: 600,
      createdAt: new Date(),
      user: users[1],
      products: [products[2]],
    },
  ]);
  await orderRepo.save(orders);
  console.log("Orders seeded!");

  console.log("Database seeding completed!");
  process.exit();
};

seedDatabase().catch((err) => {
  console.error("Error seeding database:", err);
  process.exit(1);
});
