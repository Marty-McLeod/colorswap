import { HiQuestionMarkCircle } from "react-icons/hi";
import { HiMiniFaceSmile } from "react-icons/hi2";
import PageNav from "../components/PageNav";
import Footer from "../components/Footer";
import shared from "./sharedPageStyles.module.css";
import styles from "./HowTo.module.css";

function HowTo() {
    return (
        <>
            <PageNav/>
            <main className={`${styles.howto} ${shared.sharedPage}`}>
                <section>
                    <h1>How-to page&nbsp;<HiQuestionMarkCircle/></h1>
                    <h2>An H2 subtitle here. <HiMiniFaceSmile/></h2>
                </section>            
            </main>
            <Footer/>
        </>
    )
}

export default HowTo;