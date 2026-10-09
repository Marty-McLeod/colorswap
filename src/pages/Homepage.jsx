import shared from "./sharedPageStyles.module.css";
import styles from "./Homepage.module.css";
import PageNav from "../components/PageNav";
import Footer from "../components/Footer";
import { useEffect, useState } from "react";
import OptionCheckboxes from "../components/OptionCheckboxes";
import jsonOptions from "../data/options_array.json" with { type: "json"};
import Button from "../components/Button";

function Homepage() {
    const optionsArray = jsonOptions["options"];
    const labelsArray = jsonOptions["labels"];
    const newOptionsArray = structuredClone(optionsArray);

    const [optValues, setOptValues] = useState(newOptionsArray);

    useEffect(() => {
  }, [optValues]);

    function handleCheckbox(e, index) {
        const key = e.target.value;
        // If the current index was passed, toggle the key's value
        const copy = optValues.map((option, i) => {
            if(i === index) {
                option[key] = !option[key];
                return option;
            } else { return option; }
        })

        setOptValues(copy);
    }

    function handleResetDefault() {
        // Resets to default by updating the current
        // options array with default values
        setOptValues([...newOptionsArray]);
    }


    return (
        <div id="div-parent-layout" className={shared.parentDiv}>
            <PageNav/>
            <div className={`${styles.homepage} ${shared.sharedPage}`}>
                <section>
                    <h1>Welcome to ColorSwap!</h1>
                    <h2>ColorSwap makes it easy to change all kinds of color values across files</h2>
                    <hr className={shared.basic} />
                        <OptionCheckboxes options={optValues} labels={labelsArray} onChange={handleCheckbox}>
                            <Button onClick={handleResetDefault}>Reset to default</Button>
                        </OptionCheckboxes>
                </section>
            </div>
            <Footer/>
        </div>
    )
}

export default Homepage;
