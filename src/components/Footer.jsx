import { FaHeart, FaReact, FaRegCopyright } from "react-icons/fa";
import styles from "./Footer.module.css";

const date = new Date();
const year = date.getFullYear();

function Footer() {
    return (
        <footer className={styles.footer}>
            <FaRegCopyright/>&nbsp;Copyright {year} by Marty M. Built with&nbsp;<FaHeart 
            size={"0.8rem"}/>&nbsp;in React JS&nbsp;<FaReact/>, Python, & FastAPI.
        </footer>
    )
}

export default Footer;
