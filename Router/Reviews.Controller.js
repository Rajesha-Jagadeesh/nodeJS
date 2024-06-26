import _ from "underscore";
import ReviewsDAO from "../DAO/Reviews.DAO.js";
import CustomerDAO from "../DAO/Customer.DAO.js";
import PurchaseDAO from "../DAO/Purchase.DAO.js";
export default class ReviewsController {
  static async apiGetReviews(req, res, next){
    try {
      const response = await ReviewsDAO.getReviewsByProductId(req.params.subcategory, req.params.productId);
      res.json({success: true, message: "Reviews fetched", reviews: response})
    } catch (error) {
      res.json({success: false, message: "Error occured during fetching reviews", error: JSON.stringify(error)})
    }
  }
  static async apiSaveReview(req, res, next){
    try {
      const {product, rating, title, description, images, customer, category} = req.body;
      let customerResponse = await CustomerDAO.getCustomerById(parseInt(customer));
      let purchaseResponse = await PurchaseDAO.getPurchases(customerResponse?.customer?.purchases ?? []);
      let itemPurchases = _.filter(purchaseResponse.purchase, data=>{
        return !_.isEmpty(_.find(data.items, item=>item.id === product));
      });
      let options = itemPurchases.length > 0 ? _.find(itemPurchases[itemPurchases.length - 1].items, item=>item.id === product)?.options : {};
      let reviewerId = JSON.stringify(customer);
      let reviewerName = customerResponse.customer.fullName;
      let reviewerProfile = `/profile?customer=${customer}`;
      let reviewerImage = customerResponse.customer.profileImg;
      let review = await ReviewsDAO.saveReview(category, {product : product, reviewerId, reviewerName, reviewerProfile, reviewerImage, rating: parseInt(rating), title, description, images, date: new Date().getTime(), options})
      res.json({success : review.success, message : review.success ? "The review have been saved successfully" : "An error occured while saving the review"})
    } catch (error) {
      console.log("error", error)
      res.json({success : false, message : "An error occured while saving the review"})
    }
  }
  static async apiGetProduct(req, res, next){
    let customerResponse = await CustomerDAO.getCustomerById(parseInt(req.query.customer));
    let purchaseResponse = await PurchaseDAO.getPurchases(customerResponse?.customer?.purchases ?? []);
    let itemPurchases = _.filter(purchaseResponse.purchase, data=>{
      return !_.isEmpty(_.find(data.items, item=>item.id === req.query.product));
    })
    res.json({success: !!itemPurchases.length, message : itemPurchases.length > 0 ? "This product can be reviewd" : "This product needs to be purchased before adding the review."})
  }
}