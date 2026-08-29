import styles from "./Logo.module.css";
import { Link } from "react-router";


function Logo() {
    return (
        <div>
            <Link to="/">
            <img src="src/assets/color-tool-logo.png" alt="ColorTool logo" className={styles.logo}/>
            </Link>
        </div>
    )
}

export default Logo;