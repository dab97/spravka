# Architecture.md — Архитектура, поток данных и хостинг

Техническая документация для разработчиков и ИИ-агентов. Описание интерфейса — [DESIGN.MD](DESIGN.MD), правила и соглашения — [AGENTS.md](AGENTS.md).

---

## 1. Стек технологий

- **Бандлер:** Vite 6 (`@vitejs/plugin-react`)
- **UI Библиотека:** React 18 (`react`, `react-dom`) + TypeScript (strict mode)
- **Стилизация:** Tailwind CSS 3.4 (`postcss`, `autoprefixer`, `tailwindcss-animate`)
- **Компонентная база:** shadcn/ui (Radix UI primitives: `@radix-ui/react-dialog`, `@radix-ui/react-slot`, `@radix-ui/react-tooltip`)
- **Иконки:** Hugeicons (`@hugeicons/react`, `@hugeicons/core-free-icons`)
- **QR-генерация:** `qrcode.react` (SVG-рендеринг)

---

## 2. Поток данных и единый источник правды

Все данные о справках, кабинетах, отделах и ссылках хранятся в статическом JSON-файле:
`public/data/documents.json` (при сборке копируется в `dist/data/documents.json`).

### Схема данных (`src/types/documents.ts`):

```typescript
export interface Document {
  id: number;
  department: string;     // "Администрация", "Учебная часть", "Отдел кадров", "Бухгалтерия"
  documentType: string;   // Полное наименование справки
  room: string;           // Номер кабинета ("201", "303", "206", "209")
  purpose: string;        // Для чего выдается
  destination: string;    // Куда предоставляется
  issueDays: string;      // Сроки и дни выдачи ("По мере готовности", "Ср, пт с 13:30")
  requirements: string;   // Необходимые документы ("Документ, удостоверяющий личность")
  link: string;           // Ссылка на онлайн-форму (Яндекс Формы, Google Forms и т.п.)
}

export interface DocumentCategory {
  title: string;          // Название категории ("Справки об обучении")
  documents: Document[];
}

export interface SiteData {
  site: {
    title: string;
    subtitle: string;
    links: {
      home: string;       // "https://rgsu.by/"
      schedule: string;   // "https://shedule.rgsu.by/"
    };
  };
  categories: DocumentCategory[];
}
```

---

## 3. Механика обновления на хостинге без пересборки (Zero-Rebuild)

Ключевое требование архитектуры — **возможность изменять данные справок (номера кабинетов, ссылки, дни выдачи) прямо на работающем хостинге без запуска сборки `npm run build`**.

### Как это реализовано:

1. **Защита от кэширования в коде (`src/App.tsx`)**:
   Запрос выполняется с уникальной временной меткой:
   ```typescript
   fetch(`/data/documents.json?t=${Date.now()}`, { cache: "no-cache" })
   ```
   Это обходит промежуточные прокси-серверы и кэш мобильных браузеров.

2. **Защита от кэширования на сервере (`public/.htaccess`)**:
   В файл `.htaccess` включены директивы Apache `mod_headers` и `mod_expires`:
   ```apache
   # HTML и JSON отдаются строго без кэширования
   <FilesMatch "\.(json|html)$">
     Header set Cache-Control "no-cache, no-store, must-revalidate"
     Header set Pragma "no-cache"
     Header set Expires 0
   </FilesMatch>

   # Ассеты с хэшами (JS, CSS) кэшируются на 1 год
   <FilesMatch "\.(js|css)$">
     Header set Cache-Control "public, max-age=31536000, immutable"
   </FilesMatch>
   ```

3. **Сценарий оператора**:
   - Оператор открывает `data/documents.json` через файловый менеджер панели хостинга (или по FTP).
   - Меняет номер кабинета или добавляет документ.
   - Нажимает «Сохранить».
   - При следующем обновлении страницы у любого пользователя данные сразу отображаются в актуальном виде.

---

## 4. Клиентская фильтрация и поиск

Поиск справок реализован через мемоизированный хук `useMemo` в `src/App.tsx`.
- Поиск охватывает: название справки, отдел, номер кабинета, назначение, место требования и условия.
- Фильтрация выполняется мгновенно в памяти браузера без дополнительных сетевых запросов.
- Категории без совпадений автоматически скрываются; счётчик показывает число найденных справок (`Показано: X из Y`).

---

## 5. Структура сборки (`dist/`)

Результат команды `npm run build`:
```text
dist/
├── assets/
│   ├── index-[hash].js       # React бандл (~93 КБ gzip)
│   └── index-[hash].css      # Стили Tailwind (~6 КБ gzip)
├── data/
│   └── documents.json        # Файл данных, редактируемый на хостинге
├── .htaccess                 # Правила кэширования Apache
├── 404.html                  # Автономная страница 404
├── favicon.png
├── og-image.png
├── error404.svg
└── index.html                # Корневой HTML с SEO-метаданными
```
Весь каталог `dist/` готов к прямой загрузке в корень сайта (`public_html`) на любом стандартном веб-хостинге.
