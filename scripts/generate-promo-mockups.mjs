// Генератор HTML-макетов промо-баннеров в стиле rgsu.by для spravka.
// Запуск: node scripts/generate-promo-mockups.mjs → public/_mock1.html, public/_mock2.html
// Дальше макет открывается в браузере на dev-сервере и снимается в PNG (1200x440).
import { writeFileSync } from "node:fs";

const base = `
  * { margin: 0; padding: 0; box-sizing: border-box; }
  html, body { width: 1200px; height: 440px; overflow: hidden; }
  body {
    font-family: system-ui, -apple-system, 'Segoe UI', Roboto, sans-serif;
    color: #fff;
    background: linear-gradient(115deg, #1230b8 0%, #0c1f8f 55%, #0a1866 100%);
    position: relative;
  }
  /* Диагональные световые полосы как на rgsu.by */
  .stripes { position: absolute; inset: 0; overflow: hidden; }
  .stripes::before {
    content: ''; position: absolute; top: -20%; bottom: -20%; left: 18%; width: 90px;
    background: rgba(255,255,255,0.05); transform: skewX(-18deg);
  }
  .stripes::after {
    content: ''; position: absolute; top: -20%; bottom: -20%; left: 46%; width: 170px;
    background: rgba(255,255,255,0.04); transform: skewX(-18deg);
  }
  .glow { position: absolute; width: 560px; height: 560px; right: -80px; top: -160px; border-radius: 50%;
    background: radial-gradient(circle, rgba(0,133,255,0.35), transparent 65%); }

  .content { position: relative; z-index: 2; height: 100%; padding: 52px 64px 44px; display: flex; flex-direction: column; }
  .title {
    font-family: 'Bebas Neue Pro', system-ui, sans-serif;
    font-weight: 700; font-size: 62px; line-height: 1.02;
    letter-spacing: 0.01em; text-transform: uppercase; max-width: 660px;
  }
  .subtitle { font-size: 19px; line-height: 1.5; color: #c7d4f5; margin-top: 16px; max-width: 520px; }
  .cta {
    display: inline-flex; align-items: center; gap: 10px; margin-top: 28px;
    padding: 15px 32px; border-radius: 999px; width: fit-content;
    background: linear-gradient(180deg, #b01e17, #A91917);
    border: 1px solid rgba(255,255,255,0.18);
    font-size: 18px; font-weight: 700; color: #fff;
    box-shadow: 0 8px 20px rgba(120, 15, 10, 0.45), inset 0 1px 0 rgba(255,255,255,0.25);
  }
  /* Пагинация как в слайдере РГСУ */
  .pager { margin-top: auto; display: flex; align-items: center; gap: 16px; }
  .arrow { width: 38px; height: 38px; border-radius: 50%; border: 1.5px solid rgba(255,255,255,0.4);
    display: flex; align-items: center; justify-content: center; color: #dfe7ff; font-size: 16px; }
  .counter { font-size: 15px; color: #aeb9e8; letter-spacing: 0.08em; }
  .counter b { color: #fff; }
  .progress { width: 120px; height: 2px; background: rgba(255,255,255,0.25); border-radius: 2px; }
  .progress i { display: block; width: 50%; height: 100%; background: #fff; border-radius: 2px; }

  /* Иллюстрация справа */
  .art { position: absolute; right: 84px; top: 50%; transform: translateY(-50%); z-index: 2; }
  .ring { position: absolute; border-radius: 50%; border: 14px solid rgba(0,133,255,0.55); }
  .tri { position: absolute; width: 0; height: 0;
    border-left: 22px solid transparent; border-right: 22px solid transparent;
    border-bottom: 38px solid #d43a2a; transform: rotate(24deg); }
  .dot { position: absolute; border-radius: 50%; background: rgba(255,255,255,0.18); }
`;

