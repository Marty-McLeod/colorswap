import { useEffect, useRef, useState} from "react";
import Button from "./Button";
import styles from "./MultiFileInput.module.css";
import { HiOutlineFolder } from "react-icons/hi";
import DeleteIcon from "./DeleteIcon";

const URL_HTTPBIN = "https://httpbin.org/post";
const MAX_FILECOUNT = 5;
const MAX_CHAR_COUNT = 44;
const MAX_CHAR_COUNT_RESPONSIVE = 12;


function MultiFileInput({ accept = "image/*"}) {
    const [fileList, setFileList] = useState([]);
    let fileCountRef = useRef(0);
    const inputRef = useRef(null); // used for relating the <div> click event to the hidden <input> element
    const [ dropZoneDragover, setDropZoneDragover] = useState(false);

    useEffect(() => {
        console.log("fileList:", fileList);
        console.log("fileCountRef:", fileCountRef);
        console.log("dropZoneDragover:", dropZoneDragover);
    },[fileList, dropZoneDragover]);

    // Formats file name text when a file is added to the fileList array
    // for display purposes
    function truncateString(str, maxLength) {
        if (str.length > maxLength) {
            return str.substring(0, maxLength) + '…';
        } else { 
            return str; 
        }

    }

    // Get new files just added (if present) and add to the current files
    // after array conversion from FileList
    function handleFileChange(e) {
        const newFilesArray = Array.from(e.target.files);
        let tempArray = [];
        let filesRemaining = 0;

        filesRemaining = MAX_FILECOUNT - fileCountRef.current;
        
        if (filesRemaining === 0) return;
        tempArray = newFilesArray.slice(0, filesRemaining);

        // fileCountRef.current += newFilesArray.length;

        setFileList((currentFileList) => [...currentFileList, ...tempArray]);
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
    
    function handleDragStart(e) {
        e.preventDefault();
        console.log("onDragStart");
        setDropZoneDragover((val) => val = true);
    }

    function handleDragLeave(e) {
        e.preventDefault();
        setDropZoneDragover((val) => val = false);
        console.log("onDragLeave");
    }

    function handleFileDrop(e) {
        e.preventDefault();

        const newFilesArray = Array.from(e.dataTransfer.files);

        // Return if the file queue count doesn't have enought remaning file count "slots"
        if(MAX_FILECOUNT - fileCountRef.current < newFilesArray.length) {
            console.log("** Not enough file slots remaining**");
            return;
        }

        // Update current file # count and the file list array
        fileCountRef.current += newFilesArray.length;
        setFileList((currentFileList) => [...currentFileList, ...newFilesArray]);        
    }

    // Handles a click on the div, "redirecting" it by activating an event
    // on the <input> element to trigger file picker activity
    function handleDropzoneClick() {
        inputRef.current?.click();
    }


    // Convert the files array back to an instance of FileList using DataTransfer()
    function getFileList() {
        const dataTransfer = new DataTransfer();
        fileList.forEach((file) => dataTransfer.items.add(file));
        return dataTransfer.files;  // Returns a FileList
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
                            <div className={styles.fileType}>
                                <HiOutlineFolder className={styles.iconFolder}/>
                                {file.name.split('.')[1]}
                            </div>
                            <div className={styles.fileNameLarge}>{ truncateString(file.name, MAX_CHAR_COUNT) }</div>
                            <div className={styles.fileNameMobile}>{ truncateString(file.name, MAX_CHAR_COUNT_RESPONSIVE) }</div>
                            <span className={styles.fill}></span>
                            <DeleteIcon onClick={handleDelete} index={index}/>
                        </li>
                    ))
                }
            </ul>
            {/* <input id="input-file" multiple type="file" onChange={handleFileChange}></input> */}
            <h3>dropZoneDragover: {dropZoneDragover ? "true" : "false"}</h3>
            <div 
                className={`${styles.dropZone} ${dropZoneDragover ? styles.dragOver : styles.dropZoneDefault }`}
                onDragOver={handleDragOver}
                onDrag={handleDragStart}
                onDragLeave={handleDragLeave}
                onDrop={handleFileDrop}
                onClick={handleDropzoneClick}
                draggable="true"
            >
                <span className={styles.desktopUploadText}>
                    Drag & drop here or click to upload
                </span>
                <span className={styles.mobileUploadText}>Click to upload here</span>
                <input
                    ref={inputRef}  // Acts as the teh 'target' for the drop zone <div> click
                    type="file"
                    accept={accept}
                    style={{ display: "none"}}
                    onChange={handleFileChange}
                ></input>
            </div>
            <div className={styles.buttonContainer}>
                <Button onClick={handleUploadClick} type="danger">Upload ⬆</Button>
            </div>   
        </div>
    )
}

export default MultiFileInput;
