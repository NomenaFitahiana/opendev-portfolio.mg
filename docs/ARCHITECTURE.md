# Architecture

## 1. Core

- **Framework**: [Next.Js](https://nextjs.org) - Full-stack React.js framework, good for static side generation (SSG), server side rendering (SSR), and SEO. Used by some of the world's largest companies 

- **Authentication**: [Better-auth](https://better-auth.com) - The most comprehensive authentication framework for TypeScript

- **Database**: PostgreSQL - For relational and robust storage

- **Styling**: [TailwindCSS](https://tailwindcss.com/) and [ShadcnUI](https://ui.shadcn.com) - The best combo for good and clean user interface

- **Animation**: [framer-motion](https://motion.dev/)

- **ORM**: [Prisma](https:/prisma.io) - Instant Postgres plus and ORM for simpler db interaction

- **Deployment**: [Render](https://render.com) or [Vercel](https://vercel.com)

- File upload storage: [Supabase](https://supabase.com) - Backend service
- Transactional emails: [Resend](https://resend.com) or `Nodemailer`

## 2. Infrastructure

- **Redis**: [Upstash Redis](https://console.upstash.com/redis/) - For caching and rate limit (based on **Redis**)

- **Rate limiting**: [Better-auth Rate limit](https://www.better-auth.com/docs/concepts/rate-limit) - security and performance strategy that restricts the number of requests a user or client can make to a server within a specific timeframe

## 3. Advanced

- **Unit and Integration tests**: [Vitest](https://vitest.dev/)

- **e2e tests**: [Playwright](https://playwright.dev/)

- **Logging**: [Pino](http://getpino.io/) - Structured JSON logs

- **Analytics**: [Vercel Analytics](https://github.com/vercel/analytics) if app deployed there or [PostHog](https://posthog.com/) for advanced analytics tools