const phone = `
  <div style="position:relative; width:210px; height:420px;">
    <div style="position:absolute; inset:0; border-radius:34px; background:#eef3fb; border:8px solid #dfe7f2;
      box-shadow: 0 30px 60px rgba(2,8,40,0.55), inset 0 2px 0 rgba(255,255,255,0.8);"></div>
    <div style="position:absolute; top:16px; left:50%; transform:translateX(-50%); width:70px; height:14px; border-radius:10px; background:#c9d4e4;"></div>
    <!-- Экран: справка РГСУ -->
    <div style="position:absolute; top:12px; left:12px; right:12px; bottom:12px; border-radius:24px; background:#fff; padding:20px 16px;">
      <div style="display:flex; align-items:center; gap:9px;">
        <img src="/logo-sapphire.svg" alt="" style="width:34px; height:34px; border-radius:50%; box-shadow: 0 1px 3px rgba(2,8,40,0.2);">
        <div>
          <div style="font-family:'Bebas Neue Pro'; font-size:17px; color:#0c1f8f; letter-spacing:0.05em; line-height:1;">ФИЛИАЛ РГСУ</div>
          <div style="font-size:9px; color:#94a3b8; margin-top:2px;">г. Минск · ул. Народная, 21</div>
        </div>
      </div>
      <div style="margin-top:16px; font-family:'Bebas Neue Pro'; font-size:25px; color:#0f172a; text-align:center; letter-spacing:0.08em;">СПРАВКА</div>
      <div style="margin-top:10px; height:7px; border-radius:5px; background:#dbe4f0;"></div>
      <div style="margin-top:9px; height:7px; border-radius:5px; background:#e8eef7;"></div>
      <div style="margin-top:9px; height:7px; width:78%; border-radius:5px; background:#e8eef7;"></div>
      <div style="margin-top:9px; height:7px; width:88%; border-radius:5px; background:#e8eef7;"></div>
      <div style="margin-top:9px; height:7px; width:64%; border-radius:5px; background:#e8eef7;"></div>
      <!-- Круглая печать -->
      <div style="position:absolute; top:196px; left:50%; transform:translateX(-50%) rotate(-12deg);
        width:86px; height:86px; border-radius:50%; border:3px solid rgba(0,133,255,0.55);
        outline:2px solid rgba(0,133,255,0.25); outline-offset:3px;
        display:flex; align-items:center; justify-content:center; text-align:center;
        font-family:'Bebas Neue Pro'; font-size:12px; line-height:1.15; letter-spacing:0.06em; color:rgba(0,133,255,0.75);">
        ФИЛИАЛ<br>РГСУ<br>МИНСК
      </div>
      <!-- Подпись и дата -->
      <div style="position:absolute; bottom:34px; left:16px; right:16px;">
        <svg width="66" height="20" viewBox="0 0 66 20" fill="none" stroke="#334155" stroke-width="1.6" stroke-linecap="round">
          <path d="M2 14 C 10 2, 16 20, 26 10 S 44 4, 56 12 C 60 15, 62 13, 64 11"/>
        </svg>
        <div style="display:flex; justify-content:space-between; align-items:center; margin-top:4px;">
          <div style="width:66px; height:1.5px; background:#94a3b8;"></div>
          <div style="font-size:9px; color:#64748b;">28.09.2026</div>
        </div>
      </div>
    </div>
    <div style="position:absolute; right:-26px; bottom:64px; width:74px; height:74px; border-radius:50%;
      background: radial-gradient(circle at 35% 30%, #7fe3c3, #1fa97a 70%);
      display:flex; align-items:center; justify-content:center;
      box-shadow: 0 14px 30px rgba(10,60,40,0.4), inset 0 2px 0 rgba(255,255,255,0.5);">
      <svg width="34" height="34" viewBox="0 0 24 24" fill="none" stroke="#fff" stroke-width="3" stroke-linecap="round" stroke-linejoin="round"><path d="M20 6L9 17l-5-5"/></svg>
    </div>
  </div>
`;

