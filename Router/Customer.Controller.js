import SendEmail from "../Components/SendEmail.js";
import CustomerDAO from "../DAO/Customer.DAO.js";
import _ from "underscore";
export default class CustomerController{
  static async apiCustomerLogin(req, res, next){
    const response = await CustomerDAO.customerLogin(req.body.email);
    if (response[0]) {
      if (response[0].password === req.body.password) {
        delete response[0].password;
        res.json({success: true, message: "Logged in successfully", response : response[0]});
      } else {
        res.json({success: false, message: "Invalid password, use correct password",});
      }
      
    } else {
      res.json({success: true, message: "User not found. Invalid email id, use valid email and password"});
    }
  }

  static async apiCustomerRegister(req, res, next){
    const existingCustomer = await CustomerDAO.checkExistingCustomer(req.body.email);
    if (existingCustomer.success) {
      res.json({success: false, message: "User is alredy registerd with same email, please login or use another email"});
    } else {
      let lastCustomer = await CustomerDAO.getLastCustomer();
      if (lastCustomer.success) {
        let data = req.body;
        data.customerId = parseInt(lastCustomer.customerId) + 1;
        data.timestamp = new Date().getTime();
        const registerCustomer = await CustomerDAO.registerCustomer(data);
        const customer = await CustomerDAO.getRegistredCustomer(data.email)
        res.json({success: true, customer: customer})
      } else {
        res.json({success: false, message: "An error occured during customer registration please try again."});
      }
    }
    // res.json({response})
  }


  static async apiGetCustomerById(req, res, next){
    try {
      const response = await CustomerDAO.getCustomerById(parseInt(req.params.id));
      res.json({success: true, customer: response.customer});
    } catch (error) {
      res.json({success: false, error})
    }
  }
}
