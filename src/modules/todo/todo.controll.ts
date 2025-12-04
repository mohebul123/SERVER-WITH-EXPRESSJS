import { Request, Response } from "express";
import { pool } from "../../config/db";
import { todoServices } from "./todo.service";

const createTodo = async(req:Request,res:Response)=>{
    const {user_id,title} = req.body;
    try{
     const result =  await todoServices.createTodo(user_id,title);
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
}

const getTodo = async(req:Request,res:Response)=>{
  try{
    const result =await todoServices.getTodo() ;
  
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
}

const getSingleTodo = async(req:Request,res:Response)=>{
  try{
    const result =await todoServices.getSingleTodo(req.params.id as string);
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
             
    })
        }
        return;
  }catch(err:any){
    res.status(500).json({
      success: false,
      message: err.message,
      details: err
    })
  }
}

const updateSingleTodo = async(req:Request,res:Response)=>{
  const {completed,email,name} = req.body;
  try{
    const result = await todoServices.updateSingleTodo(name,email,completed,req.params.id as string);
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
}

const deleteSingleTodo = async(req:Request,res:Response)=>{
  try{
    const result = await todoServices.deleteSingleTodo(req.params.id as string);
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
}
export const todoControllers = {
    createTodo,getTodo,getSingleTodo,updateSingleTodo,deleteSingleTodo
}