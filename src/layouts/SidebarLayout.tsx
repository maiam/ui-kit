import React, { useEffect, useMemo, useState } from "react";
import ThemeToggle from "../components/ThemeToggle";
import Button from "../components/Button";
import { MenuIcon, XIcon } from "../components/icons";

export type SidebarItem = {
  id: string;
  label: string;
  href?: string;
  onClick?: () => void;
  icon?: React.ReactNode;
  badge?: string;
};

type Props = {
  brand?: React.ReactNode; // ex: "ui-kit" ou logo
  userArea?: React.ReactNode; // ex: avatar + nome
  items: SidebarItem[];
  activeId?: string;
  headerRight?: React.ReactNode; // ex: botão "Novo"
  children: React.ReactNode;
};

export default function SidebarLayout({
  brand = <span className="text-sm font-semibold tracking-tight">ui-kit</span>,
  userArea,
  items,
  activeId,
  headerRight,
  children,
}: Props) {
  const [mobileOpen, setMobileOpen] = useState(false);

  // fecha drawer ao apertar ESC
  useEffect(() => {
    function onKeyDown(e: KeyboardEvent) {
      if (e.key === "Escape") setMobileOpen(false);
    }
    window.addEventListener("keydown", onKeyDown);
    return () => window.removeEventListener("keydown", onKeyDown);
  }, []);

  const nav = useMemo(() => {
    return items.map((it) => {
      const active = it.id === activeId;
      const base =
        "group flex w-full items-center gap-3 rounded-xl px-3 py-2 text-sm transition";
      const style = active
        ? "bg-black text-white dark:bg-white dark:text-black"
        : "text-black/80 hover:bg-black/5 dark:text-white/80 dark:hover:bg-white/10";

      const content = (
        <>
          {it.icon ? (
            <span className="grid h-5 w-5 place-items-center opacity-90">
              {it.icon}
            </span>
          ) : (
            <span className="h-2 w-2 rounded-full bg-current opacity-40" />
          )}
          <span className="flex-1 truncate">{it.label}</span>
          {it.badge ? (
            <span
              className={[
                "rounded-full px-2 py-0.5 text-[11px]",
                active
                  ? "bg-white/15 text-white dark:bg-black/10 dark:text-black"
                  : "bg-black/5 text-black/70 dark:bg-white/10 dark:text-white/70",
              ].join(" ")}
            >
              {it.badge}
            </span>
          ) : null}
        </>
      );

      if (it.href) {
        return (
          <a key={it.id} href={it.href} className={[base, style].join(" ")}>
            {content}
          </a>
        );
      }

      return (
        <button
          key={it.id}
          type="button"
          onClick={() => it.onClick?.()}
          className={[base, style].join(" ")}
        >
          {content}
        </button>
      );
    });
  }, [items, activeId]);

  return (
    <div className="min-h-screen bg-white text-black dark:bg-black dark:text-white">
      <div className="mx-auto flex min-h-screen max-w-7xl">
        {/* Sidebar desktop */}
        <aside className="hidden w-72 border-r border-black/10 p-4 dark:border-white/10 lg:flex lg:flex-col">
          <div className="flex items-center justify-between">
            {brand}
            <ThemeToggle />
          </div>

          <nav className="mt-6 space-y-1">{nav}</nav>

          <div className="mt-auto pt-4">
            <div className="rounded-2xl border border-black/10 bg-white/60 p-3 text-sm dark:border-white/10 dark:bg-black/50">
              {userArea ?? (
                <div className="space-y-1">
                  <div className="font-medium">Admin</div>
                  <div className="text-xs text-black/60 dark:text-white/60">
                    pedro@exemplo.com
                  </div>
                </div>
              )}
            </div>
          </div>
        </aside>

        {/* Conteúdo */}
        <div className="flex min-w-0 flex-1 flex-col">
          {/* Topbar */}
          <header className="sticky top-0 z-20 border-b border-black/10 bg-white/70 backdrop-blur dark:border-white/10 dark:bg-black/60">
            <div className="flex items-center gap-3 px-4 py-3 lg:px-6">
              {/* botão mobile */}
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
                  {/* espaço pra breadcrumb ou descrição */}
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

          {/* Main */}
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
          <div className="absolute inset-y-0 left-0 w-[86%] max-w-sm border-r border-black/10 bg-white p-4 shadow-xl dark:border-white/10 dark:bg-black">
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

            <nav
              className="mt-6 space-y-1"
              onClick={() => setMobileOpen(false)}
            >
              {nav}
            </nav>

            <div className="mt-auto pt-4">
              <div className="rounded-2xl border border-black/10 bg-white/60 p-3 text-sm dark:border-white/10 dark:bg-black/50">
                {userArea ?? (
                  <div className="space-y-1">
                    <div className="font-medium">Admin</div>
                    <div className="text-xs text-black/60 dark:text-white/60">
                      pedro@exemplo.com
                    </div>
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>
      ) : null}
    </div>
  );
}
