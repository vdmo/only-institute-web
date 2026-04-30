import { Link } from 'react-router-dom';

export default function Footer() {
  return (
    <footer className="p-12 md:p-24 border-t border-white/5 text-neutral-500 font-mono text-[10px] bg-neutral-950">
      <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-4 gap-12">
        <div className="col-span-2">
          <div className="flex flex-col mb-8">
            <span className="font-display font-bold text-lg text-white uppercase tracking-tighter">ONLY INSTITUTE</span>
            <span className="tracking-widest uppercase text-brand-secondary">Deterministic AGI Foundation</span>
          </div>
          <p className="max-w-sm text-xs leading-relaxed uppercase tracking-wider mb-8 italic">
            Moving from abstract ideas into concrete, world-class business architecture for mission-critical environments.
          </p>
          <div className="flex gap-6">
            <a href="#" className="hover:text-white transition-colors uppercase tracking-widest">Twitter/X</a>
            <a href="#" className="hover:text-white transition-colors uppercase tracking-widest">LinkedIn</a>
            <a href="#" className="hover:text-white transition-colors uppercase tracking-widest">GitHub</a>
          </div>
        </div>
        <div>
          <h4 className="text-white uppercase tracking-[0.3em] mb-6 font-bold underline underline-offset-8 decoration-brand-accent">DOMAINS</h4>
          <ul className="space-y-4">
            <li><a href="#" className="hover:text-white transition-colors uppercase tracking-widest">only.institute</a></li>
            <li><a href="#" className="hover:text-white transition-colors uppercase tracking-widest">PIR.technology</a></li>
            <li><a href="#" className="hover:text-white transition-colors uppercase tracking-widest">PrimeSwarm.ai</a></li>
            <li><a href="#" className="hover:text-white transition-colors uppercase tracking-widest">HelixDB.io</a></li>
          </ul>
        </div>
        <div>
          <h4 className="text-white uppercase tracking-[0.3em] mb-6 font-bold underline underline-offset-8 decoration-brand-accent">RESOURCES</h4>
          <ul className="space-y-4">
            <li><Link to="/blog" className="hover:text-white transition-colors uppercase tracking-widest">Articles</Link></li>
            <li><Link to="/resources" className="hover:text-white transition-colors uppercase tracking-widest">Documentation</Link></li>
            <li><a href="#" className="hover:text-white transition-colors uppercase tracking-widest">Security Proofs</a></li>
            <li><a href="#" className="hover:text-white transition-colors uppercase tracking-widest">Status: Deterministic</a></li>
          </ul>
        </div>
      </div>
      <div className="mt-24 pt-12 border-t border-white/10 flex flex-col md:flex-row justify-between items-center gap-6">
        <p className="uppercase tracking-widest">© 2026 Only Institute. All Rights Asserted.</p>
        <div className="flex gap-8 uppercase tracking-widest">
          <span>Latency: 0.00ms</span>
          <span className="text-brand-accent">Safety: 100% Proven</span>
        </div>
      </div>
    </footer>
  );
}
