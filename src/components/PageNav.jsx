import { NavLink } from "react-router";
import styles from "./PageNav.module.css";
import LogoDarkLight from "./LogoDarkLight";
import { nav_options } from "../data/nav.js";
import { HiMenu } from "react-icons/hi";
import { useState } from "react";
import DarkModeToggle from "./DarkModeToggle.jsx";


function PageNav() {
    const [ isOpen, setIsOpen ] = useState(false);

    const toggleMobileMenu = function toggleMenu() {
        setIsOpen((isOpen) => !isOpen);
    }

    return (
        /*  Builds a responsive navbar.
            Large screens: [ logo (L) ------ li elements - dark mode icon]
            Small screens: [ Menu icon -- logo -- dark mode icon OR hidden menu icon for "justify-content-between" use]
        */
        <nav className={styles.navbar}>
            <HiMenu 
                onClick={toggleMobileMenu}
                className={styles.menuIcon}
            />
            <LogoDarkLight/>
            {/* <HiMenu className={styles.menuIconUnused}/> // Uncomment if not using the dark mode toggle icon! */}

            <span id={styles.menuGroup}>
                <ul className={ isOpen ? '' : styles.hideMenu }>
                {
                    nav_options.map((route) => (
                            <li key={route.path}><NavLink to={`/${route.path}`} >{route.title}</NavLink></li>
                    ))
                }
                </ul>
                {/* Replaces the 2nd HiMenu icon, if used */}
                <DarkModeToggle className={styles.darkModeIconNav} /> 
            </span>
        </nav>
    )
}

export default PageNav;