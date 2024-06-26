let contact;
export default class ContactUsDAO{
  static async inJectDB(conn){
    if (contact) {
      return;
    }
    contact = await conn.db("records").collection('contact');
  }
  static async saveContact(data){
    try {
      const {fullname, email, phone, message} = data;
      let res = await contact.insertOne({fullname, email, phone, message, ts: new Date().getTime()})
      return {success : !!res, message: "Form has been saved our customer exicutive will contact you soon."};
    } catch (error) {
      console.log("ERROR", error);
      return {success : false, message: "An error occured during form submission"};
    }
  }
}