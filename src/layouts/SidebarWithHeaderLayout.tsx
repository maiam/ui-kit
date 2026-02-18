import React, { useMemo, useState } from "react";
import ThemeToggle from "../components/ThemeToggle";

export type SidebarLink = {
  id: string;
  label: string;
  icon?: React.ReactNode;
  href?: string;
  onClick?: () => void;
};

type Props = {
  brand?: React.ReactNode;
  links: SidebarLink[];
  activeId?: string;

  user?: {
    name: string;
    avatarUrl?: string;
  };

  title?: string;
  children: React.ReactNode;
};

const SidebarWithHeaderLayout: React.FC<Props> = ({
  brand = (
    <div className="flex items-center gap-2">
      <div className="grid h-9 w-9 place-items-center rounded-xl bg-indigo-600 text-white">
        <WaveIcon className="h-5 w-5" />
      </div>
      <span className="text-sm font-semibold text-zinc-900 dark:text-zinc-50">
        Workcation
      </span>
    </div>
  ),
  links,
  activeId,
  user = { name: "Tom Cook" },
  title,
  children,
}) => {
  const [q, setQ] = useState("");

  const filtered = useMemo(() => {
    const s = q.trim().toLowerCase();
    if (!s) return links;
    return links.filter((l) => l.label.toLowerCase().includes(s));
  }, [links, q]);

  const settingsLink = filtered.find((l) => l.id === "settings");
  const mainLinks = filtered.filter((l) => l.id !== "settings");

  return (
    <div className="min-h-screen bg-white text-zinc-900 dark:bg-zinc-950 dark:text-zinc-50">
      <div className="flex min-h-screen">
        {/* Sidebar */}
        <aside className="hidden w-72 flex-col border-r border-zinc-200 bg-white px-4 py-5 dark:border-zinc-800 dark:bg-zinc-950 lg:flex">
          <div>{brand}</div>

          <nav className="mt-8 flex-1 space-y-1">
            {mainLinks.map((l) => (
              <NavRow
                key={l.id}
                active={l.id === activeId}
                label={l.label}
                icon={l.icon}
                href={l.href}
                onClick={l.onClick}
              />
            ))}
          </nav>

          {/* Bottom: Settings */}
          <div className="mt-6 border-t border-zinc-200 pt-4 dark:border-zinc-800">
            {settingsLink ? (
              <NavRow
                active={settingsLink.id === activeId}
                label={settingsLink.label}
                icon={settingsLink.icon}
                href={settingsLink.href}
                onClick={settingsLink.onClick}
              />
            ) : (
              <NavRow
                active={activeId === "settings"}
                label="Settings"
                icon={<CogIcon className="h-5 w-5" />}
                onClick={() => {}}
              />
            )}
          </div>
        </aside>

        {/* Main */}
        <div className="flex min-w-0 flex-1 flex-col">
          {/* Header */}
          <header className="sticky top-0 z-20 border-b border-zinc-200 bg-white/90 backdrop-blur dark:border-zinc-800 dark:bg-zinc-950/80">
            <div className="flex items-center gap-3 px-4 py-4 lg:px-6">
              {/* Mobile menu placeholder */}
              <div className="lg:hidden">
                <button
                  type="button"
                  className="inline-flex h-10 w-10 items-center justify-center rounded-xl hover:bg-zinc-100 dark:hover:bg-zinc-900"
                  aria-label="Menu"
                  title="Menu"
                >
                  <MenuIcon className="h-5 w-5 text-zinc-600 dark:text-zinc-300" />
                </button>
              </div>

              {/* Search */}
              <div className="flex flex-1 items-center">
                <div className="relative w-full max-w-xl">
                  <SearchIcon className="pointer-events-none absolute left-3 top-1/2 h-5 w-5 -translate-y-1/2 text-zinc-400" />
                  <input
                    value={q}
                    onChange={(e) => setQ(e.target.value)}
                    placeholder="Search"
                    className={[
                      "h-11 w-full rounded-xl border bg-white pl-10 pr-3 text-sm outline-none",
                      "border-zinc-200 text-zinc-900 placeholder:text-zinc-400",
                      "focus:ring-2 focus:ring-zinc-200",
                      "dark:border-zinc-800 dark:bg-zinc-950 dark:text-zinc-50 dark:placeholder:text-zinc-500 dark:focus:ring-zinc-800",
                    ].join(" ")}
                  />
                </div>
              </div>

              {/* Actions */}
              <div className="flex items-center gap-2">
                <button
                  type="button"
                  className="inline-flex h-10 w-10 items-center justify-center rounded-xl hover:bg-zinc-100 dark:hover:bg-zinc-900"
                  aria-label="Notifications"
                  title="Notifications"
                >
                  <BellIcon className="h-5 w-5 text-zinc-600 dark:text-zinc-300" />
                </button>

                {/* Dark/Light toggle (aqui!) */}
                <ThemeToggle />

                {/* Avatar top-right only */}
                <button
                  type="button"
                  className="inline-flex items-center gap-2 rounded-xl px-2 py-1.5 hover:bg-zinc-100 dark:hover:bg-zinc-900"
                  aria-label="User menu"
                  title="User menu"
                >
                  {user.avatarUrl ? (
                    <img
                      src={user.avatarUrl}
                      alt={user.name}
                      className="h-9 w-9 rounded-full object-cover"
                    />
                  ) : (
                    <div className="h-9 w-9 rounded-full bg-zinc-200 dark:bg-zinc-800" />
                  )}
                  <div className="hidden text-sm font-medium lg:block">
                    {user.name}
                  </div>
                  <ChevronDownIcon className="hidden h-4 w-4 text-zinc-500 dark:text-zinc-400 lg:block" />
                </button>
              </div>
            </div>
          </header>

          {/* Content */}
          <main className="flex-1 px-4 py-6 lg:px-6">
            {title ? (
              <h1 className="text-base font-semibold text-zinc-900 dark:text-zinc-50">
                {title}
              </h1>
            ) : null}

            <div className="mt-4 rounded-2xl border border-zinc-200 bg-white p-6 shadow-sm dark:border-zinc-800 dark:bg-zinc-950">
              {children}
            </div>
          </main>
        </div>
      </div>
    </div>
  );
};

