import { HiFaceSmile, HiSignalSlash } from "react-icons/hi2";
import PageNav from "../components/PageNav";
import Footer from "../components/Footer";
import shared from "./sharedPageStyles.module.css";
import styles from "./PageNotFound.module.css";

function PageNotFound() {
    return (
        <div id="div-parent-layout" className={shared.parentDiv}>
            <PageNav/>
            <div className={`${styles.pageNotFound} ${shared.sharedPage}`}>
                <section>
                    <h1>Sorry - looks like you've taken a wrong turn.</h1>
                    <h2>Page not found :(</h2>
                </section>            
            </div>
            <Footer/>
        </div>
    )
}

export default PageNotFound;