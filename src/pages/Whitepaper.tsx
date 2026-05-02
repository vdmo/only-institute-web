import { motion } from 'motion/react';
import { Link } from 'react-router-dom';
import { ArrowLeft, ExternalLink } from 'lucide-react';
import {
  WHITEPAPER_EXTERNAL_REFERENCES,
  WHITEPAPER_SECTIONS,
  type WhitepaperSection,
} from './whitepaperData';

function SectionBlock({ section }: { section: WhitepaperSection }) {
  return (
    <section id={section.id} className="border border-white/10 bg-white/5 backdrop-blur-sm p-6 md:p-10">
      <h2 className="font-display text-2xl md:text-3xl font-bold uppercase tracking-tight mb-5">
        {section.title}
      </h2>
      <div className="space-y-4">
        {section.body.map((b, idx) => {
          if (b.type === 'p') {
            return (
              <p key={idx} className="text-neutral-300 leading-relaxed font-light">
                {b.text}
              </p>
            );
          }
          return (
            <ul key={idx} className="list-disc pl-6 text-neutral-300 space-y-2">
              {b.items.map((it) => (
                <li key={it} className="leading-relaxed font-light">
                  {it}
                </li>
              ))}
            </ul>
          );
        })}
      </div>
    </section>
  );
}

export default function Whitepaper() {
  return (
    <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="max-w-7xl mx-auto px-6 py-24">
      <div className="mb-10">
        <Link
          to="/"
          className="inline-flex items-center gap-2 text-neutral-500 hover:text-brand-accent transition-colors font-mono text-[10px] uppercase tracking-widest"
        >
          <ArrowLeft size={14} /> Back to Home
        </Link>
      </div>

      <header className="mb-14">
        <div className="inline-flex items-center gap-3 px-3 py-1 bg-white/5 border border-white/10 rounded-full mb-8">
          <span className="w-2 h-2 rounded-full bg-brand-accent animate-pulse" />
          <span className="font-mono text-[10px] uppercase tracking-[0.2em] text-brand-secondary">Whitepaper</span>
        </div>
        <h1 className="font-display text-4xl md:text-6xl font-bold tracking-tight leading-tight uppercase">
          Graph‑Vector Memory for Deterministic Agent Systems
        </h1>
        <p className="mt-6 max-w-4xl text-neutral-400 font-mono text-xs uppercase tracking-widest leading-relaxed">
          onlyDB (on HelixDB) + ONLY‑INSTITUTE — Structure-first memory, coherence gating, and proof-enforced writes.
        </p>
      </header>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
        <div className="lg:col-span-8 space-y-8">
          {WHITEPAPER_SECTIONS.map((s) => (
            <div key={s.id}>
              <SectionBlock section={s} />
            </div>
          ))}
        </div>

        <aside className="lg:col-span-4 space-y-8 lg:sticky lg:top-24">
          <div className="border border-white/10 bg-neutral-950/50 backdrop-blur-sm p-6">
            <h3 className="font-display text-lg font-bold uppercase tracking-tight mb-4">External References</h3>
            <div className="space-y-4">
              {WHITEPAPER_EXTERNAL_REFERENCES.map((r) => (
                <a
                  key={r.href}
                  href={r.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="group block border border-white/10 bg-white/5 hover:border-brand-accent/60 transition-colors p-4"
                >
                  <div className="flex items-center justify-between gap-3">
                    <span className="font-mono text-[10px] uppercase tracking-[0.2em] text-brand-secondary">{r.label}</span>
                    <ExternalLink size={14} className="text-neutral-500 group-hover:text-brand-accent transition-colors" />
                  </div>
                  <p className="mt-2 text-neutral-400 text-sm font-light leading-relaxed">{r.description}</p>
                  <p className="mt-3 font-mono text-[10px] uppercase tracking-widest text-neutral-600 break-all">{r.href}</p>
                </a>
              ))}
            </div>
          </div>

          <div className="border border-white/10 bg-white/5 p-6">
            <h3 className="font-display text-lg font-bold uppercase tracking-tight mb-4">In-Page Sections</h3>
            <div className="space-y-2">
              {WHITEPAPER_SECTIONS.map((s) => (
                <a
                  key={s.id}
                  href={`#${s.id}`}
                  className="block font-mono text-[10px] uppercase tracking-widest text-neutral-500 hover:text-brand-accent transition-colors"
                >
                  {s.title}
                </a>
              ))}
            </div>
          </div>
        </aside>
      </div>
    </motion.div>
  );
}
