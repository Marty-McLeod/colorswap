const baseAPIUrl = "https://colorswap.site/api";
const testMessageEndpoint = `${baseAPIUrl}/message`;
const testMessageTemplate = 
`{
    "message": "Hello from FastAPI & ColorSwap!"
}`;
const checkAPIKeyExample = `${baseAPIUrl}/check-apikey?apikey=af01ghzz`;
const checkAPIKeyResponse = 
`{ 
  "message":"API key is active",
  "api_key":"af01ghzz"
}`;
const activateKeyUrl = `${baseAPIUrl}/api/activate?apikey=af01ghzz`;
const activateKeyUrlResponse = 
`{
    "message": "User johnsmith@email.com API key af01ghzz now active for use."
}`;

const optionsJSON = 
`{
    "options": [
        { "hex_rgb": true }, 
        { "hex_hsl": false },
        { "name_hex": false },
        { "name_rgb": false },
        { "rgb_hsl": false },
        { "rgb_hex": false },
        { "hsl_hex": false },
        { "hsl_rgb": false },
        { "hsl_hsv": false },
        { "hsv_hsl": false },
        { "hsv_hex": false },
        { "hsv_rgb": false },
        { "lightdark_hex": false, "mode": "lighten", "percent": 10 },
        { "lightdark_rgb": false, "mode": "lighten", "percent": 10 },
        { "colorswap_hex": false, "order": "r_to_g" },
        { "colorswap_rgb": false, "order": "r_to_g" }   
    ]
}`;
const optionsTestUrl = `${baseAPIUrl}/upload/options`;
const optionsTestResponse = 
`{
  "received": {
    "options_payload": {
      "options": [
        {
          "hex_rgb": true
        },
        ...etc..
      ]
    }
  }
}`;


const fileUploadUrl = `${baseAPIUrl}/upload/files`;
const simpleOptionsExample =
`/*  Minimal request options payload to perform hex to RGB color
    code conversion
*/
{
    "options": [
        { "hex_rgb": true } 
    ]
}`;


const codeExample1 = 
`const URL = "https://colorswap.site/api/upload/files?apikey=";
const APIKEY = "a100bbff";
const optionsJSON = { "hex_rgb": true };

async function apiMultipartRequest(url, apikey, jsonData, formData ) {

  // Add json data to a new formData object, 
  // then append the existing (file list) object
  const bodyFormData = new FormData();

  // Adds JSON data as a stringified blob object
  bodyFormData.append(
    "metadata", 
    new Blob([JSON.stringify(jsonData)], 
    { type: "application/json"} )
  );

  // Adds existing file objects to the body formData object,
  // as key-value pairs
  // NOTE: Also ensures that only File objects are appended
  for (const [key,value] of formData.entries()) {
    if(value instanceof File || value instanceof Blob) {
      bodyFormData.append(key, value);
    }
  };

  try{
    const res = await fetch(\`\${url}\${apikey}\`, { 
      method: "POST",
      body: bodyFormData,
    }); 

    if (!res.ok) {
      throw new Error(\`API data request failed; status: \${res.status}\`);
    }

    // return data parsed as JSON
    return await res.json();
  } 

};`;

const codeExample2 = 
`(TBD)`;

const codeExample3 = 
`// =====================================================================
/*  Handles file list upload click (button submission) POST request and
*   response
*/
async function handleUploadClick() {
  // Ignore an upload click attempt if the file list is empty
  if(!fileList.length) {
      return;
  }
  
  // get the current array of files and convert to a FileList
  // To do so, use a DataTransfer() object and copy over each file
  // in the fileList
  const dataTransfer = new DataTransfer();
  fileList.forEach((file) => dataTransfer.items.add(file));
  const filesAsFileList = dataTransfer.files; // Returns a FileList

  let data = null;
  
  // Create a new FormData object and append files
  const formData = new FormData();
  // Iterate through files array and append each to the multi-part formData object
  Array.from(filesAsFileList).forEach((file) => {
      formData.append("files", file);
  });

  // Carry out an asynchronous POST request to the API
  try {
      data = await apiMultipartRequest(URL, API_KEY, optionsJSON, formData);
      // Upon a successful promise/fetch & response, store the data
      // & reset the file list
     file
  }
  catch(err) {
      console.log("Err:", err.message);
  }
};`;


export {
  testMessageEndpoint,
  testMessageTemplate,
  checkAPIKeyExample,
  checkAPIKeyResponse,
  activateKeyUrl, activateKeyUrlResponse,
  optionsJSON,
  optionsTestUrl, optionsTestResponse,
  fileUploadUrl,
  simpleOptionsExample,
  codeExample1, codeExample2, codeExample3,
};