export default SidebarWithHeaderLayout;

/* ---------------- NavRow com azul no hover/active ---------------- */

function NavRow({
  active,
  label,
  icon,
  href,
  onClick,
}: {
  active?: boolean;
  label: string;
  icon?: React.ReactNode;
  href?: string;
  onClick?: () => void;
}) {
  const base =
    "group flex w-full items-center gap-3 rounded-xl px-3 py-2 text-sm font-medium transition";

  // Azul escuro no light, azul claro no dark
  const activeCls =
    "bg-zinc-50 text-indigo-700 dark:bg-zinc-900/50 dark:text-indigo-300";
  const idleCls =
    "text-zinc-700 hover:bg-zinc-50 hover:text-indigo-700 dark:text-zinc-300 dark:hover:bg-zinc-900/50 dark:hover:text-indigo-300";

  const iconWrap =
    "grid h-9 w-9 place-items-center rounded-lg text-zinc-500 " +
    "group-hover:text-indigo-700 dark:text-zinc-400 dark:group-hover:text-indigo-300";

  const cls = [base, active ? activeCls : idleCls].join(" ");

  const content = (
    <>
      <span className={iconWrap}>
        <span
          className={[
            "transition",
            active ? "text-indigo-700 dark:text-indigo-300" : "",
          ].join(" ")}
        >
          {icon ?? <span className="text-xs">•</span>}
        </span>
      </span>
      <span className="truncate">{label}</span>
    </>
  );

  if (href) {
    return (
      <a className={cls} href={href} aria-current={active ? "page" : undefined}>
        {content}
      </a>
    );
  }

  return (
    <button
      type="button"
      className={cls}
      onClick={onClick}
      aria-current={active ? "page" : undefined}
    >
      {content}
    </button>
  );
}

/* ---------------- inline icons (sem libs) ---------------- */

function WaveIcon(props: React.SVGProps<SVGSVGElement>) {
  return (
    <svg viewBox="0 0 24 24" fill="none" aria-hidden="true" {...props}>
      <path
        d="M3 14c4-6 8 6 12 0s6-2 6-2"
        className="stroke-current"
        strokeWidth="2"
        strokeLinecap="round"
      />
      <path
        d="M3 8c4-6 8 6 12 0s6-2 6-2"
        className="stroke-current"
        strokeWidth="2"
        strokeLinecap="round"
        opacity="0.7"
      />
    </svg>
  );
}

export function SearchIcon(props: React.SVGProps<SVGSVGElement>) {
  return (
    <svg viewBox="0 0 24 24" fill="none" aria-hidden="true" {...props}>
      <path
        d="M10.5 18a7.5 7.5 0 1 1 0-15 7.5 7.5 0 0 1 0 15Z"
        className="stroke-current"
        strokeWidth="2"
      />
      <path
        d="M16.5 16.5 21 21"
        className="stroke-current"
        strokeWidth="2"
        strokeLinecap="round"
      />
    </svg>
  );
}

export function BellIcon(props: React.SVGProps<SVGSVGElement>) {
  return (
    <svg viewBox="0 0 24 24" fill="none" aria-hidden="true" {...props}>
      <path
        d="M15 17H9m9-2V11a6 6 0 1 0-12 0v4l-2 2h16l-2-2Z"
        className="stroke-current"
        strokeWidth="2"
        strokeLinejoin="round"
      />
      <path
        d="M10 19a2 2 0 0 0 4 0"
        className="stroke-current"
        strokeWidth="2"
        strokeLinecap="round"
      />
    </svg>
  );
}

export function ChevronDownIcon(props: React.SVGProps<SVGSVGElement>) {
  return (
    <svg viewBox="0 0 24 24" fill="none" aria-hidden="true" {...props}>
      <path
        d="M7 10l5 5 5-5"
        className="stroke-current"
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}

export function MenuIcon(props: React.SVGProps<SVGSVGElement>) {
  return (
    <svg viewBox="0 0 24 24" fill="none" aria-hidden="true" {...props}>
      <path
        d="M4 6h16M4 12h16M4 18h16"
        className="stroke-current"
        strokeWidth="2"
        strokeLinecap="round"
      />
    </svg>
  );
}

export function CogIcon(props: React.SVGProps<SVGSVGElement>) {
  return (
    <svg viewBox="0 0 24 24" fill="none" aria-hidden="true" {...props}>
      <path
        d="M12 15.5A3.5 3.5 0 1 0 12 8.5a3.5 3.5 0 0 0 0 7Z"
        className="stroke-current"
        strokeWidth="2"
      />
      <path
        d="M19 12a7 7 0 0 0-.1-1l2-1.4-2-3.5-2.3.6a7.2 7.2 0 0 0-1.7-1L14.6 3h-5.2L9.1 5.7a7.2 7.2 0 0 0-1.7 1L5.1 6.1 3.1 9.6l2 1.4a7 7 0 0 0 0 2l-2 1.4 2 3.5 2.3-.6a7.2 7.2 0 0 0 1.7 1L9.4 21h5.2l.3-2.7a7.2 7.2 0 0 0 1.7-1l2.3.6 2-3.5-2-1.4c.1-.3.1-.7.1-1Z"
        className="stroke-current"
        strokeWidth="2"
        strokeLinejoin="round"
      />
    </svg>
  );
}
