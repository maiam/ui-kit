import React, { useMemo, useState } from "react";

export type SidebarLink = {
  id: string;
  label: string;
  icon?: React.ReactNode;
  href?: string;
  onClick?: () => void;
};

type Props = {
  brand?: React.ReactNode; // logo/brand no topo da sidebar
  links: SidebarLink[];
  activeId?: string;

  user?: {
    name: string;
    email?: string;
    avatarUrl?: string;
  };

  title?: string;
  children: React.ReactNode;
};

const SidebarWithHeaderLayout: React.FC<Props> = ({
  brand = (
    <div className="flex items-center gap-2">
      <div className="h-8 w-8 rounded-xl bg-indigo-600" />
      <span className="text-sm font-semibold text-zinc-900">Workcation</span>
    </div>
  ),
  links,
  activeId,
  user = { name: "Tom Cook", email: "tom@example.com" },
  title,
  children,
}) => {
  const [q, setQ] = useState("");

  const filtered = useMemo(() => {
    const s = q.trim().toLowerCase();
    if (!s) return links;
    return links.filter((l) => l.label.toLowerCase().includes(s));
  }, [links, q]);

  return (
    <div className="min-h-screen bg-white text-zinc-900">
      <div className="flex min-h-screen">
        {/* Sidebar */}
        <aside className="hidden w-72 flex-col border-r border-zinc-200 bg-white px-4 py-5 lg:flex">
          <div>{brand}</div>

          <nav className="mt-8 flex-1 space-y-1">
            {filtered.map((l) => (
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

          <div className="mt-6 border-t border-zinc-200 pt-4">
            <div className="flex items-center gap-3">
              {user.avatarUrl ? (
                <img
                  src={user.avatarUrl}
                  alt={user.name}
                  className="h-9 w-9 rounded-full object-cover"
                />
              ) : (
                <div className="h-9 w-9 rounded-full bg-zinc-200" />
              )}

              <div className="min-w-0">
                <div className="truncate text-sm font-medium">{user.name}</div>
                {user.email ? (
                  <div className="truncate text-xs text-zinc-500">
                    {user.email}
                  </div>
                ) : null}
              </div>
            </div>
          </div>
        </aside>

        {/* Main */}
        <div className="flex min-w-0 flex-1 flex-col">
          {/* Header */}
          <header className="sticky top-0 z-20 border-b border-zinc-200 bg-white">
            <div className="flex items-center gap-3 px-4 py-4 lg:px-6">
              {/* Mobile menu placeholder (se quiser a gente adiciona drawer depois) */}
              <div className="lg:hidden">
                <button
                  type="button"
                  className="inline-flex h-10 w-10 items-center justify-center rounded-xl hover:bg-zinc-100"
                  aria-label="Menu"
                  title="Menu"
                >
                  <MenuIcon className="h-5 w-5 text-zinc-600" />
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
                    className="h-11 w-full rounded-xl border border-zinc-200 bg-white pl-10 pr-3 text-sm outline-none focus:ring-2 focus:ring-zinc-200"
                  />
                </div>
              </div>

              {/* Actions */}
              <div className="flex items-center gap-2">
                <button
                  type="button"
                  className="inline-flex h-10 w-10 items-center justify-center rounded-xl hover:bg-zinc-100"
                  aria-label="Notifications"
                  title="Notifications"
                >
                  <BellIcon className="h-5 w-5 text-zinc-600" />
                </button>

                <div className="hidden items-center gap-3 lg:flex">
                  {user.avatarUrl ? (
                    <img
                      src={user.avatarUrl}
                      alt={user.name}
                      className="h-9 w-9 rounded-full object-cover"
                    />
                  ) : (
                    <div className="h-9 w-9 rounded-full bg-zinc-200" />
                  )}
                  <div className="text-sm font-medium">{user.name}</div>
                  <ChevronDownIcon className="h-4 w-4 text-zinc-500" />
                </div>
              </div>
            </div>
          </header>

          {/* Content */}
          <main className="flex-1 px-4 py-6 lg:px-6">
            {title ? (
              <h1 className="text-base font-semibold">{title}</h1>
            ) : null}

            <div className="mt-4 rounded-2xl border border-zinc-200 bg-white p-6">
              {children}
            </div>
          </main>
        </div>
      </div>
    </div>
  );
};

export default SidebarWithHeaderLayout;

/* --------- UI helpers (leves) --------- */

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
  const cls = [
    "flex items-center gap-3 rounded-xl px-3 py-2 text-sm font-medium",
    active
      ? "bg-zinc-100 text-zinc-900"
      : "text-zinc-700 hover:bg-zinc-50 hover:text-zinc-900",
  ].join(" ");

  const content = (
    <>
      <span className="grid h-9 w-9 place-items-center rounded-lg text-zinc-500">
        {icon ?? <span className="text-xs">•</span>}
      </span>
      <span className="truncate">{label}</span>
    </>
  );

  if (href)
    return (
      <a className={cls} href={href} aria-current={active ? "page" : undefined}>
        {content}
      </a>
    );

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

/* --------- inline icons (sem libs) --------- */

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

function BellIcon(props: React.SVGProps<SVGSVGElement>) {
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

function ChevronDownIcon(props: React.SVGProps<SVGSVGElement>) {
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

function MenuIcon(props: React.SVGProps<SVGSVGElement>) {
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
