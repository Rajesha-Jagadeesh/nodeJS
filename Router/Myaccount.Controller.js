import _ from "underscore";
import CustomerDAO from "../DAO/Customer.DAO.js";
import PurchaseDAO from "../DAO/Purchase.DAO.js";
import ProductsDAO from "../DAO/Products.DAO.js";
export default class MyAccountController{
  static async apiAddAddress(req, res, next){
    const customerCartResponse = await CustomerDAO.getCustomerById(parseInt(req.body.customer));
    if (customerCartResponse.success) {
      let customerAddresses = customerCartResponse.customer.address ?? [];
      let newAddress = req.body.address;
      newAddress.internalid = new Date().getTime();
      if (customerAddresses && customerAddresses.length === 0) {
        newAddress.isDefaultShip = true;
        newAddress.isDefaultBill = true;
      }
      customerAddresses.push(newAddress);
      const addressResponse = await CustomerDAO.updateAddressCollection(parseInt(req.body.customer), customerAddresses);
      if (addressResponse.success) {
        res.json({success: true, message: "Address is added"});
      } else {
        res.json({success: false, message: "An error occured while adding to address"})
      }
    } else {
      res.json({success: false, message: "An error occured while adding to address"})
    }
  }
  static async apiUpdateAddress(req, res, next){
    const customerCartResponse = await CustomerDAO.getCustomerById(parseInt(req.body.customer));
    if (customerCartResponse.success) {
      let customerAddresses = customerCartResponse.customer.address;
      let newAddress = req.body.address;
      let addressIndex = _.findIndex(customerAddresses, address=> address.internalid === newAddress.internalid);
      if (addressIndex > -1) {
        customerAddresses.splice(addressIndex, 1, newAddress);
        const addressResponse = await CustomerDAO.updateAddressCollection(parseInt(req.body.customer), customerAddresses);
        if (addressResponse.success) {
          res.json({success: true, message: "Address is updated"});
        } else {
          res.json({success: false, message: "An error occured while updating address"})
        }
      } else {
        res.json({success: false, message: "updating address not found"});
      }
    } else {
      res.json({success: false, message: "An error occured while updating address"})
    }
  }
  static async apiDeleteAddress(req, res, next){
    const customerCartResponse = await CustomerDAO.getCustomerById(parseInt(req.body.customer));
    if (customerCartResponse.success) {
      let customerAddresses = customerCartResponse.customer.address;
      let addressId = req.body.address.internalid;
      let addressIndex = _.findIndex(customerAddresses, address=> address.internalid === addressId);
      if (addressIndex > -1) {
        customerAddresses.splice(addressIndex, 1);
        const addressResponse = await CustomerDAO.updateAddressCollection(parseInt(req.body.customer), customerAddresses);
        if (addressResponse.success) {
          res.json({success: true, message: "Address is deleted"});
        } else {
          res.json({success: false, message: "An error occured while deleting address"})
        }
      } else {
        res.json({success: false, message: "deleting address was not found on the addresses"});
      }
    } else {
      res.json({success: false, message: "An error occured while deleting address"})
    }
  }
  static async apiSetShipAddress(req, res, next){
    const customerCartResponse = await CustomerDAO.getCustomerById(parseInt(req.body.customer));
    if (customerCartResponse.success) {
      let customerAddresses = customerCartResponse.customer.address;
      let addressId = req.body.address.internalid;
      let addressIndex = _.findIndex(customerAddresses, address=> address.internalid === addressId);
      if (addressIndex > -1) {
        customerAddresses = _.map(customerAddresses, address=>{
          address.isDefaultShip = address.internalid === addressId;
          return address;
        })
        const addressResponse = await CustomerDAO.updateAddressCollection(parseInt(req.body.customer), customerAddresses);
        if (addressResponse.success) {
          res.json({success: true, message: "Shipping address selected"});
        } else {
          res.json({success: false, message: "An error occured while selecting shipping address"})
        }
      } else {
        res.json({success: false, message: "Invalid shipping address selected"});
      }
    } else {
      res.json({success: false, message: "An error occured while selecting shipping address"})
    }
  }
  static async getChartData(req, res, next){
    const monthNames = ["January", "February", "March", "April", "May", "June",
      "July", "August", "September", "October", "November", "December"];
    let date = new Date();
    let months = [];
    await _.each([0,1,2,3,4], i=>{
      months.push(monthNames[date.getMonth() - i < 0 ? (12 + date.getMonth()) - i: date.getMonth() - i] );
    })
    months = months.reverse();
    try {
      const customerResponse = await CustomerDAO.getCustomerById(parseInt(req.query.customer));
      if (customerResponse.success) {
        let purchaseList = customerResponse.customer.purchases;
        if (!purchaseList.length) {
          res.json({success: true, months: months, purchase: [0,0,0,0,0], return: [0,0,0,0,0]})
        } else {
          let purchaseResponse = await PurchaseDAO.getPurchases(purchaseList);
          let purchase = [];
          await _.each([0,1,2,4,5], async i=>{
            let amount = 0;
            await _.each(purchaseResponse.purchase, data=>{
              let currentDate = new Date();
              currentDate.setMonth(new Date().getMonth() - i);
              let orderDate = new Date(data.orderDate);
              let beforemonth = new Date();
              beforemonth.setMonth(new Date().getMonth() - (i+1));
              if (beforemonth <= orderDate && currentDate >= orderDate) {
                amount = amount + parseFloat((data.summary.total).toFixed(2));
              }
            })
            purchase.push(amount);
          })
          purchase = purchase.reverse();
          res.json({success: true, months: months, purchase: purchase, return: [0,0,0,0,0]})
        }
      }
    } catch (error) {
      console.log("ERROR", error);
      res.json({success: false, months: months, purchase: [0,0,0,0,0], return: [0,0,0,0,0]})
    }
  }
  static async apiSetBillAddress(req, res, next){
    const customerCartResponse = await CustomerDAO.getCustomerById(parseInt(req.body.customer));
    if (customerCartResponse.success) {
      let customerAddresses = customerCartResponse.customer.address;
      let addressId = req.body.address.internalid;
      let addressIndex = _.findIndex(customerAddresses, address=> address.internalid === addressId);
      if (addressIndex > -1) {
        customerAddresses = _.map(customerAddresses, address=>{
          address.isDefaultBill = address.internalid === addressId;
          return address;
        });
        const addressResponse = await CustomerDAO.updateAddressCollection(parseInt(req.body.customer), customerAddresses);
        if (addressResponse.success) {
          res.json({success: true, message: "Billing address selected"});
        } else {
          res.json({success: false, message: "An error occured while selecting billing address"})
        }
      } else {
        res.json({success: false, message: "Invalid billing address selected"});
      }
    } else {
      res.json({success: false, message: "An error occured while selecting billing address"})
    }
  }
  static async getCartSubtotal(productsList, cartItems){
    let products = [];
    let shoeFilters = await _.filter(productsList, identifier=> identifier.indexOf("shoe") > -1);
    const shoes = await ProductsDAO.getProductsById("shoes", {id: {$in: shoeFilters}});
    products = [...products, ...shoes];
    let bagFilters = await _.filter(productsList, identifier=> identifier.indexOf("bag") > -1);
    const bags = await ProductsDAO.getProductsById("bags", {id: {$in: bagFilters}});
    products = [...products, ...bags];
    let clothingFilters = await _.filter(productsList, identifier=> identifier.indexOf("clothing") > -1);
    const clothing = await ProductsDAO.getProductsById("clothing", {id: {$in: clothingFilters}});
    products = [...products, ...clothing];
    let toolFilters = await _.filter(productsList, identifier=> identifier.indexOf("tool") > -1);
    const tools = await ProductsDAO.getProductsById("tools", {id: {$in: toolFilters}});
    products = [...products, ...tools];
    let alcoholsFilters = await _.filter(productsList, identifier=> identifier.indexOf("alcohol") > -1);
    const alcohols = await ProductsDAO.getProductsById("alcohols", {id: {$in: alcoholsFilters}});
    products = [...products, ...alcohols];
    let electronicsFilters = await _.filter(productsList, identifier=> identifier.indexOf("electronics") > -1);
    const electronics = await ProductsDAO.getProductsById("electronics", {id: {$in: electronicsFilters}});
    products = [...products, ...electronics];
    let subTotal = 0;
    _.map(cartItems, (item) =>(subTotal = ((item.quantity *( _.find(products, collection=>collection.id === item.id).price)) + parseFloat(subTotal)).toFixed(2)))
    return parseFloat(subTotal);
  }

