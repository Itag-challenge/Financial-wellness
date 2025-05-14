This is a [Next.js](https://nextjs.org) project bootstrapped with [`create-next-app`](https://nextjs.org/docs/app/api-reference/cli/create-next-app).

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

You can start editing the page by modifying `app/page.tsx`. The page auto-updates as you edit the file.

This project uses [`next/font`](https://nextjs.org/docs/app/building-your-application/optimizing/fonts) to automatically optimize and load [Geist](https://vercel.com/font), a new font family for Vercel.

## Learn More

To learn more about Next.js, take a look at the following resources:

- [Next.js Documentation](https://nextjs.org/docs) - learn about Next.js features and API.
- [Learn Next.js](https://nextjs.org/learn) - an interactive Next.js tutorial.

You can check out [the Next.js GitHub repository](https://github.com/vercel/next.js) - your feedback and contributions are welcome!

## Deploy on Vercel

The easiest way to deploy your Next.js app is to use the [Vercel Platform](https://vercel.com/new?utm_medium=default-template&filter=next.js&utm_source=create-next-app&utm_campaign=create-next-app-readme) from the creators of Next.js.

Check out our [Next.js deployment documentation](https://nextjs.org/docs/app/building-your-application/deploying) for more details.

## Next.js Frontend Optimization Audit & Refactor Report

### Summary of Changes (Planned & Recommended)

#### `/app`
- **page.tsx**: 
  - Convert to Server Component (remove `"use client"`), unless Spline requires client context.
  - Replace inline background style with Tailwind classes.
  - Use Next.js `<Link>` for navigation instead of `useRouter`.
  - Dynamically import Spline for performance.
  - Add a11y improvements to button.
  - Abstract magic values (e.g., URLs, button text) as constants.

- **layout.tsx**: 
  - No major issues; ensure semantic HTML and a11y.

#### `/app/components/ui`
- **chat-interface.tsx**: 
  - No major SOLID violations, but could memoize sidebar and message list for performance.
  - Add a11y to sidebar toggle button.
  - Ensure all props are typed and named clearly.

- **chat-messages.tsx**: 
  - Use unique message IDs as keys instead of array index.
  - Consider memoizing message list for large chats.
  - Abstract "You"/"Assistant" as constants.
  - Add ARIA roles for better accessibility.

- **Other UI components**: 
  - Ensure all are typed, use Tailwind, and avoid magic values.

#### `/app/hooks`
- **use-chat.ts**: 
  - Split into smaller hooks for SRP (e.g., input management, conversation management).
  - Abstract magic strings as constants.
  - Add return type for the hook.
  - Consider context for global chat state if needed in future.

#### `/app/lib`
- **utils.ts**: 
  - No issues; `cn` utility is idiomatic.

---

### Refactors Grouped by SOLID Principle

- **Single Responsibility**: Split `useChat` into smaller hooks; move static logic out of components.
- **Open/Closed**: Abstract magic values and constants for easier extension.
- **Liskov Substitution**: Ensure all components are typed and props are explicit.
- **Interface Segregation**: Use clear, minimal prop interfaces.
- **Dependency Inversion**: Use hooks and context for shared logic, not prop drilling.

---

### Removed or Renamed Entities

- No files removed yet. Some constants and logic will be moved/renamed as part of refactor.

---

### Remaining TODOs

- Audit for duplicated logic in all UI components.
- Add ESLint/Prettier config enforcement and run auto-fix.
- Add JSDoc/TS doc comments for public APIs.
- Consider virtualization for large message lists.
- Add more a11y features (ARIA roles, labels).
- Test for hydration/layout shift issues after refactor.

---

### Recommendations for Future Improvements

- Use Server Components for all static/non-interactive UI.
- Use dynamic imports for heavy/rarely-used client components.
- Add unit and integration tests for hooks and components.
- Monitor bundle size and Lighthouse scores after each major change.
- Consider context or state management library if chat grows in complexity.

---

**Next Steps:**  
Begin applying the most impactful changes, starting with `/app/page.tsx` (convert to Server Component, Tailwind, dynamic import, a11y, constants).
