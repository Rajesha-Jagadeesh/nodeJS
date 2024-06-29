
let shoesReviews, bagsReviews, toolsReviews, clothingReviews, alcoholsReviews, foodsReviews, electonicsReviews;
export default class ReviewsDAO{
  static async inJectDB(conn){
    if (shoesReviews || bagsReviews || toolsReviews || clothingReviews || alcoholsReviews || foodsReviews || electonicsReviews) {
      return;
    }
    shoesReviews = await conn.db("reviews").collection('shoes');
    clothingReviews = await conn.db("reviews").collection('clothing');
    bagsReviews = await conn.db("reviews").collection('bags');
    toolsReviews = await conn.db("reviews").collection('tools');
    foodsReviews = await conn.db("reviews").collection('foods');
    alcoholsReviews = await conn.db("reviews").collection('alcohols');
    electonicsReviews = await conn.db("reviews").collection('electonics');
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
          case "electonics":
          reviews = await electonicsReviews.find({product: productId}).sort({date: -1}).project({_id: 0});
          return await reviews.toArray();
        default: return []
      }
    } catch (error) {
      console.log("Error @ getReviewsByProductId", error);
    }
  }
  static async saveReview(subcategory, data){
    try {
      let reviews
      switch (subcategory) {
        case "shoes":
          reviews = await shoesReviews.insertOne(data);
          return await {success: !!reviews};
          case "tools":
          reviews = await toolsReviews.insertOne(data);
          return await {success: !!reviews};
          case "bags":
          reviews = await bagsReviews.insertOne(data);
          return await {success: !!reviews};
          case "clothing":
          reviews = await clothingReviews.insertOne(data);
          return await {success: !!reviews};
          case "foods":
          reviews = await foodsReviews.insertOne(data);
          return await {success: !!reviews};
          case "alcohols":
          reviews = await alcoholsReviews.insertOne(data);
          return await {success: !!reviews};
          case "electonics":
          reviews = await electonicsReviews.insertOne(data);
          return await {success: !!reviews};
        default: return []
      }
    } catch (error) {
      console.log("Error @ saveReview", error);
    }
  }
}