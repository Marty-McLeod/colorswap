import { useState, useEffect } from "react";

export function useLocalStorageState(initialState, key) {
  const [value, setValue ] = useState(function() {
    // Get the local saved state value that matches the key, if it exists
    // else, return initial state value
    const storedValue = localStorage.getItem(key);
    return storedValue ? JSON.parse(storedValue) : initialState;

  });

  useEffect(
    function() {
      localStorage.setItem(key, JSON.stringify(value));
    },[value, key]
  );

  return [ value, setValue ];
}