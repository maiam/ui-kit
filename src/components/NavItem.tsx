import React from "react";

export type NavItemProps = {
  active?: boolean;
  icon?: React.ReactNode;
  label: string;
  badge?: string;
  compact?: boolean;
  href?: string;
  onClick?: () => void;
};

export default function NavItem({
  active,
  icon,
  label,
  badge,
  compact,
  href,
  onClick,
}: NavItemProps) {
  const cls = [
    "relative flex w-full items-center gap-3 rounded-xl px-3 py-2 text-sm transition",
    "focus:outline-none focus:ring-2 focus:ring-black/15 dark:focus:ring-white/15",
    active
      ? "bg-black text-white dark:bg-white dark:text-black"
      : "text-black/80 hover:bg-black/5 dark:text-white/80 dark:hover:bg-white/10",
    compact ? "justify-center px-2" : "",
  ].join(" ");

  const content = (
    <>
      {active ? (
        <span className="absolute left-0 top-1/2 h-5 w-1 -translate-y-1/2 rounded-r bg-white/70 dark:bg-black/70" />
      ) : null}

      {icon ? (
        <span className="grid h-9 w-9 place-items-center rounded-xl bg-black/5 dark:bg-white/10">
          <span className={["opacity-90", compact ? "" : ""].join(" ")}>
            {icon}
          </span>
        </span>
      ) : null}

      {!compact ? (
        <span className="min-w-0 flex-1 truncate font-medium">{label}</span>
      ) : null}

      {!compact && badge ? (
        <span
          className={[
            "rounded-full px-2 py-0.5 text-[11px]",
            active
              ? "bg-white/15 text-white dark:bg-black/10 dark:text-black"
              : "bg-black/5 text-black/70 dark:bg-white/10 dark:text-white/70",
          ].join(" ")}
        >
          {badge}
        </span>
      ) : null}
    </>
  );

  if (href) {
    return (
      <a href={href} className={cls} aria-current={active ? "page" : undefined}>
        {content}
      </a>
    );
  }

  return (
    <button
      type="button"
      onClick={onClick}
      className={cls}
      aria-current={active ? "page" : undefined}
    >
      {content}
    </button>
  );
}
