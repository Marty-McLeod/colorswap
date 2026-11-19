import { HiQuestionMarkCircle } from "react-icons/hi";
import { HiMiniFaceSmile } from "react-icons/hi2";
import PageNav from "../components/PageNav";
import Footer from "../components/Footer";
import shared from "./sharedPageStyles.module.css";
import styles from "./HowTo.module.css";
import { BsCss, BsFiletypeCs, BsFiletypeHtml, BsFiletypeJson, BsFiletypePy, BsFiletypeRb, BsFiletypeTxt, BsJavascript } from "react-icons/bs";
import Img from "../components/Img";

function HowTo() {
    return (
        <div id="div-parent-layout" className={shared.parentDiv}>
            <PageNav/>
            <div className={`${styles.howto} ${shared.sharedPage}`}>
                <section>
                    <h1>How-to use the ColorSwap tool</h1>
                    <p>
                        ColorTool was designed to make modifying design color values across entire files a snap. You can automate changing color codes across 1 or more files for many different types of text-based files:
                    </p>
                        <div id={styles.fileTable}>
                            <table id={styles.table}>
                                <tr>
                                    <th>File types</th>
                                    <th>Extensions</th>
                                </tr>
                                <tr>
                                    <td>CSS/SCSS styling sheet files</td>
                                    <td>.CSS, .SCSS, x.module.css</td>
                                </tr>
                                <tr>
                                    <td>HTML</td>
                                    <td>.HTML</td>
                                </tr>
                                <tr>
                                    <td>Standard text files & markdown</td>
                                    <td>.TXT, .MD</td>
                                </tr>
                                <tr>
                                    <td>Jascript (JS) and JSX</td>
                                    <td>.JS, .JSX</td>
                                </tr>
                                <tr>
                                    <td>Ruby, Python, C/C++ and others</td>
                                    <td>.RB, .PY, .C .CPP</td>
                                </tr>
                            </table>
                        </div>
                    <p>...and many more!</p>
                    <h2>Uploading files for processing</h2>
                    <h3>1. Select your desired color options</h3>
                    {/* <Img imageDefault={} /> */}

                    <h3>2. Uploading files</h3>


                    <h2>Swapping R, G, and B color values</h2>
                    <p>Additionally, you can quickly create new color schemes from existing styling code,     saving you the work of modifying the files yourself.

                    
                    </p>
                </section>            
            </div>
            <Footer/>
        </div>
    )
}

export default HowTo;