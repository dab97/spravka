# AGENTS.md — точка входа для ИИ-агентов

Внутренний инструмент приёмной комиссии РГСУ: конкурсные списки, зачисление, отказы, финансы платного набора. Интерфейс на русском, бэкенда нет — всё локально в браузере. React 18 + TypeScript (strict) + Vite 7, Zustand → IndexedDB, TailwindCSS + Radix UI/shadcn-style, SheetJS, Hugeicons.

**Подробные доки (читать по необходимости, не весь проект):**
- [Architecture.md](Architecture.md) — поток импорта, алгоритм матчинга, финансовая модель, схема хранилища, таймстемпы, полный список грабель.
- [Design.md](Design.md) — дизайн-система: палитра, двухканальная акцентуация (teal=бюджет / amber=платное), типографика, паттерны компонентов, печать.
- [README.md](README.md) — человекочитаемый обзор.

## Команды

```bash
npm run dev       # dev-сервер
npm run build     # tsc -b && vite build — основной критерий проверки
npm run lint      # ESLint; 6 предупреждений react-refresh в shadcn-файлах — известная норма
```

## Карта кода

- `src/pages/` — 8 страниц: `Dashboard` (сводка+импорт), `EnrolledLists` (приказы), `CompetitionLists`, `PaidFactLists` (зачисление платного набора по факту оплаты), `ApplicantsList`, `FinancePage` (финплан), `RefusalsList`, `Settings` (места/цены).
- `src/stores/admissions.ts` — центральный стор: режим, абитуриенты, программы, списки, таймстемпы; персист в IDB-срезы.
- `src/stores/priority-overrides.ts` — ручной порядок приоритетов (предзаполнен).
- `src/lib/admissions.ts` — матчинг `generateCompetitionLists` (опция `requirePayment` — зачисление по факту оплаты), минимальные баллы, компаратор, `factStatus`.
- `src/components/FactCompetitionList.tsx` — таблица направления в разрезе зачисления по факту оплаты.
- `src/lib/csv-parser.ts` — разбор списков и отказов (ячейки — `CellValue`).
- `src/lib/orders.ts` — архив приказов `src/public/orders/`, `loadEnrolledCodes()`.
- `src/lib/idb-storage.ts` — обёртка IndexedDB + миграция.
- `src/components/ImportDialog.tsx` — импорт (списки обязательны, отказы опционально).
- `src/data/programs.ts` — 6 направлений (`places`, `paidPlaces`).

## Критические инварианты

1. `Applicant.program` = имя файла, НЕ programId.
2. Матчинг ключует по `fullName` и использует `programScores[pid].priorityRank`; `priorities[0]` = первый приоритет только после сортировки при импорте.
3. Отказ (`hasRefusal`) → `rejected` всегда; на платном зачисленные на бюджет (по `uniqueCode`) удаляются из списков.
4. Финансы считаются ТОЛЬКО от зачисленных в пределах мест; оплатившие вне плана — «К возврату» (подробнее — Architecture.md).
5. Каждый импорт полностью заменяет данные режима (без файла отказов старые отказы теряются).
6. Хранилище: `admissions-budget`/`admissions-paid` (IDB, срезы по режимам), `admissions-programs` (IDB), `admissions-mode` и `finance-prices-per-year` (localStorage).

## Соглашения

- Заголовок каждой страницы: иконка в цветном квадрате + `h1 text-3xl` + подзаголовок + `border-b` (эталон — `RefusalsList`).
- Числа: `font-mono tabular-nums`; деньги — `formatRub`; даты — `toLocaleString('ru-RU')`.
- Цвета: emerald=оплачено, amber=ожидается/платное, rose=возврат/отказ, teal=бюджет, slate=нейтральное.
- Таблицы: тулбар с Select-фильтрами и счётчиком «Показано: X из Y»; фильтрация только визуальная (статистика считается по полному списку); сортируемые заголовки — кнопка со стрелкой (ArrowUp01/Down01).
- Производительность больших таблиц (эталон — `ApplicantsList`): строки — `React.memo`-компоненты; поиск «кто зачислен» — предрасчёт Map по ФИО, НЕ `.find()` по спискам в рендере (это O(N×M)); первый рендер откладывается на 2×requestAnimationFrame, чтобы скелетон успел отрисоваться.
- Шторки над большими таблицами открывать с `modal={false}` + ручной скролл-лок (`body.overflow`): модальный Radix ставит `inert` на фон и стоит сотни мс на ~10k узлов. Оверлей в `ui/sheet.tsx` — собственный div (Radix в non-modal его не рендерит).
- Комментарии в коде — на русском, по существу. UI-тексты — на русском.
