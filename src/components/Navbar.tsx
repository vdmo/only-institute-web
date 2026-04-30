import { motion } from 'motion/react';
import { Link } from 'react-router-dom';

export default function Navbar() {
  return (
    <nav className="p-6 md:p-12 flex justify-between items-center border-b border-white/10 backdrop-blur-sm sticky top-0 z-50 bg-neutral-950/80">
      <div className="flex items-center gap-8">
        <Link to="/" className="group">
          <div className="flex flex-col">
            <span className="font-display font-bold text-xl tracking-tighter uppercase group-hover:text-brand-accent transition-colors">ONLY INSTITUTE</span>
            <span className="font-mono text-[10px] text-brand-secondary tracking-widest leading-none">DETERMINISTIC SYSTEMS</span>
          </div>
        </Link>
        <div className="hidden md:block w-px h-8 bg-white/20" />
        <div className="hidden md:flex items-center gap-6">
          <Link to="/blog" className="hover:text-brand-accent transition-colors font-mono text-xs uppercase tracking-widest">Blog</Link>
          <Link to="/resources" className="hover:text-brand-accent transition-colors font-mono text-xs uppercase tracking-widest">Whitepaper</Link>
          <a href="https://pir.technology" target="_blank" rel="noopener noreferrer" className="hover:text-brand-accent transition-colors font-mono text-xs uppercase tracking-widest text-brand-secondary">PIR.Technology</a>
        </div>
      </div>
      <button className="px-6 py-2 border border-white/20 hover:border-brand-accent hover:text-brand-accent transition-all font-mono text-xs uppercase tracking-widest rounded-sm">
        API Access
      </button>
    </nav>
  );
}
