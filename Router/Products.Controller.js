import ProductsDAO from "../DAO/Products.DAO.js";
import _ from "underscore";
export default class ProductsController{
  static async apiAddProduct(req, res, next){
    // console.log("set PROD", req)
    const response = await ProductsDAO.addProduct(req.body, req.params.subcategory);
    res.json({success: true, message: "Product added."})
  }
  static async apiGetAllProducts(req, res, next){
    const response = await ProductsDAO.getProducts(req.params.subcategory, req.query);
    const {products, count} = response;
    res.json({success: true, message: "Product Fetched", products : _.isEmpty(products) ? [] : products, count})
  }
  static async apiGetProductByUrl(req, res, next){
    const response = await ProductsDAO.getProductByUrl(req.params.subcategory, req.params.productUrl);
    res.json({success: true, message: "Product Fetched", product : response[0] ? response[0] : {}})
  }

  static async apiGetProductsByParams(req, res, next){
    let products = [];
    if (req.query.id) {
      let values = req.query.id.split(",");
      let shoeFilters = await _.filter(values, identifier=> identifier.indexOf("shoe") > -1);
      const shoes = await ProductsDAO.getProductsById("shoes", {id: {$in: shoeFilters}});
      products = [...products, ...shoes];
      let bagFilters = await _.filter(values, identifier=> identifier.indexOf("bag") > -1);
      const bags = await ProductsDAO.getProductsById("bags", {id: {$in: bagFilters}});
      products = [...products, ...bags];
      let clothingFilters = await _.filter(values, identifier=> identifier.indexOf("clothing") > -1);
      const clothing = await ProductsDAO.getProductsById("clothing", {id: {$in: clothingFilters}});
      products = [...products, ...clothing];
      let toolFilters = await _.filter(values, identifier=> identifier.indexOf("tool") > -1);
      const tools = await ProductsDAO.getProductsById("tools", {id: {$in: toolFilters}});
      products = [...products, ...tools];
      let alcoholsFilters = await _.filter(values, identifier=> identifier.indexOf("alcohol") > -1);
      const alcohols = await ProductsDAO.getProductsById("alcohols", {id: {$in: alcoholsFilters}});
      products = [...products, ...alcohols];
      
    }
    res.json({success: true, message: "Product Fetched", products: products })
  }
  static async apiSearchProducts(req, res, next){
    let products = [];
    let values = req.query.key;
    let regexValue = new RegExp(values, "i");
    const shoes = await ProductsDAO.getProductsByQuery("shoes", {$or : [{name: {$regex : regexValue }}, {id: {$regex : regexValue }}]});
    products = [...products, ...shoes];
    const bags = await ProductsDAO.getProductsByQuery("bags", {$or : [{name: {$regex : regexValue }}, {id: {$regex : regexValue }}]});
    products = [...products, ...bags];
    const clothing = await ProductsDAO.getProductsByQuery("clothing", {$or : [{name: {$regex : regexValue }}, {id: {$regex : regexValue }}]});
    products = [...products, ...clothing];
    const tools = await ProductsDAO.getProductsByQuery("tools", {$or : [{name: {$regex : regexValue }}, {id: {$regex : regexValue }}]});
    products = [...products, ...tools];
    const alcohols = await ProductsDAO.getProductsByQuery("alcohols", {$or : [{name: {$regex : regexValue }}, {id: {$regex : regexValue }}]});
    products = [...products, ...alcohols];
    res.json({success: true, message: "Product Fetched", products: products, count : products.length })
  }
}
