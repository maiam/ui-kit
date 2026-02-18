import React, { useState } from "react";
import SidebarLayout from "../layouts/SidebarLayout";
import type { SidebarItem } from "../layouts/SidebarLayout";
import {
  HomeIcon,
  UsersIcon,
  ChatIcon,
  SettingsIcon,
} from "../components/navIcons";

export default function SidebarDemo() {
  const [active, setActive] = useState("home");

  const items: SidebarItem[] = [
    {
      id: "home",
      label: "Início",
      icon: <HomeIcon className="h-5 w-5" />,
      onClick: () => setActive("home"),
      section: "Geral",
    },
    {
      id: "contacts",
      label: "Contatos",
      icon: <UsersIcon className="h-5 w-5" />,
      badge: "12",
      onClick: () => setActive("contacts"),
      section: "Geral",
    },
    {
      id: "messages",
      label: "Mensagens",
      icon: <ChatIcon className="h-5 w-5" />,
      onClick: () => setActive("messages"),
      section: "Geral",
    },
    {
      id: "settings",
      label: "Configurações",
      icon: <SettingsIcon className="h-5 w-5" />,
      onClick: () => setActive("settings"),
      section: "Admin",
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
    >
      <h2 className="text-lg font-semibold">Tela: {active}</h2>
      <p className="mt-2 text-sm text-black/60 dark:text-white/60">
        Sidebar profissional com ícones, seções, busca e modo compacto
        (Ctrl/⌘+B).
      </p>
    </SidebarLayout>
  );
}
