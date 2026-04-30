import { motion } from 'motion/react';
import { FileText, Download, Shield, Database, Lock } from 'lucide-react';

const RESOURCES = [
  {
    title: 'The Deterministic AGI Manifesto',
    version: 'v1.0.4',
    type: 'Whitepaper',
    description: 'The foundational document outlining the Cognitive Operating System and the six mathematical pillars.',
    icon: FileText,
    accent: '#00ffaa'
  },
  {
    title: 'HelixDB: Technical Specification',
    version: 'v0.9.1',
    type: 'Architecture',
    description: 'Deep dive into Graph-Vector memory structures and relational data mapping for zero-loss context.',
    icon: Database,
    accent: '#3b82f6'
  },
  {
    title: 'Prime Integer Relations v1.2',
    version: 'v1.2.0',
    type: 'Mathematics',
    description: 'Formal documentation on grounding AI in number theory to eliminate hallucinations.',
    icon: Shield,
    accent: '#a855f7'
  },
  {
    title: 'Security Proofs & Action Protocols',
    version: 'v2.1.0',
    type: 'Security',
    description: 'Standards for Proof Tokens and dependent types in mission-critical AI deployments.',
    icon: Lock,
    accent: '#ef4444'
  }
];

export default function Resources() {
  return (
    <motion.div 
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      className="max-w-7xl mx-auto px-6 py-24"
    >
      <header className="mb-24">
        <h1 className="font-display text-5xl md:text-7xl font-bold tracking-tighter uppercase mb-6">
          <span className="text-brand-accent">Resources</span>
        </h1>
        <p className="max-w-2xl font-mono text-sm text-neutral-500 uppercase tracking-widest">
          Technical documentation, whitepapers, and formal specifications for the Only Institute stack.
        </p>
      </header>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        {RESOURCES.map((res, index) => (
          <motion.div 
            key={res.title}
            initial={{ opacity: 0, scale: 0.95 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            transition={{ delay: index * 0.1 }}
            className="p-8 md:p-12 border border-white/10 bg-white/5 backdrop-blur-sm relative overflow-hidden group hover:border-brand-accent/50 transition-all duration-500"
          >
            <div 
              className="absolute top-0 right-0 w-32 h-32 opacity-10 group-hover:opacity-20 transition-opacity translate-x-10 -translate-y-10 group-hover:scale-125 transition-transform duration-700" 
              style={{ color: res.accent }}
            >
              <res.icon size={128} />
            </div>

            <div className="flex items-center gap-4 mb-8">
              <span className="px-3 py-1 bg-white/5 border border-white/10 rounded-sm font-mono text-[10px] text-brand-secondary uppercase tracking-widest">
                {res.type}
              </span>
              <span className="font-mono text-[10px] text-neutral-600">
                {res.version}
              </span>
            </div>

            <h3 className="font-display text-2xl font-bold mb-6 uppercase tracking-tight group-hover:text-white transition-colors">
              {res.title}
            </h3>

            <p className="text-neutral-400 font-light leading-relaxed mb-12 max-w-md">
              {res.description}
            </p>

            <button className="flex items-center gap-3 px-6 py-3 bg-white text-black font-mono text-[10px] uppercase tracking-[0.2em] font-bold hover:bg-brand-accent transition-colors">
              Download PDF <Download size={14} />
            </button>
          </motion.div>
        ))}
      </div>

      <div className="mt-32 p-12 border border-brand-accent/20 bg-brand-accent/5 rounded-sm max-w-4xl mx-auto text-center">
        <h3 className="font-display text-2xl font-bold mb-6 uppercase">Request Private Documents</h3>
        <p className="text-neutral-400 font-light mb-8 max-w-xl mx-auto">
          Some specifications for aerospace and global finance deployments are restricted to verified research partners and institutional clients.
        </p>
        <button className="px-10 py-4 border border-brand-accent text-brand-accent font-mono text-xs uppercase tracking-widest hover:bg-brand-accent hover:text-black transition-all">
          Verify Institution
        </button>
      </div>
    </motion.div>
  );
}
