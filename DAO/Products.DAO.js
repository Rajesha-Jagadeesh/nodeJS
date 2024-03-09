import mongodb, { ObjectId } from "mongodb";
import _ from "underscore";
const objectId = mongodb.ObjectId;

let shoes, clothing, bags,tools, foods, alcohols;
export default class ProductsDAO{
  static async injectDB(conn){
    try {
      if (shoes || clothing || bags || tools || foods || alcohols) {
        return;
      }
      shoes = await conn.db('products').collection('shoes');
      clothing = await conn.db('products').collection('clothing');
      bags = await conn.db('products').collection('bags');
      tools = await conn.db('products').collection('tools');
      foods = await conn.db('products').collection('foods');
      alcohols = await conn.db('products').collection('alcohols');
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
        case 'clothing':
          return await clothing.insertOne(product);
        default :
          return false;
      }
    } catch (error) {
      console.error(`errors in addItem ${error}`);
    }
  }

  static async getProducts(subcategory, filters){
    try {
      let filterData = [];
      let page = parseInt(filters.page);
      delete filters.page;
      let sort = filters.sort;
      delete filters.sort;
      let sortOption = {};
      sortOption[sort ? sort : "name"] = 1;
      _.map(_.keys(filters), option=>{
        let matrixOption = (filters[option]).split(',');
        matrixOption = _.filter(matrixOption, value=> value !== "");
        if (!_.isEmpty(matrixOption)) {
          let object = {};
          object[option] = {$all : matrixOption}  
          filterData.push(object)
        }
      });
      switch (subcategory) {
        case 'shoes':
          if (filters && _.keys(filters).length) {
            const products = await shoes.find({$and: [...filterData]}).sort(sortOption).skip(24 * (page - 1)).limit(24).project({matrixChild: 0, _id: 0});
            const count = await shoes.countDocuments({$and: [...filterData]});
            return{ products: await products.toArray(), count: count};
          } else {
            const products = await shoes.find().sort(sortOption).skip(24 * (page - 1)).limit(24).project({matrixChild: 0, _id: 0});
            const count = await shoes.find().estimatedDocumentCount();
            return{ products: await products.toArray(), count: count};
          }
        case 'clothing':
          if (filters && _.keys(filters).length) {
            const products = await clothing.find(filterData).sort(sortOption).skip(24 * (page - 1)).limit(24).project({matrixChild: 0, _id: 0});
            const count = await clothing.find(filterData).estimatedDocumentCount();
            return{ products: products.toArray(), count: count};
          } else {
            const products = await clothing.find().sort(sortOption).skip(24 * (page - 1)).limit(24).project({matrixChild: 0, _id: 0});
            const count = await clothing.find(filterData).estimatedDocumentCount();
            return{ products: products.toArray(), count: count};
          }
        case 'bags':
          if (filters && _.keys(filters).length) {
            const products = await bags.find(filterData).sort(sortOption).skip(24 * (page - 1)).limit(24).project({matrixChild: 0, _id: 0});
            const count = await bags.find(filterData).estimatedDocumentCount();
            return{ products: products.toArray(), count: count};
          } else {
            const products = await bags.find().sort(sortOption).skip(24 * (page - 1)).limit(24).project({matrixChild: 0, _id: 0});
            const count = await bags.find(filterData).estimatedDocumentCount();
            return{ products: products.toArray(), count: count};
          }
        case 'tools':
          if (filters && _.keys(filters).length) {
            const products = await tools.find(filterData).sort(sortOption).skip(24 * (page - 1)).limit(24).project({matrixChild: 0, _id: 0});
            const count = await tools.find(filterData).estimatedDocumentCount()
            return{ products: products.toArray(), count: count};
          } else {
            const products = await tools.find().sort(sortOption).skip(24 * (page - 1)).limit(24).project({matrixChild: 0, _id: 0});
            const count = await tools.find(filterData).estimatedDocumentCount()
            return{ products: products.toArray(), count: count};
          }
        case 'foods':
          if (filters && _.keys(filters).length) {
            const products = await foods.find(filterData).sort(sortOption).skip(24 * (page - 1)).limit(24).project({matrixChild: 0, _id: 0});
            const count = await foods.find(filterData).estimatedDocumentCount()
            return{ products: products.toArray(), count: count};
          } else {
            const products = await foods.find().sort(sortOption).skip(24 * (page - 1)).limit(24).project({matrixChild: 0, _id: 0});
            const count = await foods.find(filterData).estimatedDocumentCount()
            return{ products: products.toArray(), count: count};
          }
        case 'alcohols':
          if (filters && _.keys(filters).length) {
            const products = await alcohols.find(filterData).sort(sortOption).skip(24 * (page - 1)).limit(24).project({matrixChild: 0, _id: 0});
            const count = await alcohols.find(filterData).estimatedDocumentCount()
            return{ products: products.toArray(), count: count};
          } else {
            const products = await alcohols.find().sort(sortOption).skip(24 * (page - 1)).limit(24).project({matrixChild: 0, _id: 0});
            const count = await alcohols.find(filterData).estimatedDocumentCount()
            return{ products: products.toArray(), count: count};
          }
      
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