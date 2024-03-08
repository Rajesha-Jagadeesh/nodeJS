import FilterDAO from "../DAO/Filters.DAO.js";
import ProductsDAO from "../DAO/Products.DAO.js";
export default class FilterController{
  static async getFilterOptions(req, res, next){
    try {
      const response = await FilterDAO.getFilterData(req.params.subcategory);
      res.json({success: true, message: "Filters Fetched", filter: response[0] ? response[0].data : {}})
    } catch (error) {
      res.json({success: false, message: 'Error occured during fetching', e: error});
    }
  }
}