import { HiOutlineTrash } from "react-icons/hi";
import styles from "./DeleteIcon.module.css";
import { BsHandIndexFill } from "react-icons/bs";


function DeleteIcon({ onClick, index }) {
    return (
        <div className={styles.deleteIcon} onClick={(e) => onClick(e, index)}>
            <HiOutlineTrash/>
        </div>
    )
}

export default DeleteIcon;
