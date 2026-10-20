
import { useState, useEffect } from "react";


/*    Fetches n number of api elements, returned as an array of objects.
 *   If count is undefined or 0, returns the full API data length received. Aborts upon
 *   an API error.
 */
export function getApiData(count, url) {
  const [isLoading, setIsLoading] = useState(false);
  const [data, setData] = useState([]);
  const [error, setError] = useState("");

  useEffect(() => {
    const controller = new AbortController();

    async function fetchApiData() {
      try {
        setIsLoading(true);
        setError("");

        const res = await fetch(url, { 
          signal: controller.signal
        });

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
