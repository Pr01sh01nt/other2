
import React, { useContext, useEffect } from "react";
import "./App.css";

import { BrowserRouter, Route, Routes } from "react-router-dom";
import axios from "axios"

import Home from "./Components/Home/Home";
import Navbar from "./Components/Layout/Navbar";
import Footer from "./Components/Layout/Footer";
import { Toaster } from "react-hot-toast";
import SignUp from "./Components/Auth/SignUp";
import { ToastContainer } from "react-toastify";
import Login from "./Components/Auth/Login";
import "react-toastify/dist/ReactToastify.css";
import {Context} from './main.jsx'
import PostJobForm from "./Components/Jobs/Postjob.jsx";
import Jobs from "./Components/Jobs/Jobs.jsx";
import JobDetails from "./Components/Jobs/JobDetails.jsx";
import Getmyapplication from "./Components/Application/Getmyapplication.jsx";
import PostApplication from "./Components/Application/PostApplication.jsx";
import Viewmyjobs from "./Components/Jobs/ViewmyJobs.jsx";
import NotFound from "./Components/Layout/NotFound.jsx";
import Employerupdateapplication from "./Components/Application/Employerupdateapplication.jsx";
const App = () => {

  const { isAuthorized, setIsAuthorized, setUser } = useContext(Context);
  useEffect(() => {
    const fetchUser = async () => {
      try {
        const response = await axios.get(
          "http://localhost:8000/api/v1/user/getuser",
          {
            withCredentials: true,
          }
        );
        setUser(response.data.user);
        setIsAuthorized(true);
      } catch (error) {
        setIsAuthorized(false);
      }
    };
    fetchUser();
  }, [isAuthorized]);



  return (
    <>
    <BrowserRouter>
      <Navbar />
      <Routes>

        <Route path="/" element={<Home></Home>}></Route>
        
        <Route path="/register" element={<SignUp></SignUp>}></Route>
        <Route path="/login" element={<Login></Login>}></Route>
        <Route path="/job/postjob" element={<PostJobForm></PostJobForm>}></Route>
        <Route path="/job/jobs" element={<Jobs></Jobs>}></Route>
        <Route path="/job/Viewmyjobs" element={<Viewmyjobs/>}></Route>
        <Route path="/job/:id" element={<JobDetails></JobDetails>}></Route>
        <Route path="/application/me" element={<Getmyapplication/>}></Route>
        <Route path="/application/post/:id" element={<PostApplication/>}></Route>
        <Route path="*" element={<NotFound/>}></Route>
        <Route path="/application/employerapplication" element={<Employerupdateapplication/>}></Route>

        
       
      </Routes>
      <ToastContainer position="top-center"/>
      <Footer></Footer>
    </BrowserRouter>
  </>
  )
}

export default App