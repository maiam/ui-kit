import React from "react";

export default function Card({
  children,
  className = "",
}: {
  children: React.ReactNode;
  className?: string;
}) {
  return (
    <div
      className={[
        "rounded-2xl border",
        "bg-white/70 backdrop-blur",
        "border-black/10 shadow-sm",
        "dark:bg-black/60 dark:border-white/10",
        className,
      ].join(" ")}
    >
      {children}
    </div>
  );
}
