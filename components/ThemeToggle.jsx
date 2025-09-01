"use client";
import { useTheme } from "next-themes";
import { MdLightMode, MdOutlineNightlightRound } from "react-icons/md";

export default function ThemeToggle() {
  const { theme, setTheme } = useTheme();

  return (
    <button
      className=" cursor-pointer -rotate-20 text-lg"
      onClick={() => setTheme(theme === "dark" ? "light" : "dark")}
    >
      {theme === "dark" ?  <MdLightMode/> : <MdOutlineNightlightRound />
}
    </button>
  );
}
