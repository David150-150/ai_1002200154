// frontend/components/SettingsDrawer.tsx
"use client";

import { useEffect, useRef } from "react";

export interface Settings {
  chunking_strategy: "fixed" | "section";
  top_k: number;
  max_context_tokens: number;
  w_vector: number;
  w_keyword: number;
  w_domain: number;
  show_pure_llm: boolean;
  model: string;
}

interface Props {
  open: boolean;
  onClose: () => void;
  settings: Settings;
  onChange: (s: Settings) => void;
}

function Slider({
  label,
  value,
  min,
  max,
  step,
  onChange,
}: {
  label: string;
  value: number;
  min: number;
  max: number;
  step: number;
  onChange: (v: number) => void;
}) {
  return (
    <div className="space-y-3">
      <div className="flex justify-between items-center">
        <label className="text-sm font-medium text-stone-700">{label}</label>
        <span className="text-sm font-mono text-orange-600 bg-orange-100 px-3 py-1 rounded-lg font-semibold">
          {value}
        </span>
      </div>
      <input
        type="range"
        min={min}
        max={max}
        step={step}
        value={value}
        onChange={(e) => onChange(Number(e.target.value))}
        className="w-full h-2 appearance-none rounded-full bg-stone-300 accent-orange-500 cursor-pointer"
      />
      <div className="flex justify-between text-xs text-stone-500">
        <span>{min}</span>
        <span>{max}</span>
      </div>
    </div>
  );
}

