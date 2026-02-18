import React from "react";
import Card from "../components/Card";
import ThemeToggle from "../components/ThemeToggle";

export default function AuthLayout({
  title,
  subtitle,
  children,
  brand = "maiam-apps",
}: {
  title: string;
  subtitle?: string;
  brand?: string;
  children: React.ReactNode;
}) {
  return (
    <div className="min-h-screen bg-white text-black dark:bg-black dark:text-white">
      <div className="mx-auto grid min-h-screen max-w-6xl grid-cols-1 lg:grid-cols-2">
        {/* Lado branding */}
        <div className="relative hidden lg:flex">
          <div className="absolute inset-0  bg-white text-black dark:bg-black dark:text-white" />
          <div className="relative flex w-full flex-col justify-between p-10">
            <div className="flex items-center justify-between">
              <div className="text-sm font-semibold tracking-tight">
                {brand}
              </div>
              <ThemeToggle />
            </div>

            <div className="space-y-3">
              <div className="text-4xl font-semibold leading-tight tracking-tight">
                {title}
              </div>
              {subtitle ? (
                <p className="max-w-md text-base text-black/60 dark:text-white/60">
                  {subtitle}
                </p>
              ) : null}
            </div>

            <p className="text-xs text-black/45 dark:text-white/45">
              © {new Date().getFullYear()} {brand}. All rights reserved.
            </p>
          </div>
        </div>

        {/* Lado form */}
        <div className="flex items-center justify-center p-6 lg:p-10">
          <div className="w-full max-w-md space-y-4">
            <div className="flex items-center justify-between lg:hidden">
              <div className="text-sm font-semibold tracking-tight">
                {brand}
              </div>
              <ThemeToggle />
            </div>

            <Card className="p-6">
              <div className="mb-5 space-y-1">
                <h1 className="text-xl font-semibold tracking-tight">
                  {title}
                </h1>
                {subtitle ? (
                  <p className="text-sm text-black/60 dark:text-white/60">
                    {subtitle}
                  </p>
                ) : null}
              </div>

              {children}
            </Card>

            <p className="text-center text-xs text-black/45 dark:text-white/45">
              Feito com Tailwind.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
