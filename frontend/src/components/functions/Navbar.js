import { useEffect } from "react";
import { NavLink } from "react-router-dom";

export default function Navbar({user}){

    useEffect(() => {

    }, [])

    const OpenMenu = (e) => {
        const menubar = document.querySelector('.menubar');
        const menubtn = document.querySelector('.menu');
        menubtn.classList.toggle('active');
        menubar.classList.toggle('active');
    }
    return (
        <>
            <nav className="nav">
                <div className="inner">
                    <div className="left">
                        <NavLink to='/'>Nagendra Blog</NavLink>
                    </div>
                    <div className="right">
                        <ul>
                            <li>
                                <NavLink to={`/category/cat.cat_name`}>
                                    Category
                                </NavLink>
                            </li>
                            <div className="line"></div>
                            <li>
                                <NavLink to='/about'>
                                    About
                                </NavLink>
                            </li>
                            <li>
                                <NavLink to='/contact'>
                                    Contact
                                </NavLink>
                            </li>
                            <div className="line"></div>
                            <li>
                                <NavLink to={user?.displayName ? '/profile' : '/login'}>
                                    {user?.displayName ? user.displayName : "Sign In"}
                                </NavLink>
                            </li>
                        </ul>

                        <div className="menu" onClick={OpenMenu}>
                            <span></span>
                        </div>
                    </div>
                </div>
            </nav>

            <div className="menubar">
                <ul>
                    <li>
                        <NavLink to={`/category`}>
                            cat.cat_name
                        </NavLink>
                    </li>
                    <div className="line"></div>
                    <li>
                        <NavLink to='/about'>
                            
                        </NavLink>
                    </li>
                    <li>
                        <NavLink to='/contact'>
                            Contact
                        </NavLink>
                    </li>
                </ul>
            </div>
        </>
    )
}