import { motion } from 'motion/react';
import { 
  Database, 
  Binary, 
  Brackets, 
  ArrowRight, 
  ShieldCheck, 
  Workflow, 
  Globe, 
  Mail,
  ChevronDown
} from 'lucide-react';
import { Link } from 'react-router-dom';
import { useState, type FormEvent } from 'react';
import { useNavigate } from 'react-router-dom';

const PILLARS = [
  {
    id: 'memory',
    title: 'Memory',
    subtitle: 'HelixDB Graph-Vectors',
    description: 'AI suffers from amnesia and context loss, relying on flat vector search. We store knowledge as a structural, traversable web of relationships, giving the AI perfect, long-term contextual memory.',
    icon: Database,
    accent: '#00ffaa'
  },
  {
    id: 'reality',
    title: 'Reality',
    subtitle: 'Prime Integer Relations',
    description: 'Grounding AI in the fundamental number theory of nature. The system measures the "Gap" and "Area" of data, physically preventing the system from generating unstable, hallucinatory structures.',
    icon: Binary,
    accent: '#3b82f6'
  },
  {
    id: 'logic',
    title: 'Logic',
    subtitle: 'Superinstance Constraint Theory',
    description: 'Using algebraic geometry to draw strict boundaries around the environment. The AI calculates what is impossible and structurally deletes it, leaving only the exact, logical truth.',
    icon: Brackets,
    accent: '#a855f7'
  },
  {
    id: 'causality',
    title: 'Causality',
    subtitle: 'Do-Calculus',
    description: 'Using Causal Directed Acyclic Graphs (DAGs) to mathematically block confounding variables, allowing the AI to understand why things happen and accurately simulate the future.',
    icon: Workflow,
    accent: '#eab308'
  },
  {
    id: 'translation',
    title: 'Translation',
    subtitle: 'Category Theory',
    description: 'Using Functors to perfectly map the objects and actions of human intent directly into database nodes and edges, guaranteeing zero degradation in translation.',
    icon: Globe,
    accent: '#f97316'
  },
  {
    id: 'action',
    title: 'Action',
    subtitle: 'Formal Proofs',
    description: 'Before our AI can execute a trade or deploy software, it must generate a mathematical proof that its action is safe. If the math is wrong, the action is physically impossible.',
    icon: ShieldCheck,
    accent: '#ef4444'
  }
];

