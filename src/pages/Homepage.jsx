import shared from "./sharedPageStyles.module.css";
import styles from "./Homepage.module.css";
import PageNav from "../components/PageNav";
import Footer from "../components/Footer";
import { HiCodeBracket, HiFaceSmile } from "react-icons/hi2";


function Homepage() {
    return (
        <>
            <PageNav/>
            <main className={`${styles.homepage} ${shared.sharedPage}`}>
                <section>
                    <h1>Homepage&nbsp;<HiCodeBracket/></h1>
                    <h2>An H2 subtitle here. <HiFaceSmile/></h2>
                </section>            
            </main>
            <Footer/>
        </>
    )
}

export default Homepage;
