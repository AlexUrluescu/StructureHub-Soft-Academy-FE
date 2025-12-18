"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import { Mail, Lock, Fingerprint } from "lucide-react";
import { NeonInput } from "@/components/NeonInput"; // Import from step 2

export default function LoginPage() {
  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.95 }}
      animate={{ opacity: 1, scale: 1 }}
      className="w-full max-w-md bg-black/40 backdrop-blur-xl border border-white/10 p-8 rounded-2xl shadow-2xl relative overflow-hidden"
    >
      {/* Decorative Top Border */}
      <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-transparent via-cyan-500 to-transparent opacity-50" />

      <div className="text-center mb-8">
        <div className="inline-flex justify-center items-center w-12 h-12 rounded-xl bg-cyan-500/10 mb-4 text-cyan-400">
          <Fingerprint className="w-6 h-6" />
        </div>
        <h2 className="text-2xl font-bold text-white tracking-wide">
          Welcome Back
        </h2>
        <p className="text-slate-400 text-sm mt-1">
          Enter your credentials to access the grid.
        </p>
      </div>

      <form className="space-y-4">
        <NeonInput
          type="email"
          placeholder="user@neural-net.com"
          icon={<Mail className="w-5 h-5" />}
        />
        <NeonInput
          type="password"
          placeholder="••••••••"
          icon={<Lock className="w-5 h-5" />}
        />

        <div className="flex items-center justify-between text-xs text-slate-400">
          <label className="flex items-center gap-2 cursor-pointer hover:text-cyan-400 transition-colors">
            <input
              type="checkbox"
              className="rounded border-slate-700 bg-slate-800 text-cyan-500 focus:ring-offset-0 focus:ring-cyan-500/50"
            />
            Keep session active
          </label>
          <a href="#" className="hover:text-cyan-400 transition-colors">
            Recover Key?
          </a>
        </div>

        <button className="w-full py-3 bg-gradient-to-r from-cyan-600 to-blue-600 text-white font-bold rounded-lg shadow-[0_0_20px_rgba(8,145,178,0.3)] hover:shadow-[0_0_30px_rgba(8,145,178,0.5)] transition-all duration-300 transform hover:-translate-y-0.5">
          AUTHENTICATE
        </button>
      </form>

      <div className="mt-8 text-center text-sm text-slate-500">
        New to the network?{" "}
        <Link
          href="/register"
          className="text-cyan-400 hover:text-cyan-300 font-medium transition-colors"
        >
          Initialize ID
        </Link>
      </div>
    </motion.div>
  );
}
