"use client";

import { useState } from "react";

interface AdminLoginModalProps {
  isOpen: boolean;
  onClose: () => void;
  onLoginSuccess: () => void;
}

export default function AdminLoginModal({ isOpen, onClose, onLoginSuccess }: AdminLoginModalProps) {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");

  if (!isOpen) return null;

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();
    
    // Default admin credentials (apni icchemoto change korte paren)
    if (username === "admin" && password === "123456") {
      setError("");
      onLoginSuccess();
      onClose();
    } else {
      setError("Username ba password vul hoyeche!");
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/75 p-4 backdrop-blur-sm">
      <div className="w-full max-w-sm rounded-2xl border border-zinc-800 bg-zinc-900 p-6 shadow-2xl">
        <h2 className="text-lg font-bold text-white">Admin Login</h2>
        <p className="mt-1 text-xs text-zinc-400">Stock add ba delete korte admin access lagbe.</p>

        {error && (
          <p className="mt-3 rounded-md bg-rose-500/10 p-2 text-xs text-rose-400">
            {error}
          </p>
        )}

        <form onSubmit={handleLogin} className="mt-4 space-y-3">
          <div>
            <label className="text-xs text-zinc-400">Username</label>
            <input
              type="text"
              required
              placeholder="e.g. admin"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              className="mt-1 w-full rounded-lg border border-zinc-700 bg-zinc-800 px-3 py-2 text-sm text-white focus:border-emerald-500 focus:outline-none"
            />
          </div>

          <div>
            <label className="text-xs text-zinc-400">Password</label>
            <input
              type="password"
              required
              placeholder="******"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="mt-1 w-full rounded-lg border border-zinc-700 bg-zinc-800 px-3 py-2 text-sm text-white focus:border-emerald-500 focus:outline-none"
            />
          </div>

          <div className="mt-5 flex justify-end gap-2">
            <button
              type="button"
              onClick={onClose}
              className="rounded-lg px-3 py-1.5 text-xs text-zinc-400 hover:text-white"
            >
              Cancel
            </button>
            <button
              type="submit"
              className="rounded-lg bg-emerald-500 px-4 py-1.5 text-xs font-semibold text-black hover:bg-emerald-400"
            >
              Login
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}