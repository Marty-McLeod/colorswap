import { ChangeEvent, useEffect, useRef, useState} from "react";
import Button from "./Button";
import styles from "./MultiFileInput.module.css";
import { HiFolder, HiOutlineFolder, HiOutlineTrash } from "react-icons/hi";
import DeleteIcon from "./DeleteIcon";

const URL_HTTPBIN = "https://httpbin.org/post";
const MAX_FILECOUNT = 5;
const MAX_CHAR_COUNT = 20;

function MultiFileInput({ accept = "image/*"}) {
    const [fileList, setFileList] = useState([]);
    let fileCountRef = useRef(0);
    const fileInputRef = useRef();


    useEffect(() => {
        console.log("fileList:", fileList);
        console.log("fileCountRef:", fileCountRef);
    },[fileList]);

    // Get new files just added (if present) and add to the current files
    // after array conversion from FileList
    function handleFileChange(e) {
        const newFilesArray = Array.from(e.target.files);
        
        fileCountRef.current += newFilesArray.length;
        setFileList((currentFileList) => [...currentFileList, ...newFilesArray]);
    }

    function handleDelete(e, index) {
        const newFilesArray = fileList.filter((file,i) => {
            if(i != index) return file;
        })

        console.log("index:", index);

        fileCountRef.current = newFilesArray.length;

        setFileList([...newFilesArray]);
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

    function handleImageUploadClick() {
        fileInputRef.current?.click();
    }


    // Convert the files array back to an instance of FileList using DataTransfer()
    function getFileList() {
        const dataTransfer = new DataTransfer();
        fileList.forEach((file) => dataTransfer.items.add(file));
        return dataTransfer.files;  // Returns a FileList
    }

    function truncateString(str, maxLength) {
        if (str.length > maxLength) {
            return str.substring(0, maxLength) + '…';
        }
        return str;
    }

    // Handles the Upload button activity
    function handleUploadClick() {
        if(!fileList) return;

        // get the current array of files and convert to a FileList
        const filesAsFileList = getFileList();

        console.log("Uploading", fileList);

        // Create a new FormData object and append files
        const formData = new FormData();
        Array.from(filesAsFileList).forEach((file) => formData.append("files", file));

        // Upload to the server via fetch API
        fetch(URL_HTTPBIN, {
            method: "POST",
            body: formData,
        })
            .then((res) => res.json())
            .then((data) => console.log(data))
            .catch((err) => console.error(err));        
    }


    return (
        <div className={styles.container}>
            <h3>{fileCountRef.current} of {MAX_FILECOUNT} uploaded</h3>
            <ul>
                {
                    fileList.map((file, index) => (
                        <li key={index}>
                            <span className={styles.fileType}>
                                <HiOutlineFolder className={styles.iconFolder}/>{file.name.split('.')[1]}
                            </span>
                            <span className={styles.fill}></span>
                            <span>{truncateString(file.name, MAX_CHAR_COUNT)}</span>
                            <DeleteIcon onClick={handleDelete} index={index}/>
                        </li>
                    ))
                }
            </ul>
            {/* <input id="input-file" multiple type="file" onChange={handleFileChange}></input> */}
            <div
                className={styles.dropZone}
                onDragOver={handleDragOver}
                onDrop={handleFileDrop}
                onClick={handleImageUploadClick}
            >
                <span className={styles.desktopUploadText}>
                    Drag and drop here or click to upload
                </span>
                <span className={styles.mobileUploadText}>Click to upload here</span>
                <input
                    ref={fileInputRef}  
                    type="file"
                    accept={accept}
                    style={{ display: "none"}}
                    onChange={handleFileChange}
                ></input>
            </div>

            <Button onClick={handleUploadClick} type="danger">Upload ⬆</Button>
        </div>
    )
}

export default MultiFileInput;
