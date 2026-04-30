import express from "express";
import dotenv from "dotenv";
import { createServer as createViteServer } from "vite";
import path from "path";
import { fileURLToPath } from "url";


const __dirname = path.dirname(fileURLToPath(import.meta.url));

dotenv.config({ path: path.join(process.cwd(), ".env.local") });
dotenv.config({ path: path.join(process.cwd(), ".env") });

const isNonEmptyString = (value: unknown): value is string =>
  typeof value === "string" && value.trim().length > 0;

const parseBrevoListId = (raw: string | undefined) => {
  if (!raw) return undefined;
  const trimmed = raw.trim();
  const direct = Number(trimmed);
  if (Number.isFinite(direct) && direct > 0) return direct;

  const matches = trimmed.match(/\d+/g);
  if (!matches || matches.length === 0) return undefined;
  const last = Number(matches[matches.length - 1]);
  return Number.isFinite(last) && last > 0 ? last : undefined;
};

const rateLimit = (() => {
  const windowMs = 60_000;
  const maxPerWindow = 10;
  const buckets = new Map<string, number[]>();

  return (key: string) => {
    const now = Date.now();
    const hits = (buckets.get(key) ?? []).filter((t) => now - t < windowMs);
    if (hits.length >= maxPerWindow) return false;
    hits.push(now);
    buckets.set(key, hits);
    return true;
  };
})();

async function startServer() {
  const app = express();
  const PORT = 3000;

  app.use(express.json());

  app.post("/api/subscribe", async (req, res) => {
    const { email, firstName, lastName } = (req.body ?? {}) as {
      email?: unknown;
      firstName?: unknown;
      lastName?: unknown;
      company?: unknown;
    };

    if (isNonEmptyString((req.body as any)?.company)) {
      return res.json({ success: true, message: "SUBSCRIBED" });
    }

    if (!rateLimit(req.ip ?? "unknown")) {
      return res.status(429).json({ error: "RATE_LIMITED" });
    }
    
    if (typeof email !== "string" || email.trim().length === 0) {
      return res.status(400).json({ error: "Email is required" });
    }

    const normalizedEmail = email.trim().toLowerCase();
    if (!normalizedEmail.includes("@")) {
      return res.status(400).json({ error: "Email is invalid" });
    }

    const brevoApiKey = process.env.BREVO_API_KEY;
    if (!brevoApiKey) {
      return res.status(500).json({ error: "BREVO_API_KEY is not set" });
    }

    const listIdRaw = process.env.BREVO_LIST_ID;
    const listId = parseBrevoListId(listIdRaw);
    if (listIdRaw && typeof listId !== "number") {
      return res.status(500).json({ error: "BREVO_LIST_ID is invalid" });
    }

    const attributes: Record<string, string> = {};
    if (typeof firstName === "string" && firstName.trim().length > 0) {
      attributes.FNAME = firstName.trim();
    }
    if (typeof lastName === "string" && lastName.trim().length > 0) {
      attributes.LNAME = lastName.trim();
    }

    const payload: Record<string, unknown> = {
      email: normalizedEmail,
      updateEnabled: true,
    };
    if (Object.keys(attributes).length > 0) {
      payload.attributes = attributes;
    }
    if (typeof listId === "number") {
      payload.listIds = [listId];
    }

    try {
      const brevoRes = await fetch("https://api.brevo.com/v3/contacts", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          "api-key": brevoApiKey,
        },
        body: JSON.stringify(payload),
      });

      if (!brevoRes.ok) {
        const raw = await brevoRes.text();
        let detail: unknown = raw;
        try {
          detail = JSON.parse(raw);
        } catch {
          detail = raw;
        }
        return res.status(502).json({
          success: false,
          error: "BREVO_REQUEST_FAILED",
          brevoStatus: brevoRes.status,
          detail,
        });
      }

      const data = await brevoRes.json().catch(() => ({}));
      return res.json({
        success: true,
        message: "SUBSCRIBED",
        brevo: data,
      });
    } catch (err) {
      const message = err instanceof Error ? err.message : "Unknown error";
      return res.status(502).json({ success: false, error: "BREVO_UNREACHABLE", message });
    }
  });

  // Vite middleware for development
  if (process.env.NODE_ENV !== "production") {
    const vite = await createViteServer({
      server: { middlewareMode: true },
      appType: "spa",
    });
    app.use(vite.middlewares);
  } else {
    const distPath = path.join(process.cwd(), 'dist');
    app.use(express.static(distPath));
    app.get('*', (req, res) => {
      res.sendFile(path.join(distPath, 'index.html'));
    });
  }

  app.listen(PORT, "0.0.0.0", () => {
    console.log(`Server running on http://localhost:${PORT}`);
  });
}

startServer();
