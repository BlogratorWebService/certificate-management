import { useState, useEffect } from "react";
import { Moon, Sun } from "lucide-react";
import { useTheme } from "../contexts/ThemeProvider";
import { Button } from "./ui/button";

const ThemeToggleButton = () => {
    const { theme, toggleTheme } = useTheme();
    const [mounted, setMounted] = useState(false);
    
    // Prevent hydration mismatch
    useEffect(() => {
        setMounted(true);
    }, []);
    
    if (!mounted) return null;
    
    const isDark = theme === "dark";
    
    return (
        <Button
            onClick={toggleTheme}
            size="icon"
            variant={isDark ? "outline" : "secondary"}
            aria-label={isDark ? "Switch to Light Mode" : "Switch to Dark Mode"}
            className={`relative h-10 w-10 rounded-full flex items-center justify-center p-0 transition-all duration-300 ${
                isDark 
                ? "border-slate-700 hover:border-slate-600 hover:bg-slate-800" 
                : "bg-amber-100 hover:bg-amber-200 text-slate-800"
            }`}
        >
            <div className="relative flex items-center justify-center">
                <Sun 
                    className={`absolute transform transition-all duration-500 ${
                        isDark ? "rotate-0 scale-100 opacity-100" : "rotate-90 scale-0 opacity-0"
                    }`}
                    size={20}
                    strokeWidth={2}
                />
                
                <Moon 
                    className={`absolute transform transition-all duration-500 ${
                        !isDark ? "rotate-0 scale-100 opacity-100" : "-rotate-90 scale-0 opacity-0"
                    }`}
                    size={20}
                    strokeWidth={2}
                />
            </div>
        </Button>
    );
};

export default ThemeToggleButton;