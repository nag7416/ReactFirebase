import { NavLink } from "react-router-dom";

export default function Footer(){
    return (
        <>
            <footer className="footer">
                <div className="inner">
                    <div className="box one">
                        <div className="logo">
                            <h2>NAGENDRA BLOG</h2>
                        </div>
                        <p>Ensuring a seamless user experience across devices.</p>
                    </div>
                    <div className="box two">
                        <ul>
                            <li>
                                <span>pages</span>
                            </li>
                            <li>
                                <NavLink to='/'>
                                    Home
                                </NavLink>
                            </li>
                            <li>
                                <NavLink to="/about">
                                    About
                                </NavLink>
                            </li>
                            <li>
                                <NavLink to="/contact">
                                    Contact
                                </NavLink>
                            </li>
                        </ul>
                    </div>
                    <div className="box three">
                        <ul>
                            <li>
                                <span>socials</span>
                            </li>
                            <li>
                                <NavLink to="https://www.instagram.com/goud_8240_?igsh=MTZsdXBkZDQ0OWc1bQ==" target="__blank">
                                    Instagram
                                </NavLink>
                            </li>
                            <li>
                                <NavLink to="https://twitter.com/goud8240_" target="__blank">
                                    Twitter
                                </NavLink>
                            </li>
                            <li>
                                <NavLink to="https://www.linkedin.com/in/nagendra-babu-mekapothula-222152247/" target="__blank">
                                    Linkedin
                                </NavLink>
                            </li>
                        </ul>
                    </div>
                    <div className="box four">
                        <ul>
                            <li>
                                <span>product link</span>
                            </li>
                            <li>
                                <NavLink to="/">
                                    Style Guide
                                </NavLink>
                            </li>
                            <li>
                                <NavLink to="/">
                                    Licensing
                                </NavLink>
                            </li>
                            <li>
                                <NavLink to="/">
                                    Changelog
                                </NavLink>
                            </li>
                        </ul>
                    </div>
                    <div className="box five">
                        <ul>
                            <li>
                                <span>contact us</span>
                            </li>
                            <li>
                                <NavLink to="/">
                                    1234567890<br />dummy@gmail.com
                                </NavLink>
                            </li>
                            <li>
                                <NavLink to="/">
                                    E/111<br />Ameerpet, Hyderabad<br />500045
                                </NavLink>
                            </li>
                        </ul>
                    </div>
                </div>
                <div className="copyrightnote">
                    <p>© copyright 2024 - All Rights reserved</p>
                </div>
            </footer>
        </>
    )
}