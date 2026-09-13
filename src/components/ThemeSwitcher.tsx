import { useTheme } from "@/context/theme-provider";
import { HugeiconsIcon } from "@hugeicons/react";
import { Sun03Icon, Moon01Icon } from "@hugeicons/core-free-icons";
import { Button } from "@/components/ui/button";
import {
  Tooltip,
  TooltipContent,
  TooltipTrigger,
} from "@/components/ui/tooltip";

interface ThemeSwitcherProps {
  className?: string;
  showTooltip?: boolean;
}

export default function ThemeSwitcher({
  className,
  showTooltip = true,
}: ThemeSwitcherProps) {
  const { theme, setTheme } = useTheme();

  const isDark =
    theme === "dark" ||
    (theme === "system" &&
      typeof window !== "undefined" &&
      window.matchMedia("(prefers-color-scheme: dark)").matches);

  const button = (
    <Button
      variant="outline"
      size="icon"
      onClick={() => setTheme(isDark ? "light" : "dark")}
      className={
        className ||
        "w-9 h-9 rounded-xl border border-slate-200/80 dark:border-slate-800 text-slate-600 dark:text-slate-300 hover:text-blue-600 dark:hover:text-blue-400"
      }
      aria-label={isDark ? "Включить светлую тему" : "Включить тёмную тему"}
    >
      {isDark ? (
        <HugeiconsIcon icon={Sun03Icon} size={18} strokeWidth={1.5} className="text-amber-400" />
      ) : (
        <HugeiconsIcon icon={Moon01Icon} size={18} strokeWidth={1.5} className="text-slate-600 dark:text-slate-300" />
      )}
      <span className="sr-only">Переключить тему</span>
    </Button>
  );

  if (!showTooltip) {
    return button;
  }

  return (
    <Tooltip>
      <TooltipTrigger asChild>
        {button}
      </TooltipTrigger>
      <TooltipContent side="bottom" className="text-xs">
        {isDark ? "Включить светлую тему" : "Включить тёмную тему"}
      </TooltipContent>
    </Tooltip>
  );
}
