import { catchAsyncErrors } from "../middleware/catchAsyncErrors.js";
import ErrorHandler from "../middleware/error.js";
import { User } from "../models/UserSchema.js";
import jwt from "jsonwebtoken";

export const isjobseekerauthenticated=catchAsyncErrors(
    async(req,res,next)=>{
  const token=req.cookies.JobSeekerToken;

  if(!token)
    {
     return new next(new ErrorHandler("User is not  Authenticated"));

    }

    const  decoded=jwt.verify(token,process.env.JWT_SECRET_KEY);
   
    req.user=await User.findById(decoded.id);

    if(req.user.role!== "JobSeeker")
    {
          return next(new ErrorHandler(`${req.user.role} Is Not Authorized For This Resource  `))
    }

       next();
    }
);


export const isAuthorized =catchAsyncErrors(
async(req,res,next)=>{

  const {token}=req.cookies;
 
  if(!token)
  {
      return next(new ErrorHandler("User Is Not  Authenticated",400));
  }

  const decoded=jwt.verify(token,process.env.JWT_SECRET_KEY);
  req.user=await User.findById(decoded.id);
   next();

}

);
