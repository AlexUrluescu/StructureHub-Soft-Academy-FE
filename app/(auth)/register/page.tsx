"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import { User, Mail, Lock, ShieldCheck } from "lucide-react";
import { NeonInput } from "@/components/NeonInput";

export default function RegisterPage() {
  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.95 }}
      animate={{ opacity: 1, scale: 1 }}
      className="w-full max-w-md bg-black/40 backdrop-blur-xl border border-white/10 p-8 rounded-2xl shadow-2xl relative overflow-hidden"
    >
      <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-transparent via-purple-500 to-transparent opacity-50" />

      <div className="text-center mb-8">
        <div className="inline-flex justify-center items-center w-12 h-12 rounded-xl bg-purple-500/10 mb-4 text-purple-400">
          <ShieldCheck className="w-6 h-6" />
        </div>
        <h2 className="text-2xl font-bold text-white tracking-wide">
          Create Identity
        </h2>
        <p className="text-slate-400 text-sm mt-1">Join the secure network.</p>
      </div>

      <form className="space-y-4">
        <div className="grid grid-cols-2 gap-4">
          <NeonInput
            type="text"
            placeholder="First Name"
            icon={<User className="w-5 h-5" />}
          />
          <NeonInput type="text" placeholder="Last Name" />
        </div>

        <NeonInput
          type="email"
          placeholder="email@domain.com"
          icon={<Mail className="w-5 h-5" />}
        />

        <NeonInput
          type="password"
          placeholder="Set Password"
          icon={<Lock className="w-5 h-5" />}
        />

        <button className="w-full py-3 bg-gradient-to-r from-purple-600 to-pink-600 text-white font-bold rounded-lg shadow-[0_0_20px_rgba(147,51,234,0.3)] hover:shadow-[0_0_30px_rgba(147,51,234,0.5)] transition-all duration-300 transform hover:-translate-y-0.5">
          ESTABLISH LINK
        </button>
      </form>

      <div className="mt-8 text-center text-sm text-slate-500">
        Already registered?{" "}
        <Link
          href="/login"
          className="text-purple-400 hover:text-purple-300 font-medium transition-colors"
        >
          Access Log
        </Link>
      </div>
    </motion.div>
  );
}
