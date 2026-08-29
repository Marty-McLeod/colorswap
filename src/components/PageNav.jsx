import { NavLink } from "react-router";
import styles from "./PageNav.module.css";
import Logo from "./Logo";
import { nav_options } from "../data/nav.js";


function PageNav() {
    return (
        <nav className={styles.nav}>
            <Logo/>
            <ul>
                { nav_options.map((item) => (
                    <li key={item.title}>
                        <NavLink to={`/${item.path}`}>{ item.title }</NavLink>
                    </li>
                ))
                }
                {/* <li><NavLink to="/how-to">How to</NavLink></li>
                <li><NavLink to="/examples">Examples</NavLink></li>
                <li><NavLink to="/api">API</NavLink></li> */}
            </ul>
        </nav>
    )
}

export default PageNav;