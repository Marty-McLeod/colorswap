import { HiFaceSmile, HiSignalSlash } from "react-icons/hi2";
import PageNav from "../components/PageNav";
import Footer from "../components/Footer";
import shared from "./sharedPageStyles.module.css";
import styles from "./PageNotFound.module.css";

function PageNotFound() {
    return (
        <>
            <PageNav/>
            <main className={`${styles.pageNotFound} ${shared.sharedPage}`}>
                <section>
                    <h1>Page not found!&nbsp;<HiSignalSlash/></h1>
                    <h2>An H2 subtitle here. <HiFaceSmile/></h2>
                </section>            
            </main>
            <Footer/>
        </>
    )
}

export default PageNotFound;