import shared from "./sharedPageStyles.module.css";
import styles from "./Test.module.css";
import PageNav from "../components/PageNav";
import Footer from "../components/Footer";



function Test() {
    return (
        <div id="div-parent-layout" className={shared.parentDiv}>
            <PageNav/>
            <div className={`${styles.test} ${shared.sharedPage}`}>
                <section>
                    <h1>Test page</h1>
                    <h2>Etc...etc</h2>
                </section>            
            </div>
            <Footer/>
        </div>
    )
}

export default Test;
