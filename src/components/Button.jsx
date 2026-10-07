import styles from "./sharedButtonStyles.module.css";

function Button({ onClick, children }) {
    return (
        <button className={styles.primary} onClick={onClick} >
            { children }
        </button>
    )
}

export default Button;