export default function Home() {
  const navigate = useNavigate();
  const [email, setEmail] = useState('');
  const [submitted, setSubmitted] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    if (email) {
      setIsSubmitting(true);
      setError(null);
      try {
        const response = await fetch('/api/subscribe', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ email, company: '' }),
        });
        const data = (await response.json().catch(() => null)) as
          | {
              success?: boolean;
              error?: string;
              message?: string;
              brevoStatus?: number;
              detail?: unknown;
            }
          | null;

        const detailMessage = (() => {
          const detail = data?.detail;
          if (typeof detail === 'string') return detail;
          if (detail && typeof detail === 'object' && 'message' in detail) {
            const msg = (detail as { message?: unknown }).message;
            return typeof msg === 'string' ? msg : null;
          }
          return null;
        })();

        if (response.ok && data?.success !== false) {
          setSubmitted(true);
          setTimeout(() => setSubmitted(false), 3000);
          setEmail('');
        } else {
          const statusTag = typeof data?.brevoStatus === 'number' ? ` (Brevo ${data.brevoStatus})` : '';
          setError((detailMessage ?? data?.error ?? 'Subscription failed') + statusTag);
        }
      } catch (err) {
        const message = err instanceof Error ? err.message : 'Subscription failed';
        setError(message);
      } finally {
        setIsSubmitting(false);
      }
    }
  };

  return (
    <motion.div 
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.5 }}
    >
      {/* Hero Section */}
      <header className="relative px-6 py-24 md:py-48 max-w-7xl mx-auto overflow-hidden">
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, ease: "easeOut" }}
          className="relative z-10"
        >
          <div className="mb-6 inline-flex items-center gap-2 px-3 py-1 bg-white/5 border border-white/10 rounded-full">
            <span className="w-2 h-2 rounded-full bg-brand-accent animate-pulse" />
            <span className="text-[10px] uppercase tracking-[0.2em] font-mono text-brand-secondary">Deterministic AGI Manifesto</span>
          </div>
          
          <h1 className="font-display text-4xl md:text-7xl lg:text-8xl font-bold tracking-tight leading-[0.9] text-glow uppercase">
            AGI CANNOT BE ACHIEVED BY <span className="text-brand-secondary">GUESSING FASTER.</span>
          </h1>
          
          <p className="mt-12 max-w-4xl font-sans text-xl md:text-3xl font-light text-neutral-400 leading-relaxed italic">
            "It requires a Cognitive Operating System built on absolute mathematics. We manage Memory with Graph-Vectors, Reality with Prime Integer Relations, Logic with Constraints, Causality with Do-Calculus, Translation with Category Theory, and Action with Formal Proofs. This is the only path to safe, deterministic AGI."
          </p>

          <div className="mt-16 flex flex-wrap gap-6 items-center">
            <motion.button 
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              onClick={() => navigate('/request-access')}
              className="px-8 py-4 bg-white text-black font-display font-bold uppercase tracking-widest flex items-center gap-3 hover:bg-brand-accent transition-colors shadow-[0_0_20px_rgba(255,255,255,0.1)] hover:shadow-brand-accent/20"
            >
              Request Access <ArrowRight size={20} />
            </motion.button>
            <div className="flex -space-x-3">
              {[1, 2, 3, 4].map((i) => (
                <div key={i} className="w-10 h-10 rounded-full border-2 border-neutral-950 bg-neutral-800 flex items-center justify-center overflow-hidden">
                  <img src={`https://api.dicebear.com/7.x/shapes/svg?seed=${i}`} alt="user" className="w-full h-full object-cover opacity-50" />
                </div>
              ))}
              <div className="ml-6 flex flex-col">
                <span className="font-mono text-[10px] text-brand-secondary uppercase tracking-widest">Collaborative Nodes</span>
                <span className="font-mono text-xs">2.4k Research Partners</span>
              </div>
            </div>
          </div>
        </motion.div>

        {/* Decorative Math Element */}
        <div className="absolute right-0 top-1/2 -translate-y-1/2 -z-10 opacity-20 hidden lg:block select-none pointer-events-none">
          <div className="font-mono text-[10vw] flex flex-col leading-none text-white overflow-hidden whitespace-nowrap">
            <span>∑P(x|do(y))</span>
            <span>∫G(V)∂t</span>
            <span>Φ ∘ Ψ = id</span>
          </div>
        </div>
      </header>

      {/* The Pillars Grid */}
      <section className="px-6 py-24 border-t border-white/5 bg-neutral-950/50 backdrop-blur-md">
        <div className="max-w-7xl mx-auto">
          <div className="flex flex-col md:flex-row md:items-end justify-between mb-24 gap-8">
            <div className="max-w-2xl">
              <h2 className="font-display text-4xl md:text-6xl font-bold tracking-tighter mb-6 uppercase">
                The Six Pillars of the <br/><span className="text-brand-accent">Cognitive OS</span>
              </h2>
              <p className="text-neutral-500 font-mono text-sm leading-relaxed uppercase tracking-widest">
                Mission-critical intelligence requires absolute safety routing through six irrefutable mathematical gates.
              </p>
            </div>
            <div className="flex items-center gap-4 text-neutral-600">
              <span className="text-[10px] font-mono tracking-widest uppercase">Scroll to explore architecture</span>
              <ChevronDown className="animate-bounce" size={16} />
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-px bg-white/10 border border-white/10">
            {PILLARS.map((pillar, index) => (
              <motion.div
                key={pillar.id}
                initial={{ opacity: 0 }}
                whileInView={{ opacity: 1 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.1 }}
                className="group bg-neutral-950 p-8 md:p-12 hover:bg-neutral-900 transition-colors relative transition-all duration-500"
              >
                <div 
                  className="absolute top-0 left-0 w-1 h-0 group-hover:h-full transition-all duration-500" 
                  style={{ backgroundColor: pillar.accent }}
                />
                
                <div className="mb-8 flex items-center justify-between">
                  <div className="p-3 bg-white/5 rounded-lg text-white group-hover:scale-110 transition-transform duration-500">
                    <pillar.icon size={32} />
                  </div>
                  <span className="font-mono text-[10px] text-brand-secondary opacity-40">0{index + 1}</span>
                </div>

                <h3 className="font-display text-2xl font-bold mb-1 group-hover:tracking-wider transition-all duration-300 uppercase">
                  {pillar.title}
                </h3>
                <p className="font-mono text-[10px] text-brand-accent uppercase tracking-widest mb-6 opacity-80">
                  {pillar.subtitle}
                </p>
                <p className="text-neutral-400 font-sans text-base leading-relaxed font-light">
                  {pillar.description}
                </p>
                
                <div className="mt-12 pt-8 border-t border-white/5 opacity-0 group-hover:opacity-100 transition-opacity">
                  {pillar.id === 'memory' ? (
                    <Link
                      to="/whitepaper"
                      className="flex items-center gap-2 font-mono text-[10px] uppercase tracking-widest text-brand-secondary hover:text-white transition-colors"
                    >
                      Read Whitepaper <ArrowRight size={12} />
                    </Link>
                  ) : (
                    <button className="flex items-center gap-2 font-mono text-[10px] uppercase tracking-widest text-brand-secondary hover:text-white transition-colors">
                      Technical Spec <ArrowRight size={12} />
                    </button>
                  )}
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Action Plan Section */}
      <section className="px-6 py-24 md:py-48 max-w-4xl mx-auto text-center border-t border-white/5">
        <h2 className="font-display text-3xl md:text-5xl font-bold mb-12 uppercase tracking-tighter">
          From Statistics to <br/><span className="text-glow">Deterministic Action</span>
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-12 text-left">
          <div className="p-8 border border-white/10 hover:border-brand-accent transition-colors bg-white/5 rounded-sm">
            <h4 className="font-mono text-xs uppercase text-brand-accent mb-4 tracking-[0.3em]">Step 01</h4>
            <h3 className="text-xl font-bold mb-4 uppercase">The Whitepaper</h3>
            <p className="text-neutral-400 text-sm leading-relaxed">
              Establishing the movement for Deterministic AI. Documenting why AGI requires absolute mathematics over statistical guessing.
            </p>
          </div>
          <div className="p-8 border border-white/10 hover:border-brand-accent transition-colors bg-white/5 rounded-sm">
            <h4 className="font-mono text-xs uppercase text-brand-accent mb-4 tracking-[0.3em]">Step 02</h4>
            <h3 className="text-xl font-bold mb-4 uppercase">PrimeSwarm V1</h3>
            <p className="text-neutral-400 text-sm leading-relaxed">
              The first industrial-grade implementation of the Cognitive OS, executing mathematically proven transactions.
            </p>
          </div>
        </div>
      </section>

      {/* CTA / Newsletter */}
      <section className="px-6 py-24 md:py-32 bg-white text-black text-center relative overflow-hidden">
        <div className="relative z-10 max-w-4xl mx-auto">
          <h2 className="font-display text-4xl md:text-6xl font-bold tracking-tighter mb-8 uppercase">
            STAKE YOUR CLAIM
          </h2>
          <p className="text-lg md:text-xl font-medium mb-12 max-w-2xl mx-auto font-display">
            Directly connect with the future of deterministic AGI. Request early API access and receive the technical whitepaper.
          </p>

          <form onSubmit={handleSubmit} className="flex flex-col md:flex-row gap-4 max-w-2xl mx-auto">
            <input 
              type="email" 
              placeholder="ENTER EMAIL ADDRESS" 
              required
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              disabled={isSubmitting}
              className="flex-1 px-6 py-4 bg-neutral-100 border-2 border-transparent focus:border-black outline-none font-mono text-xs uppercase tracking-widest placeholder:text-black/30"
            />
            <button
              disabled={isSubmitting}
              className="px-10 py-4 bg-black text-white hover:bg-neutral-800 disabled:bg-neutral-800 transition-colors font-display font-bold uppercase tracking-widest flex items-center justify-center gap-3"
            >
              {submitted ? "REQUEST SENT" : isSubmitting ? "SENDING..." : "JOIN THE WAITLIST"} <Mail size={18} />
            </button>
          </form>

          {error ? (
            <p className="mt-4 font-mono text-[10px] uppercase tracking-widest text-red-700">
              {error}
            </p>
          ) : null}
          
          <p className="mt-8 font-mono text-[10px] uppercase tracking-widest opacity-60">
            Secure connection via only.institute node 0x7a...
          </p>
        </div>

        {/* Decorative Elements */}
        <div className="absolute left-10 top-1/2 -translate-y-1/2 rotate-90 hidden lg:block opacity-10 pointer-events-none select-none">
          <span className="font-mono text-9xl font-bold uppercase tracking-tighter">DETERMINISM</span>
        </div>
      </section>
    </motion.div>
  );
}
