import styles from "./Logo.module.css";
import { Link } from "react-router";


function Logo() {
    return (
        <Link to="/" className={styles.logo}>
            <img 
                src="src/assets/colorswap-logo.png" 
                alt="ColorSwap logo" 
            />
        </Link>

    )
}

export default Logo;