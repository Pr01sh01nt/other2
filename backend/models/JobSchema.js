import mongoose from "mongoose";
import validator from "validator";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import { ObjectId } from "mongodb";

const JobSchema = new mongoose.Schema({
    Title:{
    type:String,
    required:[true,"Please Provide  The Job Title"],
    minLength: [3, "Job Title must contain at least 3 Characters!"],
    maxLength: [30, "Job Title cannot exceed 30 Characters!"],
    },
    Description:{
     type:String,
     required:[true,"Please Provide the Job Description"],
     minLength:[10,"Description must contain atleat 20 Characters!"],
     maxLength:[500,"Description must contain atleat 20 Characters!"],
    
    },
    Location:{
     type:String,
     required:[true,"Please Provide Exact location"],
     minLength:[10,"Job location must be atleast 20 characters"]

    },
    Country:{
    type:String,
    required:[true,"Please Provide The Country Name"],
    },
    Category:{
     type:String,
     required:[true,"Please provide Category"],
   
    },

    FixedSalary:{
      type:Number,
     
      minLength:[4,"Salary must constain 4 digits"],
      maxLength:[20,"Salary atmost contain 20 digits"],
    },
    SalaryFrom:{
        type:Number,
        minLength:[4,"Salary From must conatin atleat 4 digits"],
        maxLength:[9,"Salary From atmost conatin 9 digits "],

    },
    Salaryto:{
   type:Number,
   minLength:[4,"Salary From must conatin atleat 4 digits"],
   maxLength:[9,"Salary From atmost conatin 9 digits "],

    },
   Expired:{
   type:Boolean,
   default:false,

   },
   jobpostedon:{

    type:Date,
    dafault:Date.now,

   },
   jobpostedby:{
     type:mongoose.Schema.ObjectId,  // most important part 
     ref:"User",
     required:true,
   },

  });
  

  export  const Job=mongoose.model("Job",JobSchema);