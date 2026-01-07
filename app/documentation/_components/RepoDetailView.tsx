"use client";

import { useState, useEffect, useRef } from "react";
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
import { motion } from "framer-motion";
import axios from "axios";
import ReactMarkdown from "react-markdown";
import mermaid from "mermaid";
import MermaidDiagram from "./MermaidDiagram";
import RefreshCw from "./IconHelper";

if (typeof window !== "undefined") {
  mermaid.initialize({ startOnLoad: false, theme: "dark" });
}

interface RepoDetailViewProps {
  repo: {
    id: string;
    name: string;
    description: string;
    language: string;
    stars: number;
    lastUpdated: string;
    branch: string;
    html_url: string;
  };
  authToken: string;
}

interface JobResult {
  summary: string;
  architecture_diagram: string;
  files: any[];
  readme: string;
}

export default function RepoDetailView({
  repo,
  authToken,
}: RepoDetailViewProps) {
  const [isGenerating, setIsGenerating] = useState(false);
  const [logs, setLogs] = useState<string[]>([]);
  const [jobId, setJobId] = useState<number | null>(null);
  const [result, setResult] = useState<JobResult | null>(null);
  const [pollingInterval, setPollingInterval] = useState<NodeJS.Timeout | null>(
    null
  );

  const handleGenerate = async () => {
    setIsGenerating(true);
    setLogs((prev) => [...prev, "> Initializing connection to Neural Core..."]);

    const data = {
      repo_url: repo.html_url,
      repo_name: repo.name,
    };
    console.log("Sending data to backend:", data);

    try {
      // Call Laravel Endpoint
      const response = await axios.post(
        "http://localhost:8000/api/generate",
        {
          repo_url: repo.html_url,
          repo_name: repo.name,
        },
        {
          // ADD HEADERS HERE
          headers: {
            Authorization: `Bearer ${authToken}`,
            Accept: "application/json",
          },
        }
      );

      console.log("Response from /api/generate:", response.data);

      const { job_id } = response.data;
      setJobId(job_id);
      setLogs((prev) => [...prev, `> Job #${job_id} queued successfully.`]);
    } catch (error) {
      console.error(error);
      setLogs((prev) => [...prev, "> ❌ Error: Failed to contact backend."]);
      setIsGenerating(false);
    }
  };

  useEffect(() => {
    if (!jobId) return;

    const poll = setInterval(async () => {
      try {
        const res = await axios.get(
          `http://localhost:8000/api/generate/status/${jobId}`,
          {
            headers: {
              Authorization: `Bearer ${authToken}`,
              Accept: "application/json",
            },
          }
        );
        const status = res.data.status;

        if (status === "pending") {
          setLogs((prev) => {
            if (
              prev[prev.length - 1] ===
              "> System is analyzing repository structure..."
            )
              return prev;
            return [...prev, "> System is analyzing repository structure..."];
          });
        } else if (status === "completed") {
          setLogs((prev) => [
            ...prev,
            "> ✅ Analysis Complete. Rendering Output.",
          ]);
          setResult(res.data.result);
          setIsGenerating(false);
          setJobId(null);
        } else if (status === "failed") {
          setLogs((prev) => [...prev, "> ❌ Job failed on server side."]);
          setIsGenerating(false);
          setJobId(null);
        }
      } catch (e) {
        console.error("Polling error", e);
      }
    }, 3000);

    setPollingInterval(poll);

    return () => clearInterval(poll);
  }, [jobId]);

  return (
    <div className="space-y-6">
      <Link
        href="/dashboard"
        className="inline-flex items-center text-slate-400 hover:text-cyan-400 transition-colors gap-2 text-sm mb-4 group"
      >
        <ArrowLeft className="w-4 h-4 group-hover:-translate-x-1 transition-transform" />
        Back to Command Center
      </Link>

      <div className="bg-slate-900/50 border border-white/10 rounded-xl p-6 backdrop-blur-sm relative overflow-hidden">
        <div className="relative z-10">
          <h1 className="text-3xl font-bold text-white mb-2">{repo.name}</h1>
          <p className="text-slate-400">{repo.description}</p>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <div className="lg:col-span-1 space-y-6">
          <div className="bg-gradient-to-br from-slate-900 to-slate-950 border border-white/10 rounded-xl p-6">
            <h2 className="text-white font-semibold flex items-center gap-2 mb-4">
              <Bot className="w-5 h-5 text-cyan-400" />
              Generator Controls
            </h2>
            <p className="text-sm text-slate-400 mb-6">
              Initiate the neural network to parse your codebase.
            </p>

            <button
              onClick={handleGenerate}
              disabled={isGenerating || !!result}
              className={`w-full py-4 rounded-lg font-bold flex items-center justify-center gap-2 transition-all relative overflow-hidden group ${
                isGenerating || result
                  ? "bg-slate-800 text-slate-500 cursor-not-allowed"
                  : "bg-cyan-600 hover:bg-cyan-500 text-white shadow-lg shadow-cyan-900/20"
              }`}
            >
              {isGenerating ? (
                <RefreshCw className="w-5 h-5 animate-spin" />
              ) : result ? (
                <>Done</>
              ) : (
                <>
                  <Zap className="w-5 h-5" />
                  Generate Documentation
                </>
              )}
            </button>
          </div>
        </div>
      </div>
      <div className="lg:col-span-2">
        <div className="bg-[#0c0c14] border border-white/10 rounded-xl overflow-hidden flex flex-col min-h-[400px]">
          <div className="bg-white/5 px-4 py-2 border-b border-white/5 flex items-center justify-between">
            <div className="flex items-center gap-2">
              <Terminal className="w-4 h-4 text-slate-500" />
              <span className="text-xs font-mono text-slate-400">
                system_output.log
              </span>
            </div>
          </div>

          <div className="p-6 font-mono text-sm overflow-y-auto flex-1 max-h-[600px]">
            {!result && (
              <div className="space-y-2 mb-6">
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
                {isGenerating && (
                  <div className="text-slate-500 animate-pulse">_</div>
                )}
              </div>
            )}

            {result && (
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                className="space-y-8"
              >
                <div className="prose prose-invert max-w-none">
                  <h2 className="text-xl text-green-400">Analysis Summary</h2>
                  <p className="text-slate-300">{result.summary}</p>
                </div>

                {result.architecture_diagram && (
                  <div className="border border-white/10 rounded p-4 bg-slate-900/50">
                    <h3 className="text-sm text-slate-400 mb-2 uppercase tracking-wider">
                      Architecture Diagram
                    </h3>
                    <MermaidDiagram code={result.architecture_diagram} />
                  </div>
                )}

                <div className="prose prose-invert max-w-none bg-white/5 p-6 rounded-lg">
                  <ReactMarkdown>{result.readme}</ReactMarkdown>
                </div>
              </motion.div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
