import styles from "./OptionCheckboxes.module.css";


/*  Creates a grid of checkboxes based on a JS file containing
*   a object of key-value pairs for functional options the user can
*   select. Sets boxes as default where indicated as already selected in the
*   object. (I.e., "true")
*/
function OptionCheckboxes({ options }) {
    // console.log("OptionCheckboxes.options:", options);

    // Object.entries(options).forEach(([key, value]) => {
    //             console.log("key:", key, "value:", value);
                
    //             {/* <label for={`opt-${key}`}>{ key }</label>
    //             <input type="checkbox" id={`opt-${key}`} value={`${key}`} checked={`${value}`}/> */}
            
    //     })
    const output = [];

    Object.entries(options).forEach(([key, value]) => {
            output.push(<p id={key}>Key: {key}, Value: {`${value}`} </p>);
            {/* <label for={`opt-${key}`}>{ key }</label>
            <input type="checkbox" id={`opt-${key}`} value={`${key}`} checked={`${value}`}/> */}
        
    })

    return (
        <div className={styles.optionCheckboxes} >
            { output }
        </div>
    )

}

export default OptionCheckboxes;
