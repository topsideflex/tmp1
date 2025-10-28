import express from "express";
import Product from "../models/Product.js";
import { protect } from "../middlewares/auth.js";

const router = express.Router();

// Get all products
router.get("/", async (req, res) => {
  const products = await Product.find().populate("seller", "name");
  res.json(products);
});

// Create product
router.post("/", protect, async (req, res) => {
  const product = await Product.create({
    title: req.body.title,
    description: req.body.description,
    price: req.body.price,
    image: req.body.image,
    seller: req.user._id
  });
  res.status(201).json(product);
});

export default router;
