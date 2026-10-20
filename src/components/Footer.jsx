import { FaHeart, FaReact, FaRegCopyright } from "react-icons/fa";
import styles from "./Footer.module.css";

const date = new Date();
const year = date.getFullYear();

function Footer() {
    return (
        <footer className={styles.footer}>
            <p>
                <FaRegCopyright/>
                    &nbsp;Copyright {year} Marty M. Built with&nbsp;
                <FaHeart size={"0.8rem"}/>
                    &nbsp;in React JS&nbsp;
                <FaReact/>
                    , Python, & FastAPI.
            </p>
        </footer>
    )
}

export default Footer;
