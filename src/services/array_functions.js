
/*  Returns just the first key of each object in an array */
export function getArrayObjectFirstKeys(arr) {

  const keysArray = arr.map((obj) => {
              return Object.keys(obj)[0];
          })

  return keysArray;
}


