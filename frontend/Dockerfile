FROM node:22-alpine AS build

WORKDIR /app

COPY package.json package-lock.json ./
RUN npm ci

COPY . .

ARG VITE_YANDEX_MAPS_KEY
ARG VITE_GOOGLE_SCRIPT_URL
ENV VITE_YANDEX_MAPS_KEY=$VITE_YANDEX_MAPS_KEY
ENV VITE_GOOGLE_SCRIPT_URL=$VITE_GOOGLE_SCRIPT_URL

RUN npm run build

FROM nginx:alpine

COPY nginx.conf /etc/nginx/conf.d/default.conf
COPY --from=build /app/dist /usr/share/nginx/html

EXPOSE 80

CMD ["nginx", "-g", "daemon off;"]
