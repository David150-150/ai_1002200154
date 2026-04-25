// frontend/components/ChunkGrid.tsx
"use client";

import { useState } from "react";
import { ChunkResult } from "@/lib/api";

function scoreColor(score: number) {
  if (score >= 0.8) return { badge: "text-green-700 bg-green-100 border-green-300", bar: "bg-green-500" };
  if (score >= 0.6) return { badge: "text-teal-700 bg-teal-100 border-teal-300", bar: "bg-teal-500" };
  if (score >= 0.4) return { badge: "text-orange-700 bg-orange-100 border-orange-300", bar: "bg-orange-500" };
  return { badge: "text-red-700 bg-red-100 border-red-300", bar: "bg-red-500" };
}

function ChunkCard({ chunk, index }: { chunk: ChunkResult; index: number }) {
  const [expanded, setExpanded] = useState(false);
  const colors = scoreColor(chunk.final_score);
  const filename = chunk.source.split(/[\\/]/).pop() ?? chunk.source;

  return (
    <div className="group bg-white border-2 border-stone-200 rounded-2xl p-6 hover:border-orange-300 hover:shadow-lg hover:shadow-orange-100/50 transition-all duration-300">
      {/* Card header */}
      <div className="flex items-start justify-between mb-4 gap-2">
        <div className="flex items-center gap-3 min-w-0">
          <div className="w-8 h-8 rounded-lg bg-orange-100 text-orange-600 flex items-center justify-center flex-shrink-0 text-xs font-bold">
            {index + 1}
          </div>
          <div className="flex-1 min-w-0">
            <p className="text-xs text-stone-500 uppercase tracking-wider font-semibold">Source</p>
            <span className="text-sm font-semibold text-stone-900 truncate block" title={filename}>
              {filename}
            </span>
          </div>
        </div>
        <span
          className={`flex-shrink-0 text-xs font-bold px-3 py-1 rounded-full border-2 ${colors.badge}`}
        >
          {(chunk.final_score * 100).toFixed(0)}%
        </span>
      </div>

      {/* Score bar */}
      <div className="mb-5">
        <div className="h-2 w-full bg-stone-200 rounded-full overflow-hidden">
          <div
            className={`h-full rounded-full transition-all duration-500 ${colors.bar}`}
            style={{ width: `${chunk.final_score * 100}%` }}
          />
        </div>
      </div>

      {/* Score breakdown */}
      <div className="grid grid-cols-3 gap-3 mb-5 p-3 bg-stone-50 rounded-lg border border-stone-200">
        {[
          { label: "Vector", value: chunk.vector_score },
          { label: "Keyword", value: chunk.keyword_score },
          { label: "Domain", value: chunk.domain_score },
        ].map(({ label, value }) => (
          <div key={label} className="text-center">
            <p className="text-xs text-stone-600 font-bold uppercase tracking-widest">{label}</p>
            <p className="text-sm font-mono text-stone-900 font-semibold">{value.toFixed(2)}</p>
          </div>
        ))}
      </div>

      {/* Text excerpt */}
      <p
        className={`text-sm text-stone-700 leading-relaxed transition-all duration-200 ${
          expanded ? "" : "line-clamp-3"
        }`}
      >
        {chunk.text}
      </p>

      {chunk.text.length > 200 && (
        <button
          onClick={() => setExpanded(!expanded)}
          className="mt-3 text-sm font-medium text-orange-600 hover:text-orange-700 transition-colors"
        >
          {expanded ? "Show less" : "Show more"}
        </button>
      )}

      {/* Metadata tags */}
      {chunk.metadata && Object.keys(chunk.metadata).length > 0 && (
        <div className="mt-4 flex flex-wrap gap-2">
          {Object.entries(chunk.metadata)
            .slice(0, 3)
            .map(([k, v]) => (
              <span
                key={k}
                className="text-xs px-3 py-1 rounded-full bg-stone-100 text-stone-700 font-mono border border-stone-300"
              >
                {k}: {String(v).slice(0, 20)}
              </span>
            ))}
        </div>
      )}
    </div>
  );
}

interface Props {
  chunks: ChunkResult[];
}

export default function ChunkGrid({ chunks }: Props) {
  if (chunks.length === 0) return null;

  return (
    <section className="space-y-6">
      {/* Section header */}
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-3">
          <h2 className="text-lg font-bold text-stone-900">Retrieved Sources</h2>
          <span className="text-xs font-bold px-3 py-1 rounded-full bg-orange-100 text-orange-700 border border-orange-300">
            {chunks.length} {chunks.length === 1 ? "fragment" : "fragments"}
          </span>
        </div>
        <div className="flex items-center gap-3">
          {/* Score legend */}
          {[
            { label: "High", color: "bg-green-500" },
            { label: "Mid", color: "bg-teal-500" },
            { label: "Low", color: "bg-orange-500" },
          ].map(({ label, color }) => (
            <div key={label} className="flex items-center gap-2">
              <span className={`w-2.5 h-2.5 rounded-full ${color}`} />
              <span className="text-xs text-stone-600 font-medium">{label}</span>
            </div>
          ))}
        </div>
      </div>

      {/* Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {chunks.map((chunk, i) => (
          <ChunkCard key={`${chunk.source}-${i}`} chunk={chunk} index={i} />
        ))}
      </div>
    </section>
  );
}
