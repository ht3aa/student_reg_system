import "./NavBar.css";
import { makeItActive } from "./functions/makeItActive";
import React, { useEffect, useRef, useState } from "react";
import { startHamAnimation, removeHamAnimation } from "./functions/makeHamAnimation";
import { Link, useLocation } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { changeNavBarBgColor } from "../../redux/features/setNavBarBgColor";
import universityImg  from "../../assets/imgs/university.png";

const NavBar = () => {
    const dispatch = useDispatch();
    const bgColor = useSelector(staet => staet.navBarBgColor.value);
    const hamIconDivElement = useRef(null);
    const [startAnimation, setStartAnimation] = useState(true);
    const [showMenu, setShowMenu] = useState(false);
    const [showUpButton, setShowUpButton] = useState(false);
    const [isHomeRoute, setIsHomeRoute] = useState(false);
    const [isDataRoute, setIsDataeRoute] = useState(false);
    const [isAboutUsRoute, setIsAboutUsRoute] = useState(false);
    const [isDashboardRoute, setIsDashboardRoute] = useState(false);

    const userData = useSelector(state => state.userDataSlice.userData);
    const location = useLocation();

    useEffect(() => {
        if(location.pathname === '/') {
            setIsDataeRoute(false);
            setIsDashboardRoute(false);
            setIsAboutUsRoute(false);

            setIsHomeRoute(true);
        } else if(location.pathname.includes("/data")) {
            setIsDashboardRoute(false);
            setIsAboutUsRoute(false);
            setIsHomeRoute(false);

            setIsDataeRoute(true);
        } else if(location.pathname.includes("/dashboard")) {
            setIsAboutUsRoute(false);
            setIsHomeRoute(false);
            setIsDataeRoute(false);

            setIsDashboardRoute(true);
        } else if(location.pathname.includes("/aboutus")) {
            setIsDashboardRoute(false);
            setIsHomeRoute(false);
            setIsDataeRoute(false);

            setIsAboutUsRoute(true);
        }
    }, [location.pathname])
    function removeMenu() {
        setShowMenu(false);
        setStartAnimation(true);
        removeHamAnimation(hamIconDivElement)
    }

    document.addEventListener("scroll", () => {
        if(parseInt(window.scrollY) >= 450) {
            setShowUpButton(true);
            dispatch(changeNavBarBgColor(("#E4E4E4")))
        } else {
            setShowUpButton(false);
        }
    })

    return (
        <nav style={{ background: bgColor }}  
                onClick={(e) => {
                    makeItActive(e.target);
                }} 
            >
            <div className="logo">
                <img src={universityImg} alt="university logo"/>
                <a href="https://www.alkadhum-col.edu.iq/" target="_blank" rel="noreferrer"><h5>Imam Al-Kadhum University</h5></a>
            </div>
            <ul 
            >
                <Link to="/"><li><p className={isHomeRoute ? "active" : ""}>Home</p></li></Link>
                {userData[0] && (userData[0][1] === "manager" || userData[0][1] === "supervisor" || userData[0][1] === "admin") 
                && <Link to="/data"><li><p className={isDataRoute ? "active" : ""}>Data</p></li></Link>}
                { !userData[0] && <Link to="/login"><li><p>login</p></li></Link>}
                { !userData[0] && <Link to="/register"><li><p>Register</p></li></Link>}
                { (userData[0] && userData[0][1] === "manager") && <Link to="/dashboard"><li><p className={isDashboardRoute ? "active" : ""}>dashboard</p></li></Link>}
                <Link to="/aboutus"><li><p className={isAboutUsRoute ? "active" : ""}>About us</p></li></Link>
                { userData[0] && <Link to="/logout"><li><p>log out</p></li></Link>}
                
            </ul>
            <div className="hamIconContainer" ref={hamIconDivElement}
                onClick={() => {
                    startAnimation ? startHamAnimation(hamIconDivElement) : removeHamAnimation(hamIconDivElement);
                    setShowMenu(!showMenu);
                    setStartAnimation(!startAnimation);
                }}
            >
                <div className="mainBar"></div>
            </div>
            {showMenu && <div className="nav-small">
                <ul onClick={removeMenu}>

                    <Link to="/"><li><p className={isHomeRoute ? "active" : ""}>Home</p></li></Link>
                    {userData[0] && (userData[0][1] === "manager" || userData[0][1] === "supervisor" || userData[0][1] === "admin") 
                    && <Link to="/data"><li><p className={isDataRoute ? "active" : ""}>Data</p></li></Link>}
                    { !userData[0] && <Link to="/login"><li><p>login</p></li></Link>}
                    { !userData[0] && <Link to="/register"><li><p>Register</p></li></Link>}
                    { (userData[0] && userData[0][1] === "manager") && <Link to="/dashboard"><li><p className={isDashboardRoute ? "active" : ""}>dashboard</p></li></Link>}
                    <Link to="/aboutus"><li><p className={isAboutUsRoute ? "active" : ""}>About us</p></li></Link>
                    { userData[0] && <Link to="/logout"><li><p>log out</p></li></Link>}
                    
                </ul>    
            </div>}

            {showUpButton && <button onClick={() => {
                window.scroll(0, 0)
            }} className="upButton">
                <i className="fas fa-chevron-up"></i>
            </button>}
        </nav>
    )
}

export default NavBar;