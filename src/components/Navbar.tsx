import React, { useEffect, useState } from 'react'
import logo from "../images/logo.png";
import adminProfile from "../images/user.png";
import "../styles/navbar.css";

const Navbar: React.FC = () => {

    const [screenWidth, setScreenWidth] = useState<number>(window.screen.width);

    useEffect(() => {
        window.addEventListener("resize", () => {
            setScreenWidth(window.screen.width);
        });

    }, [screenWidth]);

    return (
        <nav className="navContainer flex">
            <div className="navLeft flex">
                <div className='logoDiv'>
                    <img src={logo} alt="logo" />
                </div>
                <div className='searchBoxDiv flex'>
                    <input type="text" placeholder="Search here" />
                    <i className="material-icons">search</i>
                </div>
            </div>
            <div className="navRight flex">
                <div className="adminDetails">
                    {screenWidth > 500 && <p>John Deo</p>}
                    {screenWidth > 500 && <p>Admin</p>}
                </div>
                <div className='adminProfileDiv'>
                    <img src={adminProfile} alt="adminProfile" />
                    <div className='adminOnline'></div>
                </div>
            </div>
        </nav>
    )
}

export default Navbar