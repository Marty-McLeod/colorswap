import shared from "./sharedPageStyles.module.css";
import styles from "./Homepage.module.css";
import PageNav from "../components/PageNav";
import Footer from "../components/Footer";
import { useEffect, useState } from "react";
import OptionCheckboxes from "../components/OptionCheckboxes";
import jsonOptions from "../data/options_array.json" with { type: "json"};
import Button from "../components/Button";
import Toggle from "../components/Toggle";
import MultiFileInput from "../components/MultiFileInput";


export const FILETYPES = ".txt, .css, .sass, .md, .rb, .py, .js, .jsx, .c, .cpp, .erb, .html";

function Homepage() {
    const optionsArray = jsonOptions["options"];
    const labelsArray = jsonOptions["optionLabels"];
    const newOptionsArray = structuredClone(optionsArray);

    const [optValues, setOptValues] = useState(newOptionsArray);
    const [exToggle, setExToggle] = useState(false);

    useEffect(() => {
    // console.log("optValues:", optValues);
  }, [optValues]);

    function handleToggle() {
        // Toggles the current toggle value
        setExToggle((bool) => !bool);
    }


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

    function handleSelect(e, index) {
        const { name, value } = e.target;
        const copy = optValues.map((option, i) => {
            if(i === index) {
                option[name] = value;
                return option;
            } else { return option; }
        })

        setOptValues(copy);
    }

    function handleNumber(e, index) {
        const { name, value } = e.target;
        const intValue = parseInt(value);

        const copy = optValues.map((option, i) => {
            if(i === index) {
                option[name] = intValue;
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
                        <div className={styles.headerOptions}>

                            <h3>Color option controls</h3>
                            <span className={styles.toggleContainer}>
                                <Toggle checkVal={exToggle} onChange={handleToggle}>Show examples</Toggle>
                            </span>
                            {/* <Toggle checked="true" isReadOnly={true}/> */}
                        </div>
                        <OptionCheckboxes 
                            options={optValues} 
                            labels={labelsArray}
                            onChangeCheckbox={handleCheckbox}
                            onChangeSelect={handleSelect}
                            onChangeNumber={handleNumber}
                            showExamples={exToggle}
                        >
                        </OptionCheckboxes>
                    <div className={styles.buttonRow}>
                        <Button onClick={handleResetDefault} type="primary">Reset to default</Button>
                    </div>
                    <h2>Upload or drag & drop files here</h2>
                    <div className={styles.headerFileNotes}>
                        <h3>Acceptable text-based file types:</h3>
                        <p className={styles.fileNotes}>
                            { FILETYPES }
                        </p>
                    </div>
                    <MultiFileInput accept={FILETYPES}/>
                    {/* <FileInput /> */}                 
                </section>
            </div>
            <Footer/>
        </div>
    )
}

export default Homepage;
