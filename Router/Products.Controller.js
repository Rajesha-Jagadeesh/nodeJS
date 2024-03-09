import ProductsDAO from "../DAO/Products.DAO.js";

export default class ProductsController{
  static async apiAddProduct(req, res, next){
    // console.log("set PROD", req)
    const response = await ProductsDAO.addProduct(req.body, req.params.subcategory);
    res.json({success: true, message: "Product added."})
  }
  static async apiGetAllProducts(req, res, next){
    const response = await ProductsDAO.getProducts(req.params.subcategory, req.query);
    const {products, count} = response;
    res.json({success: true, message: "Product Fetched", products, count})
  }
}
