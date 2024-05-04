
let purchaseCollection;
export default class PurchaseDAO{
  static async inJectDB(conn){
    if (purchaseCollection) {
      return;
    }
    purchaseCollection = await conn.db("records").collection('purchase');
  }
  static async getLastPurchaseOrder(){
    try {
      let lastOrder = await purchaseCollection.find().sort({internalid: -1}).limit(1).project({_id: 0});
      lastOrder = await lastOrder.toArray();
      return {success: true, orderId: lastOrder[0].internalid};
    } catch (error) {
      return {success: false, error}
    }
  }

  static async getPurchases(purchaseList){
    try {
      let purchase = await purchaseCollection.find({sonumber: {$in: purchaseList}}).project({_id: 0,customer: 0});
      purchase = await purchase.toArray();
      return {success: true, purchase: purchase}
    } catch (error) {
      console.log("Error @ getPurchases", error);
      return {success: false}
    }
  }
  static async placeOrder(order){
    try {
      let purchase = await purchaseCollection.insertOne(order);
      return purchase ? true : false;
    } catch (error) {
      return false;
    }
  }
}