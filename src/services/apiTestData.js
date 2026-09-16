import { URL_JSONPLACEHOLDER } from "../data/urls";
const API_URL_PIZZA = 'https://react-fast-pizza-api.jonas.io/api';


/* 
  Fetches "todos" API test data for a given number of elements. Defaults to "all" if param value not assigned.
  Note: Should return an array from the API in order to allow slicing.5
*/
export async function getTestData({ url, returnCount }) {
  const res = await fetch(url);

  if(!res.ok) throw Error(`Failed get data at URL: ${url}`);
  
  const { data } = await res.json();
  if(returnCount) {
    return data.slice(0, returnCount);
  }
  else {
    return data;
  }
}

/* Same as above, but assumes only 5 items returned; url is assumed also */
export async function getTestData5() {
  const res = await fetch(API_URL_PIZZA);

  if(!res.ok) throw new Error(`Failed getting API data; response: ${res.status}`);

  // if(!res.ok) throw Error(`Failed get data at URL: ${URL_JSONPLACEHOLDER_TODOS}`);
  
  const {data } = await res.json();
  // console.log("data:", data);

  return data.slice(0,2);
}
