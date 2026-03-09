# Installation

How to install dependencies and structure your app.

## 1. Clone the repository and install dependencies
```bash
git clone https://github.com/OpenDevMada/Opendev-portfolio
cd opendev-portfolio
pnpm install
```

## 2. Setup the environment variables
```bash
cp .env.example .env
```
-> After that, you need to fill out these environment variables

## 3. Apply database migrations
```bash
prisma migrate dev --name init && prisma generate
```

## 4. Launch the dev server
```bash
pnpm dev
```

-> Open **http://localhost:3000** in your browser to see the content