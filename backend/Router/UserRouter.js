import express from "express"
import {  getuser, logout, register } from "../controller/UserController.js";
import {login} from "../controller/UserController.js"
import {isAuthorized } from '../middleware/auth.js'
const router=express.Router();

router.post("/Register",register);
router.post("/login",login);
router.get("/logout",isAuthorized,logout);
router.get("/getuser",isAuthorized,getuser);

export default router;