import { motion } from 'motion/react';
import { useState, type FormEvent } from 'react';
import { Link } from 'react-router-dom';
import { ArrowLeft, Mail } from 'lucide-react';

export default function RequestAccess() {
  const [email, setEmail] = useState('');
  const [submitted, setSubmitted] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();

    if (!email.trim()) return;

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
        setError((detailMessage ?? data?.error ?? 'Request failed') + statusTag);
      }
    } catch (err) {
      const message = err instanceof Error ? err.message : 'Request failed';
      setError(message);
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.5 }}
      className="max-w-3xl mx-auto px-6 py-24"
    >
      <Link
        to="/"
        className="flex items-center gap-2 text-neutral-500 hover:text-brand-accent transition-colors font-mono text-[10px] uppercase tracking-widest mb-10"
      >
        <ArrowLeft size={14} /> Back
      </Link>

      <header className="mb-10">
        <h1 className="font-display text-4xl md:text-6xl font-bold tracking-tight leading-tight uppercase">
          Request Access
        </h1>
        <p className="mt-6 text-neutral-400 text-sm md:text-base leading-relaxed">
          Enter your email address and we’ll add you to the waitlist.
        </p>
      </header>

      <div className="p-8 bg-white/5 border border-white/10 rounded-sm">
        <form onSubmit={handleSubmit} className="flex flex-col md:flex-row gap-4">
          <input
            type="email"
            placeholder="EMAIL ADDRESS"
            required
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            disabled={isSubmitting}
            className="flex-1 bg-black border border-white/20 px-4 py-3 font-mono text-[10px] uppercase tracking-widest focus:border-brand-accent outline-none"
          />
          <button
            disabled={isSubmitting}
            className="px-8 py-3 bg-brand-accent text-black font-mono text-[10px] font-bold uppercase tracking-widest flex items-center justify-center gap-3 disabled:opacity-70"
          >
            {submitted ? 'SENT' : isSubmitting ? 'SENDING...' : 'Submit'} <Mail size={16} />
          </button>
        </form>

        {error ? (
          <p className="mt-4 font-mono text-[10px] uppercase tracking-widest text-red-400">
            {error}
          </p>
        ) : null}

        <p className="mt-6 font-mono text-[10px] uppercase tracking-widest opacity-60">
          Secure connection via only.institute node 0x7a...
        </p>
      </div>
    </motion.div>
  );
}
