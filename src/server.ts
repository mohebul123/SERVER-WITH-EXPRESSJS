import express, { NextFunction, Request, Response } from "express";
import dotenv from "dotenv";
import path from "path";

dotenv.config({path: path.join(process.cwd(),".env") })

import {Pool} from "pg";

const app = express();
const port = 5000;

const pool = new Pool({
    connectionString: `${process.env.CONNECTION_STR}`
})


//DB 
const initDB = async()=>{
    await pool.query(`
        CREATE TABLE IF NOT EXISTS users(
        id SERIAL PRIMARY KEY,
        name VARCHAR(100) NOT NULL,
        email VARCHAR(150) UNIQUE NOT NULL,
        age INT,
        phone VARCHAR(15),
        address TEXT,
        created_at TIMESTAMP DEFAULT NOW(),
        updated_at TIMESTAMP DEFAULT NOW()
        
        )
        `)

          await pool.query(`
            CREATE TABLE IF NOT EXISTS todos(
            id SERIAL PRIMARY KEY,
            user_id INT REFERENCES users(id) ON DELETE CASCADE,
            title VARCHAR(200) NOT NULL,
            description TEXT,
            completed BOOLEAN DEFAULT false,
            due_date DATE,
            created_at TIMESTAMP DEFAULT NOW(),
            updated_at TIMESTAMP DEFAULT NOW()
            )
            `);
}
initDB();

const logger = (req:Request,res:Response,next:NextFunction)=>{
  console.log(`[${new Date().toISOString()}] ${req.method} ${req.path}`);
  next();
}
app.use(express.json())
app.get('/',logger, (req:Request,res:Response) => {
  res.send('Hello World!');
})
//users CRUD
app.post('/users',async(req:Request,res:Response)=>{
    const {name,email} = req.body;
    try{
     const result =  await pool.query(`INSERT INTO users(name,email) VALUES($1,$2) RETURNING *`,[name,email]);
     res.status(201).json({
        success: true,
        message: "api Is working",
        data: result.rows[0]
             
    })
    }catch(err: any){
      res.status(500).json({
        success: false,
        message: err.message,
      })
    }
    

})


//users CRUD
app.get("/users",async(req:Request,res:Response)=>{
  try{
    const result = await pool.query(`SELECT * FROM users`);
    // console.log(result.rows[0]);
        res.status(201).json({
        success: true,
        message: "Data fetched successfully ",
        data: result.rows
             
    })
  }catch(err:any){
    res.status(500).json({
      success: false,
      message: err.message,
      details: err
    })
  }
})
//sungle user CRUD
app.get("/users/:id",async(req:Request,res:Response)=>{
  try{
    const result = await pool.query(`SELECT * FROM users WHERE id=$1`,[req.params.id]);
        if(result.rows.length === 0){
           res.status(404).json({
      success: false,
      message: "user not found"
    })
        }
        else{
           res.status(201).json({
        success: true,
        message: "Data fetched successfully ",
        data: result.rows[0]
             
    })
        }
        res.status(201).json({
        success: true,
        message: "Data fetched successfully ",
        data: result.rows
             
    })
  }catch(err:any){
    res.status(500).json({
      success: false,
      message: err.message,
      details: err
    })
  }
})

app.put("/users/:id",async(req:Request,res:Response)=>{
  const {email,name} = req.body;
  try{
    const result = await pool.query(`UPDATE users SET name=$1, email=$2 WHERE id = $3 RETURNING * `,[name,email,req.params.id]);
    console.log(result);
        if(result.rows.length === 0){
           res.status(404).json({
      success: false,
      message: "user not found"
    })
        }
        else{
        res.status(200).json({
        success: true,
        message: "Data fetched successfully ",
        data: result.rows[0]
             
    })}
  }catch(err:any){
    res.status(500).json({
      success: false,
      message: err.message,
      details: err
    })
  }
})

app.delete("/users/:id",async(req:Request,res:Response)=>{
  try{
    const result = await pool.query(`DELETE FROM users WHERE id = $1`,[req.params.id]);
    console.log(result);
        if(result.rowCount === 0){
           res.status(404).json({
      success: false,
      message: "user not found"
    })
        }
        else{
        res.status(200).json({
        success: true,
        message: " user Deleted successfully "
             
    })}
  }catch(err:any){
    res.status(500).json({
      success: false,
      message: err.message,
      details: err
    })
  }
})

//todos CRUD

app.post('/todos',async(req:Request,res:Response)=>{
    const {user_id,title} = req.body;
    try{
     const result =  await pool.query(`INSERT INTO todos(user_id,title) VALUES($1,$2) RETURNING *`,[user_id,title]);
     res.status(201).json({
        success: true,
        message: "api Is working",
        data: result.rows[0]
             
    })
    }catch(err: any){
      res.status(500).json({
        success: false,
        message: err.message,
      })
    }
})

app.get("/todos",async(req:Request,res:Response)=>{
  try{
    const result = await pool.query(`SELECT * FROM todos`);
    
        res.status(201).json({
        success: true,
        message: "Data fetched successfully ",
        data: result.rows
             
    })
  }catch(err:any){
    res.status(500).json({
      success: false,
      message: err.message,
      details: err
    })
  }
})

app.put("/users/:users_id",async(req:Request,res:Response)=>{
  const {email,name} = req.body;
  try{
    const result = await pool.query(`UPDATE users SET name=$1, email=$2 WHERE id = $3 RETURNING * `,[name,email,req.params.users_id]);
    console.log(result);
        if(result.rows.length === 0){
           res.status(404).json({
      success: false,
      message: "todos not found"
    })
        }
        else{
        res.status(200).json({
        success: true,
        message: "Data todo fetched successfully ",
        data: result.rows[0]
             
    })}
  }catch(err:any){
    res.status(500).json({
      success: false,
      message: err.message,
      details: err
    })
  }
})

app.delete("/users/:user_id",async(req:Request,res:Response)=>{
  try{
    const result = await pool.query(`DELETE FROM users WHERE id = $1`,[req.params.user_id]);
    console.log(result);
        if(result.rowCount === 0){
           res.status(404).json({
      success: false,
      message: "todos not found"
    })
        }
        else{
        res.status(200).json({
        success: true,
        message: " todo Deleted successfully "
             
    })}
  }catch(err:any){
    res.status(500).json({
      success: false,
      message: err.message,
      details: err
    })
  }
})


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
