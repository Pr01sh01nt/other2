import express from "express"
import { PostApplication,jobseekerdeleteallapplication,
 employergetallapplication,jobseekergetallapplication} from "../controller/ApplicationController.js";
import { isAuthorized } from "../middleware/auth.js";
import { updateapplication } from "../controller/ApplicationController.js";
const router=express.Router();

router.post("/postapplication",isAuthorized,PostApplication);
router.get("/employergetapplication",isAuthorized,employergetallapplication);
router.get("/jobseekergetapplication",isAuthorized,jobseekergetallapplication);
router.delete("/delete/:id",isAuthorized,jobseekerdeleteallapplication);
router.put("/update/:id",isAuthorized,updateapplication);
export default router;


