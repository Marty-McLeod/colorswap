import styles from "./Homepage.module.css";
import PageNav from "../components/PageNav";
import Footer from "../components/Footer";

function Homepage() {
    return (
        <>
            <PageNav/>
            <main className={styles.homepage}>
                <section>
                    Homepage 🚀
                </section>            
            </main>
            <Footer/>
        </>
    )
}

export default Homepage;
