

## Getting Started

```bash
First, install dependencies 

npm install 

Secondly run the development server:

```bash
npm run dev
# or
yarn dev
# or
pnpm dev
# or
bun dev
```

Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.


This project uses [`next/font`](https://nextjs.org/docs/app/building-your-application/optimizing/fonts) to automatically optimize and load [Geist](https://vercel.com/font), a new font family for Vercel.

## Learn More

To learn more about Next.js, take a look at the following resources:

- [Next.js Documentation](https://nextjs.org/docs) - learn about Next.js features and API.
- [Learn Next.js](https://nextjs.org/learn) - an interactive Next.js tutorial.

You can check out [the Next.js GitHub repository](https://github.com/vercel/next.js) - your feedback and contributions are welcome!

## Deploy on Vercel

The easiest way to deploy your Next.js app is to use the [Vercel Platform](https://vercel.com/new?utm_medium=default-template&filter=next.js&utm_source=create-next-app&utm_campaign=create-next-app-readme) from the creators of Next.js.



- Use Server Components for all static/non-interactive UI.
- Use dynamic imports for heavy/rarely-used client components.
- Add unit and integration tests for hooks and components.
- Monitor bundle size and Lighthouse scores after each major change.
- Consider context or state management library if chat grows in complexity.

---

**Next Steps:**  
Begin applying the most impactful changes, starting with `/app/page.tsx` (convert to Server Component, Tailwind, dynamic import, a11y, constants).
