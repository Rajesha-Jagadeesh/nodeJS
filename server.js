import express from "express";
import router from "./Router/Router.js";
import cros from "cros";
const app = express();
app.use(cros({
  origin: 'https://easy-shopping-sandbox.web.app',
  optionsSuccessStatus: 200
}));
app.use(express.json());
app.use('/api/v1', router)
app.use("*", (req, res)=>{
  res.status(404).json({success: false, message: "Page not found."})
})

export default app;
