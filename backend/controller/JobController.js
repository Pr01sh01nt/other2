import { Job } from "../models/JobSchema.js";
import { catchAsyncErrors } from "../middleware/catchAsyncErrors.js";
import ErrorHandler from "../middleware/error.js";


export const getAllJob=catchAsyncErrors(async(req,res,next)=>{
    const jobs = await Job.find({Expired:false});
    res.status(200).json({
      success: true,
       jobs,
    });
});


export const postJob=catchAsyncErrors(async(req,res,next)=>{

  const {role}=req.user;
  
    if(role==="JobSeeker")
    {
      return next(new ErrorHandler(`${role} is not allowed to access this resource`,400));
    }

const {Title,Description, Location,Country,Category, FixedSalary,
    SalaryFrom, Salaryto}=req.body;

    if(!Title||!Description||!Location||!Country||!Category)      
      {
         return next( new ErrorHandler("Please Full Form!",400));
        }
       if((!SalaryFrom||!Salaryto)&&(!FixedSalary))
        {
           return next(new ErrorHandler("Please provide  Fixed Salary or Rangedsalary",401));
        }
     if(SalaryFrom&&!Salaryto&&!FixedSalary)
      {
       return next(new ErrorHandler("Please  Provide Either Fixed Salary or Raged Salary",403));
    }
    const jobpostedby = req.user._id;
   
    const jobs = await Job.create({
        Title,Description, Location,Country,Category,jobpostedby, FixedSalary,
        SalaryFrom, Salaryto
      });
      res.status(200).json(
        {
        success:true,
        message:"Job Posted Successfully",
        jobs

        }
      );

});


export const getmyjob=catchAsyncErrors(async(req,res,next)=>{

  const {role}=req.user;
  if(role==="JobSeeker")
    {
      return next(new ErrorHandler(`{role} Is Not Allowed To Acess This Resource`,400));
    }

  const jobs=await Job.find({jobpostedby:req.user._id,Expired:false});

res.status(200).json({
    success:true,
    jobs,
});
});

export const updateJob=catchAsyncErrors(async(req,res,next)=>{
   const role=req.user;
 if(role==="JobSeeker")
  {
      return next(new ErrorHandler(`${role} Is Not Allowed To Access This Resource`,400));
  }

const {id}=req.params;

let job =await Job.findById(id);

  if(!job)
    {
       return next(new ErrorHandler("Job Not Found!",404));
    }

  job =await Job.findByIdAndUpdate(id,req.body,{
  new:true,
  runValidators:true,
   useFindAndModify:false,
  });

  res.status(200).json({
    success:true,
    job,
    message:"Job Updated Sucessfully",
  });
});

export const deleteJob=catchAsyncErrors(async(req,res,next)=>{

  const role=req.user;

if(role==="Job Seeker")
{
    return next(new ErrorHandler(`${role} Is Not Authorized  To Access`,400));
}
const {id}=req.params;

let job =await Job.findById(id);

     if(!job)
    {
       return next(new ErrorHandler("Job Not Found!",404));
    }

    await job.deleteOne();

  res.status(200).json({
    success:true,
    message:"Job Deleted Sucessfully",
  });

});

export const jobdetails=catchAsyncErrors(async(req,res,next)=>{


  const {id}=req.params;



  let job =await Job.findById(id);

  if(!job)
    {
       return next(new ErrorHandler("NO Job Details Available!",404));
    }

    res.status(200).json({
   success:true,
   job,
    
     })


});