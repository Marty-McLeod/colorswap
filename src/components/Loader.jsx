import styles from "./Loader.module.css";

/*  
    Creates a loading ("wait") animation of 3 vertical colored bars with a slight blur.
*/
function Loader() {
    return (
        <div className={ styles.loader }>
            <div id="div-loader"></div>
        </div>
    )
}

export default Loader;
