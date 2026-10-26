/* Фирменные цвета брендбука (см. инвариант №6 в AGENTS.md) — единый источник для UI и QR.
   Не путать с палитрой og-image в scripts/generate-og.cjs — там собственная градиентная схема. */
export const BRAND = {
  royal: "#102FA1", // Pantone 286 C — основной синий
  navy: "#082567",  // Pantone 2758 C — тёмно-синий (логотип, QR)
  ruby: "#A91917",  // Pantone 7627 C — фирменный рубин
} as const;
