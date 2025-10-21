
import { NextRequest } from "next/server";

export const runtime = "nodejs";

export async function POST(req: NextRequest) {
  const { text, importantWords } = await req.json();
  if (!text || typeof text !== "string") {
    return new Response(JSON.stringify({ error: "Falta 'text'." }), { status: 400 });
  }

  const ctrl = new AbortController();
  const t = setTimeout(() => ctrl.abort(), 30000);

  // Extraer las palabras importantes (naranjas y rojas, valor >= 60)
  const keyWords = importantWords?.filter((w: {w: string, v: number}) => w.v >= 60)
    .map((w: {w: string, v: number}) => w.w)
    .join(", ") || "";

  const body = {
    model: process.env.CLAUDE_MODEL || "claude-3-5-sonnet-20240620",
    max_tokens: 2000,
    messages: [{
      role: "user",
      content: `Mejora el siguiente texto en español (es-ES), privilegiando y preservando las siguientes palabras clave de alta importancia semántica: ${keyWords || "todas las palabras del texto original"}.

Instrucciones:
- Mantén las palabras clave mencionadas (son las de mayor importancia semántica)
- Mejora la claridad, fluidez y estilo del texto
- Enriquece el vocabulario donde sea apropiado, pero sin perder las palabras clave
- Mantén el mensaje y tono original
- Si el texto ya es bueno, haz mejoras sutiles

Texto original:
"${text}"

Responde ÚNICAMENTE con el texto mejorado, sin explicaciones adicionales.`
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
    const improvedText = (data?.content?.[0]?.text ?? "").trim();

    return new Response(JSON.stringify({ improvedText }), {
      headers: { "content-type": "application/json" }
    });
  } catch (e:any) {
    const status = e.name === "AbortError" ? 504 : 500;
    return new Response(JSON.stringify({ error: e.message }), { status });
  } finally {
    clearTimeout(t);
  }
}
