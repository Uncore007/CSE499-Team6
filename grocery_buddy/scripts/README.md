# Database Seeding Script

This script populates your Supabase database with demo data including 18 recipes with associated inventory items.

## What Gets Created

- **60+ Inventory Items**: Common cooking ingredients (automatically marked as in-stock or out-of-stock)
- **18 Recipes**: Complete recipes with:
  - Title and description
  - Cooking instructions
  - Prep and cook times
  - Servings
  - High-quality food images from Unsplash
  - Associated inventory items with quantities

## Recipes Included

1. Classic Spaghetti Carbonara
2. Chicken Stir-Fry
3. Homemade Margherita Pizza
4. Caesar Salad
5. Beef Tacos
6. Vegetable Soup
7. Grilled Salmon
8. Pancakes
9. Chicken Noodle Soup
10. Mushroom Risotto
11. Greek Salad
12. Beef Stew
13. Pad Thai
14. Chocolate Chip Cookies
15. Chicken Quesadilla
16. Caprese Salad
17. French Toast
18. Vegetable Curry

## Prerequisites

1. Set up environment variables in `.env.local`:
   ```
   NEXT_PUBLIC_SUPABASE_URL=your_supabase_url
   NEXT_PUBLIC_SUPABASE_ANON_KEY=your_supabase_anon_key
   ```

2. Install dependencies:
   ```bash
   npm install
   ```

## Usage

### Option 1: Using npm script (Recommended)

```bash
# Use default demo account (demo@grocerybuddy.com)
npm run seed

# Or specify custom email and password
npm run seed custom@email.com mypassword123
```

### Option 2: Direct execution

```bash
# Using tsx (TypeScript runner)
npx tsx scripts/seed-demo-data.ts [email] [password]

# Examples:
npx tsx scripts/seed-demo-data.ts demo@grocerybuddy.com demo123456
npx tsx scripts/seed-demo-data.ts myemail@example.com mypassword
```

## Default Credentials

If you don't provide credentials, the script will use:
- **Email**: `demo@grocerybuddy.com`
- **Password**: `demo123456`

## What Happens

1. **User Authentication**: 
   - Attempts to sign in with provided credentials
   - If user doesn't exist, creates a new account

2. **Inventory Creation**:
   - Creates all unique inventory items from recipes
   - Randomly assigns in-stock status (70% chance of being in stock)

3. **Recipe Creation**:
   - Creates all 18 recipes with full details
   - Associates each recipe with its required inventory items
   - Adds random quantities (1-3) and units (cups, tbsp, oz, etc.)

## Output

The script provides detailed console output:
```
🌱 Starting database seed...

👤 Authenticating user...
✅ Signed in as: demo@grocerybuddy.com

📦 Creating inventory items...
  ✅ Created: Arborio Rice
  ✅ Created: Baking Powder
  ...

🍳 Creating recipes...
  ✅ Created recipe: Classic Spaghetti Carbonara
  ✅ Created recipe: Chicken Stir-Fry
  ...

✨ Seeding complete!
📊 Summary:
   - User: demo@grocerybuddy.com
   - Inventory items: 60
   - Recipes: 18
   - Recipe-Inventory associations: 120+

✅ Done!
```

## Troubleshooting

### "Error: supabaseUrl is required"
Make sure your `.env.local` file has the correct Supabase credentials.

### "Error creating user"
- Check if the email is already in use
- Verify the password meets Supabase requirements (usually min 6 characters)

### "Unauthorized" errors
- Verify your Supabase anon key has the correct permissions
- Check that RLS (Row Level Security) policies allow insertions

## Cleaning Up

To remove seeded data:
1. Go to your Supabase dashboard
2. Navigate to the Table Editor
3. Delete entries from `recipes`, `inventory`, and `recipes_inventory` tables
4. Or delete the user account entirely

## Notes

- Each run creates NEW data (it doesn't check for duplicates)
- Images are hosted on Unsplash CDN
- Inventory items are randomly marked as in-stock or out-of-stock
- Recipe-inventory associations include realistic quantities and units

