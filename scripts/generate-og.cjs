const fs = require('fs');
const path = require('path');
const { execSync } = require('child_process');

const logoSvgPath = path.resolve(__dirname, '../public/logo-white.svg');
const outputPath = path.resolve(__dirname, '../public/og-image.png');
const faviconOutputPath = path.resolve(__dirname, '../public/favicon.png');
const tempHtmlPath = path.resolve(__dirname, '../temp_og.html');

const logoSvgBase64 = fs.readFileSync(logoSvgPath).toString('base64');

const html = `<!DOCTYPE html>
<html lang="ru">
<head>
<meta charset="UTF-8">
<style>
  * { margin: 0; padding: 0; box-sizing: border-box; }
  html, body {
    width: 100vw;
    height: 100vh;
    margin: 0;
    padding: 0;
    overflow: hidden;
    background-color: #0b0f19;
    font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, 'Helvetica Neue', Arial, sans-serif;
    color: #ffffff;
    -webkit-font-smoothing: antialiased;
  }
  .card-canvas {
    width: 100vw;
    height: 100vh;
    display: flex;
    flex-direction: column;
    justify-content: space-between;
    padding: 68px 80px;
    position: relative;
    background-color: #0b0f19;
    overflow: hidden;
  }
  /* Background decorative glow effects */
  .glow-1 {
    position: absolute;
    top: -120px;
    right: -100px;
    width: 650px;
    height: 650px;
    background: radial-gradient(circle, rgba(37, 99, 235, 0.32) 0%, rgba(37, 99, 235, 0) 70%);
    border-radius: 50%;
    filter: blur(40px);
    pointer-events: none;
  }
  .glow-2 {
    position: absolute;
    bottom: -150px;
    left: -100px;
    width: 580px;
    height: 580px;
    background: radial-gradient(circle, rgba(14, 165, 233, 0.22) 0%, rgba(14, 165, 233, 0) 70%);
    border-radius: 50%;
    filter: blur(50px);
    pointer-events: none;
  }
  .grid-pattern {
    position: absolute;
    inset: 0;
    background-image: radial-gradient(rgba(255, 255, 255, 0.08) 1px, transparent 1px);
    background-size: 32px 32px;
    opacity: 0.6;
    pointer-events: none;
  }
  .header {
    display: flex;
    align-items: center;
    justify-content: space-between;
    position: relative;
    z-index: 10;
  }
  .brand {
    display: flex;
    align-items: center;
    gap: 20px;
  }
  .logo-box {
    width: 68px;
    height: 68px;
    border-radius: 20px;
    overflow: hidden;
    border: 1px solid rgba(255, 255, 255, 0.16);
    display: flex;
    align-items: center;
    justify-content: center;
    box-shadow: 0 10px 28px -4px rgba(0, 0, 0, 0.5);
  }
  .logo-box img {
    width: 100%;
    height: 100%;
    object-fit: cover;
  }
  .brand-text {
    display: flex;
    flex-direction: column;
    gap: 4px;
  }
  .brand-title {
    font-size: 24px;
    font-weight: 700;
    letter-spacing: -0.02em;
    color: #ffffff;
  }
  .brand-sub {
    font-size: 15px;
    font-weight: 500;
    color: #94a3b8;
  }
  .badge {
    padding: 9px 20px;
    border-radius: 9999px;
    background: rgba(37, 99, 235, 0.18);
    border: 1px solid rgba(59, 130, 246, 0.4);
    color: #60a5fa;
    font-size: 15px;
    font-weight: 600;
    letter-spacing: 0.02em;
    display: flex;
    align-items: center;
    gap: 10px;
  }
  .badge-dot {
    width: 8px;
    height: 8px;
    border-radius: 50%;
    background: #38bdf8;
    box-shadow: 0 0 12px #38bdf8;
  }
  .main-content {
    position: relative;
    z-index: 10;
    margin-top: 10px;
  }
  .title {
    font-size: 62px;
    line-height: 1.1;
    font-weight: 800;
    letter-spacing: -0.035em;
    color: #ffffff;
    margin-bottom: 22px;
  }
  .title span {
    background: linear-gradient(135deg, #38bdf8 0%, #3b82f6 50%, #6366f1 100%);
    -webkit-background-clip: text;
    -webkit-text-fill-color: transparent;
  }
  .description {
    font-size: 23px;
    line-height: 1.45;
    color: #94a3b8;
    max-width: 880px;
  }
  .footer {
    display: flex;
    align-items: center;
    justify-content: space-between;
    position: relative;
    z-index: 10;
    padding-top: 28px;
    border-top: 1px solid rgba(255, 255, 255, 0.08);
  }
  .tags {
    display: flex;
    gap: 14px;
  }
  .tag {
    padding: 9px 18px;
    border-radius: 12px;
    background: rgba(255, 255, 255, 0.04);
    border: 1px solid rgba(255, 255, 255, 0.08);
    font-size: 15px;
    color: #cbd5e1;
    font-weight: 500;
  }
  .domain {
    font-size: 19px;
    font-weight: 600;
    color: #64748b;
    font-family: ui-monospace, SFMono-Regular, Menlo, Monaco, Consolas, monospace;
    letter-spacing: -0.01em;
  }
  .domain span {
    color: #38bdf8;
  }
</style>
</head>
<body>
  <div class="card-canvas">
    <div class="glow-1"></div>
    <div class="glow-2"></div>
    <div class="grid-pattern"></div>

    <div class="header">
      <div class="brand">
        <div class="logo-box">
          <img src="data:image/svg+xml;base64,${logoSvgBase64}" alt="РГСУ" />
        </div>
        <div class="brand-text">
          <div class="brand-title">РГСУ · Филиал в г. Минске</div>
          <div class="brand-sub">Официальный студенческий сервис</div>
        </div>
      </div>
      <div class="badge">
        <span class="badge-dot"></span>
        Справки онлайн
      </div>
    </div>

    <div class="main-content">
      <h1 class="title">Заказ справок<br>и <span>документов</span></h1>
      <p class="description">
        Справки об обучении, военкомат, пенсионный фонд, бухгалтерию и отдел кадров. График приёма и кабинеты выдачи.
      </p>
    </div>

    <div class="footer">
      <div class="tags">
        <div class="tag">⚡ Без очередей</div>
        <div class="tag">🏢 Номера кабинетов</div>
        <div class="tag">📅 График приёма</div>
      </div>
      <div class="domain">spravka.<span>rgsu.by</span></div>
    </div>
  </div>
</body>
</html>`;

