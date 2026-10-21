import { useEffect, useRef, useState} from "react";
import Button from "./Button";
import styles from "./MultiFileInput.module.css";
import { HiOutlineFolder } from "react-icons/hi";
import DeleteIcon from "./DeleteIcon";
import { apiMultipartRequest } from "../services/apiMultipartRequest";
import { URL_HTTPBIN } from "../data/urls";
import Loader from "./Loader";

const MAX_FILECOUNT = 5;
const MAX_CHAR_COUNT = 44;
const MAX_CHAR_COUNT_RESPONSIVE = 12;


function MultiFileInput({ accept = "image/*", jsonData}) {
    const [fileList, setFileList] = useState([]);
    let fileCountRef = useRef(0);
    const inputRef = useRef(null); // used for relating the <div> click event to the hidden <input> element
    const [ dropZoneDragover, setDropZoneDragover] = useState(false);
    const [error, setError] = useState(null);
    const [data, setData] = useState(null);
    const [isLoading, setIsLoading] = useState(false);
    const [dataReady, setDataRead] = useState(false);
    

    useEffect(() => {
        console.log("fileList:", fileList);
        // console.log("fileCountRef:", fileCountRef);
        // console.log("dropZoneDragover:", dropZoneDragover);
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
    function handleFileAdd(e) {
        const newFilesArray = Array.from(e.target.files);
        let tempArray = [];
        const filesRemaining = MAX_FILECOUNT - fileCountRef.current;
        // Return if no fileList capacity is remanining
        if (filesRemaining === 0) return;

        tempArray = newFilesArray.slice(0, filesRemaining);
        setFileList((currentFileList) => [...currentFileList, ...tempArray]);
    }


    // Handles the on-click deletion of a file from fileList via garbage can icon
    function handleDelete(e, index) {
        const newFilesArray = fileList.filter((file,i) => {
            if(i != index) return file;
        });

        fileCountRef.current = newFilesArray.length;

        setFileList([...newFilesArray]);
    }


    // Sets "dragOver" state flag used for UI drop zone <div> styling effect
    function handleDragOver(e) {
        e.preventDefault();
        // If not already set, set true; else, ignore
        if(!dropZoneDragover) setDropZoneDragover((val) => val = true);
    }
    

    // Clears the dragover state flag when leaving the <div>
    function handleDragLeave(e) {
        e.preventDefault();
        setDropZoneDragover((val) => val = false);
    }


    // When a drag-and-drop occurrs, adds additional files to the file list if space is
    // available
    function handleFileDrop(e) {
        e.preventDefault();

        const newFilesArray = Array.from(e.dataTransfer.files);

        // Return if the file queue count doesn't have enough remaning file count "slots"
        if( (MAX_FILECOUNT - fileCountRef.current) < newFilesArray.length) {
            console.log("** Not enough file slots remaining**");
            return;
        }

        // Update current file count and the file list array
        fileCountRef.current += newFilesArray.length;
        setFileList((currentFileList) => [...currentFileList, ...newFilesArray]);        
    }


    // Handles a click on the div, "redirecting" it by activating an event
    // on the <input> element to trigger file picker activity
    function handleDropzoneClick() {
        // console.log("DrZoneClick");
        inputRef.current?.click();
    }


    // Convert the files array back to an instance of FileList using DataTransfer()
    function getFileList() {
        const dataTransfer = new DataTransfer();
        fileList.forEach((file) => dataTransfer.items.add(file));
        return dataTransfer.files;  // Returns a FileList
    }


    // =====================================================================
    /*  Handles file list upload click (button submission) POST request and
    *   response
    */
   async function handleUploadClick() {
       // Don't make send formData & request is the file list is empty
        if(!fileList.length) {
           console.log("**fileList empty");
           return;
        }
        
        // get the current array of files and convert to a FileList
        const filesAsFileList = getFileList();
        let data = null;
        
        console.log("Uploading", fileList);
        
        // Create a new FormData object and append files
        const formData = new FormData();
        Array.from(filesAsFileList).forEach((file) => {
            formData.append("files", file);
    });
        // const formDataArray = Array.from(formData.entries());

        // console.log("formData:", formDataArray);

        // set isLoading flag & Upload to the server via fetch API
        setIsLoading(true);

        try {
            data = await apiMultipartRequest(URL_HTTPBIN, jsonData, formData);
            // Upon a successful promise/fetch & response, store the data
            // reset the file list
            setData(data);
            setFileList([]);
            alert("Upload successful");
        }
        catch(err) {
            console.log("Err:", err.message);
            setError(err.message);
            setData(null);

        } finally {
            setIsLoading(false);
        }
        
        if(data) {
            console.log("Data:", data);
        }
   }
   
        // =====================================================================
            
    return (
        <>
        {
            isLoading ? (
                <Loader/>
            ) : 
            (
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
                    <div 
                        className={`${styles.dropZone} ${dropZoneDragover ? styles.dragOver : styles.dropZoneDefault }`}
                        onDragOver={handleDragOver}
                        // onDragEnter={handleDragStart}
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
                            onChange={handleFileAdd}
                        ></input>
                    </div>
                    <div className={styles.buttonContainer}>
                        <Button onClick={handleUploadClick} type="danger">Upload ⬆</Button>
                    </div>   
                </div>
            )
        }
        </>
    )
}

export default MultiFileInput;
