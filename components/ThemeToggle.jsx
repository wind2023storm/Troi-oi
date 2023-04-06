import { IconMoon, IconSunHigh } from "@tabler/icons-react";
import { useTheme } from "next-themes";
import { useEffect } from "react";

const ThemeToggle = () => {
  const { theme, setTheme } = useTheme();
  useEffect(() => {
    setTheme("dark");
  }, []);
  const onChangeTheme = () => {
    if (theme === "dark") {
      setTheme("light");
    } else setTheme("dark");
    console.log(theme);
  };

  const isEnabled = theme === "dark" ? true : false;
  const updateTheme = (isDarkEnabled) => {
    // Get CSS variables for background/foreground
    const styles = getComputedStyle(document.body);
    const black = styles.getPropertyValue("--black");
    const white = styles.getPropertyValue("--white");
    const docEl = document.documentElement;

    if (isDarkEnabled) {
      docEl.style.setProperty("--background", black);
      docEl.style.setProperty("--foreground", white);
    } else {
      docEl.style.setProperty("--background", white);
      docEl.style.setProperty("--foreground", black);
    }
  };

  useEffect(() => {
    updateTheme(isEnabled);
  }, [isEnabled]);
  return (
    <div className="mb-6">
      <label className="toggle-wrapper" htmlFor="toggle">
        <div className={`toggle ${isEnabled ? "enabled" : "disabled"}`}>
          <span className="hidden">
            {isEnabled ? "Enable Light Mode" : "Enable Dark Mode"}
          </span>
          <div className="icons">
            <IconSunHigh
              className="transition-all p-0.5"
              color={isEnabled ? "black" : "white"}
            />
            <IconMoon
              className="transition-all p-0.5"
              color={isEnabled ? "black" : "white"}
            />
          </div>
          <input
            id="toggle"
            name="toggle"
            type="checkbox"
            checked={isEnabled}
            onClick={onChangeTheme}
          />
        </div>
      </label>
    </div>
  );
};

export default ThemeToggle;
