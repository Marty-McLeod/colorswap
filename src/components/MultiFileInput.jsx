import { ChangeEvent, useState} from "react";
import Button from "./Button";
import styles from "./MultiFileInput.module.css";

const URL_HTTPBIN = "https://httpbin.org/post";

function MultiFileInput() {
    const [fileList, setFileList] = useState(FileList | null);

    function handleFileChange(e) {
        setFileList(e.target.files);
    }

    function handleUploadClick() {
        if(!fileList) return;

        // Create a new FormData object and append files
        const data = new FormData();
        
        files.forEach((file, i) => {
            data.append(`file-${i}`, file, file.name);
        });

        // Upload to the server via fetch API
        fetch(URL_HTTPBIN, {
            method: "POST",
            body: data,
        })
            .then((res) => res.json())
            .then((data) => console.log(data))
            .catch((err) => console.error(err));        
    }

    // "fileList" is not an array but however is an iterable; let's spread the values
    // to get a true array of files
    const files = fileList ? [...fileList] : [];

    return (
        <div className={styles.container}>
            <label htmlFor="input-file">File input</label>
            <input id="input-file" type="file" onChange={handleFileChange}/>
            <ul>
                {
                    files.map((file, i) => {
                        <li key={i}>
                            {file.name} - {file.type}
                        </li>
                    })
                }
            </ul>
            <Button onClick={handleUploadClick} type="danger">Upload ⬆</Button>
        </div>
    )
}

export default MultiFileInput;
