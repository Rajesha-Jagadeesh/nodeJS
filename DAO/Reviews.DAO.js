
let shoesReviews, bagsReviews, toolsReviews, clothingReviews, alcoholsReviews, foodsReviews;
export default class ReviewsDAO{
  static async inJectDB(conn){
    if (shoesReviews || bagsReviews || toolsReviews || clothingReviews || alcoholsReviews || foodsReviews) {
      return;
    }
    shoesReviews = await conn.db("reviews").collection('shoes');
    clothingReviews = await conn.db("reviews").collection('clothing');
    bagsReviews = await conn.db("reviews").collection('bags');
    toolsReviews = await conn.db("reviews").collection('tools');
    foodsReviews = await conn.db("reviews").collection('foods');
    alcoholsReviews = await conn.db("reviews").collection('alcohols');
  }

  static async getReviewsByProductId(subcategory, productId){
    try {
      let reviews
      switch (subcategory) {
        case "shoes":
          reviews = await shoesReviews.find({product: productId}).sort({date: -1}).project({_id: 0});
          return await reviews.toArray();
          case "tools":
          reviews = await toolsReviews.find({product: productId}).sort({date: -1}).project({_id: 0});
          return await reviews.toArray();
          case "bags":
          reviews = await bagsReviews.find({product: productId}).sort({date: -1}).project({_id: 0});
          return await reviews.toArray();
          case "clothing":
          reviews = await clothingReviews.find({product: productId}).sort({date: -1}).project({_id: 0});
          return await reviews.toArray();
          case "foods":
          reviews = await foodsReviews.find({product: productId}).sort({date: -1}).project({_id: 0});
          return await reviews.toArray();
          case "alcohols":
          reviews = await alcoholsReviews.find({product: productId}).sort({date: -1}).project({_id: 0});
          return await reviews.toArray();
        default: return []
      }
    } catch (error) {
      console.log("Error @ getReviewsByProductId", error);
    }
  }
}