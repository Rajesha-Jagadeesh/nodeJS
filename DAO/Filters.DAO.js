import mongodb, {ObjectId} from "mongodb";
const objectId = mongodb.ObjectId;
let filters;
export default class FilterDAO{
  static async inJectDB(conn){
    try {
      if (filters) {
        return;
      }
      filters = await conn.db('staticvalues').collection('filter');
    } catch (error) {
      console.error(`errors in injectDB ${error}`);
    }
  }
  static async getFilterData(subcategory){
    try {
      const data = await filters.find({type: subcategory});
      return data.toArray();
    } catch (error) {
      console.error(`errors in getItem ${error}`);
    }
  }
}