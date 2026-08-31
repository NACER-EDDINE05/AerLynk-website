/**
 * A deterministic, QR-shaped module matrix for product mockups.
 * It renders a realistic 25×25 code — finder patterns, timing lines, and a
 * pseudo-random data region from a fixed seed — but it deliberately encodes
 * nothing and is not scannable.
 */
function mulberry32(seed: number) {
  return () => {
    seed |= 0;
    seed = (seed + 0x6d2b79f5) | 0;
    let t = Math.imul(seed ^ (seed >>> 15), 1 | seed);
    t = (t + Math.imul(t ^ (t >>> 7), 61 | t)) ^ t;
    return ((t ^ (t >>> 14)) >>> 0) / 4294967296;
  };
}

const SIZE = 25;

function buildMatrix(): boolean[][] {
  const rand = mulberry32(0x41a2c3);
  const m: boolean[][] = Array.from({ length: SIZE }, () => Array(SIZE).fill(false));

  const finder = (r0: number, c0: number) => {
    for (let r = 0; r < 7; r++) {
      for (let c = 0; c < 7; c++) {
        const edge = r === 0 || r === 6 || c === 0 || c === 6;
        const core = r >= 2 && r <= 4 && c >= 2 && c <= 4;
        m[r0 + r][c0 + c] = edge || core;
      }
    }
  };

  finder(0, 0);
  finder(0, SIZE - 7);
  finder(SIZE - 7, 0);

  // Timing patterns
  for (let i = 8; i < SIZE - 8; i++) {
    m[6][i] = i % 2 === 0;
    m[i][6] = i % 2 === 0;
  }

  // Alignment pattern (bottom-right)
  for (let r = SIZE - 9; r < SIZE - 4; r++) {
    for (let c = SIZE - 9; c < SIZE - 4; c++) {
      const rr = r - (SIZE - 9);
      const cc = c - (SIZE - 9);
      const edge = rr === 0 || rr === 4 || cc === 0 || cc === 4;
      const core = rr === 2 && cc === 2;
      m[r][c] = edge || core;
    }
  }

  // Data region — reserved zones stay empty
  const reserved = (r: number, c: number) =>
    (r < 9 && c < 9) || (r < 9 && c > SIZE - 9) || (r > SIZE - 9 && c < 9) ||
    r === 6 || c === 6 || (r > SIZE - 10 && c > SIZE - 10);

  for (let r = 0; r < SIZE; r++) {
    for (let c = 0; c < SIZE; c++) {
      if (!reserved(r, c)) m[r][c] = rand() > 0.52;
    }
  }
  return m;
}

const MATRIX = buildMatrix();

export function QrPattern({ className = "" }: { className?: string }) {
  return (
    <svg viewBox={`0 0 ${SIZE} ${SIZE}`} className={className} shapeRendering="crispEdges" aria-hidden="true">
      <rect width={SIZE} height={SIZE} fill="#fff" />
      {MATRIX.flatMap((row, r) =>
        row.map((on, c) => (on ? <rect key={`${r}-${c}`} x={c} y={r} width="1" height="1" fill="#0a0d14" /> : null)),
      )}
    </svg>
  );
}
