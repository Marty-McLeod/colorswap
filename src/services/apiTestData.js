import { URL_JSONPLACEHOLDER } from "../data/urls";
import { useState, useEffect } from "react";
const API_URL_PIZZA = 'https://react-fast-pizza-api.jonas.io/api';


/* 
  Fetches "todos" API test data for a given number of elements. Defaults to "all" if param value not assigned.
  Note: Should return an array from the API in order to allow slicing.5
*/
// export async function getTestData({ url, returnCount }) {
//   const res = await fetch(url);

//   if(!res.ok) throw Error(`Failed get data at URL: ${url}`);
  
//   const { data } = await res.json();
//   if(returnCount) {
//     return data.slice(0, returnCount);
//   }
//   else {
//     return data;
//   }
// }

/* Same as above, but assumes only 5 items returned; url is assumed also.
  Returns data as array of objects
*/
export function getTestData5() {
  const [ apiData, setAPIData ] = useState([]);
  const [ isLoading, setIsLoading ] = useState(false);
  const [ error, setError ] = useState("");

  useEffect(
    function() {
      async function fetchAPIData() {
          try{
            setIsLoading(true);
            setError("");

            const res = await fetch(URL_JSONPLACEHOLDER);
            if(!res.ok) 
              throw new Error(`Failed getting API data; response: ${res.status}`)

            const data_json = await res.json();
            const sliced = data_json.slice(0,5);

            setAPIData(sliced);
            // console.log("sliced:", sliced);

          } catch (err) {
              console.error("ERROR:", err.message);
              setError(err.message);
          } finally {
            setIsLoading(false);
            setError("");      
          }
      }

      fetchAPIData();
    },[],

  );

  return { isLoading, apiData, error };
}
