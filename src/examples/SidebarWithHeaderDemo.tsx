import React, { useState } from "react";
import SidebarWithHeaderLayout from "../layouts/SidebarWithHeaderLayout";
import type { SidebarLink } from "../layouts/SidebarWithHeaderLayout";

function Icon({ t }: { t: string }) {
  return <span className="text-xs font-semibold">{t}</span>;
}

export default function SidebarWithHeaderDemo() {
  const [active, setActive] = useState("dashboard");

  const links: SidebarLink[] = [
    {
      id: "dashboard",
      label: "Dashboard",
      icon: <Icon t="D" />,
      onClick: () => setActive("dashboard"),
    },
    {
      id: "team",
      label: "Team",
      icon: <Icon t="T" />,
      onClick: () => setActive("team"),
    },
    {
      id: "projects",
      label: "Projects",
      icon: <Icon t="P" />,
      onClick: () => setActive("projects"),
    },
    {
      id: "calendar",
      label: "Calendar",
      icon: <Icon t="C" />,
      onClick: () => setActive("calendar"),
    },
    {
      id: "documents",
      label: "Documents",
      icon: <Icon t="Doc" />,
      onClick: () => setActive("documents"),
    },
    {
      id: "reports",
      label: "Reports",
      icon: <Icon t="R" />,
      onClick: () => setActive("reports"),
    },
    {
      id: "settings",
      label: "Settings",
      icon: <Icon t="S" />,
      onClick: () => setActive("settings"),
    },
  ];

  return (
    <SidebarWithHeaderLayout
      title="Sidebar with header"
      links={links}
      activeId={active}
      user={{ name: "Tom Cook", email: "tom@example.com" }}
    >
      <div className="text-sm text-zinc-600">
        Conteúdo: <strong>{active}</strong>
      </div>
    </SidebarWithHeaderLayout>
  );
}
