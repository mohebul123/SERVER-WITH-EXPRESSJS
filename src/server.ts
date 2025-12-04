import express, { NextFunction, Request, Response } from "express";
import config from "./config";
import initDB, { pool } from "./config/db";
import logger from "./middleware/logger";
import { userRoutes } from "./modules/users/user.routes";
import { todoRoutes } from "./modules/todo/todo.routes";

const app = express();
const port = config.port;

//initialize DB
initDB();


app.use(express.json())
app.get('/',logger, (req:Request,res:Response) => {
  res.send('Hello World!');
})
//users CRUD
app.use('/users',userRoutes)
//todo CRUD
app.use('/todos',todoRoutes)


app.use((req,res)=>{
  res.status(404).json({
    success: false,
    message: "Page Not Found",
    path: req.path
  })
})
app.listen(port, () => {
  console.log(`Example app listening on port ${port}`)
})
