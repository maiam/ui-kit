import React from "react";

type Props = React.ButtonHTMLAttributes<HTMLButtonElement> & {
  variant?: "primary" | "ghost";
  size?: "md" | "sm";
  full?: boolean;
};

export default function Button({
  variant = "primary",
  size = "md",
  full,
  className = "",
  ...props
}: Props) {
  const base =
    "inline-flex items-center justify-center rounded-xl font-medium transition focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-white dark:focus:ring-offset-black";

  const sizes = size === "sm" ? "h-9 px-3 text-sm" : "h-11 px-4 text-sm";
  const width = full ? "w-full" : "";

  const styles =
    variant === "primary"
      ? "bg-black text-white hover:opacity-90 dark:bg-white dark:text-black focus:ring-black dark:focus:ring-white"
      : "bg-transparent text-black hover:bg-black/5 dark:text-white dark:hover:bg-white/10 focus:ring-black dark:focus:ring-white";

  return (
    <button
      className={[base, sizes, width, styles, className].join(" ")}
      {...props}
    />
  );
}
