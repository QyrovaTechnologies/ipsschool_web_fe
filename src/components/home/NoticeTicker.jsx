import React from 'react';

export default function NoticeTicker({ onOpenEnquiry }) {
  return (
    <section className="w-full bg-secondary text-on-secondary shadow-md relative z-20">
      <div className="max-w-7xl mx-auto px-gutter py-2.5 flex items-center justify-between gap-3">
        <div className="flex items-center gap-space-md flex-1 min-w-0 w-full">
          <div className="flex items-center gap-2 bg-on-secondary-container px-2.5 py-1 rounded text-label-sm font-label-sm font-bold uppercase tracking-wider flex-shrink-0">
            <span className="w-2 h-2 rounded-full bg-secondary-fixed animate-pulse"></span>
            <span>NOTICE BOARD</span>
          </div>
          <div className="overflow-hidden whitespace-nowrap min-w-0 flex-1">
            <a 
              className="inline-flex items-center gap-2 font-body-md text-body-md text-secondary-fixed hover:underline truncate cursor-pointer" 
              href="#admission-cta"
              onClick={() => onOpenEnquiry && onOpenEnquiry()}
            >
              <span className="font-semibold text-on-secondary">[LATEST]:</span>
              <span>Admissions Open for Academic Session 2026–27 (Nursery to Class IX &amp; XI)</span>
            </a>
          </div>
        </div>
      </div>
    </section>
  );
}