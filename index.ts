// import "dotenv/config";
import express from "express";
import UserRouter from "./routes/Users";
import checkToken from "./middlewares/checkToken";
import TodosRouter from "./routes/Todos";

require("dotenv").config();

const app = express();
const PORT = process.env.PORT || 5000;

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use("/api/users", UserRouter);
app.use(checkToken);
app.use('/api/todos', TodosRouter);

app.listen(PORT, () => {
  console.log(`App listening on port ${PORT}`);
});
