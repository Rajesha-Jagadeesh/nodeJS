import mongodb, { ObjectId } from "mongodb";
const objectId = mongodb.ObjectId;

let shoes;
export default class ProductsDAO{
  static async injectDB(conn){
    try {
      if (shoes) {
        return;
      }
      shoes = await conn.db('products').collection('shoes');
    } catch (error) {
      console.error(`errors in injectDB ${error}`);
    }
  }
  static async addProduct(product, subcategory){
    try {
      console.log('subcategory', subcategory);
      switch (subcategory) {
        case 'shoes':
          return await shoes.insertOne(product);
        default :
          return false;
      }
    } catch (error) {
      console.error(`errors in addItem ${error}`);
    }
  }

  static async getProducts(subcategory){
    try {
      switch (subcategory) {
        case 'shoes':
          const products = await shoes.find();
          return products.toArray();
      
        default:
          return []
      }
    } catch (error) {
      console.error(`errors in getItem ${error}`);
    }
  }

  
  // static async updateItem(id, name, description, timestamp){
  //   try {
  //     const response = await items.updateOne(
  //       { name : id},
  //       { $set : {name: name, description: description, timestamp: timestamp}}
  //     )
  //     return response;
  //   } catch (error) {
  //     console.error(`errors in updateItem ${error}`);
  //   }
  // }

  // static async deleteItem(id){
  //   try {
  //     const response = await items.deleteOne({ name : id});
  //     return response;
  //   } catch (error) {
  //     console.error(`errors in updateItem ${error}`);
  //   }
  // }

  // static async getItems(id){
  //   try {
  //     const response = await items.find({ name : id});
  //     return response.toArray();
  //   } catch (error) {
  //     console.error(`errors in updateItem ${error}`);
  //   }
  // }
}