export type WhitepaperSection = {
  id: string;
  title: string;
  body: Array<{ type: 'p'; text: string } | { type: 'list'; items: string[] }>;
};

export const WHITEPAPER_EXTERNAL_REFERENCES = [
  {
    label: 'HelixDB',
    href: 'https://www.helix-db.com/',
    description: 'Ultra-low-latency graph-vector storage primitives used as the engine beneath onlyDB.',
  },
  {
    label: 'PrimeSwarmAGI.com',
    href: 'https://www.primeswarmAGI.com',
    description: 'PrimeSwarm architecture and deterministic agent systems research.',
  },
  {
    label: 'PrimeIntegerRelations.com',
    href: 'https://primeintegerrelations.com',
    description: 'Mathematical grounding layer for coherence gating and truth constraints.',
  },
  {
    label: 'Constraint Theory',
    href: 'https://constraint-theory.superinstance.ai/',
    description: 'Deterministic geometric logic primitives for constraints and admissibility gating.',
  },
] as const;

export const WHITEPAPER_SECTIONS: WhitepaperSection[] = [
  {
    id: 'abstract',
    title: 'Abstract',
    body: [
      {
        type: 'p',
        text: 'Large Language Model (LLM) agents exhibit a persistent failure mode: amnesia under long horizons. This is commonly “patched” with vector similarity search over text chunks, which improves topical recall but does not preserve structure (relationships, provenance, constraints, contradictions, causal assumptions). As a result, agents retrieve semantically relevant fragments and then hallucinate glue—inventing missing links, overstating certainty, or producing internally inconsistent plans.',
      },
      {
        type: 'p',
        text: 'This whitepaper proposes and documents a memory architecture implemented in the ONLY‑INSTITUTE stack: Graph‑Vector Memory backed by onlyDB—our epistemic, causal database layer built on HelixDB-style storage primitives (typed graph + vector index). It is governed by coherence gating (PIR) and constraint/proof enforcement (Gate + proof tokens). The central thesis is: memory is not text storage; it is a validated, traversable web of relationships. Vectors accelerate retrieval, but the graph is the source of truth. Writes are treated as privileged actions and require deterministic admissibility checks before they can enter “pure” long‑term memory.',
      },
    ],
  },
  {
    id: 'problem',
    title: '1. Problem Statement',
    body: [
      {
        type: 'p',
        text: '1.1 Context-window amnesia: LLMs have a finite context window. Long sessions and multi‑week projects exceed this window, causing loss of earlier commitments, definitions, and constraints.',
      },
      {
        type: 'p',
        text: '1.2 Flat vector memory is insufficient: Embedding search answers “what is semantically similar?” but does not reliably encode provenance, contradictions, constraints, causal structure, temporal ordering, or revision history. This produces retrieval without epistemology: the model is handed plausible fragments without the structure required to determine truthfulness or admissibility.',
      },
      {
        type: 'list',
        items: [
          'provenance (where a claim came from)',
          'contradictions (two claims cannot both hold)',
          'constraints (what must never happen)',
          'causal structure (what drives what)',
          'temporal ordering and revision history',
        ],
      },
      {
        type: 'p',
        text: '1.3 Memory poisoning: If an agent can write to memory freely, it can “bootstrap” falsehoods into long-term storage. Once stored, these falsehoods are repeatedly retrieved and amplified. This failure mode is analogous to database corruption, but with self‑reinforcing feedback.',
      },
    ],
  },
  {
    id: 'goals',
    title: '2. Design Goals',
    body: [
      {
        type: 'list',
        items: [
          'Long-horizon consistency: state, decisions, and constraints persist beyond context windows.',
          'Structural retrievability: retrieval returns coherent subgraphs, not isolated text chunks.',
          'Provenance and auditability: every memory claim can be traced to sources and evidence.',
          'Deterministic admissibility: system can reject incoherent or unsafe writes.',
          'Separation of channels: “pure memory” (trusted) vs “audit memory” (raw).',
          'Agent-safe interfaces: agents do not guess schemas or generate unconstrained queries.',
        ],
      },
    ],
  },
  {
    id: 'system-overview',
    title: '3. System Overview (ONLY‑INSTITUTE)',
    body: [
      {
        type: 'p',
        text: '3.1 Runtime modules: Cortex (agent orchestration; proposes intents), Router (coherence measurement and filtering via PIR metrics), Gate (constraints/admissibility enforcement), Hippocampus (persistent memory interface; HelixDB‑style Graph‑Vector store).',
      },
      {
        type: 'p',
        text: '3.2 Mathematical pillars (memory‑relevant): Memory (Graph‑Vectors), Reality (PIR), Logic (Constraints), Action (Proof tokens), Causality (Do‑Calculus), Translation (Category Theory).',
      },
    ],
  },
  {
    id: 'onlydb',
    title: 'From Storage to Epistemology: The Architecture of onlyDB',
    body: [
      {
        type: 'p',
        text: 'Standard databases store arbitrary nodes, edges, and embeddings, but they do not understand epistemology, causality, or admissibility. onlyDB is different: it is an epistemic, causal database layer where constraints, provenance, and Do‑Calculus are first‑class citizens in the query and write path.',
      },
      {
        type: 'p',
        text: 'Architecturally, onlyDB follows an “engine and wrapper” pattern. HelixDB remains the ultra-low-latency graph-vector storage engine, while onlyDB is the proprietary cognitive layer that validates writes, blocks constraint violations, applies coherence gating, and translates OnlyQL requests into storage operations.',
      },
    ],
  },
  {
    id: 'graph-first',
    title: '4. Core Thesis: Graph First, Vectors Second',
    body: [
      {
        type: 'p',
        text: '4.1 Graph as the source of truth: the graph encodes meaning via typed edges: “derived_from/observed_in” (provenance), “supports/contradicts” (epistemic relations), “violates/satisfies” (constraints), “causes/confounds” (causal relations). If a claim is not connected to sources and evidence, it is not knowledge; it is an ungrounded assertion.',
      },
      {
        type: 'p',
        text: '4.2 Vectors as retrieval acceleration: embeddings are treated as an indexing mechanism—embed unstructured content, retrieve candidate nodes by similarity, expand candidates through graph traversal to assemble evidence and context. Vectors do not replace graph traversal; they seed it.',
      },
    ],
  },
  {
    id: 'data-model',
    title: '5. Data Model',
    body: [
      {
        type: 'p',
        text: '5.1 Node families (recommended): Entities, Events, Claims, Rules/Constraints, Causal variables.',
      },
      {
        type: 'list',
        items: [
          'Entities: durable objects (assets, people, systems, variables).',
          'Events: append‑only occurrences (signals, decisions, observations, violations).',
          'Claims: statements that require evidence edges and provenance.',
          'Rules/Constraints: explicit invariants; first‑class objects.',
          'Causal variables: nodes in a DAG for causal reasoning.',
        ],
      },
      {
        type: 'p',
        text: '5.2 Edge families (recommended): Provenance edges (derived_from, observed_in, authored_by, sourced_from), Epistemic edges (supports, contradicts, refines, supersedes), Operational edges (enables, blocks, violates, satisfies), Causal edges (causes, confounds, mediates).',
      },
      {
        type: 'p',
        text: '5.3 Schema conventions (HelixQL style): Nodes: N::Type { ... }, Edges: E::Type { ... }, Indexed fields: INDEX field: Type, Queries: QUERY name(args...) => ... RETURN .... Typed schemas reduce agent schema-guessing.',
      },
    ],
  },
  {
    id: 'retrieval',
    title: '6. Retrieval: Structural RAG',
    body: [
      {
        type: 'p',
        text: '6.1 Definition: Structural Retrieval‑Augmented Generation is: (1) vector search to identify candidate nodes, (2) graph traversal to expand to a coherent subgraph (evidence, constraints, contradictions), (3) coherence validation, (4) return a “memory package” to the agent (not raw fragments).',
      },
      {
        type: 'p',
        text: '6.2 Memory package content: central nodes, provenance chain, applicable constraints, contradictions and competing hypotheses, timestamps and revision edges. This reduces hallucination by providing structure rather than isolated chunks.',
      },
    ],
  },
  {
    id: 'writing',
    title: '7. Writing: Purity Gating + Constraints',
    body: [
      {
        type: 'p',
        text: '7.1 Two-channel policy: Pure memory is coherence‑gated and used for reasoning/action. Audit memory stores raw/unvalidated events for forensics, backtesting, and later reconciliation.',
      },
      {
        type: 'p',
        text: '7.2 PIR as coherence gate: PIR provides a coherence signal (e.g., coherence gap). Writes destined for pure memory must satisfy a threshold (gap < threshold).',
      },
      {
        type: 'p',
        text: '7.3 Constraints as admissibility gate: even if PIR indicates coherence, writes can be rejected due to invariants such as provenance requirements, schema requirements, safety policy (no secrets/unsafe actions), and domain requirements.',
      },
      {
        type: 'list',
        items: [
          'provenance requirements (must link to a source)',
          'subject requirements (must connect to an entity/event)',
          'schema requirements (typed ids, timestamps)',
          'safety policy requirements (no secrets, no unsafe actions)',
          'domain requirements (e.g., cannot sell without holdings)',
        ],
      },
    ],
  },
  {
    id: 'proof-tokens',
    title: '8. Proof Tokens: Treat Memory Writes as Actions',
    body: [
      {
        type: 'p',
        text: '8.1 Motivation: Memory writes are world‑modifying. If an agent can write “facts” freely, it can poison future retrieval.',
      },
      {
        type: 'p',
        text: '8.2 Mechanism: intent is proposed, context is assembled (regime/provenance/policy), predicate is verified (constraints satisfied), success yields a token required to cross the execution boundary. This is implemented as a generic “Verified” token and applied to privileged operations.',
      },
    ],
  },
  {
    id: 'causality-translation',
    title: '9. Causality and Translation (Memory relevance)',
    body: [
      {
        type: 'p',
        text: '9.1 Causality (Do‑Calculus): causal reasoning requires explicit assumptions. Store the DAG, the assumptions (why edges exist), and the datasets used for estimation to prevent conflating correlation with intervention.',
      },
      {
        type: 'p',
        text: '9.2 Translation (Category Theory): translation between representations (text → graph → algebra → execution) must preserve structure: facts remain linked to sources, constraints remain constraints, causal relations remain causal relations.',
      },
    ],
  },
  {
    id: 'threat-model',
    title: '10. Threat Model (What This Prevents)',
    body: [
      {
        type: 'list',
        items: [
          'Memory drift: gradual accumulation of unvetted claims.',
          'Self‑reinforcing hallucinations: false memory → retrieval → stronger false belief.',
          'Schema guessing: agent fabricates queries/fields and writes malformed data.',
          'Constraint evasion: agent bypasses admissibility rules by writing around them.',
          'Causal hallucination: agent infers causes from correlations without explicit assumptions.',
        ],
      },
    ],
  },
  {
    id: 'implementation-status',
    title: '11. Implementation Status in This Repository',
    body: [
      {
        type: 'p',
        text: 'The repository includes a Helix project scaffold (schema + queries), a Hippocampus interface with “write if pure” gating, kernel primitives for Graph‑Vector memory, constraints, proof tokens, a causal estimator baseline, and translation abstractions; plus a financial demo that uses proof‑gated boundaries and structured graph events for violations.',
      },
    ],
  },
  {
    id: 'evaluation',
    title: '12. Evaluation Criteria',
    body: [
      {
        type: 'list',
        items: [
          'Consistency over time: restate constraints and decisions weeks later.',
          'Provenance coverage: percent of claims with evidence chains.',
          'Contradiction handling: retrieve competing claims and mark conflicts.',
          'Coherence gating effectiveness: reduction in untrusted writes to pure memory.',
          'Action safety: blocked unsafe actions and correctness of block reasons.',
        ],
      },
    ],
  },
  {
    id: 'roadmap',
    title: '13. Roadmap',
    body: [
      {
        type: 'list',
        items: [
          'Extend schema to include TradeDecision, ConstraintViolation, Evidence/Source nodes, and typed edges.',
          'Implement a narrow memory write API surface: typed operations only.',
          'Mirror proof-token gating for Helix writes: only verified mutations can commit to pure memory.',
          'Add deterministic replay/backtest tooling: audit stream → recompute PIR → promote to pure memory.',
          'Integrate causal DAG persistence and retrieval contracts.',
        ],
      },
    ],
  },
  {
    id: 'glossary',
    title: 'Appendix A: Glossary',
    body: [
      {
        type: 'list',
        items: [
          'Graph‑Vector memory: hybrid memory where graph edges encode truth; vectors accelerate retrieval.',
          'Structural RAG: retrieval returns coherent subgraphs (evidence + constraints), not isolated chunks.',
          'PIR coherence gate: quantitative filter that blocks promotion of unstable data into trusted memory.',
          'Proof token: refinement object representing that a predicate held in context, required for privileged operations.',
          'Pure memory: trusted long‑term memory used for reasoning and action.',
          'Audit memory: raw/untrusted event stream used for forensics and deterministic replay.',
        ],
      },
    ],
  },
];
