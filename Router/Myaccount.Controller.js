import _ from "underscore";
import CustomerDAO from "../DAO/Customer.DAO.js";
export default class MyAccountController{
  static async apiAddAddress(req, res, next){
    const customerCartResponse = await CustomerDAO.getCustomerById(parseInt(req.body.customer));
    if (customerCartResponse.success) {
      let customerAddresses = customerCartResponse.customer.address;
      let newAddress = req.body.address;
      newAddress.internalid = new Date().getTime();
      if (customerAddresses.length === 0) {
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
        })
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
}