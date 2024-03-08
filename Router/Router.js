import express from "express";
import ProductsController from "./Products.Controller.js";
import FilterController from "./Filters.Controller.js";
const router = express.Router();
router.route('/products/new/:subcategory').post(ProductsController.apiAddProduct);
router.route('/products/:subcategory').get(ProductsController.apiGetAllProducts);
router.route('/filter/:subcategory').get(FilterController.getFilterOptions);
export default router;