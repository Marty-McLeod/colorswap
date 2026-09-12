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
                {/* <section id={styles.colorGrid}> */}
                    {/* <div style="background-color: var(--color-tech-blue-50);">
                        COLOR
                    </div>
                    <div style="background-color: var(--color-tech-blue-100);">
                        COLOR
                    </div> */}
                    {/* <div style="background-color: var(--color-tech-blue-200);">
                        COLOR
                    </div>
                    <div style="background-color: var(--color-tech-blue-300);">
                        COLOR
                    </div>
                    <div style="background-color: var(--color-tech-blue-400);">
                        COLOR
                    </div>
                    <div style="background-color: var(--color-tech-blue-500);">
                        COLOR
                    </div>
                    <div style="background-color: var(--color-tech-blue-600);">
                        COLOR
                    </div>
                    <div style="background-color: var(--color-tech-blue-700);">
                        COLOR
                    </div>
                    <div style="background-color: var(--color-tech-blue-800);">
                        COLOR
                    </div>
                    <div style="background-color: var(--color-tech-blue-900);">
                        COLOR
                    </div>
                    <div style="background-color: var(--color-tech-blue-950);">
                        COLOR
                    </div> */}
                {/* </section> */}
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
