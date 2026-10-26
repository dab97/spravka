/* Единая точка прогрева ленивых чанков QR-модалки (P2-3).
   Вызывается из App (таймер в фоне) и из карточек (hover/focus по QR-кнопке).
   Флаг на уровне модуля — все потребители греют кэш один раз. */
let qrPrefetched = false;

export function prefetchQrChunks() {
  if (qrPrefetched) return;
  qrPrefetched = true;
  import("../components/qr-dialog");
  import("../components/styled-qr-code");
}
