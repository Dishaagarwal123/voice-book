import React from "react";
import { Link } from "react-router-dom";
import { useSelector } from "react-redux";
import Searchbar from "../Searchbar/Searchbar";
const Navbar = () => {
    const links = [
        {
            title: "Home",
            link: "/",
        },
        {
            title: "All Audiobooks",
            link: "/all-audiobooks",
        },
        {
            title: "Login",
            link: "/login",
        },
        {
            title: "Logout",
            link: "/logout",
        },
       
    ];
    const isLoggedIn = useSelector((state)=>state.auth.isLoggedIn);
    console.log(isLoggedIn);
    if(isLoggedIn===false){
        links.splice(3,1);
    }
    else{
        links.splice(2,1);
    }
    return (
        <div className="flex bg-orange-400 text-white px-8 py-4 items-center justify-between">
            <div className="flex items-center">
                <div className="bg-white rounded-full p-2">
                    <img
                        className="h-16 w-16 rounded-full"
                        src="https://static.vecteezy.com/system/resources/previews/012/375/243/large_2x/3d-microphone-above-books-broadcasting-concept-png.png"
                        alt="logo"
                    />
                </div>
                <h2 className="text-2xl font-semibold ml-4">Voice</h2><h1 className="text-3xl font-semibold">Book</h1>
            </div>
            <div>
            <Searchbar/>
            </div>
            <div className="nav-links-voiceter flex gap-6">
                {links.map((item, i) => (
                    <Link to={item.link} key={i} className="text-lg">
                        {item.title}
                    </Link>
                ))}
            </div>
        </div>
    );
};

export default Navbar;
