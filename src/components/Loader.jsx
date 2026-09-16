import styles from "./Loader.module.css";


function Loader() {
    return (
        <div className={ styles.loader }>
            <div id="div-loader"></div>
        </div>
    )
}

export default Loader;
