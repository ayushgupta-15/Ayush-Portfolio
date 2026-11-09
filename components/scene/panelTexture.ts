import * as THREE from "three";
import type { Snippet } from "@/lib/snippets";

const KEYWORDS: Record<string, string[]> = {
  verilog: ["always", "always_comb", "always_ff", "begin", "end", "if", "else", "for", "break", "int", "unsigned", "assign", "input", "output", "wire", "reg", "logic", "module", "endmodule"],
  cpp: ["return", "int", "while", "std", "bool", "const", "auto", "Token", "string"],
  c: ["return", "if", "static", "void", "uint32_t", "NULL", "const", "struct"],
  ts: ["export", "const", "await", "if", "throw", "new", "return", "import", "from"],
  py: ["def", "return", "import", "from", "for", "in", "if", "None", "True", "False"],
};

const COLORS = { kw: "#7AA2FF", str: "#9AE6B4", com: "#5F6F8E", num: "#F6C177", fn: "#67E8F9", base: "#C9D6F2" };

function tokenize(line: string, lang: Snippet["lang"]): [string, string][] {
  const out: [string, string][] = [];
  const kws = new Set(KEYWORDS[lang]);
  const re = /(\/\/.*|\/\*.*?\*\/|#.*|"[^"]*"|'[^']*'|\b\d[\w']*\b|\b[A-Za-z_]\w*(?=\()|\b[A-Za-z_]\w*\b|\s+|.)/g;
  let m: RegExpExecArray | null;
  while ((m = re.exec(line))) {
    const t = m[0];
    let c = COLORS.base;
    if (/^(\/\/|\/\*)/.test(t) || (lang === "py" && t.startsWith("#"))) c = COLORS.com;
    else if (/^["']/.test(t)) c = COLORS.str;
    else if (/^\d/.test(t)) c = COLORS.num;
    else if (kws.has(t)) c = COLORS.kw;
    else if (/^[A-Za-z_]\w*$/.test(t) && line.slice(m.index + t.length).startsWith("(")) c = COLORS.fn;
    out.push([t, c]);
  }
  return out;
}

export function makePanelTexture(s: Snippet): { texture: THREE.CanvasTexture; aspect: number } {
  const lines = s.code.split("\n");
  const W = 1024;
  const lh = 38;
  const head = 64;
  const H = head + lines.length * lh + 36;
  const c = document.createElement("canvas");
  c.width = W;
  c.height = H;
  const g = c.getContext("2d")!;
  g.fillStyle = "#06101F";
  g.fillRect(0, 0, W, H);
  g.fillStyle = "#0C1B33";
  g.fillRect(0, 0, W, head);
  g.fillStyle = "#22C7E8";
  g.fillRect(0, head - 2, W, 2);
  g.font = "600 26px ui-monospace, 'DejaVu Sans Mono', Menlo, monospace";
  g.fillStyle = "#E8EEF8";
  g.fillText(s.file, 28, 40);
  g.font = "22px ui-monospace, 'DejaVu Sans Mono', Menlo, monospace";
  g.fillStyle = "#6F7F9E";
  const label = s.repo;
  g.fillText(label, W - 28 - g.measureText(label).width, 40);
  g.font = "28px ui-monospace, 'DejaVu Sans Mono', Menlo, monospace";
  lines.forEach((line, i) => {
    const y = head + 28 + (i + 1) * lh - 8;
    g.fillStyle = "#3A4A6B";
    g.fillText(String(i + 1).padStart(2, " "), 20, y);
    let x = 78;
    tokenize(line, s.lang).forEach(([t, col]) => {
      g.fillStyle = col;
      g.fillText(t, x, y);
      x += g.measureText(t).width;
    });
  });
  const texture = new THREE.CanvasTexture(c);
  texture.colorSpace = THREE.SRGBColorSpace;
  texture.anisotropy = 4;
  return { texture, aspect: H / W };
}
