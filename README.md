# Dzencode Next Project

🔗 Repository: https://github.com/RoboMurlok/dzencode_next



Frontend

Next.js (v16.2.4)
React (v19.2.4)
Bootstrap (v5.3.8)
Framer Motion
Socket.IO Client
Zustand



Backend

Express.js
Socket.IO
MySQL
mysql2
dotenv
cors



Структура проекта

dzencode_next/
│
├── client/   # Next.js frontend
├── server/   # Express backend + Socket.IO
├── Dockerfile
├── docker-compose.yml
└── README.md



Запуск через Docker

docker-compose up --build

Порядок открытия

в файле `server/.env` расскоментируйте данные для подключения к базе данных   # данные для Docker
Сначала убедитесь, что backend запущен:
http://localhost:5000
Затем откройте frontend:
http://localhost:3000



Установка без Docker

в файле `server/.env` расскоментируйте данные для подключения к базе данных   # данные для localhost

Backend
cd server
npm install
npm run dev

Frontend
cd client
npm install
npm run dev

Затем откройте frontend:
http://localhost:3000



Схема базы данных

Файл `dzencode.sql` можно открыть и выполнить в MySQL Workbench:
1. Открыть программу MySQL Workbench
2. Подключиться к серверу MySQL
3. Выбрать:
   File → Open SQL Script → открыть `dzencode.sql`
4. Нажать кнопку Execute (⚡) для выполнения скрипта
После выполнения:
- база данных и таблицы будут созданы
- схема появится в разделе SCHEMAS (слева)