export default function SettingsDrawer({ open, onClose, settings, onChange }: Props) {
  const drawerRef = useRef<HTMLDivElement>(null);

  // Close on Escape
  useEffect(() => {
    const handler = (e: KeyboardEvent) => {
      if (e.key === "Escape") onClose();
    };
    window.addEventListener("keydown", handler);
    return () => window.removeEventListener("keydown", handler);
  }, [onClose]);

  const update = <K extends keyof Settings>(key: K, value: Settings[K]) => {
    onChange({ ...settings, [key]: value });
  };

  const weightSum = +(settings.w_vector + settings.w_keyword + settings.w_domain).toFixed(2);
  const weightsOk = Math.abs(weightSum - 1.0) < 0.02;

  return (
    <>
      {/* Backdrop */}
      <div
        className={`fixed inset-0 z-50 bg-stone-900/40 backdrop-blur-sm transition-opacity duration-300 ${
          open ? "opacity-100 pointer-events-auto" : "opacity-0 pointer-events-none"
        }`}
        onClick={onClose}
      />

      {/* Drawer */}
      <div
        ref={drawerRef}
        className={`fixed right-0 top-0 h-full w-[380px] z-50 bg-white border-l-2 border-stone-200 flex flex-col transform transition-transform duration-300 ease-out shadow-2xl ${
          open ? "translate-x-0" : "translate-x-full"
        }`}
      >
        {/* Header */}
        <div className="flex items-center justify-between px-6 py-6 border-b-2 border-stone-200 bg-gradient-to-r from-orange-50 to-white">
          <div>
            <h2 className="text-xl font-bold text-stone-900">Settings</h2>
            <p className="text-xs text-stone-600 mt-1">Configure retrieval & generation</p>
          </div>
          <button
            onClick={onClose}
            className="w-10 h-10 rounded-lg flex items-center justify-center text-stone-500 hover:text-stone-700 hover:bg-stone-100 transition-all"
          >
            <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 24 24">
              <path d="M19 6.41L17.59 5 12 10.59 6.41 5 5 6.41 10.59 12 5 17.59 6.41 19 12 13.41 17.59 19 19 17.59 13.41 12z" />
            </svg>
          </button>
        </div>

        {/* Scrollable content */}
        <div className="flex-1 overflow-y-auto px-6 py-8 space-y-8">

          {/* Chunking */}
          <section>
            <h3 className="text-xs font-bold text-orange-700 uppercase tracking-widest mb-4 bg-orange-50 -mx-6 px-6 py-2">
              📦 Chunking Strategy
            </h3>
            <div className="grid grid-cols-2 gap-3">
              {(["fixed", "section"] as const).map((s) => (
                <button
                  key={s}
                  onClick={() => update("chunking_strategy", s)}
                  className={`py-3 rounded-xl text-sm font-semibold transition-all border-2 ${
                    settings.chunking_strategy === s
                      ? "bg-orange-100 text-orange-700 border-orange-400"
                      : "bg-stone-50 text-stone-600 border-stone-200 hover:border-orange-300"
                  }`}
                >
                  {s.charAt(0).toUpperCase() + s.slice(1)}
                </button>
              ))}
            </div>
          </section>

          {/* Retrieval */}
          <section className="space-y-6 pb-2">
            <h3 className="text-xs font-bold text-orange-700 uppercase tracking-widest bg-orange-50 -mx-6 px-6 py-2">
              🔍 Retrieval Settings
            </h3>
            <Slider
              label="Top K Results"
              value={settings.top_k}
              min={3}
              max={20}
              step={1}
              onChange={(v) => update("top_k", v)}
            />
            <Slider
              label="Max Context Tokens"
              value={settings.max_context_tokens}
              min={256}
              max={4096}
              step={128}
              onChange={(v) => update("max_context_tokens", v)}
            />
          </section>

          {/* Weights */}
          <section className="space-y-6 pb-2">
            <div className="flex items-center justify-between">
              <h3 className="text-xs font-bold text-orange-700 uppercase tracking-widest">
                ⚖️ Ranking Weights
              </h3>
              <span
                className={`text-xs font-mono font-bold px-3 py-1 rounded-lg ${
                  weightsOk
                    ? "text-green-700 bg-green-100"
                    : "text-red-700 bg-red-100"
                }`}
              >
                Σ = {weightSum}
              </span>
            </div>
            {!weightsOk && (
              <p className="text-xs text-red-700 bg-red-50 border-2 border-red-200 rounded-lg px-3 py-2 font-medium">
                ⚠️ Weights should sum to 1.0
              </p>
            )}
            <Slider
              label="Vector Score"
              value={settings.w_vector}
              min={0}
              max={1}
              step={0.05}
              onChange={(v) => update("w_vector", v)}
            />
            <Slider
              label="Keyword Score"
              value={settings.w_keyword}
              min={0}
              max={1}
              step={0.05}
              onChange={(v) => update("w_keyword", v)}
            />
            <Slider
              label="Domain Score"
              value={settings.w_domain}
              min={0}
              max={1}
              step={0.05}
              onChange={(v) => update("w_domain", v)}
            />
          </section>

          {/* Model */}
          <section>
            <h3 className="text-xs font-bold text-orange-700 uppercase tracking-widest mb-3 bg-orange-50 -mx-6 px-6 py-2">
              🤖 LLM Model
            </h3>
            <input
              type="text"
              value={settings.model}
              onChange={(e) => update("model", e.target.value)}
              className="w-full bg-stone-50 border-2 border-stone-300 text-stone-900 rounded-xl px-4 py-3 text-sm font-mono focus:outline-none focus:border-orange-400 transition-colors placeholder-stone-400"
              placeholder="gemini-1.5-pro"
            />
          </section>

          {/* Options */}
          <section className="pb-4">
            <h3 className="text-xs font-bold text-orange-700 uppercase tracking-widest mb-4 bg-orange-50 -mx-6 px-6 py-2">
              ⚙️ Options
            </h3>
            <label className="flex items-center justify-between cursor-pointer p-3 rounded-lg hover:bg-stone-50 border-2 border-stone-200 transition-colors">
              <span className="text-sm font-medium text-stone-700">Show LLM baseline</span>
              <button
                onClick={() => update("show_pure_llm", !settings.show_pure_llm)}
                className={`relative w-12 h-7 rounded-full transition-colors duration-200 focus:outline-none border-2 ${
                  settings.show_pure_llm ? "bg-orange-500 border-orange-600" : "bg-stone-300 border-stone-400"
                }`}
              >
                <span
                  className={`absolute top-1 left-1 w-5 h-5 bg-white rounded-full shadow-md transition-transform duration-200 ${
                    settings.show_pure_llm ? "translate-x-5" : "translate-x-0"
                  }`}
                />
              </button>
            </label>
          </section>
        </div>
      </div>
    </>
  );
}
