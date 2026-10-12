import styles from "./Toggle.module.css";

/* Creates a responive toggle slider with 2 body styles:
    1. Rounded (defualt)
    2. Square-edged
*/
function Toggle({ onChange, checkVal=false, children, rounded=true }) {

    return (
        <div className={styles.toggle}>
            <span>
                <label className={styles.switch}>
                <input 
                    name="toggle"
                    type="checkbox"  
                    onChange={onChange}
                    checked={checkVal ? "checked" : ""}
                >
                </input>
                    {/* // returns a rounded body style if true; else, square is used */}
                    <span className={`${styles.slider} ${ rounded ? styles.round : ""}`}></span>
                </label>
            </span>
            <p>{ children }</p>  
        </div>
    )
}

export default Toggle;
