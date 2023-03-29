import { useEffect } from "react";
import { useTheme } from "next-themes";

const ThemeToggle = () => {
    const { theme, setTheme } = useTheme();
    useEffect(() => {
        setTheme("dark");
    }, []);
    const onChangeTheme = () => {
        if (theme === "dark") {
            setTheme('light')
        } else setTheme('dark')
        console.log(theme);
    }
    return (
        <div className="absolute right-5 top-5 z-50">
            <label className="relative inline-flex items-center cursor-pointer">
                <input
                    onChange={() => onChangeTheme()}
                    type="checkbox" className="sr-only peer" />
                <div className="w-11 h-6 bg-gray-200 rounded-full peer peer-focus:ring-2 peer-focus:ring-blue-300 dark:peer-focus:ring-blue-800 dark:bg-gray-700 peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-0.5 after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all dark:border-gray-600 peer-checked:bg-blue-600"></div>
                <span className="ml-3 text-md font-medium text-gray-900 dark:text-gray-300"> Light </span>
            </label>
        </div>
    )
}

export default ThemeToggle;