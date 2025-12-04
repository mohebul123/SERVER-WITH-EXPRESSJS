import { Request, Response } from "express";
import { pool } from "../../config/db";
import { userServices } from "./user.service";

const createUser = async(req:Request,res:Response)=>{
    const {name,email} = req.body;
    try{
     const result = await userServices.creatUser(name,email);
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

const getUser = async(req:Request,res:Response)=>{
  try{
    const result =await userServices.getUser() ;
  
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

const getSingleUser = async(req:Request,res:Response)=>{
  try{
    const result =await userServices.getSingleUser(req.params.id as string);
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
const updateSingleUser = async(req:Request,res:Response)=>{
  const {email,name} = req.body;
  try{
    const result = await userServices.updateSingleUser(name,email,req.params.id as string);
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
const deleteSingleUser = async(req:Request,res:Response)=>{
  try{
    const result = await userServices.deleteSingleUser(req.params.id as string);
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
export  const userControllers = {
    createUser,getUser,getSingleUser,updateSingleUser,deleteSingleUser
}; 