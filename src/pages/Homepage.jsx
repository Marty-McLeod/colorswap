import shared from "./sharedPageStyles.module.css";
import styles from "./Homepage.module.css";
import PageNav from "../components/PageNav";
import Footer from "../components/Footer";
import { useEffect, useRef, useState } from "react";
import OptionCheckboxes from "../components/OptionCheckboxes";
import jsonOptions from "../data/options_array.json" with { type: "json"};
import Button from "../components/Button";
import Toggle from "../components/Toggle";
import MultiFileInput from "../components/MultiFileInput";
import Img from "../components/Img";
import imageDefault from "../assets/color-code-change-example-image.jpg";
import imageMobile from "../assets/color-code-change-example-image-mobile.jpg";
import { MAX_FILECOUNT } from "../data/file-upload-settings.js";
import { getArrayObjectFirstKeys } from "../services/array_functions.js";
import { useDarkMode } from "../context/DarkModeContext.jsx";
import { NavLink } from "react-router";


const FILE_EXTNS = ["txt", "css", "sass", "md", "rb", "py", "js", "jsx", "c", "cpp", "erb", "html"];
// const FILE_EXT_STR = "txt, .css, .sass, .md, .rb, .py, .js, .jsx, .c, .cpp, .erb, .html";

function Homepage() {
    const fileExtStringRef = useRef(null);
    const optionsArray = jsonOptions["options"];
    const labelsArray = jsonOptions["optionLabels"];
    const newOptionsArray = structuredClone(optionsArray);

    const [optValues, setOptValues] = useState(newOptionsArray);
    const checkCountRef = useRef(1);
    const [exToggle, setExToggle] = useState(false);

    const { isDarkMode } = useDarkMode();

    const classLightDark = isDarkMode ? shared.linkDark : shared.linkLight;


    /*  Do a one-time init. of the ref constant to avoid multiple calls to
        the string building function */
        if(fileExtStringRef.current === null) {
            fileExtStringRef.current = buildFileExtString();
        }

    function buildFileExtString() {
        let extString = "";
        extString = FILE_EXTNS.map((ext, index) => {
            return index < (FILE_EXTNS.length-1) ? '.' + ext + ", "  : '.' + ext
        }).join('')

        // console.log("extString:", extString);
        return extString;
    }


    useEffect(() => {
    // console.log("optValues:", optValues);

  }, [optValues]);

    /* Handles the "show example" toggle function */
    function handleToggle() {
        // Toggles the current toggle value
        setExToggle((bool) => !bool);
    }

    /* Handle checkbox select/deselect activity */
    function handleCheckbox(e, index) {
        const key = e.target.value;

        // If the current index was passed, toggle the key's value
        const copy = optValues.map((option, i) => {
            if(i === index) {
                /* If this is the last option what is checked, simply
                    return it and do not allow a toggle
                */
                if(option[key] & checkCountRef.current === 1) {
                    return option;
                }
                /* Toggle the option checkbox state */
                option[key] = !option[key];
                return option;
            } else { return option; }
        })
        /* Update the current checked box count and set the options state */
        checkCountRef.current = getCheckCount(optValues);
        setOptValues(copy);
    }

    /* Gets & sets value selected in options with a <select> type input */
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

    /* Updates when a numeric value is entered in <input> of type "number" */
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

    /* Resets all options to the default state */
    function handleResetDefault() {
        // Resets to default by updating the current
        // options array with default values
        setOptValues([...newOptionsArray]);
    }

    /* Updates the current count for "true" checkboxes */
    function getCheckCount(objArray) {
        let count = 0;
        /* Creates array of first key in each object (checkbox states) */
        const keys = getArrayObjectFirstKeys(objArray);
        // console.log("keys:", keys);

        /* Iterates over current options array states and increments count */
        objArray.forEach((obj, i) => {
            obj[keys[i]] === true ? count += 1 : null;
        })

        return count;
    }


    return (
        <div id="div-parent-layout" className={shared.parentDiv}>
            <PageNav/>
            <div className={`${styles.homepage} ${shared.sharedPage}`}>
                <section>
                    <h1>Welcome to ColorSwap!</h1>
                    <h2>ColorSwap makes it easy to change all kinds of color values across files</h2>                 
                    <Img 
                        imageDefault={imageDefault}
                        imageMobile={imageMobile}
                    />
                    <p className={styles.parLeftAligned}>
                        Select at least one color code conversion option then upload 1 to {MAX_FILECOUNT} files below. Toggle "Show examples" to see what each option will produce. (Read more details in the {<NavLink className={classLightDark}
                        to="/how-to">How to</NavLink>} page.)
                    </p>
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
                            { fileExtStringRef.current}
                        </p>
                    </div>
                    <MultiFileInput 
                        accept={ fileExtStringRef.current }
                        jsonData={optValues}
                    />
                    {/* <FileInput /> */}                 
                </section>
            </div>
            <Footer/>
        </div>
    )
}

export default Homepage;