const doc = `
  <div style="position:relative; width:250px; height:330px;">
    <div style="position:absolute; inset:0; border-radius:20px; background:#f4f7fc; transform:rotate(4deg);
      box-shadow: 0 30px 60px rgba(2,8,40,0.5);"></div>
    <div style="position:absolute; inset:0; border-radius:20px; background:#fff; border:1px solid #e2e8f0;
      box-shadow: 0 22px 44px rgba(2,8,40,0.45); padding:34px 28px;">
      <div style="width:64px; height:64px; border-radius:16px; background:linear-gradient(135deg,#1230b8,#0c1f8f);
        display:flex; align-items:center; justify-content:center; font-family:'Bebas Neue Pro'; font-size:26px; color:#fff;">РГСУ</div>
      <div style="margin-top:22px; height:9px; border-radius:6px; background:#dbe4f0;"></div>
      <div style="margin-top:12px; height:9px; width:80%; border-radius:6px; background:#dbe4f0;"></div>
      <div style="margin-top:12px; height:9px; width:65%; border-radius:6px; background:#dbe4f0;"></div>
      <div style="margin-top:26px; height:9px; width:90%; border-radius:6px; background:#e8eef7;"></div>
      <div style="margin-top:12px; height:9px; width:70%; border-radius:6px; background:#e8eef7;"></div>
      <div style="margin-top:34px; display:flex; align-items:center; gap:10px;">
        <div style="width:44px; height:44px; border-radius:50%; border:2px solid #cbd6e8;"></div>
        <div style="height:9px; width:100px; border-radius:6px; background:#dbe4f0;"></div>
      </div>
    </div>
    <div style="position:absolute; right:-30px; top:38%; width:88px; height:88px; border-radius:50%;
      background: radial-gradient(circle at 35% 30%, #e04a40, #A91917 70%);
      display:flex; align-items:center; justify-content:center;
      font-family:'Bebas Neue Pro'; font-size:40px; color:#fff;
      box-shadow: 0 16px 34px rgba(120,20,10,0.45), inset 0 2px 0 rgba(255,255,255,0.35);">%</div>
  </div>
`;

function page(titleHtml, subtitle, cta, art, num) {
  return `<!DOCTYPE html>
<html lang="ru"><head><meta charset="UTF-8">
<style>
  @font-face { font-family: 'Bebas Neue Pro'; src: url('/fonts/bebas-neue-pro-bold.woff2') format('woff2'); font-weight: 700; }
  ${base}
</style></head>
<body>
  <div class="stripes"></div><div class="glow"></div>
  <div class="content">
    <div class="title">${titleHtml}</div>
    <div class="subtitle">${subtitle}</div>
    <div class="cta">${cta}</div>
    <div class="pager">
      <div class="arrow">‹</div>
      <div class="counter"><b>0${num}</b> &nbsp;|&nbsp; 04</div>
      <div class="arrow">›</div>
      <div class="progress"><i></i></div>
    </div>
  </div>
  <div class="art">${art}</div>
</body></html>`;
}

function ogPage() {
  // og-image 1200x630 в стиле промо-баннера: крупнее шрифты, домен вместо пагинации
  return `<!DOCTYPE html>
<html lang="ru"><head><meta charset="UTF-8">
<style>
  @font-face { font-family: 'Bebas Neue Pro'; src: url('/fonts/bebas-neue-pro-bold.woff2') format('woff2'); font-weight: 700; }
  ${base}
  html, body { width: 1200px; height: 630px; }
  .title { font-size: 96px; max-width: 700px; }
  .subtitle { font-size: 24px; max-width: 640px; margin-top: 24px; }
  .content { padding: 84px 80px 64px; }
  .domain { position: absolute; left: 80px; bottom: 64px; z-index: 2;
    font-size: 24px; font-weight: 700; color: #e2e8f0; letter-spacing: 0.02em; }
  .domain span { color: #7cc0ff; }
  .art { transform: translateY(-50%) scale(1.12); right: 110px; }
</style></head>
<body>
  <div class="stripes"></div><div class="glow"></div>
  <div class="content">
    <div class="title">Заказ справок<br>и документов</div>
    <div class="subtitle">Без очередей и лишних визитов. Оформите заявку на портале и заберите оригинал в кабинете.</div>
    <div class="cta">Заказать онлайн</div>
  </div>
  <div class="art">${phone}</div>
  <div class="domain">spravka.<span>rgsu.by</span></div>
</body></html>`;
}

writeFileSync("public/_og.html", ogPage());
writeFileSync("public/_mock1.html", page(
  "Заказ справок<br>и <span style=\"color:#7cc0ff\">документов</span>",
  "Без очередей и лишних визитов. Оформите заявку на портале и заберите оригинал в кабинете.",
  "Заказать онлайн", phone, 1));

writeFileSync("public/_mock2.html", page(
  "Справка для<br>налогового вычета",
  "Справка об оплате обучения для налогового органа — закажите электронно, оригинал заберите в кабинете.",
  "Подробнее", doc, 2));

console.log("OK: public/_mock1.html, public/_mock2.html");
