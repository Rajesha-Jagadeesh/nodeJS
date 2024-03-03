import app from "./server.js";
import mongodb from "mongodb";
import ProductsDAO from "./DAO/Products.DAO.js";
import { configDotenv } from "dotenv";
configDotenv()
const mongoClient = mongodb.MongoClient;
const url = `mongodb+srv://${process.env.NVM_MONGODB_USER}:${process.env.NVM_MONGODB_PASSWORD}@easyshopping.ry57tgj.mongodb.net/?retryWrites=true&w=majority`;
const port = 10000;

mongoClient.connect(
  url, 
  {
    useNewUrlParser: true
  }
  )
  .catch(error =>{
    console.error('Error @ mongoClient', error);
    process.exit(1);
  })
  .then(async client=>{
    await ProductsDAO.injectDB(client);
    app.listen(port, ()=>{
      console.log('Listing @ the port');
    })
  })
