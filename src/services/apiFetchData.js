/*    Fetches n number of api elements, returned as an array of objects.
 *   If count is undefined or 0, returns the full API data length received. Aborts upon
 *   an API error.
 */
export async function apiFetchData(count, url) {
  const error = "";
  let returnData = null;

      try {

        const res = await fetch(url);

        if (!res.ok) throw new Error("API data request failed.");

        const data_json = await res.json();

        if (count && count > 0) {
          returnData = data_json.slice(0, count);
        } else {
          returnData = data_json.slice(0,8);
        }
      } catch (err) {
          error = err.message;
      }

      return { returnData, error };

}
