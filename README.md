# ruutdev-ops-demo

A minimal Next.js starter with **App Router**, **TypeScript**, **Tailwind CSS v4**, and **shadcn/ui**.

## Tech Stack

| Tool | Version |
|------|---------|
| Next.js | 16 (App Router) |
| React | 19 |
| TypeScript | 5 |
| Tailwind CSS | 4 |
| shadcn/ui | 3 |

## Getting Started

### 1. Install dependencies

```bash
npm install
```

### 2. Run the development server

```bash
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) in your browser.

## Other Commands

```bash
# Type-check the project
npx tsc --noEmit

# Lint
npm run lint

# Production build
npm run build

# Start production server (after build)
npm start

# Add a shadcn/ui component (example: card)
npx shadcn@latest add card
```

## Project Structure

```
src/
├── app/
│   ├── globals.css       # Tailwind + shadcn CSS variables
│   ├── layout.tsx        # Root layout (header + main container)
│   └── page.tsx          # Home page
├── components/
│   ├── header.tsx        # Top header bar
│   └── ui/               # shadcn/ui components
│       ├── badge.tsx
│       ├── button.tsx
│       └── separator.tsx
└── lib/
    └── utils.ts          # cn() helper from shadcn
```