fs.writeFileSync(tempHtmlPath, html, 'utf8');

const edgePaths = [
  'C:\\Program Files (x86)\\Microsoft\\Edge\\Application\\msedge.exe',
  'C:\\Program Files\\Microsoft\\Edge\\Application\\msedge.exe',
  'C:\\Program Files (x86)\\Google\\Chrome\\Application\\chrome.exe',
  'C:\\Program Files\\Google\\Chrome\\Application\\chrome.exe'
];

let browserPath = edgePaths.find(p => fs.existsSync(p));
if (!browserPath) {
  console.error('No browser executable found for headless screenshot');
  process.exit(1);
}

console.log('Using browser:', browserPath);

// 1. Generate OG Image (1200x630)
const cmdOg = `"${browserPath}" --headless=new --disable-gpu --hide-scrollbars --force-device-scale-factor=1 --window-size=1200,630 --screenshot="${outputPath}" "file://${tempHtmlPath.replace(/\\/g, '/')}"`;
execSync(cmdOg, { stdio: 'inherit' });

const img = fs.readFileSync(outputPath);
const width = img.readUInt32BE(16);
const height = img.readUInt32BE(20);
console.log(`Generated OG Image: ${outputPath} (${width}x${height} px, ${img.length} bytes)`);

if (fs.existsSync(tempHtmlPath)) {
  fs.unlinkSync(tempHtmlPath);
}

// 2. Generate updated favicon.png (512x512) from logo-white.svg with squircle rounded corners
const faviconHtmlPath = path.resolve(__dirname, '../temp_favicon.html');
const faviconHtml = `<!DOCTYPE html>
<html>
<head>
<meta charset="UTF-8">
<style>
  * { margin: 0; padding: 0; box-sizing: border-box; }
  body {
    width: 512px;
    height: 512px;
    margin: 0;
    padding: 0;
    overflow: hidden;
    background: transparent;
  }
  .icon {
    width: 512px;
    height: 512px;
    border-radius: 128px;
    overflow: hidden;
  }
  .icon img {
    width: 100%;
    height: 100%;
    object-fit: cover;
  }
</style>
</head>
<body>
  <div class="icon">
    <img src="data:image/svg+xml;base64,${logoSvgBase64}" alt="РГСУ" />
  </div>
</body>
</html>`;

fs.writeFileSync(faviconHtmlPath, faviconHtml, 'utf8');
const cmdFavicon = `"${browserPath}" --headless=new --disable-gpu --hide-scrollbars --default-background-color=00000000 --force-device-scale-factor=1 --window-size=512,512 --screenshot="${faviconOutputPath}" "file://${faviconHtmlPath.replace(/\\/g, '/')}"`;
execSync(cmdFavicon, { stdio: 'inherit' });
console.log(`Generated Favicon PNG: ${faviconOutputPath} (512x512 px)`);

if (fs.existsSync(faviconHtmlPath)) {
  fs.unlinkSync(faviconHtmlPath);
}
