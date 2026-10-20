import styles from "./Logo.module.css";
import { Link } from "react-router";
import { useDarkMode } from "../context/DarkModeContext";

/*  Changes the logo type based on the light/dark theme state value.
    Logos are different in terms of color in order to contrast the current color
    them in use.
*/
function LogoDarkLight() {
    const { isDarkMode } = useDarkMode();

    return (
        <Link to="/" className={styles.logo}>
            <img 
                src={ isDarkMode ? 
                    ("src/assets/colorswap-logo-dark.png" ) :
                    ("src/assets/colorswap-logo-light.png" )
                }
                alt="ColorSwap logo" 
            />
        </Link>

    )
}

export default LogoDarkLight;