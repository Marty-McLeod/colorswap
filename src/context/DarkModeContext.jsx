import { createContext, useContext, useEffect, useState } from "react";
import { useLocalStorageState } from "../hooks/useLocalStorageState";

// 1) Create the context to be used
const DarkModeContext = createContext();

// 2) Dark mode functionality
function DarkModeProvider({ children }) {

    const [isDarkMode, setIsDarkMode] = useLocalStorageState(
        window.matchMedia("(Prefers-color-scheme: dark").matches, "isDarkMode",
    );

    // Effect: change the root HTML document classes by swapping light or dark mode
    // as needed
    useEffect (
        function() {
            if(isDarkMode) {
                document.documentElement.classList.add("dark-mode");
                document.documentElement.classList.remove("light-mode");
            }
            else {
                document.documentElement.classList.add("light-mode");
                document.documentElement.classList.remove("dark-mode");
            }

        },[isDarkMode]

    );

    // Toggle state value
    function toggleDarkMode() {
        setIsDarkMode((isDark) => !isDark);
    }

    // Return contexts & children
    return (
        <DarkModeContext.Provider
            value={{
                isDarkMode, toggleDarkMode
            }}
        >
            { children }
        </DarkModeContext.Provider>


    )
}// End DarkModeToggle()

function useDarkMode() {
    const context = useContext(DarkModeContext);
    if (context == undefined)
        throw new Error("DarkModeContext used outside of DarkModeProvider");

    return context;
}

export { DarkModeProvider, useDarkMode };