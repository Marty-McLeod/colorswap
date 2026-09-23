import shared from "./sharedPageStyles.module.css";
import styles from "./Homepage.module.css";
import PageNav from "../components/PageNav";
import Footer from "../components/Footer";
import { HiCodeBracket, HiFaceSmile } from "react-icons/hi2";
import OptionCheckboxes from "../components/OptionCheckboxes";
import jsonOptions from "../data/options_test.json" with { type: "json"};

function Homepage() {
    const options = jsonOptions["options"];
    // console.log("jsonOptions:", jsonOptions);
    // let num = 0;
    // Object.entries(options).forEach(([key, value]) => {
    //     num += 1;
    //     console.log(num,"key:", key, "value:", value);
    // });

    return (
        <div id="div-parent-layout" className={shared.parentDiv}>
            <PageNav/>
            <div className={`${styles.homepage} ${shared.sharedPage}`}>
                <section>
                    <h1>Welcome to ColorSwap!</h1>
                    <h2>ColorSwap makes it easy to change all kinds of color values across files</h2>
                    <hr className={shared.basic} />
                    <div id="div-controls">
                        <OptionCheckboxes options={options} />
                    </div>
                </section>
            </div>
            <Footer/>
        </div>
    )
}

export default Homepage;
