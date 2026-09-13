# Мониторинг конкурсных списков РГСУ — Design System Reference

> **High-Density Admission Command Center** — профессиональная информационно-аналитическая система приёмной комиссии РГСУ с двухканальной цветовой акцентуацией, плоскими поверхностями, адаптивным управлением и высококонтрастным форматом печатных отчётов.

**Theme:** dual-mode (Light / Dark with automatic system preference fallback)

Система представляет собой строгий, современный и информационно-плотный командный интерфейс для отслеживания хода приёмной кампании в реальном времени. В основе дизайна лежит концепция нестираемой визуальной ясности: нейтральный slate-каркас поддерживает весь контент, а два параллельных акцентных канала (Teal/Emerald для бюджетной формы и Amber/Gold для платной) моментально информируют операторов и абитуриентов о выбранном контексте зачисления. Интерфейс избавлен от декоративных тяжелых теней в пользу микро-границ 1px, скруглений класса Squircle и моноширинной типографики для ключевых цифровых метрик и условных кодов.

---

## Colors

Система использует строго регламентированную палитру на основе Tailwind Slate в сочетании с динамическими акцентными темами в зависимости от формы обучения (`Бюджет` vs `Платное`).

### Neutral Canvas & Surfaces

| Name | Tailwind / Hex | Role |
|------|----------------|------|
| Canvas Light | `#f8fafc` (`bg-slate-50`) | Основной фон страницы в светлой теме |
| Canvas Dark | `#020617` (`dark:bg-slate-950`) | Основной фон страницы в тёмной теме |
| Card Light | `#ffffff` (`bg-white`) | Поверхность карточек, таблиц и плашек в светлой теме |
| Card Dark | `#0f172a` (`dark:bg-slate-900`) | Поверхность карточек и таблиц в тёмной теме |
| Subcard Light | `#f1f5f9` (`bg-slate-100`, `bg-slate-50/70`) | Вложенные панели, фоны шапок таблиц и инпутов |
| Subcard Dark | `#1e293b` (`dark:bg-slate-800`, `dark:bg-slate-900/70`) | Вложенные панели в тёмном режиме |
| Ink Primary | `#0f172a` / `#f8fafc` (`text-slate-900`, `dark:text-slate-100`) | Заголовки, первичный текст, критические цифры |
| Ink Secondary | `#64748b` / `#94a3b8` (`text-slate-500`, `dark:text-slate-400`) | Вторичные подписи, метаданные, неактивные табы |
| Ink Muted | `#94a3b8` / `#64748b` (`text-slate-400`, `dark:text-slate-500`) | Подсказки, плейсхолдеры, иконные штрихи |
| Hairline Border | `border-slate-200/80` / `dark:border-slate-800` | Контурные микро-границы всех карточек и элементов (1px) |

### Accent Systems (Dynamic Basis Context)

#### 1. Бюджетная основа (Teal / Emerald Theme)
- **Primary Accent Text:** `text-teal-700` (`#0f766e`) / `dark:text-teal-400` (`#2dd4bf`)
- **Strong Title Text:** `text-teal-800` / `dark:text-teal-300`
- **Soft Background Surface:** `bg-teal-50` / `dark:bg-teal-950/40`
- **Border Highlight:** `border-teal-200` / `dark:border-teal-900`
- **Solid Hero Banner:** `bg-teal-700` / `dark:bg-teal-800`
- **Pass Zone Highlight:** `border-emerald-500`, значок `✓ Граница бюджетных мест` (`bg-emerald-50 text-emerald-800`)

#### 2. Платная основа (Amber / Gold Theme)
- **Primary Accent Text:** `text-amber-700` (`#b45309`) / `dark:text-amber-400` (`#fbbf24`)
- **Strong Title Text:** `text-amber-800` / `dark:text-amber-300`
- **Soft Background Surface:** `bg-amber-50` / `dark:bg-amber-950/40`
- **Border Highlight:** `border-amber-200` / `dark:border-amber-900`
- **Solid Hero Banner:** `bg-amber-600` / `dark:bg-amber-700`
- **Pass Zone Highlight:** `border-amber-500`, значок `✓ Граница платных мест` (`bg-amber-50 text-amber-800`)

