import React from "react";

type IconProps = React.SVGProps<SVGSVGElement>;

function BaseIcon({
  children,
  ...props
}: IconProps & { children: React.ReactNode }) {
  return (
    <svg viewBox="0 0 24 24" fill="none" aria-hidden="true" {...props}>
      {children}
    </svg>
  );
}

export function HomeIcon(props: IconProps) {
  return (
    <BaseIcon {...props}>
      <path
        d="M4 11.5 12 4l8 7.5V20a1 1 0 0 1-1 1h-5v-6H10v6H5a1 1 0 0 1-1-1v-8.5Z"
        className="stroke-current"
        strokeWidth="2"
        strokeLinejoin="round"
      />
    </BaseIcon>
  );
}

export function UsersIcon(props: IconProps) {
  return (
    <BaseIcon {...props}>
      <path
        d="M16 18c1.7 0 3 1.3 3 3M5 21c0-1.7 1.3-3 3-3m0 0h8M8 18c-2.2 0-4-1.8-4-4 0-1.7 1-3.1 2.5-3.7M16 18c2.2 0 4-1.8 4-4 0-1.7-1-3.1-2.5-3.7M9 13a3 3 0 1 0 0-6 3 3 0 0 0 0 6Zm6 0a3 3 0 1 0 0-6 3 3 0 0 0 0 6Z"
        className="stroke-current"
        strokeWidth="2"
        strokeLinecap="round"
      />
    </BaseIcon>
  );
}

export function ChatIcon(props: IconProps) {
  return (
    <BaseIcon {...props}>
      <path
        d="M6 18.5 4 20V6a2 2 0 0 1 2-2h12a2 2 0 0 1 2 2v9a2 2 0 0 1-2 2H8l-2 1.5Z"
        className="stroke-current"
        strokeWidth="2"
        strokeLinejoin="round"
      />
      <path
        d="M8 9h8M8 12h6"
        className="stroke-current"
        strokeWidth="2"
        strokeLinecap="round"
      />
    </BaseIcon>
  );
}

export function SettingsIcon(props: IconProps) {
  return (
    <BaseIcon {...props}>
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
    </BaseIcon>
  );
}

export function SearchIcon(props: IconProps) {
  return (
    <BaseIcon {...props}>
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
    </BaseIcon>
  );
}
