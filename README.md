# 🧱 Next.js App – Scalable Folder Structure

This project uses **Next.js 15 (App Router)**, **TanStack Query**, and a hybrid architecture designed for clean SSR, query reusability, and modular feature separation.

---

## 📁 Directory Structure

/
├── app/ # App router entry points
│ ├── layout.tsx
│ ├── page.tsx
│ └── news/
│ └── page.tsx # Renders NewsPage with SSR data
│
├── components/ # Shared UI components
│ ├── layout/ # Layout components (Navbar, Footer)
│ └── ui/ # Generic UI elements (Button, Modal, Card)
│
├── features/ # Feature-based UI + hooks
│ └── news/
│ ├── NewsPage.tsx # Main client component
│ ├── useNews.ts # Custom hook using TanStack Query
│ └── NewsCard.tsx # Presentational component
│
├── queries/ # Centralized query logic (server-safe)
│ └── news/
│ ├── getNews.ts # Query function
│ └── prefetchNews.ts # SSR prefetch wrapper
│
├── hooks/ # Reusable client-side hooks
│ ├── useMounted.ts
│ └── useDarkMode.ts
│
├── lib/ # Core utilities / clients / logic
│ ├── fetcher.ts # Universal fetch wrapper
│ ├── queryClient.ts # TanStack QueryClient creator
│ └── ssrQueryUtils.ts # Hydration helpers
│
├── store/ # Zustand stores
│ ├── themeStore.ts
│ └── userStore.ts
│
├── types/ # Shared TypeScript interfaces
│ └── news.ts
│
├── utils/ # Pure utility functions
│ ├── formatDate.ts
│ └── slugify.ts
│
├── styles/ # Global styles + Tailwind config
│ ├── globals.css
│ └── tailwind.config.ts
│
└── public/ # Static assets
├── favicon.ico
└── og-image.png


---

## 🧠 Architectural Principles

- **Query logic is centralized** in `/queries` for consistency, SSR, and hydration support.
- **Feature components** and their hooks live in `/features/your-feature`.
- **Custom hooks** like `useNews()` abstract `queryKey` and `queryFn` for reuse.
- **SSR support** via `prefetchQuery()` + `HydrationBoundary`.
- **TanStack Query** manages data flow, cache, and loading states.
- **Tailwind + ShadCN UI** provide a modern and clean UI foundation.

---

## 🚀 SSR Query Usage

```tsx
// app/news/page.tsx
import { prefetchNews } from "@/queries/news/prefetchNews";
import { dehydrate } from "@tanstack/react-query";
import getQueryClient from "@/lib/queryClient";
import NewsPage from "@/features/news/NewsPage";
import { HydrationBoundary } from "@tanstack/react-query";

export default async function Page() {
  const queryClient = getQueryClient();
  await prefetchNews(queryClient);
  const dehydratedState = dehydrate(queryClient);

  return (
    <HydrationBoundary state={dehydratedState}>
      <NewsPage />
    </HydrationBoundary>
  );
}

🛠 Tech Stack
Next.js 15

TanStack Query

Zustand (optional)

Tailwind CSS

ShadCN UI

TypeScript

📦 Development
bash
Copy
Edit
# Install dependencies
pnpm install

# Run dev server
pnpm dev
📄 License
MIT

yaml
Copy
Edit

---

Let me know if you’d like this bootstrapped into an actual GitHub starter template or zipped scaffolded files!