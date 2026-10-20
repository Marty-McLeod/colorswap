import { HiMoon, HiSun } from "react-icons/hi";
import { useDarkMode } from "../context/DarkModeContext";
// import styles from "./DarkModeToggle.module.css";


function DarkModeToggle() {
    const { isDarkMode, toggleDarkMode } = useDarkMode();

    // Displays an icon based on the current color mode state
    return (
        <span onClick={toggleDarkMode} >
            { isDarkMode ?  <HiSun /> : <HiMoon/> }
        </span>
    )
}

export default DarkModeToggle;
