import { FaJugDetergent } from "react-icons/fa6";
import styles from "./OptionCheckboxes.module.css";

const OPT_KEYS_SINGLE = [
  "hex_rgb", "hex_hsl", "name_hex", "name_rgb",
  "rgb_hsl", "rgb_hex", "hsl_hex", "hsl_rgb",
  "hsl_hsv", "hsv_hsl", "hsv_hex", "hsv_rgb",4
];
const OPT_KEYS_LIGHTDARK = ["lightdark_hex", "lightdark_rgb"];
const LIGHTDARK_MODES = ["lighten", "darken"];

const OPT_KEYS_COLORSWAP = ["colorswap_hex", "colorswap_rgb"];
const COLORSWAP_ORDERS = ["r_to_g", "g_to_r", "g_to_b", "b_to_g", "r_to_b", "b_to_r"];
 const COLORSWAP_ORDER_LABELS = { 
  "r_to_g": "R ↔ G", "g_to_r": "G ↔ R", "g_to_b": "G ↔ B", 
  "b_to_g": "B ↔ G", "r_to_b": "R ↔ B", "b_to_r": "B ↔ R" 
};

/*  Builds <input> elements of type checkbox + text and/or number based on the key-value
 *   pair types in a given object in the array of objects passed in props.
 *   Uses a second JSON array of objects to fetch the user-friendly label name for each option's
 *   funcationality.
 *   Creates a responsive grid with height of each <div> based on the <input>s needed.
 *
 */
const OptionsCheckboxArray = function buildCheckboxArray({options, labels, onChangeCheckbox, onChangeSelect, onChangeNumber}) 
{
  const optArray = [];
  let keys = [];
  let num_keys = 0;
  let keyname = "";
  let objLabel = {};

  /* Iterates (maps) over the options object array, using each object to 
  * build a <span> containing all checkbox elements which depend on the type of
  * option object
  * */
  options.map((objOption, index) => {
    keys = Object.keys(objOption); // Get an array of keys for value reference use
    num_keys = keys.length; 
    keyname = keys[0]; // Stores the current option key (name) for convenience
    objLabel = labels[index]; // Get the current label object, w/ index same as options[]

    /* Create a checkbox for each option, regardless of type */
    optArray.push(
      <div key={index} className={styles.divCheckbox}>
        <span key={index}>
          <input
            type="checkbox"
            id={`chk-${keyname}`}
            name={`${keyname}`}
            value={`${keyname}`}
            checked={objOption[keyname] ? "checked" : ""}
            onChange={(e) => onChangeCheckbox(e, index)}
          />
          <label htmlFor={`chk-${keyname}`}>{objLabel[keyname]}</label>
        </span>
        {
          // Adds additional checkbox group inputs (<select>, <input>, etc.) 
          // per the type of option (option object) being displayed
          (num_keys > 1) && (OPT_KEYS_LIGHTDARK.includes(keyname)) && 
          (
            <>
                <span>
                  <label htmlFor={`${keys[1]}`}>{`${keys[1]}`}: </label>
                  <select
                    defaultValue={`${objOption[keys[1]]}`}
                    id={`${keys[1]}`}
                    name={`${keys[1]}`}
                    onChange={(e) => onChangeSelect(e, index)}
                  >
                  {
                    LIGHTDARK_MODES.map((mode, i) => {
                      return (
                        <option value={`${mode}`} key={i}>
                          {`${mode}`}
                        </option>
                        )
                    })
                  }
                  </select>
                </span>
                <span>
                  <label htmlFor={`${keys[2]}`}>{`${keys[2]}`}: </label>
                  <input
                    type="number" min="0" max="100"
                    id={`${keys[2]}`}
                    name={`${keys[2]}`}
                    value={`${objOption[keys[2]]}`}
                    onChange={(e) => onChangeNumber(e, index)}
                  />
                </span>
              </>
          )
        }
        {
          (num_keys > 1) && (OPT_KEYS_COLORSWAP.includes(keyname)) && 
          (
            <span>
              <label htmlFor={`${keys[1]}`}>{`${keys[1]}`}: </label>
              <select
                defaultValue={`${objOption[keys[1]]}`}
                id={`${keys[1]}`}
                name={`${keys[1]}`}
                onChange={(e) => onChangeSelect(e,index, `${keys[1]}`)}
              >
                {
                    COLORSWAP_ORDERS.map((order, i) => {
                      return (
                        <option value={`${order}`} key={i}>
                          {`${COLORSWAP_ORDER_LABELS[order]}`}
                        </option>
                        )
                    })
                  }              
              </select>
            </span>            
          )

        }
      </div>
    );

  });

  return optArray; // Return the array of option element groups to be rendered
}

/*   Component function: Creates a grid of checkboxes based on a JS file containing
 *   a object of key-value pairs for functional options the user can
 *   select. Sets boxes as default where indicated as already selected in the
 *   object. (I.e., "true")
 */
function OptionCheckboxes({ options, labels, onChangeCheckbox, onChangeSelect, onChangeNumber, children }) {

  return (
    /* Parent container for the option groups to be rendered */
    <div className={styles.optionCheckboxes} id="div-checkbox-cont">
      {
        // Map a <div> child + option field group for each array object
           <OptionsCheckboxArray options={options} labels={labels} onChangeCheckbox={onChangeCheckbox} 
              onChangeSelect={onChangeSelect} onChangeNumber={onChangeNumber}
           />
      }
      { children }
    </div> // <div> "div-checkbox-cont"
  );
}

export default OptionCheckboxes;