  static async apiGetPurchases(req, res, next){
    const customerResponse = await CustomerDAO.getCustomerById(parseInt(req.query.id));
    if (customerResponse.success) {
      let purchaseList = customerResponse.customer.purchases;
      if (!purchaseList.length) {
        res.json({success: true, purchase: []})
      } else {
        let purchaseResponse = await PurchaseDAO.getPurchases(purchaseList);
        res.json(purchaseResponse);
      }
    } else {
      res.json({success: false, message: "An error occured while fetching order list"})
    }
  }

  static async apiPlaceOrder(req, res, next){
    const customerResponse = await CustomerDAO.getCustomerById(parseInt(req.body.customer));
    if (customerResponse.success) {
      let cartItems = customerResponse.customer.cart;
      if (!cartItems.length) {
        res.json({success: false, message: "There are no items avalable in the cart to place order"});
      } else {
        let lastOrder = await PurchaseDAO.getLastPurchaseOrder();
        if (lastOrder) {
          let today = new Date();
          let deliveryDate = today.setDate(today.getDate() + 2)
          let billAddress = _.clone(_.find(customerResponse.customer.address, addr=>addr.isDefaultBill));
          delete billAddress.isDefaultBill;
          delete billAddress.isDefaultShip;
          let shippAddress = _.clone(_.find(customerResponse.customer.address, addr=>addr.isDefaultShip));
          delete shippAddress.isDefaultBill;
          delete shippAddress.isDefaultShip;
          let shippingDetails = req.body.shipping ?? {};
          shippingDetails.estimate = deliveryDate;
          let discount = req.body.discount ?? 0;
          let tax = req.body.tax ?? 0;
          let paymentDetails = req.body.payment;
          let cartTotal = await MyAccountController.getCartSubtotal(_.map(cartItems, item=>item.id), cartItems)
          let order = {
            "record": "purchase",
            "customer": req.body.customer,
            "internalid": lastOrder.orderId + 1,
            "sonumber": `SO${lastOrder.orderId + 1}`,
            "ponumber": `PO${lastOrder.orderId + 1}`,
            "status": "Pending Approval",
            "orderDate": new Date().getTime(),
            "deliveryDate": deliveryDate,
            "address": {
              "shipping": shippAddress,
              "billing": billAddress
            },
            "payment": {
              "method": paymentDetails.method,
              "id": paymentDetails.id,
              "amount": paymentDetails.amount,
              "name": paymentDetails.name
            },
            "items": cartItems,
            "shipping": shippingDetails,
            "summary":{
              "subtotal" : cartTotal,
              "shipping": shippingDetails.cost ?? 0,
              "discount": discount,
              "tax": tax,
              "total": parseFloat((cartTotal + (shippingDetails.cost ?? 0) + (discount ?? 0) + (tax ?? 0)).toFixed(2))
            }
          }
          let orderResponse = await PurchaseDAO.placeOrder(order);
          if (orderResponse) {
            let oldPurchases = customerResponse.customer.purchases;
            oldPurchases.push(`SO${lastOrder.orderId + 1}`)
            let purchaseData  = await CustomerDAO.updateCustomerObjects(parseInt(req.body.customer), {cart: [],purchases: oldPurchases });
            if (purchaseData.success) {
              res.json({success: true, message: "Your order has be placed", orderNumber: `SO${lastOrder.orderId + 1}`});
            }else{
              res.json({success: false, message: "An error occured while placing order"});
            }
          } else {
            res.json({success: false, message: "An error occured while placing order"});
          }
        }
      }
    } else {
      res.json({success: false, message: "An error occured while placing order"});
    }
  }
}