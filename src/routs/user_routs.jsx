import React from 'react';
import {  Route, Routes } from "react-router-dom";
import LandingPage from '../pages/landing_page/landing_page';
import HouseownerSignUpForm from "../pages/signup_page/houseownersignup";
import ProfessionalSignup from '../pages/signup_page/professional_signup';
import ChoicePage from '../pages/choices/choice';
import LoginForm from '../pages/login_page/login';
import Home from '../pages/Home_page/home_Page';
import MyProfile from '../pages/myProfile/myProfile';
import UserProfile from '../pages/userprofile/userprofile';
import { PrivateRoutes } from './privateroute';
import VideoCallRoom from '../pages/messege/videocallroom';
// import Home from "../pages/HomePage";
// import Profile from "../pages/ProfilePage";


export default function UserRouter(){
    
   
    return (
        <div>
     
        <Routes>
        
        <Route path='/'element={<LandingPage />}/>
        <Route path='/signup/houseowner'element={<HouseownerSignUpForm />}/>
        <Route path='/signup/professional'element={<ProfessionalSignup />}/>
        <Route path='/login'element={<LoginForm />}/>
        <Route path='/choice'element={<ChoicePage />}/>


        <Route element={<PrivateRoutes />}>
        <Route path='/homepage' element={<Home />}/>
        <Route path='/myprofile' element={<MyProfile />}/>
        <Route path='/userprofile/:userId'element={<UserProfile/>}/>
        <Route path="/provider-videocall/:roomId" element={<VideoCallRoom/>}/>
        </Route>
        </Routes>
        </div>
    )
}