import React from "react";

type Props = React.InputHTMLAttributes<HTMLInputElement> & {
  label?: string;
  hint?: string;
  error?: string;
};

export default function Input({
  label,
  hint,
  error,
  className = "",
  id,
  ...props
}: Props) {
  const inputId = id ?? props.name ?? undefined;

  return (
    <div className="space-y-1.5">
      {label ? (
        <label
          htmlFor={inputId}
          className="block text-sm font-medium text-black/80 dark:text-white/80"
        >
          {label}
        </label>
      ) : null}

      <input
        id={inputId}
        className={[
          "h-11 w-full rounded-xl border px-3 text-sm outline-none transition",
          "bg-white text-black placeholder:text-black/40",
          "dark:bg-black dark:text-white dark:placeholder:text-white/35",
          "border-black/15 focus:border-black/40 focus:ring-2 focus:ring-black/10",
          "dark:border-white/15 dark:focus:border-white/35 dark:focus:ring-white/10",
          error
            ? "border-red-500/60 focus:border-red-500/60 focus:ring-red-500/10"
            : "",
          className,
        ].join(" ")}
        {...props}
      />

      {error ? (
        <p className="text-sm text-red-600 dark:text-red-400">{error}</p>
      ) : hint ? (
        <p className="text-sm text-black/50 dark:text-white/50">{hint}</p>
      ) : null}
    </div>
  );
}
