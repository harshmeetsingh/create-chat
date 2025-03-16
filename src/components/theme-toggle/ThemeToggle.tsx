import "@theme-toggles/react/css/Classic.css";
import { Classic } from "@theme-toggles/react";
import { useEffect, useState } from "react";
import "./ThemeToggle.css";
export const ThemeToggle = () => {
  const savedTheme = localStorage.getItem("theme");
  const [isToggled, setIsToggled] = useState(savedTheme === "dark");

  useEffect(() => {
    const theme = isToggled ? "dark" : "light";
    document.documentElement.setAttribute("data-theme", theme);
    localStorage.setItem("theme", theme);
  }, [isToggled]);

  return (
    <Classic
      className="class-toggle"
      toggled={isToggled}
      toggle={setIsToggled}
      placeholder={undefined}
      onPointerEnterCapture={() => {}}
      onPointerLeaveCapture={() => {}}
    />
  );
};