### Semantic Status Colors
- **Success / Enrolled / Paid:** Emerald (`bg-emerald-50 text-emerald-700`, `dark:bg-emerald-950/40 dark:text-emerald-300`) — зачисленные абитуриенты, оплаченные договоры.
- **Alert / Destructive:** Rose (`bg-rose-50 text-rose-700`, `dark:bg-rose-950/40 dark:text-rose-300`) — формальные отказы от зачисления.
- **Pending / In Competition:** Slate Neutral (`bg-slate-100 text-slate-700`, `dark:bg-slate-800 dark:text-slate-300`) — статус «в конкурсе».
- **Admitted Elsewhere:** Amber/Slate Neutral — зачислен на более высокий приоритет (скрывается из нижних списков для чистоты конкурса).

---

## Typography

Типографика построена на базе системного бесзасечного шрифта с добавлением табулированных моноширинных чисел (`tabular-nums font-mono`) для удобства быстрого сканирования строк и столбцов таблицы. В именах абитуриентов используется умеренное начертание (`font-normal text-slate-800 / dark:text-slate-100`) для предотвращения визуального шума при просмотре больших списков.

- **Primary Sans Font:** `system-ui, -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif`
- **Numeric & Code Font:** `ui-monospace, SFMono-Regular, Menlo, Monaco, Consolas, monospace`
- **Файлы шрифтов:** `src/fonts/BebasNeue-Bold.woff2` подключён (`@font-face` в `index.css`, утилита `font-bebas`) — акцидентный; `src/fonts/GolosText-VF.woff2` лежит, но НЕ подключён — при переходе на Golos заменить Primary Sans.

### Type Scale

| Role | Size | Weight | Line Height | Context Usage |
|------|------|--------|-------------|---------------|
| **Display Header** | 24px (2xl) / 30px (3xl) | 600 (Semibold) | 1.2 | Заголовки страниц и Hero-баннера |
| **Section Title** | 18px (lg) / 20px (xl) | 600 (Semibold) | 1.3 | Заголовки направлений подготовки |
| **Metric Hero Number** | 24px (2xl) | 600 (Semibold) | 1.0 | Цифровые показания плашек (всего, зачислено, мест) |
| **Body Primary** | 14px (sm) | 400 (Normal) | 1.4 | ФИО абитуриентов в таблицах, модальные окна |
| **Table Microcopy** | 12px (xs) | 400 / 500 / 600 | 1.3 | Баллы, приоритеты, фильтры, статус-теги |
| **Micro Tag / Label** | 11px / 10px | 600 (Semibold) | 1.2 uppercase | Категориальные бейджи (`ПЛАТНАЯ ОСНОВА`, `БЮДЖЕТНАЯ ОСНОВА`) |

---

## Spacing & Layout

Дизайн ориентирован на единый плавный скроллинг главного контейнера (`<main className="flex-1 overflow-y-auto min-h-0 min-w-0">`) с плотной подачей данных.

- **Page Shell Structure:** Верхний фиксированный Header (56px) + сворачиваемый левый Sidebar (`w-64` в развернутом виде, `w-16` в свернутом) + единая скроллируемая область контента.
- **Mobile Bottom Sheet:** Адаптивное боковое меню на мобильных устройствах (`Sheet side="left"`).
- **Grid Gutters:** 12px (`gap-3`) и 16px (`gap-4`) в сетках метрик и карточек программ.

### Border Radius Hierarchy (Squircle Philosophy)
- **Modals & Hero Cards:** `16px`–`24px` (`rounded-2xl` / `rounded-3xl`)
- **Metric Cards & Table Containers:** `16px` (`rounded-2xl`)
- **Buttons, Inputs & Nav Items:** `12px` (`rounded-xl`)
- **Dropdown Popovers & Selects:** `12px` (`rounded-xl`)
- **Badges & Pill Labels:** `9999px` (`rounded-full`)

---

## Components System

### 1. Application Header & Basis Switcher
- **Layout:** Sticky шапка высотой 56px с полупрозрачным фоном `backdrop-blur-md` и тонкой нижней границей `border-b border-slate-200/80`.
- **Funding Mode Toggle:** Двухпозиционный переключатель `Бюджет` / `Платная основа` в шапке для мгновенной смены контекста приложения.

