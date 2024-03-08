import app from "./server.js";
import mongodb from "mongodb";
import ProductsDAO from "./DAO/Products.DAO.js";
import { configDotenv } from "dotenv";
import FilterDAO from "./DAO/Filters.DAO.js";
configDotenv()
const mongoClient = mongodb.MongoClient;
const url = `mongodb+srv://${process.env.NVM_MONGODB_USER}:${process.env.NVM_MONGODB_PASSWORD}@easyshopping.ry57tgj.mongodb.net/?retryWrites=true&w=majority`;

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
    await FilterDAO.inJectDB(client);
    app.listen(process.env.NVM_PORT, ()=>{
      console.log('Listing @ the port', process.env.NVM_PORT);
    })
  })
