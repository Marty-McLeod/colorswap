import styles from "./Homepage.module.css";
import PageNav from "../components/PageNav";

function Homepage() {
    return (
        <section>
            <PageNav/>
            <main className={styles.homepage}>
                Homepage 🚀
            </main>
        </section>
    )
}

export default Homepage;