### 2. Collapsible Desktop Sidebar
- **Behavior:** Боковая панель с возможностью сворачивания в мини-режим (`w-16`). В свернутом состоянии навигационные иконки снабжены выплывающими подсказками (`Tooltip side="right"`). Состояние сохраняется в `localStorage`.

### 3. Hero Command Center Banner
- **Structure:** Компактная карточка (`rounded-2xl`, `p-5`) с контрастным плавно переключающимся фоном (`bg-teal-700` или `bg-amber-600`), фоновой декоративной иконкой и оперативными кнопками («Импортировать список», «Сбросить»).

### 4. Metric Stats Cards
- **Structure:** 3-колоночная сетка карточек метрик (Всего поступающих, Зачислено, Направлений) с табулированными крупными числами и статусными индикаторами.

### 5. Program Cards & Estimated Passing Score
- **Cards Grid:** Сетка направлений подготовки с индикаторами заполняемости мест.
- **Estimated Cutoff Score:** Динамический расчет проходного балла. Если зачислений нет, система рассчитывает балл абитуриента на границе выделенных мест (`places - 1`) и отображает его с меткой `Предв. проходной: XXX`.

### 6. Dynamic Competition Table & Threshold Line
- **Table Container:** Карточка с закругленными углами `rounded-2xl` и интегрированной верхней панелью поиска/фильтров.
- **Threshold Line (`Граница мест`):** Яркая разделяющая линия (`border-emerald-500` для Бюджета, `border-amber-500` для Платного) с круглым бейджем `✓ Граница бюджетных / платных мест · N мест`, указывающая реальную отсечку конкурса.
- **Student Drawer Sheet:** Боковой выезжающий карточка-слайдер (`Sheet side="right"`) с исчерпывающими деталями баллов ЕГЭ, ИД и приоритетов выбранного абитуриента.

### 7. Import Dialog Component
- **Design:** Акроматическое модальное окно импорта файлов (`.json`, `.csv`) с зоной drag-and-drop, предварительным просмотром структуры файла и автоматической сверкой списков отказов.

### 8. Table Toolbar: Filters, Counter & Sortable Headers
- **Layout:** над таблицей — слева поиск (`Search01Icon` + `Input rounded-xl text-xs`), справа Select-фильтры (`rounded-xl text-xs`) и счётчик «Показано: X из Y» (`font-mono tabular-nums`).
- **Единый набор фильтров:** «Отказы: все / Без отказов / Только отказы» (в обоих режимах), «Бюджет: все / Зачислены / Не зачислены» и «Договор»/«Оплата» — по применимости. Комбинируются с поиском.
- **Фильтрация только визуальная:** статистика шапки, проходной балл и граница мест считаются по полному списку и не меняются от фильтров.
- **Сортируемые заголовки** (Общий список): кнопка внутри `TableHead` + индикатор `ArrowUp01Icon`/`ArrowDown01Icon`; ФИО — первое направление от А, балл — от лучшего; при равных — tie-break через `compareApplicants`.

---

## Print & Media Styles (A4 Standard)

Система включает модуль печатных форм (`@media print`), предназначенный для печати официальных списков.
- **Print Optimization:** Автоматически скрываются веб-элементы (шапка, меню, кнопки экспорта).
- **Clean Layout:** Минимизируются отступы, включается классический документный заголовок с датой формирования.

---

## Do's and Don'ts

### Do
- Соблюдать строгое разделение акцентов: Teal для `Бюджет`, Amber для `Платное`.
- Использовать `font-normal` для имен абитуриентов во избежание зрительного переутомления.
- Применять моноширинный шрифт (`font-mono tabular-nums`) для цифровых баллов и уникальных кодов.
- Отображать границу мест через `effectiveLineIndex` как для бюджета, так и для платной основы.

### Don't
- Не создавать вложенные `overflow-hidden` и `overflow-y-auto` контейнеры — скроллинг должен быть единым и плавным на уровне `<main>`.
- Не использовать тяжелые размытые тени — визуальная иерархия строится на плоских поверхностях и хайрлайн-границах 1px.
