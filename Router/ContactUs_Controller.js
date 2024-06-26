import ContactUsDAO from "../DAO/ContactUs_DAO.js";
export default class ContactusController{
  static async apiSaveContact(req, res, next){
    const response = await ContactUsDAO.saveContact(req.body);
    res.json(response);
  }
}