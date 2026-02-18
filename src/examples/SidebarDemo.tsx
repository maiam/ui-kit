import React, { useState } from "react";
import SidebarLayout from "../layouts/SidebarLayout";
import type { SidebarItem } from "../layouts/SidebarLayout";

function DotIcon() {
  return <div className="h-2.5 w-2.5 rounded-full bg-current opacity-70" />;
}

export default function SidebarDemo() {
  const [active, setActive] = useState("home");

  const items: SidebarItem[] = [
    {
      id: "home",
      label: "Início",
      icon: <DotIcon />,
      onClick: () => setActive("home"),
    },
    {
      id: "contacts",
      label: "Contatos",
      icon: <DotIcon />,
      badge: "12",
      onClick: () => setActive("contacts"),
    },
    {
      id: "messages",
      label: "Mensagens",
      icon: <DotIcon />,
      onClick: () => setActive("messages"),
    },
    {
      id: "settings",
      label: "Configurações",
      icon: <DotIcon />,
      onClick: () => setActive("settings"),
    },
  ];

  return (
    <SidebarLayout
      brand={
        <span className="text-sm font-semibold tracking-tight">ui-kit</span>
      }
      items={items}
      activeId={active}
      headerRight={
        <button className="rounded-xl bg-black px-3 py-2 text-sm text-white dark:bg-white dark:text-black">
          Novo
        </button>
      }
      userArea={
        <div className="flex items-center gap-3">
          <div className="h-9 w-9 rounded-xl bg-black/10 dark:bg-white/10" />
          <div className="min-w-0">
            <div className="truncate font-medium">Pedro</div>
            <div className="truncate text-xs text-black/60 dark:text-white/60">
              Admin
            </div>
          </div>
        </div>
      }
    >
      <div className="space-y-2">
        <h2 className="text-lg font-semibold">Conteúdo</h2>
        <p className="text-sm text-black/60 dark:text-white/60">
          Aqui entra o conteúdo da tela. O layout já entrega sidebar fixa no
          desktop e drawer no mobile.
        </p>
      </div>
    </SidebarLayout>
  );
}
