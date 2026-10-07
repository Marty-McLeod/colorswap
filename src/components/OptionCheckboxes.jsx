import styles from "./OptionCheckboxes.module.css";
import { useState } from "react";


/*  Builds <input> elements of type checkbox + text and/or number based on the key-value
 *   pair types in a given object in the array of objects passed in props.
 *   Uses a second JSON array of objects to fetch the user-friendly label name for each option's
 *   funcationality.
 *   Creates a responsive grid with height of each <div> based on the <input>s needed.
 *
 */
function buildCheckboxesArrayObjects(options, labels, onchange) {
  const optArray = [];
  let keys = [];
  let subArray = [];
  let name = "";
  let objLabel = {};


  /* Iterates (maps) over the options object array, using each object   */
  options.map((objOption, index) => {
    keys = Object.keys(objOption); // Get an array of keys for value reference use
    name = keys[0]; // Stores the current option key (name) for convenience
    objLabel = labels[index]; // Get the current label object, w/ index same as options[]

    /* Create a checkbox for each option, regardless of type */
    subArray = [
      <span key={name}>
        <input
          type="checkbox"
          id={`chk-${name}`}
          name={`${name}`}
          value={`${name}`}
          checked={objOption[name] ? "checked" : ""}
          onChange={(objOption, name) => onchange(objOption, name)}
        />
        <label htmlFor={`chk-${name}`}>{objLabel[name]}</label>
      </span>,
    ];

    /* Create additional elements based on the type of option
     *   if keys in the current option object are > 1, this is larger object &
     *   will need more option fields.
     */
    if (keys.length > 1) {
      switch (name) {
        case "lightdark_hex":
        case "lightdark_rgb":
          subArray.push(
            /*  Add a named label & input , along with text & number fields,
                along with their current values as the value attribute  */
            <>
              <span>
                <label htmlFor={`${keys[1]}`}>{`${keys[1]}`}: </label>
                <input
                  type="text"
                  id={`${keys[1]}`}
                  name={`${keys[1]}`}
                  value={`${objOption[keys[1]]}`}
                />
              </span>
              <span>
                <label htmlFor={`${keys[2]}`}>{`${keys[2]}`}: </label>
                <input
                  type="number"
                  id={`${keys[2]}`}
                  name={`${keys[2]}`}
                  value={`${objOption[keys[2]]}`}
                />
              </span>
            </>
          );
          break;
        /*  Add a named label & input text field only, along with the current
            value assigned  */
        case "colorswap_hex":
        case "colorswap_rgb":
          subArray.push(
            <span>
              <label htmlFor={`${keys[1]}`}>{`${keys[1]}`}: </label>
              <input
                type="text"
                id={`${keys[1]}`}
                name={`${keys[1]}`}
                value={`${objOption[keys[1]]}`}
              />
            </span>
          );
          break;
        default: // Default behavior for odd case (no case match)
          subArray.push(<span>DEFAULT CASE</span>);
          break;
      }
    }

    /*  Store the current map() iteration's output to be rendered - an option checkbox + 
        field group - in a parent array used for the component function.
    */
    optArray.push(subArray);
  });

  return optArray; // Return the array of option element groups to be rendered
}

/*   Component function: Creates a grid of checkboxes based on a JS file containing
 *   a object of key-value pairs for functional options the user can
 *   select. Sets boxes as default where indicated as already selected in the
 *   object. (I.e., "true")
 */
function OptionCheckboxes({ options, labels, onChange, children }) {
  // console.log("options:", options);
  // console.log(("labels:", labels));  
  // Get the objects to be rendered based on props passed

  

  const optionsArray = buildCheckboxesArrayObjects(options, labels, onChange);

  return (
    /* Parent container for the option groups to be rendered */
    <div className={styles.optionCheckboxes} id="div-checkbox-cont">
      {
        // Map a <div> child + option field group for
        optionsArray.map((optGroup, index) => (
          <div key={index} className={styles.divCheckbox}>
            {optGroup}
          </div> // <div> input checkbox
        )) // options.map()
      }
      { children }
    </div> // <div> "div-checkbox-cont"
  );
}

export default OptionCheckboxes;
