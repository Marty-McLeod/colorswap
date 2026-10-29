import styles from "./KeyEmailForm.module.css";
import Button from "./Button";



function KeyEmailForm({ formTitle, labelText, onSubmit }) {
    return (
            <form className={styles.keyEmailForm} onSubmit={onSubmit}>
                <h3>{ formTitle }</h3>
                <div id={styles.emailGroup}>
                    <label htmlFor="input-email">{ labelText }</label>
                    <input type="email" id="input-email" name="email"/>
                </div>
                <div id={styles.submitButton}>
                    <Button 
                        type={"submit"}
                    >
                        Get API key
                    </Button>
                </div>
            </form>            
    )
}

export default KeyEmailForm;
