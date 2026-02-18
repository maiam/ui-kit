import React, { useMemo, useState } from "react";
import ThemeToggle from "../components/ThemeToggle";

/**
 * Estrutura estilo Catalyst:
 * - Rail fina (ícones) à esquerda
 * - Sidebar com navegação
 * - Conteúdo em "sheet" branco com borda/rounded
 */

export type NavItem = {
  id: string;
  label: string;
  icon?: React.ReactNode;
  href?: string;
  onClick?: () => void;
  badge?: string;
  section?: string; // ex: "Main", "Upcoming Events"
};

type Props = {
  brandName?: string;
  railTopIcon?: React.ReactNode; // ícone/bolinha no topo do rail
  railItems?: Array<{
    id: string;
    icon: React.ReactNode;
    href?: string;
    onClick?: () => void;
  }>;
  navItems: NavItem[];
  activeId?: string;
  footerLinks?: Array<{
    label: string;
    href?: string;
    onClick?: () => void;
    icon?: React.ReactNode;
  }>;
  userArea?: React.ReactNode;

  title?: string; // título do conteúdo (ex: Orders)
  children: React.ReactNode;
};

export default function CatalystSidebarLayout({
  brandName = "Tailwind Labs",
  railTopIcon,
  railItems = [],
  navItems,
  activeId,
  footerLinks = [],
  userArea,
  title = "Orders",
  children,
}: Props) {
  const [query, setQuery] = useState("");

  const filtered = useMemo(() => {
    const q = query.trim().toLowerCase();
    if (!q) return navItems;
    return navItems.filter((i) => i.label.toLowerCase().includes(q));
  }, [navItems, query]);

  const sections = useMemo(() => {
    const map = new Map<string, NavItem[]>();
    for (const item of filtered) {
      const key = item.section ?? "Main";
      map.set(key, [...(map.get(key) ?? []), item]);
    }
    return Array.from(map.entries());
  }, [filtered]);

  return (
    <div className="min-h-screen bg-zinc-50 text-zinc-900 dark:bg-zinc-950 dark:text-zinc-50">
      <div className="flex min-h-screen">
        {/* RAIL (ícones finos) */}
        <aside className="hidden w-14 flex-col items-center gap-3 border-r border-zinc-200 bg-zinc-50 py-4 dark:border-zinc-800 dark:bg-zinc-950 md:flex">
          <div className="grid h-9 w-9 place-items-center rounded-xl border border-zinc-200 bg-white text-zinc-900 shadow-sm dark:border-zinc-800 dark:bg-zinc-900 dark:text-zinc-50">
            {railTopIcon ?? <span className="text-sm font-semibold">≋</span>}
          </div>

          <div className="my-2 h-px w-8 bg-zinc-200 dark:bg-zinc-800" />

          <div className="flex flex-1 flex-col items-center gap-2">
            {railItems.map((it) => (
              <RailButton key={it.id} onClick={it.onClick} href={it.href}>
                {it.icon}
              </RailButton>
            ))}
          </div>

          <div className="flex flex-col items-center gap-2">
            <RailButton>
              <ThemeToggle />
            </RailButton>
          </div>
        </aside>

        {/* SIDEBAR */}
        <aside className="w-[280px] border-r border-zinc-200 bg-zinc-50 p-4 dark:border-zinc-800 dark:bg-zinc-950">
          {/* Brand */}
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2">
              <div className="grid h-8 w-8 place-items-center rounded-xl border border-zinc-200 bg-white shadow-sm dark:border-zinc-800 dark:bg-zinc-900">
                <span className="text-xs font-semibold">◎</span>
              </div>
              <div className="text-sm font-semibold">{brandName}</div>
            </div>

            <div className="md:hidden">
              <ThemeToggle />
            </div>
          </div>

          {/* Search */}
          <div className="mt-4">
            <div className="relative">
              <span className="pointer-events-none absolute left-3 top-1/2 -translate-y-1/2 text-zinc-400">
                <SearchIcon className="h-4 w-4" />
              </span>
              <input
                value={query}
                onChange={(e) => setQuery(e.target.value)}
                placeholder="Search"
                className={[
                  "h-10 w-full rounded-xl border bg-white pl-9 pr-3 text-sm outline-none",
                  "border-zinc-200 text-zinc-900 placeholder:text-zinc-400",
                  "focus:ring-2 focus:ring-zinc-200",
                  "dark:border-zinc-800 dark:bg-zinc-900 dark:text-zinc-50 dark:placeholder:text-zinc-500 dark:focus:ring-zinc-800",
                ].join(" ")}
              />
            </div>
          </div>

          {/* Sections */}
          <div className="mt-5 space-y-6">
            {sections.map(([section, items]) => (
              <div key={section}>
                {section !== "Main" ? (
                  <div className="mb-2 px-2 text-xs font-medium text-zinc-500 dark:text-zinc-400">
                    {section}
                  </div>
                ) : null}

                <div className="space-y-1">
                  {items.map((it) => (
                    <SidebarItemRow
                      key={it.id}
                      active={it.id === activeId}
                      label={it.label}
                      icon={it.icon}
                      badge={it.badge}
                      href={it.href}
                      onClick={it.onClick}
                    />
                  ))}
                </div>
              </div>
            ))}
          </div>

          {/* Footer links */}
          {footerLinks.length ? (
            <div className="mt-6 border-t border-zinc-200 pt-4 dark:border-zinc-800">
              <div className="space-y-1">
                {footerLinks.map((l) => (
                  <SidebarItemRow
                    key={l.label}
                    active={false}
                    label={l.label}
                    icon={l.icon}
                    href={l.href}
                    onClick={l.onClick}
                    subtle
                  />
                ))}
              </div>
            </div>
          ) : null}

          {/* User */}
          <div className="mt-4">
            <div className="rounded-2xl border border-zinc-200 bg-white p-3 dark:border-zinc-800 dark:bg-zinc-900">
              {userArea ?? (
                <div className="flex items-center gap-3">
                  <div className="h-9 w-9 rounded-xl bg-zinc-200 dark:bg-zinc-800" />
                  <div className="min-w-0">
                    <div className="truncate text-sm font-medium">Erica</div>
                    <div className="truncate text-xs text-zinc-500 dark:text-zinc-400">
                      erica@example.com
                    </div>
                  </div>
                  <div className="ml-auto text-zinc-400">⌄</div>
                </div>
              )}
            </div>
          </div>
        </aside>

        {/* CONTENT */}
        <main className="flex-1 p-6">
          <div className="mx-auto max-w-5xl">
            <h1 className="text-lg font-semibold">{title}</h1>
            <div className="mt-4 rounded-2xl border border-zinc-200 bg-white shadow-sm dark:border-zinc-800 dark:bg-zinc-900">
              <div className="p-6">{children}</div>
            </div>
          </div>
        </main>
      </div>
    </div>
  );
}

