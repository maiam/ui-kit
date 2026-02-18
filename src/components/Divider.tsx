import React from "react";

export default function Divider({ label }: { label?: string }) {
  return (
    <div className="flex items-center gap-3">
      <div className="h-px flex-1 bg-black/10 dark:bg-white/10" />
      {label ? (
        <span className="text-xs text-black/50 dark:text-white/50">
          {label}
        </span>
      ) : null}
      <div className="h-px flex-1 bg-black/10 dark:bg-white/10" />
    </div>
  );
}
