import { Application } from "../models/ApplicationSchema.js";
import { catchAsyncErrors } from "../middleware/catchAsyncErrors.js";
import ErrorHandler from "../middleware/error.js";
import cloudinary from "cloudinary";
import { Job } from "../models/JobSchema.js";


export const PostApplication=catchAsyncErrors(async(req,res,next)=>{
  const {role}=req.user;

      if(role==="Employer")
        {
           return next(new ErrorHandler(`${role} Is Not Allowed To Post Application`,400));
        }


        if(!req.files||Object.keys(req.files).length===0)
            {
                return next(new ErrorHandler("Resume File Required",404));
            }
            const {resume}=req.files;
            const allowedFormats = ["image/png", "image/jpeg", "image/webp"];
            if (!allowedFormats.includes(resume.mimetype)) {
              return next(
                new ErrorHandler("Invalid file type. Please upload a PNG file.", 401)
              );
            }
            const cloudinaryResponse = await cloudinary.uploader.upload(
              resume.tempFilePath
            );
          
            if (!cloudinaryResponse || cloudinaryResponse.error) {
              console.error(
                "Cloudinary Error:",
                cloudinaryResponse.error || "Unknown Cloudinary error"
              );
              return next(new ErrorHandler("Failed to upload Resume to Cloudinary", 500));
            }
            const { name, email, coverLetter, phone, address, jobId } = req.body;
            const applicantID = {
              user: req.user._id,
              role: "JobSeeker",
            };
            if (!jobId) {
              return next(new ErrorHandler("Job not found!", 400));
            }
            const jobDetails = await Job.findById(jobId);
            if (!jobDetails) {
              return next(new ErrorHandler("Job not found!", 404));
            }
             
            const employerID = {
              user: jobDetails.jobpostedby,
              role: "Employer",
            };
            if (
              !name ||
              !email ||
              !coverLetter ||
              !phone ||
              !address ||
              !applicantID ||
              !employerID ||
              !resume
            ) {
              return next(new ErrorHandler("Please fill all fields.", 400));
            }
            const application = await Application.create({
              name,
              email,
              coverLetter,
              phone,
              address,
              applicantID,
              employerID,
              resume: {
                public_id: cloudinaryResponse.public_id,
                url: cloudinaryResponse.secure_url,
              },
              appliedto,
            });
            res.status(200).json({
              success: true,
              message: "Application Submitted!",
              application,
            });

});

export const employergetallapplication=catchAsyncErrors(async(req,res,next)=>{

       const {role}=req.user;

       if(role==="JobSeeker")
        {
            return next(new ErrorHandler(`${role}  Is Not Authorized  To Access This Resource`,400));
        }
const {id}=req.user;

const applications =await Application.find({"employerID.user":id});

res.status(200).json({
sucess:"true",
applications,
});

});


export const  jobseekergetallapplication=catchAsyncErrors(async(req,res,next)=>{

    const {role}=req.user;
    if(role==="Employer")
    {
        return next(new ErrorHandler(`${role} Is Not Allowed To Access This Resource`,400));
    }
  const {_id}=req.user;

  const applications=await Application.find({"applicantID.user":_id})

  res.status(200).json({
   success:true,
   applications,
    });
});

export const jobseekerdeleteallapplication=catchAsyncErrors(async(req,res,next)=>{
    const {role}=req.user;
    if(role==="Employer")
    {
        return next(new ErrorHandler(`${role} Is Not Allowed To Access This Resource`,400));
    }
    const {id}=req.params;
    const applications=await Application.findById(id);

    if(!applications){

        return next(new ErrorHandler("Application Not Found!",404));
    }
    await applications.deleteOne();

    res.status(200).json({
     success:true,
     message:"Application  is succssfully deleted",

    });

});

export const updateapplication=catchAsyncErrors(async(req,res,next)=>{
 const {role}=req.user;
 const {status}=req.body;
  const {id}=req.params;


  const updatedItem = await Application.findOneAndUpdate(
    { _id: id },
    { status },
    { new: true }
  );
  res.status(200).json({
    success:true,
    message:"Application  Updated Succssfully",
    updatedItem,
   });
  
});