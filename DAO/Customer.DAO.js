import SendEmail from "../Components/SendEmail.js";
import { getRegisterEmailContents } from "../Data/StaticEmails.js";

let customer, staticRecords;
export default class CustomerDAO{
  static async inJectDB(conn){
    if (customer && staticRecords) {
      return;
    }
    customer = await conn.db("records").collection('customer');
    staticRecords = await conn.db("staticvalues").collection('records');
  }

  static async customerLogin(email){
    try {
      let data = await customer.find({email: email}).project({_id: 0});
      return await data.toArray();
    } catch (error) {
      console.log("Error @ getReviewsByProductId", error);
    }
  }

  static async checkExistingCustomer(email){
    let res = await customer.find({email: email}).project({_id: 0});
    res =  await res.toArray();
    if (res.length > 0) {
      return {success: true, message: "existing customer found with email address"};
    } else {
      return {success: false, message: "No users found with provided email"};
    }
  }

  static async registerCustomer(data){
    let emailData = await getRegisterEmailContents(data.fullname, data.email, "https://easy-shopping-sandbox.web.app",  "https://easy-shopping-sandbox.web.app/verify") 
    // let emailresponse = await SendEmail(data.email, emailData.subject, emailData.mailHtml)
    let res = await customer.insertOne(data);
    return {success: true, res};
  }

  static async getRegistredCustomer(email){
    let res = await customer.find({email: email}).project({_id: 0, password: 0, password2: 0});
    res =  await res.toArray();
    return res;
  }

  static async getLastCustomer(){
    try {
      let lastCustomer = await customer.find().sort({customerId: -1}).limit(1).project({_id: 0});
      lastCustomer = await lastCustomer.toArray();
      return {success: true, customerId: lastCustomer[0].customerId};
    } catch (error) {
      return {success: false, error}
    }
  }

  static async getCustomerById(id){
    try {
      let response = await customer.find({customerId: id}).project({_id: 0, password: 0, password2: 0});
      response = await response.toArray();
      return {success: true, customer: response[0]}
    } catch (error) {
      return {success: false, message: "An error occured while getting customer information."}
    }
  }
}