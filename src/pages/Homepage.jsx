import styles from "./Homepage.module.css";
import PageNav from "../components/PageNav";
import Footer from "../components/Footer";
import { HiFaceSmile, HiRocketLaunch } from "react-icons/hi2";
import { HiFlag } from "react-icons/hi";

function Homepage() {
    return (
        <>
            <PageNav/>
            <main className={styles.homepage}>
                <section>
                    <h1 className={styles.h1Title}>Homepage <HiFlag/></h1>
                    <h2>An H2 subtitle here. <HiFaceSmile/></h2>
                </section>            
            </main>
            <Footer/>
        </>
    )
}

export default Homepage;
