import { HiPresentationChartBar } from "react-icons/hi";
import { HiFaceSmile } from "react-icons/hi2";
import PageNav from "../components/PageNav";
import Footer from "../components/Footer";
import shared from "./sharedPageStyles.module.css";
import styles from "./Examples.module.css";

function Examples() {
    return (
        <div id="div-parent-layout" className={shared.parentDiv}>
            <PageNav/>
            <div className={`${styles.examples} ${shared.sharedPage}`}>
                <section>
                    <h1>Examples&nbsp;<HiPresentationChartBar/></h1>
                    <h2>An H2 subtitle here. <HiFaceSmile/></h2>
                </section>            
            </div>
            <Footer/>
        </div>
    )
}

export default Examples;
