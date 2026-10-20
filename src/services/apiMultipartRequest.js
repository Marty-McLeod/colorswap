import { useState, useEffect } from "react";


/*  Handles an API request, returning data parsed as JSON, along with isLoading
*   flag and error value.
*   Default is a "GET" request, no body data.
*
*/
export async function apiMultipartRequest(url, jsonData, formData) {
  const [data, setData] = useState([]);
  const [error, setError] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  // Add json data to a new formData object, then append the existing (file list) object
  const bodyData = buildBodyFormData((jsonData, formData) => {
    const bodyFormData = new FormData();

    // Adds JSON data as a stringified blob object
    bodyFormData.append(
      "metadata", 
      new Blob([JSON.stringify(jsonData)], 
      { type: "application/json"} )
    );
    // Adds existing file objects to the body formData object, as key-value pairs
    for(const [key,val] in Object.entries(formData)) {
      bodyFormData.append(key,val);
    };

  });


  useEffect(() => {
    const controller = new AbortController();

    async function fetchApiData() {
      try {
        setIsLoading(true);
        setError("");

        const res = await fetch(url, { 
          method: "POST",
          body: bodyData,
          signal: controller.signal
        });

        if (!res.ok) throw new Error("API data request failed.");

        const data_json = await res.json();

      } catch (err) {
        if (err.name !== "AbortError") {
          setError(err.message);
        }
      } finally {
        setIsLoading(false);
      }
    } // fetchApiData()

    fetchApiData();

    return () => {
      controller.abort(); // If api fetch fails, abort on cleanup function call
    };
  }, []); // useEffect()

  return { isLoading, data, error };
}