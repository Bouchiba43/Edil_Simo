"use client";

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { auth, signInWithEmailAndPassword, onAuthStateChanged, signOut } from "@/lib/firebase";
import { isAllowedAdmin } from "@/lib/admin-emails";

export default function AdminLoginPage() {
  const router = useRouter();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const [checking, setChecking] = useState(true);

  useEffect(() => {
    const unsub = onAuthStateChanged(auth, async (user) => {
      if (user) {
        if (isAllowedAdmin(user.email)) {
          router.replace("/admin/dashboard/media");
        } else {
          await signOut(auth);
          setError("Accesso non autorizzato per questa email.");
          setChecking(false);
        }
      } else {
        setChecking(false);
      }
    });
    return unsub;
  }, [router]);

  async function handleLogin(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setError("");
    setLoading(true);
    try {
      const { user } = await signInWithEmailAndPassword(auth, email, password);
      if (!isAllowedAdmin(user.email)) {
        await signOut(auth);
        setError("Accesso non autorizzato per questa email.");
        return;
      }
      router.replace("/admin/dashboard/media");
    } catch {
      setError("Email o password non validi.");
    } finally {
      setLoading(false);
    }
  }

  if (checking) {
    return (
      <div className="flex min-h-screen items-center justify-center bg-neutral-900">
        <div className="h-8 w-8 animate-spin rounded-full border-4 border-amber-400 border-t-transparent" />
      </div>
    );
  }

  return (
    <div className="flex min-h-screen items-center justify-center bg-neutral-900 px-4">
      <div className="w-full max-w-sm">
        <div className="mb-8 text-center">
          <div className="mb-4 inline-flex h-14 w-14 items-center justify-center rounded-2xl bg-amber-400">
            <svg className="h-7 w-7 text-neutral-900" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
              <path strokeLinecap="round" strokeLinejoin="round" d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
            </svg>
          </div>
          <h1 className="text-2xl font-black text-white">Admin Dashboard</h1>
          <p className="mt-1 text-sm text-neutral-400">Accedi per gestire i contenuti</p>
        </div>

        <form onSubmit={handleLogin} className="space-y-4 rounded-2xl bg-neutral-800 p-8">
          <div>
            <label className="mb-1.5 block text-sm font-medium text-neutral-300" htmlFor="email">
              Email
            </label>
            <input
              id="email"
              type="email"
              required
              autoComplete="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="w-full rounded-lg border border-neutral-600 bg-neutral-700 px-4 py-3 text-white placeholder-neutral-400 focus:border-amber-400 focus:outline-none focus:ring-1 focus:ring-amber-400"
              placeholder="admin@esempio.it"
            />
          </div>

          <div>
            <label className="mb-1.5 block text-sm font-medium text-neutral-300" htmlFor="password">
              Password
            </label>
            <input
              id="password"
              type="password"
              required
              autoComplete="current-password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="w-full rounded-lg border border-neutral-600 bg-neutral-700 px-4 py-3 text-white placeholder-neutral-400 focus:border-amber-400 focus:outline-none focus:ring-1 focus:ring-amber-400"
              placeholder="••••••••"
            />
          </div>

          {error && (
            <p className="rounded-lg bg-red-500/10 px-4 py-3 text-sm text-red-400">{error}</p>
          )}

          <button
            type="submit"
            disabled={loading}
            className="w-full rounded-lg bg-amber-400 px-4 py-3 font-bold text-neutral-900 transition hover:bg-amber-300 disabled:cursor-not-allowed disabled:opacity-60"
          >
            {loading ? "Accesso in corso…" : "Accedi"}
          </button>
        </form>
      </div>
    </div>
  );
}
