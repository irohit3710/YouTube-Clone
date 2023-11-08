import React from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Feed from "./components/Feed";
import SearchResult from "./components/SearchResult";
import VideoDetails from "./components/VideoDetails";
import { AppContext } from "./context/contextApi";
import Login from "./components/Login/Login";
import Signup from "./components/SignUp/SignUp";
import ForgotPassword from "./components/ForgotPassword/ForgotPassword";


const App = () => {

    const alreadyLoggedIn = window.localStorage.getItem("alreadyLoggedIn");
    console.log(alreadyLoggedIn)
    return (
        <AppContext>
            <BrowserRouter>
                <div className="flex flex-col h-full">
                    <Routes>
                        <Route path="/" element={alreadyLoggedIn ? <Feed /> : <Login />} />
                        <Route path="/searchResult/:searchQuery" element={<SearchResult />} />
                        <Route path="/video/:id" element={<VideoDetails />} />
                        <Route path="/Login" element={<Login />} />
                        <Route path="/Signup" element={<Signup />} />
                        <Route path="/reset" element={<ForgotPassword />} />
                    </Routes>
                </div>
            </BrowserRouter>
        </AppContext>
    );
};

export default App;