/* ---------------- components internos ---------------- */

function RailButton({
  children,
  href,
  onClick,
}: {
  children: React.ReactNode;
  href?: string;
  onClick?: () => void;
}) {
  const cls =
    "grid h-10 w-10 place-items-center rounded-xl text-zinc-600 transition hover:bg-zinc-100 hover:text-zinc-900 dark:text-zinc-400 dark:hover:bg-zinc-900 dark:hover:text-zinc-50";

  if (href)
    return (
      <a className={cls} href={href}>
        {children}
      </a>
    );
  return (
    <button type="button" onClick={onClick} className={cls}>
      {children}
    </button>
  );
}

function SidebarItemRow({
  active,
  label,
  icon,
  badge,
  href,
  onClick,
  subtle,
}: {
  active: boolean;
  label: string;
  icon?: React.ReactNode;
  badge?: string;
  href?: string;
  onClick?: () => void;
  subtle?: boolean;
}) {
  const base =
    "group relative flex w-full items-center gap-3 rounded-xl px-3 py-2 text-sm transition";
  const styles = subtle
    ? "text-zinc-600 hover:bg-zinc-100 hover:text-zinc-900 dark:text-zinc-400 dark:hover:bg-zinc-900 dark:hover:text-zinc-50"
    : active
      ? "bg-white text-zinc-900 shadow-sm ring-1 ring-zinc-200 dark:bg-zinc-900 dark:text-zinc-50 dark:ring-zinc-800"
      : "text-zinc-700 hover:bg-zinc-100 hover:text-zinc-900 dark:text-zinc-300 dark:hover:bg-zinc-900 dark:hover:text-zinc-50";

  const leftBar = active
    ? "before:absolute before:left-0 before:top-1/2 before:h-5 before:w-1 before:-translate-y-1/2 before:rounded-r before:bg-zinc-900 dark:before:bg-zinc-50"
    : "";

  const content = (
    <>
      <span className="grid h-8 w-8 place-items-center rounded-lg bg-zinc-100 text-zinc-700 dark:bg-zinc-800 dark:text-zinc-200">
        {icon ?? <span className="text-xs">•</span>}
      </span>
      <span className="flex-1 truncate font-medium">{label}</span>
      {badge ? (
        <span className="rounded-full bg-zinc-100 px-2 py-0.5 text-[11px] text-zinc-700 dark:bg-zinc-800 dark:text-zinc-200">
          {badge}
        </span>
      ) : null}
    </>
  );

  const cls = [base, styles, leftBar].join(" ");

  if (href)
    return (
      <a href={href} className={cls} aria-current={active ? "page" : undefined}>
        {content}
      </a>
    );
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

function SearchIcon(props: React.SVGProps<SVGSVGElement>) {
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
