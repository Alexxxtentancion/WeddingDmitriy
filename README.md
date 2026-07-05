# Сайт-приглашение на свадьбу

Одностраничный сайт-приглашение на React. Ответы RSVP сохраняются в **Google Таблицы** через Google Apps Script — без собственного бэкенда.

## Стек

- **Frontend:** React 18, Vite, TypeScript, CSS Modules (mobile-first)
- **RSVP:** Google Apps Script → Google Sheets
- **Карты:** Яндекс.Карты JS API 2.1
- **Деплой:** Vercel (рекомендуется) или любой static host

## Быстрый старт (локально)

### 1. Настройка Google Таблицы

Подробная инструкция: [`google-apps-script/README.md`](google-apps-script/README.md)

Кратко:

1. Создайте Google Таблицу, лист **`RSVP`**, заголовки: `Дата и время | Имя | Присутствие | Гостей | Еда | Напитки | Комментарий`
2. **Расширения → Apps Script** → вставьте код из [`google-apps-script/Code.gs`](google-apps-script/Code.gs)
3. **Развернуть → Веб-приложение** (Execute as: Me, Access: Anyone)
4. Скопируйте URL развёртывания

### 2. Переменные окружения

```bash
cp .env.example .env
```

Заполните `.env` в корне проекта (Vite подхватит при запуске из `frontend/`):

```env
VITE_YANDEX_MAPS_KEY=ваш_ключ_яндекс_карт
VITE_GOOGLE_SCRIPT_URL=https://script.google.com/macros/s/XXXX/exec
```

Для локальной разработки скопируйте `.env` в `frontend/.env` или задайте переменные в `frontend/.env.local`.

### 3. Запуск

```bash
cd frontend
npm install
npm run dev
```

Сайт: [http://localhost:5173](http://localhost:5173)

## Редактирование контента

Все тексты, даты и адреса — в одном файле:

```
frontend/src/config/wedding.ts
```

## Деплой на Vercel

1. Загрузите репозиторий на GitHub
2. [vercel.com](https://vercel.com) → **Add New Project** → Import репозитория
3. **Root Directory:** `frontend`
4. **Environment Variables:**
   - `VITE_YANDEX_MAPS_KEY`
   - `VITE_GOOGLE_SCRIPT_URL`
5. **Deploy**

Файл [`frontend/vercel.json`](frontend/vercel.json) уже настроен для Vite.

После деплоя добавьте домен Vercel в Referer ограничения ключа Яндекс.Карт.

## Деплой через Docker (опционально)

```bash
cd frontend
docker build \
  --build-arg VITE_YANDEX_MAPS_KEY=... \
  --build-arg VITE_GOOGLE_SCRIPT_URL=... \
  -t wedding-site .
docker run -p 80:80 wedding-site
```

## Просмотр ответов RSVP

Откройте Google Таблицу — каждая отправка формы добавляет новую строку на лист `RSVP`.

## Структура проекта

```
WeddingDmitriy/
├── frontend/              # React SPA
│   ├── src/config/        # Контент сайта
│   ├── src/api/rsvp.ts    # Отправка в Google Sheets
│   └── vercel.json
├── google-apps-script/    # Скрипт для Google Таблицы
└── .env.example
```

## Mobile QA чеклист

- [ ] iPhone SE (375px) — нет горизонтального скролла
- [ ] Бургер-меню работает, форма RSVP отправляется
- [ ] Карта или fallback + ссылка «Открыть в Яндекс.Картах»
- [ ] Поля формы ≥ 44px, font-size 16px (без zoom в iOS Safari)

## Сборка

```bash
cd frontend
npm run build
npm run preview
```
