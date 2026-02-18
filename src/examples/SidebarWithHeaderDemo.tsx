import React, { useState } from "react";
import SidebarWithHeaderLayout from "../layouts/SidebarWithHeaderLayout";
import type { SidebarLink } from "../layouts/SidebarWithHeaderLayout";

function HomeIcon() {
  return (
    <svg viewBox="0 0 24 24" fill="none" className="h-5 w-5">
      <path
        d="M4 11.5 12 4l8 7.5V20a1 1 0 0 1-1 1h-5v-6H10v6H5a1 1 0 0 1-1-1v-8.5Z"
        className="stroke-current"
        strokeWidth="2"
        strokeLinejoin="round"
      />
    </svg>
  );
}
function UsersIcon() {
  return (
    <svg viewBox="0 0 24 24" fill="none" className="h-5 w-5">
      <path
        d="M16 18c1.7 0 3 1.3 3 3M5 21c0-1.7 1.3-3 3-3m0 0h8M9 13a3 3 0 1 0 0-6 3 3 0 0 0 0 6Zm6 0a3 3 0 1 0 0-6 3 3 0 0 0 0 6Z"
        className="stroke-current"
        strokeWidth="2"
        strokeLinecap="round"
      />
    </svg>
  );
}
function FolderIcon() {
  return (
    <svg viewBox="0 0 24 24" fill="none" className="h-5 w-5">
      <path
        d="M3.5 7.5a2 2 0 0 1 2-2H9l2 2h7.5a2 2 0 0 1 2 2v9a2 2 0 0 1-2 2H5.5a2 2 0 0 1-2-2v-11Z"
        className="stroke-current"
        strokeWidth="2"
        strokeLinejoin="round"
      />
    </svg>
  );
}
function CalendarIcon() {
  return (
    <svg viewBox="0 0 24 24" fill="none" className="h-5 w-5">
      <path
        d="M7 3v2M17 3v2M4 8h16M6 6h12a2 2 0 0 1 2 2v12a2 2 0 0 1-2 2H6a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2Z"
        className="stroke-current"
        strokeWidth="2"
        strokeLinecap="round"
      />
    </svg>
  );
}
function DocIcon() {
  return (
    <svg viewBox="0 0 24 24" fill="none" className="h-5 w-5">
      <path
        d="M7 3h7l3 3v15a2 2 0 0 1-2 2H7a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2Z"
        className="stroke-current"
        strokeWidth="2"
        strokeLinejoin="round"
      />
      <path
        d="M14 3v4h4"
        className="stroke-current"
        strokeWidth="2"
        strokeLinejoin="round"
      />
    </svg>
  );
}
function ChartIcon() {
  return (
    <svg viewBox="0 0 24 24" fill="none" className="h-5 w-5">
      <path
        d="M4 19V5m0 14h16M8 17v-6M12 17V7M16 17v-4"
        className="stroke-current"
        strokeWidth="2"
        strokeLinecap="round"
      />
    </svg>
  );
}
function CogIcon() {
  return (
    <svg viewBox="0 0 24 24" fill="none" className="h-5 w-5">
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

export default function SidebarWithHeaderDemo() {
  const [active, setActive] = useState("dashboard");

  const links: SidebarLink[] = [
    {
      id: "dashboard",
      label: "Dashboard",
      icon: <HomeIcon />,
      onClick: () => setActive("dashboard"),
    },
    {
      id: "team",
      label: "Team",
      icon: <UsersIcon />,
      onClick: () => setActive("team"),
    },
    {
      id: "projects",
      label: "Projects",
      icon: <FolderIcon />,
      onClick: () => setActive("projects"),
    },
    {
      id: "calendar",
      label: "Calendar",
      icon: <CalendarIcon />,
      onClick: () => setActive("calendar"),
    },
    {
      id: "documents",
      label: "Documents",
      icon: <DocIcon />,
      onClick: () => setActive("documents"),
    },
    {
      id: "reports",
      label: "Reports",
      icon: <ChartIcon />,
      onClick: () => setActive("reports"),
    },
    {
      id: "settings",
      label: "Settings",
      icon: <CogIcon />,
      onClick: () => setActive("settings"),
    },
  ];

  return (
    <SidebarWithHeaderLayout
      title="Sidebar with header"
      links={links}
      activeId={active}
      user={{ name: "Tom Cook" }}
    >
      <div className="text-sm text-zinc-600 dark:text-zinc-300">
        Conteúdo: <strong>{active}</strong>
      </div>
    </SidebarWithHeaderLayout>
  );
}
