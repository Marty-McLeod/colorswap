import { NavLink } from "react-router";
import styles from "./PageNav.module.css";
import Logo from "./Logo";
import { nav_options } from "../data/nav.js";
import { HiMenu } from "react-icons/hi";


function PageNav() {
    return (
        <nav className={styles.nav}>
            <div className={styles.menuGroup}>
                <span>
                <HiMenu className={styles.menu}/>
                </span>
                {/* <Logo/> */}
                <span>
                <HiMenu className={styles.menuUnused}/>
                </span>
            </div>
            <ul>
                <li><NavLink to="/how-to">How to</NavLink></li>
                <li><NavLink to="/examples">Examples</NavLink></li>
                <li><NavLink to="/api">API</NavLink></li>
            </ul>
        </nav>
    )
}

export default PageNav;