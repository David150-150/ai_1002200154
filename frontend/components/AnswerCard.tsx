// frontend/components/AnswerCard.tsx
"use client";

import { useState } from "react";
import { ChunkResult } from "@/lib/api";

interface Props {
  answer: string;
  pure_llm_answer?: string | null;
  chunks: ChunkResult[];
  prompt: string;
  model_used: string;
  query: string;
}

function SourcePill({ source }: { source: string }) {
  const filename = source.split(/[\\/]/).pop() ?? source;
  return (
    <button className="flex items-center gap-1.5 px-3 py-2 rounded-full bg-orange-100 border border-orange-200 text-orange-700 text-xs font-medium hover:bg-orange-200 transition-colors">
      <svg className="w-3 h-3" fill="currentColor" viewBox="0 0 24 24">
        <path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8l-8-6z" />
      </svg>
      <span>{filename}</span>
    </button>
  );
}

export default function AnswerCard({
  answer,
  pure_llm_answer,
  chunks,
  prompt,
  model_used,
  query,
}: Props) {
  const [showPrompt, setShowPrompt] = useState(false);
  const [showBaseline, setShowBaseline] = useState(false);

  // Deduplicate source filenames
  const sources = [...new Set(chunks.map((c) => c.source))];

  return (
    <div className="space-y-4 z-10">
      {/* Main answer card */}
      <article className="relative bg-white rounded-2xl border-2 border-stone-200 overflow-hidden shadow-md hover:shadow-lg transition-shadow">
        {/* Accent top bar */}
        <div className="h-1 bg-gradient-warm" />

        {/* Card header */}
        <div className="flex items-start gap-4 px-6 pt-6 pb-4">
          <div className="w-10 h-10 rounded-xl bg-gradient-warm text-white flex items-center justify-center flex-shrink-0 font-bold text-sm">
            A
          </div>
          <div className="flex-1 min-w-0">
            <div className="flex items-center gap-2 mb-2 flex-wrap">
              <h3 className="text-base font-bold text-stone-900">Answer</h3>
              <span className="text-xs font-mono text-orange-700 bg-orange-100 px-3 py-1 rounded-full">
                {model_used}
              </span>
            </div>
            <p className="text-xs text-stone-500 truncate">{query}</p>
          </div>
        </div>

        {/* Answer body */}
        <div className="px-6 pb-6">
          <p className="text-stone-700 leading-relaxed text-base whitespace-pre-wrap">{answer}</p>
        </div>

        {/* Sources */}
        {sources.length > 0 && (
          <div className="px-6 pb-6 border-t border-stone-200 pt-4">
            <p className="text-xs font-bold text-stone-600 uppercase tracking-widest mb-3">
              📚 Sources ({sources.length})
            </p>
            <div className="flex flex-wrap gap-2">
              {sources.map((s) => (
                <SourcePill key={s} source={s} />
              ))}
            </div>
          </div>
        )}

        {/* Expandable actions */}
        <div className="px-6 pb-5 flex items-center gap-4 border-t border-stone-200 pt-4">
          <button
            onClick={() => setShowPrompt(!showPrompt)}
            className="flex items-center gap-1.5 text-xs font-medium text-stone-600 hover:text-orange-600 transition-colors"
          >
            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14" />
            </svg>
            {showPrompt ? "Hide" : "View"} prompt
          </button>
          {pure_llm_answer && (
            <button
              onClick={() => setShowBaseline(!showBaseline)}
              className="flex items-center gap-1.5 text-xs font-medium text-stone-600 hover:text-orange-600 transition-colors"
            >
              <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
              </svg>
              {showBaseline ? "Hide" : "Show"} baseline
            </button>
          )}
        </div>

        {/* Prompt code block */}
        {showPrompt && (
          <div className="px-6 pb-6">
            <pre className="bg-stone-50 border border-stone-300 rounded-xl p-4 text-xs text-stone-700 font-mono overflow-x-auto whitespace-pre-wrap leading-relaxed max-h-64 overflow-y-auto">
              {prompt}
            </pre>
          </div>
        )}
      </article>

      {/* Baseline answer card */}
      {pure_llm_answer && showBaseline && (
        <article className="bg-stone-50 rounded-2xl border-2 border-stone-200 overflow-hidden shadow-md">
          <div className="h-1 bg-gradient-to-r from-teal-400 to-teal-600" />
          <div className="px-6 py-5">
            <div className="flex items-center gap-3 mb-4">
              <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-teal-400 to-teal-600 text-white flex items-center justify-center font-bold text-sm">
                L
              </div>
              <div>
                <h4 className="text-sm font-bold text-stone-900">LLM Only</h4>
                <p className="text-xs text-stone-500">Without retrieved context</p>
              </div>
            </div>
            <p className="text-stone-700 leading-relaxed text-sm whitespace-pre-wrap bg-white p-4 rounded-lg border border-stone-200">
              {pure_llm_answer}
            </p>
          </div>
        </article>
      )}
    </div>
  );
}
