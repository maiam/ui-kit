import React, { useState } from "react";
import AuthLayout from "./AuthLayout";
import Input from "../components/Input";
import Button from "../components/Button";
import Divider from "../components/Divider";

export default function LoginPage() {
  const [loading, setLoading] = useState(false);

  async function onSubmit(e: React.FormEvent) {
    e.preventDefault();
    setLoading(true);
    try {
      await new Promise((r) => setTimeout(r, 600));
      // aqui você integraria com seu backend
    } finally {
      setLoading(false);
    }
  }

  return (
    <AuthLayout
      brand="maiam-apps"
      title="Entrar"
      subtitle="Acesse sua conta com email e senha."
    >
      <form className="space-y-4" onSubmit={onSubmit}>
        <Input
          name="email"
          type="email"
          label="Email"
          placeholder="voce@exemplo.com"
          autoComplete="email"
        />
        <Input
          name="password"
          type="password"
          label="Senha"
          placeholder="••••••••"
          autoComplete="current-password"
        />

        <div className="flex items-center justify-between">
          <label className="inline-flex items-center gap-2 text-sm text-black/70 dark:text-white/70">
            <input
              type="checkbox"
              className="h-4 w-4 rounded border-black/20 bg-white dark:border-white/20 dark:bg-black"
            />
            Lembrar
          </label>

          <a
            className="text-sm underline underline-offset-4 opacity-80 hover:opacity-100"
            href="/auth/forgot"
          >
            Esqueci a senha
          </a>
        </div>

        <Button full type="submit" disabled={loading}>
          {loading ? "Entrando..." : "Entrar"}
        </Button>

        <Divider label="ou" />

        <Button full type="button" variant="ghost">
          Continuar como convidado
        </Button>

        <p className="pt-2 text-center text-sm text-black/60 dark:text-white/60">
          Não tem conta?{" "}
          <a
            className="underline underline-offset-4 hover:opacity-100 opacity-80"
            href="/auth/register"
          >
            Criar conta
          </a>
        </p>
      </form>
    </AuthLayout>
  );
}
