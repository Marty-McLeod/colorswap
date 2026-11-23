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
        {
          "hex_hsl": true
        },
        {
          "name_hex": true
        },
        {
          "name_rgb": true
        }
      ]
    }
  }
}`;




export {
  testMessageEndpoint,
  testMessageTemplate,
  checkAPIKeyExample,
  checkAPIKeyResponse,
  activateKeyUrl, activateKeyUrlResponse,
  optionsJSON,
  optionsTestUrl, optionsTestResponse,

};