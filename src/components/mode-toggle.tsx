"use client";

import { useTheme } from "next-themes";
import { Switch } from "@/components/ui/switch";
import { MoonIcon, SunIcon } from "@radix-ui/react-icons";
import { useEffect, useState } from "react";
import { Skeleton } from "@/components/ui/skeleton";

export function ModeToggle() {
  const { setTheme, theme } = useTheme();
  const [isThemeLoaded, setIsThemeLoaded] = useState<boolean>(false);

  useEffect(() => {
    setIsThemeLoaded(true);
  }, []);

  const changeToggle = () => {
    const newTheme = theme === "dark" ? "light" : "dark";
    setTheme(newTheme);
  };

  if (!isThemeLoaded)
    return <Skeleton className="w-[0px] h-[20px] rounded-full" />;

  return (
    <div className="flex justify-center items-center gap-2">
      <Switch
        id="use-theme"
        checked={theme === "dark"}
        onCheckedChange={changeToggle}
      />
      <label htmlFor="use-theme">
        {theme === "dark" ? <MoonIcon /> : <SunIcon />}
      </label>
    </div>
  );
}
