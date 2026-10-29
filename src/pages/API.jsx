import PageNav from "../components/PageNav";
import Footer from "../components/Footer";
import shared from "./sharedPageStyles.module.css";
import styles from "./API.module.css";
import KeyEmailForm from "../components/KeyEmailForm";
import { useState, useEffect } from "react";
import { validateEmail } from "../utilities/validate_email";
import { FROM_ADDRESS, SITE_NAME, SITE_URL_HTTP } from "../data/colorswap";


function API() {
    const [message, setMessage] = useState("");
    const DUMMY_KEY = "af5j01khv";

    const email_html = 
    `<p>Here is your key: ${DUMMY_KEY}</p>` +
    "<p>Please append it to all your API requests. (Key is not case sensitive)</p>" + 
    `<p>Example: http://colorswap.site/api/upload/file/&apikey=${DUMMY_KEY}</p>` +
    `<p>Click the following URL to activate your key: <a href=${SITE_URL_HTTP}/>${SITE_URL_HTTP}</a></p>` +
    "<p><em><small>If you did not make this request please disregard this email.</small></em></p>";


    const email_params = {
        from: `${SITE_NAME} <${FROM_ADDRESS}>`,
        to: "",
        subject: "Your API key",
        html: email_html,
        // text: "" // Not required as Resend will derive the text field from html strings
    };

    useEffect(() => {
 
    }, []);


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
        email_params.to = email;
        // POST email parameters to api/send endpoint to validate &
        // trigger a send via Resend API service
        try{
            fetch('/api/send', {
                method: "POST",
                headers: {
                    "Content-Type": "application/json"
                },
                body: JSON.stringify(email_params)
            })
                .then(res => res.json())
                .then(data => setMessage(data.email_status));
                console.log("Data:", message);

        } catch(err) {
            console.log("Err:", err.message);
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
                    <h2>You'll need to get an API key to use the ColorSwap API. 🗝️😊</h2>
                    <p>
                        <em>(This is a basic security measure to prevent abuse from bots & other devious characters.)</em>
                    </p>
                    <KeyEmailForm 
                        formTitle="Receive an API key by email" 
                        labelText="Email address:"
                        onSubmit={handleSubmit}
                    />
                    {
                        message && (<h3 className={styles.emailStatus}>
                            *{ message }*
                        </h3>)
                    }
                    <hr className={shared.basic}/>
                </section>
                <section>
                    <h2>How to use the ColorSwap API</h2>
                    <p>

                    </p>    
                </section>  
            </div>
            <Footer/>
        </div>
    )
}

export default API;
