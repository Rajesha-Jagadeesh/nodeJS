import ProductsDAO from "../DAO/Products.DAO.js";

export default class Controller{
  static async apiAddProduct(req, res, next){
    // console.log("set PROD", req)
    const response = await ProductsDAO.addProduct(req.body, req.params.subcategory);
    res.json({success: true, message: "Product added."})
  }
  static async apiGetAllProducts(req, res, next){
    const response = await ProductsDAO.getProducts(req.params.subcategory, true);
    res.json({success: true, message: "Product Fetched", products: response})
  }
}