import _ from "underscore";
import CustomerDAO from "../DAO/Customer.DAO.js";
export default class CartController{
  static async apiAddItemToCart(req, res, next){
    const customerCartResponse = await CustomerDAO.getCustomerById(parseInt(req.body.customer));
    if (customerCartResponse.success) {
      let cartItems = customerCartResponse.customer.cart;
      let existingCartItem = _.find(cartItems, item=> item.id === req.body.item.id);
      if (existingCartItem && (JSON.stringify(existingCartItem.options) === JSON.stringify(req.body.item.options))) {
        existingCartItem.quantity = existingCartItem.quantity + req.body.item.quantity;
      } else {
        let item = req.body.item;
        item.ts = new Date().getTime();
        cartItems.push(item);
      }
      const cartResponse = await CustomerDAO.updateCartCollection(parseInt(req.body.customer), cartItems);
      if (cartResponse.success) {
        res.json({success: true, message: "Item is added to cart"});
      } else {
        res.json({success: false, message: "An error occured while adding to cart"})
      }
    } else {
      res.json({success: false, message: "An error occured while adding to cart"})
    }
  }
  static async apiEditCartItem(req, res, next){
    const customerCartResponse = await CustomerDAO.getCustomerById(parseInt(req.body.customer));
    if (customerCartResponse.success) {
      let cartItems = customerCartResponse.customer.cart;
      let selectedItem = _.find(cartItems, item=> item.ts === parseInt(req.body.item.ts));
      selectedItem &&  (selectedItem.quantity = parseInt(req.body.item.quantity));
      const cartResponse = await CustomerDAO.updateCartCollection(parseInt(req.body.customer), cartItems);
      if (cartResponse.success && selectedItem) {
        res.json({success: true, message: "Item is updated"});
      } else {
        res.json({success: false, message: "An error occured while updating item"})
      }
    } else {
      res.json({success: false, message: "An error occured while updating item"})
    }
  }

  static async apiRemoveCartItem(req, res, next){
    const customerCartResponse = await CustomerDAO.getCustomerById(parseInt(req.body.customer));
    if (customerCartResponse.success) {
      let cartItems = customerCartResponse.customer.cart;
      cartItems = _.filter(cartItems, item=> item.ts !== parseInt(req.body.item.ts));
      const cartResponse = await CustomerDAO.updateCartCollection(parseInt(req.body.customer), cartItems);
      if (cartResponse.success) {
        res.json({success: true, message: "Item is removed from cart"});
      } else {
        res.json({success: false, message: "An error occured while removing item from cart"})
      }
    } else {
      res.json({success: false, message: "An error occured while removing item from cart"})
    }
  }

  
  static async apiMoveToSavelater(req, res, next){
    const customerCartResponse = await CustomerDAO.getCustomerById(parseInt(req.body.customer));
    if (customerCartResponse.success) {
      let cartItems = customerCartResponse.customer.cart;
      let saveLaterItems = customerCartResponse.customer.savelater;
      let item = _.find(cartItems, item=> item.ts === parseInt(req.body.item.ts));
      item && saveLaterItems.push(item)
      cartItems = _.filter(cartItems, item=> item.ts !== parseInt(req.body.item.ts));
      const cartResponse = await CustomerDAO.updateSaveLaterCollection(parseInt(req.body.customer), cartItems, saveLaterItems);
      if (cartResponse.success) {
        res.json({success: true, message: "Item is moved to savelater"});
      } else {
        res.json({success: false, message: "An error occured while moving item to savelater"})
      }
    } else {
      res.json({success: false, message: "An error occured while moving item to savelater"})
    }
  }

  static async apiMoveFromSavelater(req, res, next){
    const customerCartResponse = await CustomerDAO.getCustomerById(parseInt(req.body.customer));
    if (customerCartResponse.success) {
      let cartItems = customerCartResponse.customer.cart;
      let saveLaterItems = customerCartResponse.customer.savelater;
      let item = _.find(saveLaterItems, item=> item.ts === parseInt(req.body.item.ts));
      item && cartItems.push(item);
      saveLaterItems = _.filter(saveLaterItems, item=> item.ts !== parseInt(req.body.item.ts));
      const cartResponse = await CustomerDAO.updateSaveLaterCollection(parseInt(req.body.customer), cartItems, saveLaterItems);
      if (cartResponse.success) {
        res.json({success: true, message: "Item is moved to cart"});
      } else {
        res.json({success: false, message: "An error occured while moving item to cart"})
      }
    } else {
      res.json({success: false, message: "An error occured while moving item to cart"})
    }
  }
  static async apiRemoveFromSavelater(req, res, next){
    const customerCartResponse = await CustomerDAO.getCustomerById(parseInt(req.body.customer));
    if (customerCartResponse.success) {
      let cartItems = customerCartResponse.customer.cart;
      let saveLaterItems = customerCartResponse.customer.savelater;
      saveLaterItems = _.filter(saveLaterItems, item=> item.ts !== parseInt(req.body.item.ts));
      const cartResponse = await CustomerDAO.updateSaveLaterCollection(parseInt(req.body.customer), cartItems, saveLaterItems);
      if (cartResponse.success) {
        res.json({success: true, message: "Item is removed from savelater"});
      } else {
        res.json({success: false, message: "An error occured while removing item from savelater"})
      }
    } else {
      res.json({success: false, message: "An error occured while removing item from savelater"})
    }
  }
  static async apiAddToFavorites(req, res, next){
    const customerCartResponse = await CustomerDAO.getCustomerById(parseInt(req.body.customer));
    if (customerCartResponse.success) {
      let favoriteItems = customerCartResponse.customer.favorites;
      if (favoriteItems.includes(req.body.item)) {
        res.json({success: true, message: "Item is already added to your favorites list"})
      } else {
        favoriteItems.push(req.body.item);
        const favResponse = await CustomerDAO.updateFavCollection(parseInt(req.body.customer), favoriteItems);
        if (favResponse.success) {
          res.json({success: true, message: "Item is added to favorites"});
        } else {
          res.json({success: false, message: "An error occured while adding to favorites"})
        }
      }
    } else {
      res.json({success: false, message: "An error occured while adding to favorites"})
    }
  }
  static async apiRemoveFromFavorites(req, res, next){
    const customerCartResponse = await CustomerDAO.getCustomerById(parseInt(req.body.customer));
    if (customerCartResponse.success) {
      let favoriteItems = customerCartResponse.customer.favorites;
      if (favoriteItems.includes(req.body.item)) {
        favoriteItems = _.filter(favoriteItems, item=> item !== req.body.item);
        const favResponse = await CustomerDAO.updateFavCollection(parseInt(req.body.customer), favoriteItems);
        if (favResponse.success) {
          res.json({success: true, message: "Item is removed from favorites"});
        } else {
          res.json({success: false, message: "An error occured while removing from favorites"})
        }
      } else {
        res.json({success: false, message: "Item is not avalable in your favorites list to remove "})
      }
    } else {
      res.json({success: false, message: "An error occured while removing from favorites"})
    }
  }
}
