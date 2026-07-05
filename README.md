# Сайт-приглашение на свадьбу

Одностраничный сайт-приглашение с React-фронтендом и FastAPI-бэкендом. Ответы RSVP сохраняются в CSV на сервере.

## Стек

- **Frontend:** React 18, Vite, TypeScript, CSS Modules (mobile-first)
- **Backend:** FastAPI, Python 3.12
- **Карты:** Яндекс.Карты JS API 2.1
- **Деплой:** Docker Compose + Nginx

## Быстрый старт (локально)

### 1. Настройка окружения

```bash
cp .env.example .env
```

Заполните `.env`:

- `VITE_YANDEX_MAPS_KEY` — ключ с [developer.tech.yandex.ru](https://developer.tech.yandex.ru/)
- `RSVP_DEADLINE` — дедлайн RSVP (YYYY-MM-DD), должен совпадать с `frontend/src/config/wedding.ts`

### 2. Backend

```bash
cd backend
python -m venv .venv
source .venv/bin/activate   # Windows: .venv\Scripts\activate
pip install -r requirements.txt
uvicorn app.main:app --reload --port 8000
```

### 3. Frontend

```bash
cd frontend
npm install
npm run dev
```

Сайт: [http://localhost:5173](http://localhost:5173)  
API проксируется на `localhost:8000` через Vite.

## Редактирование контента

Все тексты, даты и адреса — в одном файле:

```
frontend/src/config/wedding.ts
```

Измените имена, дату, программу, локации, дресс-код и дедлайн RSVP без правки компонентов.

## Деплой на VPS

### Требования

- Docker и Docker Compose
- Открытый порт 80 (или измените mapping в `docker-compose.yml`)

### Запуск

```bash
# На сервере
git clone <repo-url> wedding
cd wedding
cp .env.example .env
# Заполните .env

docker compose up -d --build
```

Сайт будет доступен на порту 80.

### Скачивание ответов RSVP

CSV-файл хранится в `backend/data/rsvp.csv` на хосте:

```bash
# На сервере
cat backend/data/rsvp.csv

# С локальной машины
scp user@your-server:/path/to/wedding/backend/data/rsvp.csv .
```

### HTTPS (опционально)

Настройте reverse proxy (Caddy, Nginx + certbot) перед контейнером `web` или добавьте certbot в docker-compose.

## Структура проекта

```
WeddingDmitriy/
├── frontend/           # React SPA
│   ├── src/config/     # Контент сайта (редактировать здесь)
│   └── Dockerfile      # Multi-stage: build + Nginx
├── backend/
│   ├── app/            # FastAPI приложение
│   └── data/           # CSV с ответами RSVP
├── docker-compose.yml
└── .env.example
```

## API

| Метод | Путь | Описание |
|-------|------|----------|
| GET | `/api/health` | Проверка работоспособности |
| POST | `/api/rsvp` | Сохранение ответа RSVP |

Пример тела запроса:

```json
{
  "name": "Иван Иванов",
  "attending": true,
  "guests_count": 2,
  "food": "meat",
  "drinks": ["champagne", "white_wine"],
  "comment": "Без лука"
}
```

## Mobile QA чеклист

Перед публикацией проверьте в Chrome DevTools (режим устройства):

- [ ] **iPhone SE (375px)** — нет горизонтального скролла, текст не обрезан
- [ ] **iPhone 14 (390px)** — бургер-меню открывается/закрывается, все секции доступны
- [ ] **Android (360px)** — tap-цели формы ≥ 44px, поля не вызывают zoom в iOS Safari
- [ ] **Hero** — таймер 2×2, CTA-кнопка на всю ширину
- [ ] **Карта** — отображается или показывает fallback + ссылка «Открыть в Яндекс.Картах»
- [ ] **RSVP** — форма отправляется, success/error баннеры видны
- [ ] **Навигация** — якорные ссылки скроллят к секциям, Escape закрывает меню

## Сборка frontend без Docker

```bash
cd frontend
npm run build
npm run preview
```
