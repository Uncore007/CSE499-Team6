This is a [Next.js](https://nextjs.org) project bootstrapped with [`create-next-app`](https://nextjs.org/docs/app/api-reference/cli/create-next-app).

## Grocery Buddy

A comprehensive meal planning and grocery management application built with Next.js and Supabase.

### Features

- 🍳 **Recipe Management**: Create, edit, and organize your recipes
- 📦 **Inventory Tracking**: Keep track of what's in your pantry
- 🛒 **Smart Grocery Lists**: Manage shopping lists organized by stores
- 🔗 **Recipe-Inventory Links**: Connect recipes with required ingredients

## Getting Started

### Prerequisites

1. Set up your environment variables in `.env.local`:
   ```
   NEXT_PUBLIC_SUPABASE_URL=your_supabase_url
   NEXT_PUBLIC_SUPABASE_ANON_KEY=your_supabase_anon_key
   ```

2. Install dependencies:
   ```bash
   npm install
   ```

### Running the Development Server

First, run the development server:

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

## Demo Data

Want to test the application with sample data? We've included a comprehensive seed script that populates your database with **18 recipes** and **60+ inventory items**.

### Quick Seed

```bash
npm run seed
```

This creates a demo account (`demo@grocerybuddy.com`) with fully populated recipes and inventory.

### Custom Account Seed

```bash
npm run seed your-email@example.com yourpassword
```

For detailed information about the seed script, see [`scripts/README.md`](./scripts/README.md).

### What's Included

- 18 diverse recipes (Italian, Asian, American, Mediterranean)
- Complete recipe details (instructions, times, servings, images)
- 60+ common inventory items
- Recipe-inventory associations with quantities

## Learn More

To learn more about Next.js, take a look at the following resources:

- [Next.js Documentation](https://nextjs.org/docs) - learn about Next.js features and API.
- [Learn Next.js](https://nextjs.org/learn) - an interactive Next.js tutorial.

You can check out [the Next.js GitHub repository](https://github.com/vercel/next.js) - your feedback and contributions are welcome!

## Deploy on Vercel

The easiest way to deploy your Next.js app is to use the [Vercel Platform](https://vercel.com/new?utm_medium=default-template&filter=next.js&utm_source=create-next-app&utm_campaign=create-next-app-readme) from the creators of Next.js.

Check out our [Next.js deployment documentation](https://nextjs.org/docs/app/building-your-application/deploying) for more details.
