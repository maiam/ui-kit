import React, { useEffect, useMemo, useState } from "react";
import ThemeToggle from "../components/ThemeToggle";
import Button from "../components/Button";
import NavItem from "../components/NavItem";
import type { NavItemProps } from "../components/NavItem";
import { MenuIcon, XIcon } from "../components/icons";
import { SearchIcon } from "../components/navIcons";

export type SidebarItem = {
  id: string;
  label: string;
  href?: string;
  onClick?: () => void;
  icon?: React.ReactNode;
  badge?: string;
  section?: string; // ex: "Geral", "Admin"
};

type Props = {
  brand?: React.ReactNode;
  userArea?: React.ReactNode;
  items: SidebarItem[];
  activeId?: string;

  headerRight?: React.ReactNode;
  children: React.ReactNode;

  defaultCompact?: boolean; // rail mode inicial
  showSearch?: boolean;
};

export default function SidebarLayout({
  brand = <span className="text-sm font-semibold tracking-tight">ui-kit</span>,
  userArea,
  items,
  activeId,
  headerRight,
  children,
  defaultCompact = false,
  showSearch = true,
}: Props) {
  const [mobileOpen, setMobileOpen] = useState(false);
  const [compact, setCompact] = useState(defaultCompact);
  const [query, setQuery] = useState("");

  useEffect(() => {
    function onKeyDown(e: KeyboardEvent) {
      if (e.key === "Escape") setMobileOpen(false);
      if ((e.ctrlKey || e.metaKey) && e.key.toLowerCase() === "b")
        setCompact((v) => !v);
    }
    window.addEventListener("keydown", onKeyDown);
    return () => window.removeEventListener("keydown", onKeyDown);
  }, []);

  const filteredItems = useMemo(() => {
    if (!query.trim()) return items;
    const q = query.toLowerCase();
    return items.filter((i) => i.label.toLowerCase().includes(q));
  }, [items, query]);

  const bySection = useMemo(() => {
    const map = new Map<string, SidebarItem[]>();
    for (const it of filteredItems) {
      const key = it.section ?? "Geral";
      map.set(key, [...(map.get(key) ?? []), it]);
    }
    return Array.from(map.entries());
  }, [filteredItems]);

  function renderNav(list: SidebarItem[], isCompact: boolean) {
    return list.map((it) => {
      const props: NavItemProps = {
        active: it.id === activeId,
        label: it.label,
        badge: it.badge,
        icon: it.icon,
        compact: isCompact,
        href: it.href,
        onClick: it.onClick,
      };
      return <NavItem key={it.id} {...props} />;
    });
  }

  const SidebarBody = ({ isCompact }: { isCompact: boolean }) => (
    <div className="flex h-full flex-col">
      <div className="flex items-center justify-between">
        <div
          className={[
            "flex items-center gap-2",
            isCompact ? "justify-center" : "",
          ].join(" ")}
        >
          <div className="grid h-10 w-10 place-items-center rounded-2xl bg-black text-white dark:bg-white dark:text-black">
            <span className="text-sm font-semibold">UI</span>
          </div>
          {!isCompact ? <div>{brand}</div> : null}
        </div>

        {!isCompact ? <ThemeToggle /> : null}
      </div>

      {showSearch && !isCompact ? (
        <div className="mt-5">
          <div className="relative">
            <SearchIcon className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 opacity-60" />
            <input
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              placeholder="Buscar..."
              className={[
                "h-11 w-full rounded-xl border pl-9 pr-3 text-sm outline-none transition",
                "bg-white text-black placeholder:text-black/40",
                "dark:bg-black dark:text-white dark:placeholder:text-white/35",
                "border-black/12 focus:border-black/30 focus:ring-2 focus:ring-black/10",
                "dark:border-white/12 dark:focus:border-white/25 dark:focus:ring-white/10",
              ].join(" ")}
            />
          </div>
          <p className="mt-2 text-[11px] text-black/45 dark:text-white/45">
            Dica: <span className="font-medium">Ctrl/⌘ + B</span> alterna modo
            compacto
          </p>
        </div>
      ) : null}

      <div
        className={["mt-6 flex-1 space-y-5", isCompact ? "mt-5" : ""].join(" ")}
      >
        {bySection.map(([section, list]) => (
          <div key={section} className="space-y-2">
            {!isCompact ? (
              <div className="px-1 text-xs font-medium uppercase tracking-wide text-black/40 dark:text-white/40">
                {section}
              </div>
            ) : null}
            <div className="space-y-1">{renderNav(list, isCompact)}</div>
          </div>
        ))}
      </div>

      <div className="mt-4 space-y-3">
        {/* toggle compact só no desktop */}
        <div className="hidden lg:block">
          <Button
            type="button"
            variant="ghost"
            size="sm"
            full
            onClick={() => setCompact((v) => !v)}
            className="justify-center"
          >
            {isCompact ? "Expandir" : "Compactar"}
          </Button>
        </div>

        <div
          className={[
            "rounded-2xl border p-3",
            "border-black/10 bg-white/60 dark:border-white/10 dark:bg-black/50",
            isCompact ? "p-2" : "",
          ].join(" ")}
        >
          {userArea ?? (
            <div
              className={[
                "flex items-center gap-3",
                isCompact ? "justify-center" : "",
              ].join(" ")}
            >
              <div className="h-9 w-9 rounded-xl bg-black/10 dark:bg-white/10" />
              {!isCompact ? (
                <div className="min-w-0">
                  <div className="truncate text-sm font-medium">Pedro</div>
                  <div className="truncate text-xs text-black/60 dark:text-white/60">
                    Admin
                  </div>
                </div>
              ) : null}
            </div>
          )}
        </div>

        {isCompact ? (
          <div className="flex justify-center lg:hidden">
            <ThemeToggle />
          </div>
        ) : null}
      </div>
    </div>
  );

  return (
    <div className="min-h-screen bg-white text-black dark:bg-black dark:text-white">
      <div className="mx-auto flex min-h-screen max-w-7xl">
        {/* Sidebar desktop */}
        <aside
          className={[
            "hidden border-r p-4 dark:border-white/10 lg:flex lg:flex-col",
            "border-black/10",
            compact ? "w-[92px]" : "w-80",
          ].join(" ")}
        >
          <SidebarBody isCompact={compact} />
        </aside>

        {/* Conteúdo */}
        <div className="flex min-w-0 flex-1 flex-col">
          <header className="sticky top-0 z-20 border-b border-black/10 bg-white/70 backdrop-blur dark:border-white/10 dark:bg-black/60">
            <div className="flex items-center gap-3 px-4 py-3 lg:px-6">
              <Button
                type="button"
                variant="ghost"
                size="sm"
                className="lg:hidden"
                onClick={() => setMobileOpen(true)}
                aria-label="Abrir menu"
                title="Abrir menu"
              >
                <MenuIcon className="h-5 w-5" />
              </Button>

              <div className="flex flex-1 items-center gap-3">
                <div className="lg:hidden">{brand}</div>
                <div className="hidden lg:block text-sm text-black/50 dark:text-white/50">
                  {/* breadcrumb / título da página */}
                </div>
              </div>

              <div className="flex items-center gap-2">
                {headerRight}
                <div className="lg:hidden">
                  <ThemeToggle />
                </div>
              </div>
            </div>
          </header>

          <main className="flex-1 p-4 lg:p-6">
            <div className="rounded-2xl border border-black/10 bg-white/60 p-4 dark:border-white/10 dark:bg-black/50 lg:p-6">
              {children}
            </div>
          </main>
        </div>
      </div>

      {/* Drawer mobile */}
      {mobileOpen ? (
        <div className="fixed inset-0 z-50 lg:hidden">
          <div
            className="absolute inset-0 bg-black/40"
            onClick={() => setMobileOpen(false)}
          />
          <div className="absolute inset-y-0 left-0 w-[88%] max-w-sm border-r border-black/10 bg-white p-4 shadow-2xl dark:border-white/10 dark:bg-black">
            <div className="flex items-center justify-between">
              {brand}
              <Button
                type="button"
                variant="ghost"
                size="sm"
                onClick={() => setMobileOpen(false)}
                aria-label="Fechar menu"
                title="Fechar menu"
              >
                <XIcon className="h-5 w-5" />
              </Button>
            </div>

            <div className="mt-4 h-[calc(100vh-88px)]">
              {/* no mobile sempre expandido */}
              <div onClick={() => setMobileOpen(false)} className="h-full">
                <SidebarBody isCompact={false} />
              </div>
            </div>
          </div>
        </div>
      ) : null}
    </div>
  );
}
