import { motion } from 'motion/react';
import { ArrowRight, Calendar, Clock, User } from 'lucide-react';
import { Link } from 'react-router-dom';

const ARTICLES = [
  {
    id: 'hallucination-epidemic',
    title: 'Eliminating the Hallucination Epidemic in Statistical LLMs',
    date: 'April 28, 2026',
    author: 'Only Research',
    readTime: '12 min',
    excerpt: 'Why statistical models will never achieve AGI and how absolute mathematics provide the only viable path to zero-error cognition.',
    category: 'Theory',
    accent: '#00ffaa'
  },
  {
    id: 'primeswarm-architecture',
    title: 'PrimeSwarm: A New Architecture for Financial Determinism',
    date: 'April 25, 2026',
    author: 'Engineering Team',
    readTime: '8 min',
    excerpt: 'Documenting the first profitable, mathematically proven stock trade executed via Prime Integer Relations.',
    category: 'Engineering',
    accent: '#3b82f6'
  },
  {
    id: 'category-theory-translation',
    title: 'Mapping Intent with Category Theory',
    date: 'April 20, 2026',
    author: 'AI Safety Lead',
    readTime: '15 min',
    excerpt: 'How using Functors to map human intent into database structures guarantees zero degradation in AI-to-Code translation.',
    category: 'Mathematics',
    accent: '#a855f7'
  },
  {
    id: 'formal-proofs-action',
    title: 'Does your AI have a Proof Token?',
    date: 'April 15, 2026',
    author: 'Only Institute',
    readTime: '10 min',
    excerpt: 'Why we mandate Proof Tokens before any AI-generated code is deployed to mission-critical systems.',
    category: 'Policy',
    accent: '#ef4444'
  }
];

export default function Blog() {
  return (
    <motion.div 
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      className="max-w-7xl mx-auto px-6 py-24"
    >
      <header className="mb-24">
        <h1 className="font-display text-5xl md:text-7xl font-bold tracking-tighter uppercase mb-6">
          The <span className="text-brand-accent">Journal</span>
        </h1>
        <p className="max-w-2xl font-mono text-sm text-neutral-500 uppercase tracking-widest">
          Technical insights, research breakthroughs, and the evolution of the Deterministic AGI movement.
        </p>
      </header>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-px bg-white/10 border border-white/10">
        {ARTICLES.map((article, index) => (
          <motion.div 
            key={article.id}
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: index * 0.1 }}
            className="group bg-neutral-950 p-8 md:p-12 hover:bg-neutral-900 transition-all duration-500 relative"
          >
            <div 
              className="absolute left-0 top-0 w-1 h-0 group-hover:h-full transition-all duration-500" 
              style={{ backgroundColor: article.accent }}
            />
            
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

            <h2 className="font-display text-2xl md:text-3xl font-bold mb-6 group-hover:text-brand-accent transition-colors leading-tight uppercase">
              <Link to={`/blog/${article.id}`}>{article.title}</Link>
            </h2>

            <p className="text-neutral-400 font-light leading-relaxed mb-12">
              {article.excerpt}
            </p>

            <div className="flex items-center justify-between mt-auto pt-8 border-t border-white/5">
              <div className="flex items-center gap-3 font-mono text-[10px] uppercase tracking-widest text-neutral-500">
                <User size={12} />
                {article.author}
              </div>
              <Link 
                to={`/blog/${article.id}`} 
                className="flex items-center gap-2 font-mono text-[10px] uppercase tracking-widest text-white group-hover:translate-x-2 transition-transform"
              >
                Read Article <ArrowRight size={14} />
              </Link>
            </div>
          </motion.div>
        ))}
      </div>
    </motion.div>
  );
}
