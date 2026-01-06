"use client";

import { useState } from "react";
import {
  Bot,
  FileText,
  Terminal,
  ArrowLeft,
  GitBranch,
  Star,
  Clock,
  Zap,
} from "lucide-react";
import Link from "next/link";
import { motion, AnimatePresence } from "framer-motion";

interface RepoDetailViewProps {
  repo: {
    id: string;
    name: string;
    description: string;
    language: string;
    stars: number;
    lastUpdated: string;
    branch: string;
  };
}

export default function RepoDetailView({ repo }: RepoDetailViewProps) {
  const [isGenerating, setIsGenerating] = useState(false);
  const [logs, setLogs] = useState<string[]>([]);
  const [showDocs, setShowDocs] = useState(false);

  const handleGenerate = async () => {
    setIsGenerating(true);
    setLogs([]);
    setShowDocs(false);

    // Simulate a "Neural Processing" sequence
    const steps = [
      "Initializing neural link...",
      `Scanning repository: ${repo.name}...`,
      "Parsing Abstract Syntax Tree...",
      "Identifying dependencies...",
      "Synthesizing documentation modules...",
      "Finalizing output...",
    ];

    for (const step of steps) {
      setLogs((prev) => [...prev, `> ${step}`]);
      await new Promise((r) => setTimeout(r, 800)); // Fake delay
    }

    // Call your actual API here later
    // await fetch(`/api/generate/${repo.id}`);

    setIsGenerating(false);
    setShowDocs(true);
  };

  return (
    <div className="space-y-6">
      {/* Navigation Breadcrumb */}
      <Link
        href="/dashboard"
        className="inline-flex items-center text-slate-400 hover:text-cyan-400 transition-colors gap-2 text-sm mb-4 group"
      >
        <ArrowLeft className="w-4 h-4 group-hover:-translate-x-1 transition-transform" />
        Back to Command Center
      </Link>

      {/* Header Card */}
      <div className="bg-slate-900/50 border border-white/10 rounded-xl p-6 backdrop-blur-sm relative overflow-hidden">
        <div className="absolute top-0 right-0 p-4 opacity-10">
          <FileText className="w-32 h-32 text-cyan-500" />
        </div>

        <div className="relative z-10">
          <div className="flex items-start justify-between mb-4">
            <div>
              <h1 className="text-3xl font-bold text-white mb-2 flex items-center gap-3">
                {repo.name}
                <span className="px-3 py-1 rounded-full bg-cyan-500/10 border border-cyan-500/20 text-cyan-400 text-xs font-mono">
                  {repo.language}
                </span>
              </h1>
              <p className="text-slate-400 max-w-2xl text-lg">
                {repo.description}
              </p>
            </div>
          </div>

          <div className="flex gap-6 text-sm text-slate-400 border-t border-white/5 pt-4 mt-4">
            <div className="flex items-center gap-2">
              <GitBranch className="w-4 h-4 text-purple-400" />
              <span>{repo.branch}</span>
            </div>
            <div className="flex items-center gap-2">
              <Star className="w-4 h-4 text-yellow-400" />
              <span>{repo.stars} stars</span>
            </div>
            <div className="flex items-center gap-2">
              <Clock className="w-4 h-4 text-blue-400" />
              <span>Updated {repo.lastUpdated}</span>
            </div>
          </div>
        </div>
      </div>

      {/* Action Area */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Left Column: Controls */}
        <div className="lg:col-span-1 space-y-6">
          <div className="bg-gradient-to-br from-slate-900 to-slate-950 border border-white/10 rounded-xl p-6">
            <h2 className="text-white font-semibold flex items-center gap-2 mb-4">
              <Bot className="w-5 h-5 text-cyan-400" />
              Generator Controls
            </h2>

            <p className="text-sm text-slate-400 mb-6">
              Initiate the neural network to parse your codebase and generate
              comprehensive markdown documentation.
            </p>

            <button
              onClick={handleGenerate}
              disabled={isGenerating}
              className={`w-full py-4 rounded-lg font-bold flex items-center justify-center gap-2 transition-all relative overflow-hidden group ${
                isGenerating
                  ? "bg-slate-800 text-slate-500 cursor-not-allowed"
                  : "bg-cyan-600 hover:bg-cyan-500 text-white shadow-lg shadow-cyan-900/20"
              }`}
            >
              {isGenerating ? (
                <>
                  <RefreshCw className="w-5 h-5 animate-spin" />
                  Processing...
                </>
              ) : (
                <>
                  <Zap className="w-5 h-5 group-hover:scale-110 transition-transform" />
                  Generate Documentation
                </>
              )}
            </button>
          </div>
        </div>

        {/* Right Column: Terminal / Output */}
        <div className="lg:col-span-2">
          <div className="bg-[#0c0c14] border border-white/10 rounded-xl overflow-hidden flex flex-col min-h-[400px]">
            {/* Terminal Header */}
            <div className="bg-white/5 px-4 py-2 border-b border-white/5 flex items-center justify-between">
              <div className="flex items-center gap-2">
                <Terminal className="w-4 h-4 text-slate-500" />
                <span className="text-xs font-mono text-slate-400">
                  system_output.log
                </span>
              </div>
              <div className="flex gap-1.5">
                <div className="w-2.5 h-2.5 rounded-full bg-red-500/20" />
                <div className="w-2.5 h-2.5 rounded-full bg-yellow-500/20" />
                <div className="w-2.5 h-2.5 rounded-full bg-green-500/20" />
              </div>
            </div>

            {/* Terminal Content */}
            <div className="p-6 font-mono text-sm overflow-y-auto flex-1">
              {!isGenerating && logs.length === 0 && !showDocs && (
                <div className="h-full flex flex-col items-center justify-center text-slate-600 gap-3">
                  <Terminal className="w-12 h-12 opacity-20" />
                  <p>Ready to analyze repository...</p>
                </div>
              )}

              <div className="space-y-2">
                {logs.map((log, i) => (
                  <motion.div
                    key={i}
                    initial={{ opacity: 0, x: -10 }}
                    animate={{ opacity: 1, x: 0 }}
                    className="text-cyan-400/80"
                  >
                    {log}
                  </motion.div>
                ))}

                {showDocs && (
                  <motion.div
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    className="mt-6 pt-6 border-t border-dashed border-white/10 text-slate-300"
                  >
                    <div className="flex items-center gap-2 text-green-400 mb-4">
                      <div className="w-2 h-2 bg-green-500 rounded-full animate-pulse" />
                      Documentation Generated Successfully
                    </div>
                    {/* Placeholder for MD Preview */}
                    <div className="bg-white/5 p-4 rounded border border-white/5">
                      <h1 className="text-xl font-bold text-white mb-2">
                        # {repo.name}
                      </h1>
                      <p className="mb-4">
                        This project implements a high-performance neural
                        network...
                      </p>
                      <h2 className="text-lg font-semibold text-white mb-2">
                        ## Installation
                      </h2>
                      <code className="bg-black/30 px-2 py-1 rounded text-cyan-300">
                        npm install {repo.name}
                      </code>
                    </div>
                  </motion.div>
                )}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

// Helper component for spinning icon
function RefreshCw({ className }: { className?: string }) {
  return (
    <svg
      className={className}
      xmlns="http://www.w3.org/2000/svg"
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <path d="M3 12a9 9 0 0 1 9-9 9.75 9.75 0 0 1 6.74 2.74L21 8" />
      <path d="M21 3v5h-5" />
      <path d="M21 12a9 9 0 0 1-9 9 9.75 9.75 0 0 1-6.74-2.74L3 16" />
      <path d="M3 21v-5h5" />
    </svg>
  );
}
