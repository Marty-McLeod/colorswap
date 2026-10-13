import { ChangeEvent, useRef, useState } from "react";
import styles from "./FileInput.module.css";



function FileInput({ accept = "image/*"}) {
    const [imageFile, setImageFile] = useState(File | null);
    const fileInputRef = useRef();

    function handleImageUploadClick() {
        fileInputRef.current?.click();
    }

    function updateImage(e) {
        if(e.target.files && e.target.files[0]) {
            const file = e.target.files[0];
            setImageFile(file);
        }
    }

    function handleDragOver(e) {
        e.preventDefault();
        console.log("onDragOver");
    }

    function handleFileDrop(e) {
        e.preventDefault();

        if(e.dataTransfer.files && e.dataTransfer.files[0]) {
            const file = e.dataTransfer.files[0];
            setImageFile(file);
        }
    }



    return (
        <div
            className={styles.dropZone}
            onDragOver={handleDragOver}
            onDrop={handleFileDrop}
            onClick={handleImageUploadClick}
        >
            {
                imageFile ? (
                    <img
                        src={URL.createObjectURL(imageFile)}
                        alt="Uploaded"
                        className={styles.uploadedImage}
                    />
                ) : (
                    <>
                        <span className={styles.desktopUploadText}>
                            Drag and drop here or click to upload
                        </span>
                        <span className={styles.mobileUploadText}>Click to upload here</span>
                    </>
                )
            }
            <input
                ref={fileInputRef}
                type="file"
                accept={accept}
                style={{ display: "none"}}
                onChange={updateImage}
            >
            </input>
        </div>
    );
}

export default FileInput;
