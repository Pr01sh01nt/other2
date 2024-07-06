import express from "express"



import { deleteJob, getAllJob, getmyjob, jobdetails, postJob,updateJob } from "../controller/JobController.js";
import { isAuthorized} from "../middleware/auth.js";


const router=express.Router();

router.get("/getAllJobs",isAuthorized,getAllJob);
router.post("/postjob",isAuthorized,postJob);
router.get("/getmyjobs",isAuthorized,getmyjob);
router.put("/update/:id",isAuthorized, updateJob);
router.delete("/delete/:id",isAuthorized, deleteJob);
router.get("/jobdetails/:id",jobdetails);




export default router;