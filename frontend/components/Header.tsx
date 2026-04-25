// frontend/components/Header.tsx
"use client";

import React from "react";

interface HeaderProps {
  onSettingsClick?: () => void;
}

export default function Header({ onSettingsClick }: HeaderProps) {
  return (
    <header className="sticky top-0 z-50 w-full bg-white/80 backdrop-blur-md border-b border-stone-100 shadow-sm">
      <div className="max-w-7xl mx-auto px-4 md:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          {/* Left: Logo & Branding */}
          <div className="flex items-center gap-3">
            <div className="relative w-10 h-10">
              <div className="absolute inset-0 bg-gradient-warm rounded-lg opacity-20"></div>
              <div className="relative w-full h-full rounded-lg bg-white border border-orange-200 flex items-center justify-center">
                <span className="text-lg font-display font-bold bg-gradient-warm bg-clip-text text-transparent">
                  Q
                </span>
              </div>
            </div>
            <div>
              <h1 className="text-base font-display font-bold text-stone-900">
                QueryHub
              </h1>
              <p className="text-xs text-stone-500 leading-none mt-0.5">
                Intelligent Search
              </p>
            </div>
          </div>

          {/* Center: Navigation (optional) */}
          <nav className="hidden md:flex items-center gap-8">
            <a
              href="#"
              className="text-sm font-medium text-stone-600 hover:text-orange-600 transition-colors"
            >
              Search
            </a>
            <a
              href="#"
              className="text-sm font-medium text-stone-600 hover:text-orange-600 transition-colors"
            >
              History
            </a>
            <a
              href="#"
              className="text-sm font-medium text-stone-600 hover:text-orange-600 transition-colors"
            >
              Docs
            </a>
          </nav>

          {/* Right: Actions */}
          <div className="flex items-center gap-2">
            <button
              onClick={onSettingsClick}
              className="p-2 hover:bg-stone-50 rounded-lg transition-colors text-stone-600 hover:text-orange-600"
              title="Settings"
            >
              <svg
                className="w-5 h-5"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M10.325 4.317c.426-1.756 2.924-1.756 3.35 0a1.724 1.724 0 002.573 1.066c1.543-.94 3.31.826 2.37 2.37a1.724 1.724 0 001.065 2.572c1.756.426 1.756 2.924 0 3.35a1.724 1.724 0 00-1.066 2.573c.94 1.543-.826 3.31-2.37 2.37a1.724 1.724 0 00-2.572 1.065c-.426 1.756-2.924 1.756-3.35 0a1.724 1.724 0 00-2.573-1.066c-1.543.94-3.31-.826-2.37-2.37a1.724 1.724 0 00-1.065-2.572c-1.756-.426-1.756-2.924 0-3.35a1.724 1.724 0 001.066-2.573c-.94-1.543.826-3.31 2.37-2.37.996.608 2.296.07 2.572-1.065z"
                />
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M15 12a3 3 0 11-6 0 3 3 0 016 0z"
                />
              </svg>
            </button>
            <button className="p-2 hover:bg-stone-50 rounded-lg transition-colors text-stone-600 hover:text-orange-600">
              <svg
                className="w-5 h-5"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M15 17h5l-1.405-1.405A2.032 2.032 0 0118 14.158V11a6.002 6.002 0 00-4-5.659V5a2 2 0 10-4 0v.341C7.67 6.165 6 8.388 6 11v3.159c0 .538-.214 1.055-.595 1.436L4 17h5m6 0v1a3 3 0 11-6 0v-1m6 0H9"
                />
              </svg>
            </button>
          </div>
        </div>
      </div>
    </header>
  );
}
