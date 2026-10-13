import styles from "./sharedButtonStyles.module.css";

function Button({ onClick, children, type="success"}) {
    let typeVal = "";
    
    switch(type) {
        case "success":
        default:
            typeVal = styles.success;
            break;
        case "primary": 
            typeVal = styles.primary;
            break;
        case "warning": 
            typeVal = styles.warning;
            break;
        case "danger":
            typeVal = styles.danger;
            break;
    }

    return (
        <button className={typeVal} onClick={onClick} >
            { children }
        </button>
    )
}

export default Button;
