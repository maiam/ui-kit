import React, { useState } from "react";
import AuthLayout from "./AuthLayout";
import Input from "../components/Input";
import Button from "../components/Button";

export default function RegisterPage() {
  const [loading, setLoading] = useState(false);

  async function onSubmit(e: React.FormEvent) {
    e.preventDefault();
    setLoading(true);
    try {
      await new Promise((r) => setTimeout(r, 700));
    } finally {
      setLoading(false);
    }
  }

  return (
    <AuthLayout
      brand="maiam-apps"
      title="Criar conta"
      subtitle="Crie sua conta em poucos segundos."
    >
      <form className="space-y-4" onSubmit={onSubmit}>
        <Input
          name="name"
          label="Nome"
          placeholder="Pedro"
          autoComplete="name"
        />
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
          autoComplete="new-password"
        />
        <Input
          name="password2"
          type="password"
          label="Confirmar senha"
          placeholder="••••••••"
          autoComplete="new-password"
        />

        <Button full type="submit" disabled={loading}>
          {loading ? "Criando..." : "Criar conta"}
        </Button>

        <p className="pt-2 text-center text-sm text-black/60 dark:text-white/60">
          Já tem conta?{" "}
          <a
            className="underline underline-offset-4 hover:opacity-100 opacity-80"
            href="/auth/login"
          >
            Entrar
          </a>
        </p>
      </form>
    </AuthLayout>
  );
}
