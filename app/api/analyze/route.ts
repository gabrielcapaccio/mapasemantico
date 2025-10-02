
import { NextRequest } from "next/server";

export const runtime = "nodejs";

export async function POST(req: NextRequest) {
  const { text, model } = await req.json();
  if (!text || typeof text !== "string") {
    return new Response(JSON.stringify({ error: "Falta 'text'." }), { status: 400 });
  }

  const ctrl = new AbortController();
  const t = setTimeout(() => ctrl.abort(), 20000);

  const body = {
    model: model || process.env.CLAUDE_MODEL || "claude-3-5-sonnet-20240620",
    max_tokens: 1200,
    messages: [{
      role: "user",
      content: `Analiza la importancia semántica de cada palabra (es-ES).
Reglas:
- Segmenta por palabra, sin puntuación.
- Normaliza a minúsculas y sin tildes para agrupar.
- Una entrada por palabra.
- Devuelve enteros 0–100.
Responde SOLO JSON:
{"words":[{"w":"palabra","v":85}], "total":n, "avg":n}
Texto: "${text}"`
    }]
  };

  try {
    const r = await fetch("https://api.anthropic.com/v1/messages", {
      method: "POST",
      headers: {
        "content-type": "application/json",
        "x-api-key": process.env.ANTHROPIC_API_KEY || "",
        "anthropic-version": "2023-06-01"
      },
      body: JSON.stringify(body),
      signal: ctrl.signal
    });

    if (!r.ok) {
      return new Response(JSON.stringify({ error: `Upstream ${r.status}` }), { status: 502 });
    }

    const data = await r.json();
    const raw = (data?.content?.[0]?.text ?? "").trim();
    const cleaned = raw.replace(/```json|```/g, "").trim();

    // validar rudimentario para evitar texto no JSON
    if (!cleaned.startsWith("{")) {
      return new Response(JSON.stringify({ error: "Respuesta no JSON del proveedor." }), { status: 502 });
    }
    return new Response(cleaned, { headers: { "content-type": "application/json" } });
  } catch (e:any) {
    const status = e.name === "AbortError" ? 504 : 500;
    return new Response(JSON.stringify({ error: e.message }), { status });
  } finally {
    clearTimeout(t);
  }
}
