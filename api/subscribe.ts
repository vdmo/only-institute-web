const isRecord = (value: unknown): value is Record<string, unknown> =>
  typeof value === "object" && value !== null;

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

const parseJsonBody = async (req: any): Promise<Record<string, unknown>> => {
  const body = req?.body;

  if (isRecord(body)) return body;
  if (typeof body === "string" && body.trim().length > 0) {
    try {
      const parsed = JSON.parse(body);
      return isRecord(parsed) ? parsed : {};
    } catch {
      return {};
    }
  }

  return {};
};

export default async function handler(req: any, res: any) {
  if (req?.method !== "POST") {
    res.setHeader("Allow", "POST");
    return res.status(405).json({ error: "Method Not Allowed" });
  }

  const body = await parseJsonBody(req);
  const email = body.email;
  const firstName = body.firstName;
  const lastName = body.lastName;

  const honeypot = body.company;
  if (isNonEmptyString(honeypot)) {
    return res.json({ success: true, message: "SUBSCRIBED" });
  }

  const forwardedFor = req?.headers?.["x-forwarded-for"];
  const clientIp = typeof forwardedFor === "string" ? forwardedFor.split(",")[0]?.trim() : "unknown";

  const now = Date.now();
  const windowMs = 60_000;
  const maxPerWindow = 10;
  const bucket = (globalThis as any).__subscribeRateLimit ?? new Map<string, number[]>();
  (globalThis as any).__subscribeRateLimit = bucket;
  const hits = (bucket.get(clientIp) ?? []).filter((t) => now - t < windowMs);
  if (hits.length >= maxPerWindow) {
    return res.status(429).json({ error: "RATE_LIMITED" });
  }
  hits.push(now);
  bucket.set(clientIp, hits);

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
}
