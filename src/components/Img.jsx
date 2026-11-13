import styles from "./Img.module.css";

/* Renders one of two images passed depending on the mobile/large
    screen condition. Component props are images passed directly,
    NOT paths.

    I.e., images imported as "import myImage '../assets/my-image.jpg' "
*/
function Img( { imageDefault, imageMobile }) {
    return (
        <>
            <img className={styles.imageDefault} src={imageDefault} />
            <img className={styles.imageMobile} src={imageMobile} />
        </>
    )
}

export default Img;

        // <>
        //     <div id="imageDefault" className={styles.image}>
        //         <img src={imageDefault} />
        //     </div>
        //     <div id="imageMobile" className={styles.image}>
        //         <img src={imageMobile} />
        //     </div>
        // </>