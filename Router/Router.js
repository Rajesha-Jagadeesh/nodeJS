import express from "express";
import Controller from "./Controller.js";
const router = express.Router();
router.route('/products/new/:subcategory').post(Controller.apiAddProduct)
router.route('/products/:subcategory').get(Controller.apiGetAllProducts)
export default router;