import { useState, useEffect } from "react";


/*  Handles an API request, returning data parsed as JSON, along with isLoading
*   flag and error value.
*   Default is a "GET" request, no body data.
*   Aborts on controller signal or a timeout.
*/
export async function apiMultipartRequest(url, jsonData, formData, 
  { timeout = 8000, signal: externalSignal } = {}) {

  // Add json data to a new formData object, then append the existing (file list) object
  const bodyFormData = new FormData();
  const controller = new AbortController();
  const timeoutId = setTimeout(() => controller.abort(), timeout);

   // Abort if the caller cancels from the outside
  if (externalSignal) {
    if (externalSignal.aborted) {
      controller.abort();
    } else {
      externalSignal.addEventListener("abort", () => controller.abort(), { once: true });
    }
  }


  // Adds JSON data as a stringified blob object
  bodyFormData.append(
    "metadata", 
    new Blob([JSON.stringify(jsonData)], 
    { type: "application/json"} )
  );

  // Adds existing file objects to the body formData object, as key-value pairs
  // NOTE: Also ensures that only File objects are appended
  for (const [key,value] of formData.entries()) {
    if(value instanceof File || value instanceof Blob) {
      bodyFormData.append(key, value);
    }
  };

  try{
    const res = await fetch(url, { 
      method: "POST",
      body: bodyFormData,
      signal: controller.signal,

    }); 

    if (!res.ok) throw new Error(`API data request failed; status: ${res.status}`);
    // return data parsed as JSON
    return await res.json();

  } catch(err) {

      if(err.name === "AbortError") {
        // Notify of error, distinguishing from a timeout or external
        // abort
        if(externalSignal?.aborted) {
          throw new Error("Request was cancelled");
        }
        // Handle timeout abort
        throw new Error(`Request timed out after ${timeout}mS`);

      } 
      // Handle network error, which is a TypeError thrown by fetch()
      if(err instanceof TypeError){
        throw new Error("Network failure: please check connection.");
      }

      // Throw general error(s)
      throw err;
  } finally {
    // Clean up timer upon a successful fetch
    clearTimeout(timeoutId);
  }

};

  // useEffect(() => {
  //   const controller = new AbortController();

  //   async function fetchApiData() {
  //     try {
  //       setIsLoading(true);
  //       setError("");

  //       const res = await fetch(url, { 
  //         method: "POST",
  //         body: bodyData,
  //         signal: controller.signal
  //       });

  //       if (!res.ok) throw new Error("API data request failed.");

  //       const data_json = await res.json();

  //     } catch (err) {
  //       if (err.name !== "AbortError") {
  //         setError(err.message);
  //       }
  //     } finally {
  //       setIsLoading(false);
  //     }
  //   } // fetchApiData()

  //   fetchApiData();

  //   return () => {
  //     controller.abort(); // If api fetch fails, abort on cleanup function call
  //   };
  // }, []); // useEffect()