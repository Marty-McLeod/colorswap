import { URL_JSONPLACEHOLDER } from "../data/urls";
import { useState, useEffect } from "react";
// const API_URL_PIZZA = 'https://react-fast-pizza-api.jonas.io/api';

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

/*    Fetches n number of api elements, returned as an array of objects.
 *   If count is undefined or 0, returns the full API data length received. Aborts upon
 *   an API error.
 */
export function getApiData(count) {
  const [isLoading, setIsLoading] = useState(false);
  const [data, setData] = useState([]);
  const [error, setError] = useState("");

  useEffect(() => {
    const controller = new AbortController();

    async function fetchApiData() {
      try {
        setIsLoading(true);
        setError("");

        const res = await fetch(URL_JSONPLACEHOLDER);

        if (!res.ok) throw new Error("API data request failed.");

        const data_json = await res.json();
        if (count && count > 0) {
          setData(data_json.slice(0, count));
        } else {
          setData(data_json.slice(0,8));
        }
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
} // getApiData()
