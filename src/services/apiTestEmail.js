// Default test email parameters as provided by Resend. T
const default_test_params = {
    from: "Acme <onboarding@resend.dev>",
    to: "delivered@resend.dev",
    subject: "Hello world!",
    html: "<p>This is a test message from route 'api/send'.</p>",
    // text: "" 
};

/*  Function to send a test email via the specified endpoint on the API/server side.
    Uses the Resend email SMTP service on that end, send here as a POST request
    with the email parameters.
*/
export async function apiTestEmail(email_params = default_test_params) {

  try{
      fetch('/api/send', {
          method: "POST",
          headers: {
              "Content-Type": "application/json"
          },
          body: JSON.stringify(email_params)
      })
          .then(res => res.json())

          return res.email_status;
  } catch(err) {
      return { email_status: err.message };
  }
};