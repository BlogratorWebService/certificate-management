import { createContext, ReactNode, useContext, useEffect, useState } from "react";

interface ThemeContextType {
    theme: string;
    toggleTheme: () => void;
}

const ThemeContext = createContext<ThemeContextType | undefined>(undefined);

interface ThemeProviderProps {
    children: ReactNode;
}

export const ThemeProvider = ({ children }: ThemeProviderProps) => {
    
    // Initialize theme state with localStorage value or default to "dark";
    const [theme, setTheme] = useState<string>(() => {
        const savedTheme = localStorage.getItem("theme");
        return savedTheme ? savedTheme : "dark";
    });

    useEffect(() => {
        const html = document.querySelector("html");
        if (html) {
            html.classList.remove("light", "dark");
            html.classList.add(theme);
        }
        localStorage.setItem("theme", theme);
    }, [theme]);

    const toggleTheme = () => {
        setTheme((prevTheme) => (prevTheme === "light" ? "dark" : "light"));
    };

    return (
        <ThemeContext.Provider value={{ theme, toggleTheme }}>
            {children}
        </ThemeContext.Provider>
    );
};

export const useTheme = () => {
    const context = useContext(ThemeContext);
    if (!context) {
        throw new Error("useTheme must be used within a ThemeProvider");
    }
    return context;
};
