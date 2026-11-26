import styles from "./ImgResp.module.css";

/* Renders one of two images passed depending on the mobile/large
    screen condition. Component props are images passed directly,
    NOT paths.

    I.e., images imported as "import myImage '../assets/my-image.jpg' "
    If no mobile image is defined, uses the default image for both.
*/
function ImgResp( { imageDefault, imageMobile }) {
    
    // const mobileStyle = imageMobile ? styles.imageMobile : style.imageDefault;
    const mobileSrc = imageMobile ? imageMobile : imageDefault;
    return (
        <>
            <img className={styles.imageDefault} src={imageDefault} />
            <img className={styles.imageMobile} src={mobileSrc} />
        </>
    )
}

export default ImgResp;