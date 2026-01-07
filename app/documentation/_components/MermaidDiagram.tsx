"use client";
import mermaid from "mermaid";
import { useEffect, useRef, useState } from "react";

const MermaidDiagram = ({ code }: { code: string }) => {
  const ref = useRef<HTMLDivElement>(null);
  const [elementId] = useState(
    `mermaid-${Math.random().toString(36).substr(2, 9)}`
  );
  const [renderError, setRenderError] = useState<string | null>(null);

  useEffect(() => {
    const renderDiagram = async () => {
      if (!ref.current || !code) return;

      try {
        const cleanCode = code
          .replace(/```mermaid/g, "")
          .replace(/```/g, "")
          .trim();

        const { svg } = await mermaid.render(elementId, cleanCode);

        ref.current.innerHTML = svg;
        setRenderError(null);
      } catch (error: any) {
        console.error("Mermaid Render Error:", error);

        setRenderError(error.message || "Invalid Mermaid Syntax");
      }
    };

    const timeout = setTimeout(renderDiagram, 100);
    return () => clearTimeout(timeout);
  }, [code, elementId]);

  return (
    <div className="flex flex-col items-center w-full">
      {renderError ? (
        <div className="text-red-400 text-xs font-mono bg-red-900/20 p-2 rounded border border-red-900/50 w-full">
          Error: {renderError}
          <br />
          <span className="opacity-50 mt-1 block">
            Raw Code: {code.slice(0, 50)}...
          </span>
        </div>
      ) : (
        <div
          key={elementId}
          ref={ref}
          className="mermaid w-full flex justify-center bg-slate-800/50 p-4 rounded"
        />
      )}
    </div>
  );
};

export default MermaidDiagram;
