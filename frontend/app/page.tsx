"use client";
// frontend/app/page.tsx
// Main RAG Chatbot page — assembles all components.

import { useState, useRef, useEffect } from "react";
import Header from "@/components/Header";
import SearchBar from "@/components/SearchBar";
import AnswerCard from "@/components/AnswerCard";
import ChunkGrid from "@/components/ChunkGrid";
import SettingsDrawer, { Settings } from "@/components/SettingsDrawer";
import { queryRAG, QueryResponse } from "@/lib/api";

const DEFAULT_SETTINGS: Settings = {
  chunking_strategy: "fixed",
  top_k: 12,
  max_context_tokens: 1800,
  w_vector: 0.6,
  w_keyword: 0.25,
  w_domain: 0.15,
  show_pure_llm: true,
  model: "gemini-1.5-pro",
};

interface HistoryEntry {
  id: string;
  query: string;
  response: QueryResponse;
  timestamp: Date;
}

export default function Home() {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [history, setHistory] = useState<HistoryEntry[]>([]);
  const [settings, setSettings] = useState<Settings>(DEFAULT_SETTINGS);
  const [settingsOpen, setSettingsOpen] = useState(false);
  const resultsRef = useRef<HTMLDivElement>(null);

  const handleQuery = async (question: string) => {
    setLoading(true);
    setError(null);

    try {
      const response = await queryRAG({
        question,
        ...settings,
      });

      const entry: HistoryEntry = {
        id: crypto.randomUUID(),
        query: question,
        response,
        timestamp: new Date(),
      };

      setHistory((prev) => [entry, ...prev]);
    } catch (err) {
      setError(
        err instanceof Error
          ? err.message
          : "An unexpected error occurred. Is the FastAPI server running?"
      );
    } finally {
      setLoading(false);
    }
  };

  // Scroll to latest result
  useEffect(() => {
    if (history.length > 0 && resultsRef.current) {
      resultsRef.current.scrollIntoView({ behavior: "smooth", block: "start" });
    }
  }, [history.length]);

  return (
    <>
      <Header onSettingsClick={() => setSettingsOpen(true)} />

      {/* Decorative background elements */}
      <div className="fixed top-20 right-[-200px] w-[600px] h-[600px] bg-gradient-to-br from-orange-300/20 to-transparent rounded-full blur-3xl pointer-events-none" />
      <div className="fixed bottom-0 left-[-300px] w-[700px] h-[700px] bg-gradient-to-tr from-teal-300/15 to-transparent rounded-full blur-3xl pointer-events-none" />

      {/* Settings drawer */}
      <SettingsDrawer
        open={settingsOpen}
        onClose={() => setSettingsOpen(false)}
        settings={settings}
        onChange={setSettings}
      />

      {/* Main content */}
      <main className="pt-24 pb-20 px-4 md:px-8 flex flex-col items-center min-h-screen">
        <div className="w-full max-w-6xl space-y-12">

          {/* Hero section - shown only when empty */}
          {history.length === 0 && !loading && (
            <section className="text-center space-y-6 pt-12 pb-8 animate-fade-up">
              {/* Icon with gradient */}
              <div className="inline-flex items-center justify-center">
                <div className="relative w-20 h-20">
                  <div className="absolute inset-0 bg-gradient-warm rounded-2xl opacity-20 blur-lg"></div>
                  <div className="relative w-full h-full rounded-2xl bg-white border-2 border-orange-200 flex items-center justify-center">
                    <span className="text-3xl font-display font-bold bg-gradient-warm bg-clip-text text-transparent">Q</span>
                  </div>
                </div>
              </div>

              {/* Main heading */}
              <div className="space-y-3">
                <h1 className="text-5xl font-display font-bold text-stone-900 tracking-tight">
                  Instant Answers, <br />
                  <span className="bg-gradient-warm bg-clip-text text-transparent">Backed by Sources</span>
                </h1>
                <p className="text-lg text-stone-600 max-w-2xl mx-auto leading-relaxed">
                  Ask intelligent questions about Ghana's economy, elections, and fiscal policy. Our RAG system retrieves relevant documents and synthesizes accurate, cited answers.
                </p>
              </div>

              {/* Stats */}
              <div className="flex flex-wrap items-center justify-center gap-6 pt-4">
                {[
                  { icon: "⚡", label: "Hybrid Retrieval" },
                  { icon: "🎯", label: "Semantic Search" },
                  { icon: "📚", label: "Multi-Source" },
                ].map(({ icon, label }) => (
                  <div key={label} className="flex items-center gap-2 px-4 py-2 rounded-full bg-stone-100 text-sm font-medium text-stone-700">
                    <span>{icon}</span>
                    <span>{label}</span>
                  </div>
                ))}
              </div>
            </section>
          )}

          {/* Search bar - sticky */}
          <div className={`sticky top-16 z-40 py-4 ${history.length > 0 ? "bg-white/80 backdrop-blur-md rounded-2xl border border-stone-200" : ""} animate-slide-down`}>
            <SearchBar
              onSubmit={handleQuery}
              loading={loading}
              onSettingsClick={() => setSettingsOpen(true)}
            />
          </div>

          {/* Loading skeleton */}
          {loading && (
            <div className="space-y-8 animate-pulse">
              <div className="bg-stone-100 rounded-2xl p-8 space-y-4">
                <div className="h-6 w-32 bg-stone-200 rounded-lg" />
                <div className="space-y-3">
                  <div className="h-4 bg-stone-200 rounded-lg w-full" />
                  <div className="h-4 bg-stone-200 rounded-lg w-5/6" />
                  <div className="h-4 bg-stone-200 rounded-lg w-4/6" />
                </div>
              </div>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {[1, 2, 3, 4].map((i) => (
                  <div key={i} className="bg-stone-100 rounded-2xl p-6 space-y-4">
                    <div className="h-4 w-3/4 bg-stone-200 rounded-lg" />
                    <div className="space-y-2">
                      <div className="h-3 bg-stone-200 rounded-lg w-full" />
                      <div className="h-3 bg-stone-200 rounded-lg w-5/6" />
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* Error state */}
          {error && (
            <div className="flex items-start gap-4 p-6 bg-red-50 border-2 border-red-200 rounded-2xl animate-fade-up">
              <div className="flex-shrink-0 mt-0.5">
                <svg className="w-6 h-6 text-red-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 9v2m0 4v2m0 0l0 0" />
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 15a3 3 0 100-6 3 3 0 000 6z" />
                </svg>
              </div>
              <div>
                <h3 className="font-semibold text-red-900">Error Processing Query</h3>
                <p className="text-red-800 text-sm mt-1">{error}</p>
                <p className="text-red-700 text-xs mt-2">
                  Make sure the FastAPI server is running:{" "}
                  <code className="font-mono bg-red-100 px-2 py-1 rounded">uvicorn api.main:app --reload --port 8000</code>
                </p>
              </div>
            </div>
          )}

          {/* Results */}
          {history.length > 0 && (
            <div ref={resultsRef} className="space-y-16 scroll-mt-40">
              {history.map((entry, i) => (
                <div key={entry.id} className={`space-y-6 ${i > 0 ? "pt-12 border-t-2 border-stone-200" : ""}`}>
                  {/* Query header */}
                  <div className="flex items-start justify-between gap-4 animate-fade-up">
                    <div className="flex items-start gap-3 flex-1">
                      <div className="w-10 h-10 rounded-xl bg-gradient-warm text-white flex items-center justify-center flex-shrink-0 font-semibold text-lg">
                        Q
                      </div>
                      <div className="flex-1 min-w-0">
                        <p className="text-sm font-medium text-stone-500 uppercase tracking-wide">Your Question</p>
                        <p className="text-lg text-stone-900 mt-1 break-words">{entry.query}</p>
                      </div>
                    </div>
                    <span className="text-xs text-stone-400 whitespace-nowrap flex-shrink-0">
                      {entry.timestamp.toLocaleTimeString()}
                    </span>
                  </div>

                  <AnswerCard
                    answer={entry.response.answer}
                    pure_llm_answer={entry.response.pure_llm_answer}
                    chunks={entry.response.chunks}
                    prompt={entry.response.prompt}
                    model_used={entry.response.model_used}
                    query={entry.query}
                  />

                  <ChunkGrid chunks={entry.response.chunks} />
                </div>
              ))}
            </div>
          )}

          {/* Footer */}
          {history.length === 0 && !loading && !error && (
            <section className="text-center pt-12 pb-8 animate-fade-up">
              <p className="text-xs text-stone-500 font-medium uppercase tracking-widest">
                Created by David Kusi 10022200154 • 10222200077
              </p>
            </section>
          )}
        </div>
      </main>
    </>
  );
}
