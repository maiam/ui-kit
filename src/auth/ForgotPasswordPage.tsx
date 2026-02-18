import React, { useState } from "react";
import AuthLayout from "./AuthLayout";
import Input from "../components/Input";
import Button from "../components/Button";

export default function ForgotPasswordPage() {
  const [sent, setSent] = useState(false);
  const [loading, setLoading] = useState(false);

  async function onSubmit(e: React.FormEvent) {
    e.preventDefault();
    setLoading(true);
    try {
      await new Promise((r) => setTimeout(r, 600));
      setSent(true);
    } finally {
      setLoading(false);
    }
  }

  return (
    <AuthLayout
      brand="maiam-apps"
      title="Recuperar senha"
      subtitle="Vamos enviar um link de reset para o seu email."
    >
      {sent ? (
        <div className="space-y-4">
          <p className="text-sm text-black/70 dark:text-white/70">
            Se esse email existir, você receberá um link em instantes.
          </p>
          <Button full type="button" onClick={() => setSent(false)}>
            Enviar novamente
          </Button>
          <a
            className="block text-center text-sm underline underline-offset-4 opacity-80 hover:opacity-100"
            href="/auth/login"
          >
            Voltar para login
          </a>
        </div>
      ) : (
        <form className="space-y-4" onSubmit={onSubmit}>
          <Input
            name="email"
            type="email"
            label="Email"
            placeholder="voce@exemplo.com"
            autoComplete="email"
          />
          <Button full type="submit" disabled={loading}>
            {loading ? "Enviando..." : "Enviar link"}
          </Button>
          <a
            className="block text-center text-sm underline underline-offset-4 opacity-80 hover:opacity-100"
            href="/auth/login"
          >
            Voltar para login
          </a>
        </form>
      )}
    </AuthLayout>
  );
}
