import { motion } from 'motion/react';
import { useParams, Link } from 'react-router-dom';
import { ArrowLeft, Clock, Calendar, User, Share2 } from 'lucide-react';
import { useState, type FormEvent } from 'react';

const ARTICLES = {
  'hallucination-epidemic': {
    title: 'Eliminating the Hallucination Epidemic in Statistical LLMs',
    date: 'April 28, 2026',
    author: 'Only Research',
    readTime: '12 min',
    category: 'Theory',
    content: `
      <p>The current generation of large language models (LLMs) is built on a fundamental architectural flaw: they are statistical guessers. While they can simulate human-like conversation with startling accuracy, they possess no internal model of reality or truth. They simply predict the next most likely token based on probabilistic weightings.</p>
      
      <h3>The Statistical Trap</h3>
      <p>In mission-critical environments—such as global finance, aerospace, and clinical medicine—statistical confidence is not enough. A model that is 99.9% accurate eventually encounters a situation where that 0.1% error results in systemic collapse. This is the 'Hallucination Epidemic.' It is not a bug to be fixed with more data; it is a feature of the architecture itself.</p>
      
      <h3>Absolute Mathematics: The Only Path</h3>
      <p>To move beyond guessing, we must route AI intelligence through irrefutable mathematical gates. We do not ask the AI if a structure is stable; we measure its 'Gap' and 'Area' using Prime Integer Relations. We do not ask if an action is safe; we require a Formal Proof Token before execution.</p>
      
      <p>By grounding cognitive processes in number theory and algebraic geometry, we eliminate the <strong>possibility</strong> of hallucination. The system physically cannot generate an output that violates the underlying constraints of universal mathematics.</p>
    `
  },
  'primeswarm-architecture': {
    title: 'PrimeSwarm: A New Architecture for Financial Determinism',
    date: 'April 25, 2026',
    author: 'Engineering Team',
    readTime: '8 min',
    category: 'Engineering',
    content: `
      <p>PrimeSwarm represents the first industrial-grade application of the Cognitive OS. Designed for the high-frequency environment of global stock markets, it operates not on price trends, but on mathematical invariants.</p>
      
      <h3>Proving the Trade</h3>
      <p>In our latest trial, PrimeSwarm executed a series of trades in the tech sector. Unlike traditional 'Quant' bots that use moving averages, PrimeSwarm used <strong>Superinstance Constraint Theory</strong> to define the exact boundaries of market volatility. It deleted all 'impossible' trade outcomes, leaving only those that were mathematically certain to remain within risk parameters.</p>
      
      <h3>The Proof Token</h3>
      <p>Every trade executed by PrimeSwarm was accompanied by a Prover-Verifier proof. This ensures that the AI's internal logic is externally verifiable by a non-AI formal verifier, guaranteeing that no rogue statistical logic entered the decision matrix.</p>
    `
  }
};

export default function ArticleDetail() {
  const { id } = useParams();
  const article = ARTICLES[id as keyof typeof ARTICLES];
  const [email, setEmail] = useState('');
  const [submitted, setSubmitted] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const handleSubscribe = async (e: FormEvent) => {
    e.preventDefault();
    if (email) {
      setIsSubmitting(true);
      setError(null);
      try {
        const response = await fetch('/api/subscribe', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ email }),
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

  if (!article) {
    return (
      <div className="min-h-[60vh] flex flex-col items-center justify-center text-center px-6">
        <h1 className="font-display text-4xl font-bold mb-6">ARTICLE NOT FOUND</h1>
        <Link to="/blog" className="text-brand-accent font-mono text-sm uppercase tracking-widest hover:underline flex items-center gap-2">
          <ArrowLeft size={16} /> Back to Journal
        </Link>
      </div>
    );
  }

  return (
    <motion.div 
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      className="max-w-4xl mx-auto px-6 py-24"
    >
      <Link to="/blog" className="flex items-center gap-2 text-neutral-500 hover:text-brand-accent transition-colors font-mono text-[10px] uppercase tracking-widest mb-12">
        <ArrowLeft size={14} /> Back to Journal
      </Link>

      <header className="mb-16">
        <div className="flex items-center gap-4 mb-8 text-[10px] font-mono uppercase tracking-widest text-brand-secondary">
          <span className="px-2 py-1 bg-white/5 rounded border border-white/10 text-white">{article.category}</span>
          <div className="flex items-center gap-2">
            <Calendar size={12} />
            {article.date}
          </div>
          <div className="flex items-center gap-2">
            <Clock size={12} />
            {article.readTime}
          </div>
        </div>

        <h1 className="font-display text-4xl md:text-6xl font-bold tracking-tight leading-tight uppercase mb-8">
          {article.title}
        </h1>

        <div className="flex items-center justify-between py-8 border-y border-white/5">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-full bg-white/5 border border-white/10 flex items-center justify-center">
              <User size={20} className="text-neutral-500" />
            </div>
            <div className="flex flex-col">
              <span className="font-mono text-xs text-white uppercase tracking-wider">{article.author}</span>
              <span className="font-mono text-[10px] text-neutral-500">Research Division</span>
            </div>
          </div>
          <button className="p-2 border border-white/10 hover:border-brand-accent hover:text-brand-accent transition-all rounded-sm">
            <Share2 size={18} />
          </button>
        </div>
      </header>

      <article 
        className="prose prose-invert prose-neutral max-w-none 
          prose-headings:font-display prose-headings:uppercase prose-headings:tracking-tight
          prose-p:text-neutral-400 prose-p:leading-relaxed prose-p:font-light
          prose-strong:text-brand-accent prose-strong:font-bold
          prose-h3:text-white prose-h3:mt-12
        "
        dangerouslySetInnerHTML={{ __html: article.content }}
      />

      <footer className="mt-24 pt-12 border-t border-white/5">
        <div className="p-8 bg-white/5 border border-white/10 rounded-sm">
          <h4 className="font-display text-xl font-bold mb-4 uppercase tracking-tight">Support Deterministic Research</h4>
          <p className="text-neutral-400 text-sm mb-6">
            Help us build the cognitive operating system of the future. Subscribe to our journal for technical deep-dives.
          </p>
          <form onSubmit={handleSubscribe} className="flex gap-4">
            <input 
              type="email" 
              placeholder="EMAIL ADDRESS" 
              required
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              disabled={isSubmitting}
              className="flex-1 bg-black border border-white/20 px-4 py-2 font-mono text-[10px] uppercase tracking-widest focus:border-brand-accent outline-none" 
            />
            <button
              disabled={isSubmitting}
              className="px-6 py-2 bg-brand-accent text-black font-mono text-[10px] font-bold uppercase tracking-widest disabled:opacity-70"
            >
              {submitted ? "SENT" : isSubmitting ? "SENDING..." : "Subscribe"}
            </button>
          </form>

          {error ? (
            <p className="mt-4 font-mono text-[10px] uppercase tracking-widest text-red-400">
              {error}
            </p>
          ) : null}
        </div>
      </footer>
    </motion.div>
  );
}
