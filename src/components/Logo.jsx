import styles from "./Logo.module.css";
import { Link } from "react-router";


function Logo() {
    return (
        <div>
            <Link to="/">
            <img src="src/assets/colorswap-logo.png" alt="ColorSwap logo" className={styles.logo}/>
            </Link>
        </div>
    )
}

export default Logo;