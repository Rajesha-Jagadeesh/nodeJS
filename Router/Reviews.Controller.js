import _ from "underscore";
import ReviewsDAO from "../DAO/Reviews.DAO.js";
export default class ReviewsController {
  static async apiGetReviews(req, res, next){
    try {
      const response = await ReviewsDAO.getReviewsByProductId(req.params.subcategory, req.params.productId);
      res.json({success: true, message: "Reviews fetched", reviews: response})
    } catch (error) {
      req.json({success: false, message: "Error occured during fetching reviews", error: JSON.stringify(error)})
    }
  }
}