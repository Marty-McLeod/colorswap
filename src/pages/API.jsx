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
import { 
    checkAPIKeyExample, 
    checkAPIKeyResponse, 
    testMessageEndpoint, 
    testMessageTemplate,
    activateKeyUrl, activateKeyUrlResponse,
    optionsJSON,
    optionsTestUrl,
    optionsTestResponse,
} from "../data/api_string_templates";
import Button from "../components/Button";

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
                    <h3>Verifying you can receive data [GET request]</h3>
                    <p>
                        Verify you can receive data from the API endpoint(s) by using this URL (no key required) (GET request):
                    </p>
                    <p>
                        <code>{testMessageEndpoint}</code>
                    </p>
                    <p>Response:</p>
                    <div className={shared.alignLeft}>
                        <pre>
                            <code>
                                {testMessageTemplate}
                            </code>
                        </pre>
                    </div>                    
                    <h3>Verifying an API key [GET request]</h3>
                    <p>You can check the validity of an API key using the following endpoint & parameters:</p>
                    <p><code>{checkAPIKeyExample}</code> with a response similar to this:</p>
                    <div className={shared.alignLeft}>
                        <pre><code>{checkAPIKeyResponse}</code></pre>
                    </div>
                    <p>( Note that the key is <strong>not</strong> case sensitive.)</p>
                    <h3>Manually activating an API key (optional) [GET request]</h3>
                    <p>You should receive a clickable link by email to activate your API key. Optionally, you can do so here as well.</p>
                    <p><code>{activateKeyUrl}</code></p>
                    <p>Response:</p>
                    <div className={shared.alignLeft}>
                        <pre><code>{activateKeyUrlResponse}</code></pre>
                    </div>
                    <hr className={shared.basic}/>
                    <h3>Sending files & color options to the API</h3>
                    <p>
                        In order to process files, send color options and files to be processed in the HTTP message body of a POST request. Send the following:
                        <ul>
                            <li>API key as a parameter in the URL path (see above).</li>
                            <li>(body) JSON format color options: an array containing one or more options.</li>
                            <li>(body) One or more files, sent as a <code>{`<form>`}</code> attachment.</li>
                        </ul>
                        Each option desired should be set to "true" in order to be executed.
                    </p>
                    <p><strong>Click the show/hide button to display the full color options JSON format</strong></p>
                    <Button 
                        onClick={handleShowJSON}
                        type={showHide ? "inactive" : "success"}
                    >
                            {showHide ? "Hide JSON" : "Show JSON" }
                    </Button>
                    { 
                        showHide && (
                            <div className={shared.alignLeft}>
                                <pre><code>{optionsJSON}</code></pre>
                            </div>
                        )
                    }
                    <h3>Test sending JSON options to the API</h3>
                    <p>You can validate your options JSON data by sending stringified JSON in the HTTP POST body to the following URL:</p>
                    <p><code>{optionsTestUrl}</code>  (No API key required)</p>
                    <p>Response:</p>
                    <div className={shared.alignLeft}>
                        <pre><code>{optionsTestResponse}</code></pre>
                    </div>                    
                </section>  
            </div>
            <Footer/>
        </div>
    )
}

export default API;
