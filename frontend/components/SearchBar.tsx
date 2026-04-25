// frontend/components/SearchBar.tsx
"use client";

import { FormEvent, useState } from "react";

interface Props {
  onSubmit: (query: string) => void;
  loading: boolean;
  onSettingsClick: () => void;
}

const suggestions = [
  "What was Ghana’s total central government arrears at the end of 2024 and what percentage of GDP did it represent?",
  "What are the projected domestic debt service obligations for Ghana between 2025 and 2028?",
  "What was Ghana’s inflation rate in 2024 compared to the budget and IMF targets?",
  "Which candidate won the election and how might that outcome relate to the policy direction in the 2025 budget?"
];

export default function SearchBar({ onSubmit, loading, onSettingsClick }: Props) {
  const [query, setQuery] = useState("");
  const [focused, setFocused] = useState(false);
  const [showSuggestions, setShowSuggestions] = useState(false);

  const handleSubmit = (e: FormEvent) => {
    e.preventDefault();
    if (query.trim() && !loading) {
      onSubmit(query.trim());
      setShowSuggestions(false);
    }
  };

  const handleSuggestionClick = (suggestion: string) => {
    setQuery(suggestion);
    onSubmit(suggestion);
    setShowSuggestions(false);
  };

  return (
    <div className="w-full space-y-3 px-4">
      <form onSubmit={handleSubmit} className="relative">
        <div className="relative">
          {/* Input container */}
          <div className={`flex items-center gap-3 bg-white rounded-2xl border-2 transition-all duration-300 shadow-md ${
            focused 
              ? "border-orange-400 shadow-lg shadow-orange-200/30" 
              : "border-stone-200 hover:border-orange-300"
          }`}>
            {/* Search Icon */}
            <div className="pl-4 flex-shrink-0">
              <svg
                className={`w-5 h-5 transition-colors ${
                  focused ? "text-orange-500" : "text-stone-400"
                }`}
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
                />
              </svg>
            </div>

            {/* Input */}
            <input
              type="text"
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              onFocus={() => {
                setFocused(true);
                setShowSuggestions(true);
              }}
              onBlur={() => setFocused(false)}
              placeholder="Ask anything about Ghana's economy, elections, policy..."
              className="flex-1 py-3 pr-4 bg-transparent text-stone-900 placeholder-stone-400 outline-none text-base"
            />

            {/* Loading spinner */}
            {loading && (
              <div className="pr-4 flex-shrink-0">
                <div className="w-5 h-5 border-2 border-orange-300 border-t-orange-500 rounded-full animate-spin"></div>
              </div>
            )}

            {/* Submit button */}
            {!loading && (
              <button
                type="submit"
                disabled={!query.trim() || loading}
                className="pr-4 flex-shrink-0 text-orange-500 hover:text-orange-600 disabled:text-stone-300 transition-colors"
              >
                <svg
                  className="w-5 h-5"
                  fill="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path d="M16.6915026,12.4744748 L3.50612381,13.2599618 C3.19218622,13.2599618 3.03521743,13.4170592 3.03521743,13.5741566 L1.15159189,20.0151496 C0.8376543,20.8006365 0.99,21.89 1.77946707,22.52 C2.41,22.99 3.50612381,23.1 4.13399899,22.8429026 L21.714504,14.0454487 C22.6563168,13.5741566 23.1272231,12.6315722 22.9702544,11.6889879 L4.13399899,1.16346273 C3.34915502,0.9 2.40734225,0.9 1.77946707,1.4380487 C0.994623095,2.0605983 0.837654326,3.0605983 1.15159189,3.99 L3.03521743,10.4310333 C3.03521743,10.5881307 3.34915502,10.7452282 3.50612381,10.7452282 L16.6915026,11.5307151 C16.6915026,11.5307151 17.1624089,11.5307151 17.1624089,12.0025944 C17.1624089,12.4744748 16.6915026,12.4744748 16.6915026,12.4744748 Z" />
                </svg>
              </button>
            )}
          </div>

          {/* Suggestions dropdown */}
          {showSuggestions && focused && !query && (
            <div className="absolute top-full left-0 right-0 mt-2 bg-white rounded-xl border border-stone-200 shadow-lg overflow-hidden z-50 animate-slide-down">
              <div className="p-3 space-y-2">
                <p className="text-xs font-semibold text-stone-500 uppercase tracking-wide px-3 py-2">
                  Suggested Queries
                </p>
                {suggestions.map((suggestion, idx) => (
                  <button
                    key={idx}
                    onClick={() => handleSuggestionClick(suggestion)}
                    className="w-full text-left px-3 py-3 rounded-lg text-sm text-stone-700 hover:bg-orange-50 transition-colors hover:text-orange-600 border border-transparent hover:border-orange-200"
                  >
                    <div className="flex items-start gap-2">
                      <svg
                        className="w-4 h-4 flex-shrink-0 mt-0.5 text-orange-500"
                        fill="none"
                        stroke="currentColor"
                        viewBox="0 0 24 24"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth={2}
                          d="M13 10V3L4 14h7v7l9-11h-7z"
                        />
                      </svg>
                      <span className="line-clamp-2">{suggestion}</span>
                    </div>
                  </button>
                ))}
              </div>
            </div>
          )}
        </div>
      </form>

      {/* Info text */}
      <p className="text-xs text-stone-500 text-center px-4">
        Powered by RAG • Get instant, cited answers
      </p>
    </div>
  );
}
