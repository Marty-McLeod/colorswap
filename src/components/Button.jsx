import styles from "./sharedButtonStyles.module.css";

function Button({ onClick, children, type="success"}) {
    let styleVal = "";
    let typeVal = "";

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
        case "submit":
            styleVal = styles.submit;
            typeVal = "submit";
            break;
    }

    return (
        <button type={`${typeVal}`} className={styleVal} onClick={onClick}>
            { children }
        </button>
    )
}

export default Button;
