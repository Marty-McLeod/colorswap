import { NavLink } from "react-router";
import styles from "./PageNav.module.css";
import Logo from "./Logo";
import { nav_options } from "../data/nav.js";
import { HiMenu } from "react-icons/hi";
import { useState } from "react";





function PageNav() {
    const [ isOpen, setIsOpen ] = useState(false);

    const toggleMobileMenu = function toggleMenu() {
        setIsOpen((isOpen) => !isOpen);
    }

    return (
        <nav className={styles.nav}>
            

                <HiMenu 
                    onClick={toggleMobileMenu}
                    className={styles.menuIcon}
                />
                <Logo/>
                <HiMenu className={styles.menuIconUnused}/>
            <ul className={ isOpen ? '' : styles.hideMenu }>
                <li><NavLink to="/how-to">How-to</NavLink></li>
                <li><NavLink to="/examples">Examples</NavLink></li>
                <li><NavLink to="/api">API</NavLink></li>
            </ul>

        </nav>
    )
}

export default PageNav;