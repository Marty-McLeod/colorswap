import styles from "./CodeBox.module.css";

/*  Custom "box" for displaying code snippets inline, formatted
    to work with the dark mode context (CSS color variables)
*/
function CodeBox({ children }) {
    return (
        <div className={styles.codeBox}>
            <pre>{children}</pre>
        </div>
    )
}

export default CodeBox;
