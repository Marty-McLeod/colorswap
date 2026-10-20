import { HiDatabase } from "react-icons/hi";
import { HiFaceSmile } from "react-icons/hi2";
import PageNav from "../components/PageNav";
import Footer from "../components/Footer";
import shared from "./sharedPageStyles.module.css";
import styles from "./API.module.css";

function API() {
    return (
        <div id="div-parent-layout" className={shared.parentDiv}>
            <PageNav/>
            <div className={`${styles.api} ${shared.sharedPage}`}>
                <section>
                    <h1>API page&nbsp;<HiDatabase/></h1>
                    <h2>An H2 subtitle here. <HiFaceSmile/></h2>
                </section>            
            </div>
            <Footer/>
        </div>
    )
}

export default API;
