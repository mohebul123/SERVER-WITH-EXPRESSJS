import { pool } from "../../config/db";

const createTodo = async(user_id:string,title:string)=>{
    const result =  await pool.query(`INSERT INTO todos(user_id,title) VALUES($1,$2) RETURNING *`,[user_id,title]);
    return result;
}

const getTodo = async() =>{
    const result =   await pool.query(`SELECT * FROM todos`)
    return result;
}

const getSingleTodo = async(id:string) =>{
    const result =  await pool.query(`SELECT * FROM todos WHERE id=$1`,[id]);
    return result;
}

const updateSingleTodo = async(title:string,description:string,completed:boolean,id:string)=>{
    const result=  await pool.query(`UPDATE todos SET title=$1, description=$2, completed=$3 WHERE id = $4 RETURNING * `,[title,description,completed,id]);
    return result;
}

const deleteSingleTodo = async(id:string)=>{
   const result = await pool.query(`DELETE FROM todos WHERE id = $1`,[id]);
    return result;
 }


export const todoServices = {
    createTodo,getTodo,getSingleTodo,updateSingleTodo,deleteSingleTodo
}