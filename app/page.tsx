
"use client";
import { useState } from "react";

type Word = { w: string; v: number };
type Analysis = { words: Word[]; total: number; avg: number };

function colorFor(v:number){
  const clamped = Math.max(0, Math.min(100, v));
  const hue = (100 - clamped) * 1.2; // ~120→0 (verde→rojo)
  return `hsl(${hue} 90% 45%)`;
}

export default function Page(){
  const [text, setText] = useState("El hipertermómetro semántico es un concepto experimental que resalta la intensidad de una idea dentro de un texto.");
  const [data, setData] = useState<Analysis| null>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string| null>(null);
  const [minV, setMinV] = useState(0);
  const [topK, setTopK] = useState<number | null>(null);

  const analyze = async () => {
    setLoading(true); setError(null);
    try{
      const r = await fetch("/api/analyze", {
        method: "POST",
        headers: { "content-type": "application/json" },
        body: JSON.stringify({ text })
      });
      if(!r.ok) throw new Error(`Error ${r.status}`);
      const j = await r.json();
      setData(j);
    }catch(e:any){
      setError(e.message || "Error");
    }finally{ setLoading(false); }
  };

  const shown = (()=>{
    if(!data) return [];
    let arr = data.words.filter(w=> w.v >= minV);
    arr.sort((a,b)=> b.v - a.v);
    if(topK) arr = arr.slice(0, topK);
    return arr;
  })();

  return (
    <main style={{padding:"2rem", fontFamily:"system-ui, sans-serif"}}>
      <h1>Mapa de Calor Semántico</h1>
      <textarea value={text} onChange={e=>setText(e.target.value)}
        rows={5} style={{width:"100%", padding:"1rem", borderRadius:8, border:"1px solid #ccc"}} />
      <div style={{display:"flex", gap:12, alignItems:"center", marginTop:10}}>
        <button onClick={analyze} disabled={loading} style={{padding:"0.6rem 1rem", borderRadius:8, border:"1px solid #888"}}>
          {loading ? "Analizando..." : "Analizar"}
        </button>
        <label>Min valor: {minV}
          <input type="range" min={0} max={100} value={minV} onChange={e=>setMinV(parseInt(e.target.value))} />
        </label>
        <label>Top-K:
          <select value={topK ?? ""} onChange={e=> setTopK(e.target.value ? parseInt(e.target.value) : null)}>
            <option value="">Todos</option>
            <option value="5">Top 5</option>
            <option value="10">Top 10</option>
            <option value="20">Top 20</option>
          </select>
        </label>
        {error && <span style={{color:"crimson"}}>{error}</span>}
      </div>

      {data && (
        <section style={{marginTop:24}}>
          <div style={{marginBottom:8, opacity:0.8}}>Promedio: {Math.round(data.avg)} — Total: {data.total}</div>
          <div style={{display:"flex", flexWrap:"wrap", gap:12}} aria-label="nube de palabras">
            {shown.map(({w,v})=> (
              <span key={w}
                title={`${w}: ${v}`}
                aria-label={`palabra ${w}, valor ${v}`}
                style={{
                  color: colorFor(v),
                  fontWeight: 700,
                  fontSize: `${12 + v*0.18}px`,
                }}>{w}</span>
            ))}
          </div>
        </section>
      )}
    </main>
  );
}
