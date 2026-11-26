import PageNav from "../components/PageNav";
import Footer from "../components/Footer";
import shared from "./sharedPageStyles.module.css";
import styles from "./API.module.css";
import "../styling/code.css";

import KeyEmailForm from "../components/KeyEmailForm";
import { useDarkMode } from "../context/DarkModeContext";
import { useState, useEffect } from "react";
import { validateEmail } from "../utilities/validate_email";
import { FROM_ADDRESS, SITE_NAME, SITE_URL_HTTP } from "../data/colorswap";
import { HiInformationCircle } from "react-icons/hi";
import { NavLink } from "react-router";
import CodeBox from "../components/CodeBox";
import { 
    checkAPIKeyExample, 
    checkAPIKeyResponse, 
    testMessageEndpoint, 
    testMessageTemplate,
    activateKeyUrl, activateKeyUrlResponse,
    optionsJSON,
    optionsTestUrl,
    optionsTestResponse,
    fileUploadUrl,
    simpleOptionsExample,
    codeExample1, codeExample2, codeExample3,
    codeExampleInput,
} from "../data/api_string_templates";
import Button from "../components/Button";
import Label from "../components/Label";

function API() {
    const [message, setMessage] = useState("");
    const [error, setError] = useState("");
    const [showHide, setShowHide] = useState(false);
    const { isDarkMode } = useDarkMode();

    const classLightDark = isDarkMode ? shared.linkDark : shared.linkLight;


    // const DUMMY_KEY = "af5j01khv";

    // const email_html = 
    // `<p>Here is your key: ${DUMMY_KEY}</p>` +
    // "<p>Please append it to all your API requests. (Key is not case sensitive)</p>" + 
    // `<p>Example: http://colorswap.site/api/upload/file/&apikey=${DUMMY_KEY}</p>` +
    // `<p>Click the following URL to activate your key: <a href=${SITE_URL_HTTP}/>${SITE_URL_HTTP}</a></p>` +
    // "<p><em><small>If you did not make this request please disregard this email.</small></em></p>";


    const email_params = {
        from: `${SITE_NAME} <${FROM_ADDRESS}>`,
        to: "",
        subject: "Your API key",
        html: " ",
        // text: "" // Not required as Resend will derive the text field from html strings
    };

    useEffect(() => {
 
    }, []);

    function handleShowJSON(e) {
        e.preventDefault();

        setShowHide(!showHide);
    }

    async function handleSubmit(e) {
        e.preventDefault();
        // console.log(e.target[0].value)
        // console.log(e.target.elements.email.value)
        // console.log(e.target.email.value)
        const email = e.target.email.value;
        if(!email) return;

        if(!validateEmail(email)) {
            setMessage("Invalid email address. Please re-enter.");
            console.log("Email val. failed");
            return;
        }
        // Set user email address for sending to:
        // email_params.to = email;
        // POST email parameters to api/send endpoint to validate &
        // trigger a send via Resend API service
        try{
            fetch('/api/get-apikey', {
                method: "POST",
                headers: {
                    "Content-Type": "application/json"
                },
                body: JSON.stringify({ email: email})
            })
            .then(res => res.json())
            .then(data => setMessage(data.email_status))

        } catch(err) {
            console.log("Err:", err.message);
            setError(err.message);
        }
        // Clear the input field
        e.target.email.value = "";
    };

    // const div_color = message ? "green" : "red" ;

    return (
        <div id="div-parent-layout" className={shared.parentDiv}>
            <PageNav/>
            <div className={`${styles.api} ${shared.sharedPage}`}>
                <section>
                    <h1>API access</h1>
                    {/* <div style={{backgroundColor:`${div_color}`, width: "100%", padding: "1rem"}}>
                        /api/message: {message ? message : "NO DATA"}
                    </div> */}
                    <p >
                        Interested in batch processing files to change color code formats yourself? Use the ColorSwap
                        API to send & received your own processed files. (Basic color code operations are explained on the&nbsp; 
                        <NavLink className={classLightDark} to={`/how-to`} >How to</NavLink> page.)
                    </p>
                    <h2>You'll need to get an API key to use the ColorSwap API. 🗝️</h2>
                    <KeyEmailForm 
                        formTitle="Receive an API key by email" 
                        labelText="Email address:"
                        onSubmit={handleSubmit}
                    />
                    {   /* Display a message box to verify email status/show error(s) */
                        message && (
                        <div className={styles.emailStatus}>
                            <HiInformationCircle/> { message }
                        </div>)
                    }
                    <p className={styles.tipText}>
                        <strong>Tip: </strong>Lost your API key? Submit your email address again to receive a new key.
                    </p>
                    <hr className={shared.basic}/>
                </section>
                <section>
                    <h2>How to use the ColorSwap API</h2>
                    <h3>Verifying you can receive data [<Label>GET</Label> request]</h3>
                    <p>
                        Verify you can receive data from the API endpoint(s) by using this URL (no key required) (GET request):
                    </p>
                    <p>
                        <code>{testMessageEndpoint}</code>
                    </p>
                    <p>Response:</p>
                    <CodeBox>{testMessageTemplate}</CodeBox>
                    <h3>Verifying an API key [<Label>GET</Label> request]</h3>
                    <p>You can check the validity of an API key by passing the 8-character key (case insensitive) here:</p>
                    <p><code>{checkAPIKeyExample}</code> with a response similar to this:</p>
                    <CodeBox>{checkAPIKeyResponse}</CodeBox>
                    <p>( Note that the key is <strong>not</strong> case sensitive.)</p>
                    <h3>Manually activating an API key (optional) [<Label>GET</Label> request]</h3>
                    <p>You should receive a clickable link by email to activate your API key. Optionally, you can do so here as well.</p>
                    <p><code>{activateKeyUrl}</code></p>
                    <p>Response:</p>
                    <CodeBox>{activateKeyUrlResponse}</CodeBox>                    
                    <hr className={shared.basic}/>
                    <h3>Sending files & color options to the API for color operations</h3>
                    <p>Use the follow URL for file API operations: <code>{fileUploadUrl}</code></p>
                    <p>
                        In order to process files, you'll to do 3 things in a <Label type="danger">POST</Label> request:
                        <ol>
                            <li>Pass the API key as a parameter in the URL. I.e., <code>../api/upload/files?apikey=0abcdef1</code></li>
                            <li> Provide JSON format color options desired (minimum of 1) in the request body.</li>
                            <li>One or more files, sent as a <code>{`<form>`}</code> attachment.</li>
                        </ol>
                        Each option desired should be set to "true" in order to be executed.
                    </p>
                    <p>A fully populated JSON example is here: <em>(Click to view)</em></p>
                    <Button 
                        onClick={handleShowJSON}
                        type={showHide ? "inactive" : "success"}
                    >
                            {showHide ? "Hide options JSON" : "Show options JSON" }
                    </Button>
                    { 
                        showHide && (
                            <CodeBox>{optionsJSON}</CodeBox>                                    
                        )
                    }
                    <p>Each color code operation set to "true" will be executed. Unused color functions can be set to "false" or completely removed.</p>
                    <p>For example, send the following to convert hex color codes to RGB format in one or more attached files:</p>
                    <CodeBox>{simpleOptionsExample}</CodeBox>                                    
                    <h3>Test sending JSON options to the API</h3>
                    <p>You can validate your options JSON data by sending stringified JSON in the HTTP <Label type="danger">POST</Label> body to the following URL:</p>
                    <p><code>{optionsTestUrl}</code>  (No API key required)</p>
                    <p>Response:</p>
                    <CodeBox>{optionsTestResponse}</CodeBox>
                    <h3>Code examples for API use</h3>
                    <h4>Using fetch function with body payload objects</h4>
                    <p>
                        You can make an API request with the required JSON options payload and 1+ files containing color codes to be processed using the code example below.
                    </p>
                    <p>
                        <em>(Note: Javascript is shown here, with data stored using React JS <code>useState()</code> & <code>useRef()</code> hooks. You can simply replace these with your own standard JS variables as needed.)
                        </em>
                    </p>
                    <CodeBox>{codeExample1}</CodeBox>
                    <p>Uploading & adding files to an HTTP request body can be done in several ways. Files can be added to a <code>formData()</code> object as an array.</p>
                    <p>For example, let's assume you have an "Add files" button with an <code>onClick()</code> event handler <code>handleButton()</code></p>
                    <p>Create a hidden <code>{`<input>`}</code> element which can be used to trigger the operating system's file selection prompt:</p>
                    <CodeBox>{codeExampleInput}</CodeBox>
                    <p>Then handle the button click event, which manually triggers the hidden input element's event handler:
                    </p>
                    <CodeBox>{codeExample2}</CodeBox>
                    <p>And finally, let's assume you have an "Upload files" button. You can create an API request of type POST containing your API key, color code options (JSON), and the selected files like so:</p>
                    <CodeBox>{codeExample3}</CodeBox>
                </section>  
            </div>
            <Footer/>
        </div>
    )
}

export default API;
