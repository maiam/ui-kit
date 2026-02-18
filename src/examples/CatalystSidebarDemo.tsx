import React, { useState } from "react";
import CatalystSidebarLayout from "../layouts/CatalystSidebarLayout";
import type { NavItem } from "../layouts/CatalystSidebarLayout";

function IconBox({ label }: { label: string }) {
  return (
    <span className="text-[11px] font-semibold leading-none">{label}</span>
  );
}

export default function CatalystSidebarDemo() {
  const [active, setActive] = useState("orders");

  const navItems: NavItem[] = [
    {
      id: "home",
      label: "Home",
      icon: <IconBox label="H" />,
      onClick: () => setActive("home"),
    },
    {
      id: "events",
      label: "Events",
      icon: <IconBox label="E" />,
      onClick: () => setActive("events"),
    },
    {
      id: "orders",
      label: "Orders",
      icon: <IconBox label="O" />,
      onClick: () => setActive("orders"),
    },
    {
      id: "broadcasts",
      label: "Broadcasts",
      icon: <IconBox label="B" />,
      onClick: () => setActive("broadcasts"),
    },
    {
      id: "settings",
      label: "Settings",
      icon: <IconBox label="S" />,
      onClick: () => setActive("settings"),
    },

    {
      id: "up1",
      label: "Bear Hug: Live in Concert",
      section: "Upcoming Events",
      onClick: () => setActive("up1"),
    },
    {
      id: "up2",
      label: "Viking People",
      section: "Upcoming Events",
      onClick: () => setActive("up2"),
    },
    {
      id: "up3",
      label: "Six Fingers — DJ Set",
      section: "Upcoming Events",
      onClick: () => setActive("up3"),
    },
    {
      id: "up4",
      label: "We All Look The Same",
      section: "Upcoming Events",
      onClick: () => setActive("up4"),
    },
  ];

  return (
    <CatalystSidebarLayout
      brandName="Tailwind Labs"
      title="Orders"
      activeId={active}
      railItems={[
        {
          id: "r1",
          icon: <IconBox label="⌂" />,
          onClick: () => setActive("home"),
        },
        {
          id: "r2",
          icon: <IconBox label="★" />,
          onClick: () => setActive("orders"),
        },
      ]}
      navItems={navItems}
      footerLinks={[
        {
          label: "Support",
          icon: <IconBox label="?" />,
          onClick: () => alert("Support"),
        },
        {
          label: "Changelog",
          icon: <IconBox label="✦" />,
          onClick: () => alert("Changelog"),
        },
      ]}
    >
      <div className="text-sm text-zinc-600 dark:text-zinc-300">
        Conteúdo da página <strong>{active}</strong>.
      </div>
    </CatalystSidebarLayout>
  );
}
