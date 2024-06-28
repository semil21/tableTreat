import connectDB from "./database/database";

import Express from "express";
import bodyParser from "body-parser";

import dotenv from "dotenv";
dotenv.config();

const cors = require("cors");

const app = Express();
connectDB();

app.use(Express.json());
// app.use(bodyParser.json());
app.use(cors());
app.use((req, res, next) => {
  next();
});

import userRouter from "./routes/user.route";
import restrauntRouter from "./routes/restraunt.route";
import tableRouter from "./routes/table.route";
import categoryRouter from "./routes/category.route";
import itemRouter from "./routes/item.route";
import orderRouter from "./routes/order.route";
import chedRouter from "./routes/chef.route"
import notFound from "./middleware/notFound";

app.use("/user", userRouter)
app.use("/restraunt", restrauntRouter)
app.use("/table", tableRouter)
app.use("/category", categoryRouter)
app.use("/item", itemRouter)
app.use("/order", orderRouter)
app.use("/chef", chedRouter)


// app.use(notFound);

app.listen(process.env.PORT_NUMBER, () => {
  console.log("server running");
});
