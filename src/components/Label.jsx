import styles from "./Label.module.css";


/*  Returns a label with colored background to highlight text, etc. */
function Label({ children, type="primary" }) {
    let styleVal = "";

    switch(type) {
        case "success":
        default:
            styleVal = styles.success;
            break;
        case "primary": 
            styleVal = styles.primary;
            break;
        case "warning": 
            styleVal = styles.warning;
            break;
        case "danger":
            styleVal = styles.danger;
            break;
        case "inactive":
            styleVal = styles.inactive;
            break;
    }

    return (
        <span className={`styles.label ${styleVal}`}>{children}</span>
    )
}

export default Label;
