import shared from "./sharedPageStyles.module.css";
import styles from "./Homepage.module.css";
import PageNav from "../components/PageNav";
import Footer from "../components/Footer";
import { useState } from "react";
import OptionCheckboxes from "../components/OptionCheckboxes";
import jsonOptions from "../data/options_array.json" with { type: "json"};
import Button from "../components/Button";

function Homepage() {
    const optionsArray = jsonOptions["options"];
    const labelsArray = jsonOptions["labels"];

    // console.log("jsonOptions:", jsonOptions);
    // let num = 0;
    // Object.entries(options).forEach(([key, value]) => {
    //     num += 1;
    //     console.log(num,"key:", key, "value:", value);
    // });
    const [optValues, setOptValues] = useState(optionsArray);

    
    function handleCheckbox(obj, name) {
        if(obj[name]) {
        obj[name] = false;
        } else {
        obj[name] = true;
        }
        
        setOptValues([...optValues, obj]);
    }


    function handleResetDefault() {
        setOptValues([...optionsArray]);
        console.log("setOptValues used!")
    }

    return (
        <div id="div-parent-layout" className={shared.parentDiv}>
            <PageNav/>
            <div className={`${styles.homepage} ${shared.sharedPage}`}>
                <section>
                    <h1>Welcome to ColorSwap!</h1>
                    <h2>ColorSwap makes it easy to change all kinds of color values across files</h2>
                    <hr className={shared.basic} />
                        <OptionCheckboxes options={optionsArray} labels={labelsArray} onChange={handleCheckbox}>
                            <Button onClick={handleResetDefault}>Reset to default</Button>
                        </OptionCheckboxes>
                </section>
            </div>
            <Footer/>
        </div>
    )
}

export default Homepage;
