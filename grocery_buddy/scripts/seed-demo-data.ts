import { createClient } from '@supabase/supabase-js';

// You'll need to set these environment variables before running:
// NEXT_PUBLIC_SUPABASE_URL and NEXT_PUBLIC_SUPABASE_ANON_KEY
const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL!;
const supabaseKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!;

if (!supabaseUrl || !supabaseKey) {
  console.error('❌ Please set NEXT_PUBLIC_SUPABASE_URL and NEXT_PUBLIC_SUPABASE_ANON_KEY environment variables');
  process.exit(1);
}

const supabase = createClient(supabaseUrl, supabaseKey);

// Demo recipes data
const recipesData = [
  {
    title: 'Classic Spaghetti Carbonara',
    description: 'A traditional Italian pasta dish with eggs, cheese, pancetta, and pepper.',
    instructions: '1. Cook spaghetti according to package directions.\n2. Fry pancetta until crispy.\n3. Whisk eggs with parmesan cheese.\n4. Toss hot pasta with pancetta, then remove from heat and quickly mix in egg mixture.\n5. Season with black pepper and serve immediately.',
    prep_minutes: 10,
    cook_minutes: 20,
    servings: 4,
    image_url: 'https://images.unsplash.com/photo-1612874742237-6526221588e3?w=800',
    source_url: 'https://example.com/carbonara',
    inventory_items: ['Spaghetti', 'Eggs', 'Parmesan Cheese', 'Pancetta', 'Black Pepper']
  },
  {
    title: 'Chicken Stir-Fry',
    description: 'Quick and healthy Asian-inspired chicken with vegetables.',
    instructions: '1. Cut chicken into bite-sized pieces.\n2. Heat oil in wok or large pan.\n3. Cook chicken until golden.\n4. Add vegetables and stir-fry for 5 minutes.\n5. Add soy sauce and serve over rice.',
    prep_minutes: 15,
    cook_minutes: 15,
    servings: 4,
    image_url: 'https://images.unsplash.com/photo-1603133872878-684f208fb84b?w=800',
    source_url: null,
    inventory_items: ['Chicken Breast', 'Bell Peppers', 'Broccoli', 'Soy Sauce', 'Garlic', 'Ginger', 'Rice']
  },
  {
    title: 'Homemade Margherita Pizza',
    description: 'Simple and delicious pizza with fresh mozzarella, basil, and tomato sauce.',
    instructions: '1. Roll out pizza dough.\n2. Spread tomato sauce evenly.\n3. Add sliced mozzarella.\n4. Bake at 450°F for 12-15 minutes.\n5. Top with fresh basil leaves and serve.',
    prep_minutes: 20,
    cook_minutes: 15,
    servings: 2,
    image_url: 'https://images.unsplash.com/photo-1574071318508-1cdbab80d002?w=800',
    source_url: 'https://example.com/pizza',
    inventory_items: ['Pizza Dough', 'Tomato Sauce', 'Mozzarella Cheese', 'Fresh Basil', 'Olive Oil']
  },
  {
    title: 'Caesar Salad',
    description: 'Classic Caesar salad with homemade dressing and croutons.',
    instructions: '1. Wash and chop romaine lettuce.\n2. Make dressing: blend anchovies, garlic, lemon juice, dijon mustard, and olive oil.\n3. Toss lettuce with dressing.\n4. Top with parmesan and croutons.',
    prep_minutes: 15,
    cook_minutes: 0,
    servings: 4,
    image_url: 'https://images.unsplash.com/photo-1546793665-c74683f339c1?w=800',
    source_url: null,
    inventory_items: ['Romaine Lettuce', 'Parmesan Cheese', 'Croutons', 'Anchovies', 'Garlic', 'Lemon', 'Olive Oil']
  },
  {
    title: 'Beef Tacos',
    description: 'Flavorful ground beef tacos with all the toppings.',
    instructions: '1. Brown ground beef with taco seasoning.\n2. Warm taco shells.\n3. Fill shells with beef.\n4. Top with lettuce, cheese, tomatoes, and sour cream.',
    prep_minutes: 10,
    cook_minutes: 15,
    servings: 6,
    image_url: 'https://images.unsplash.com/photo-1565299585323-38d6b0865b47?w=800',
    source_url: 'https://example.com/tacos',
    inventory_items: ['Ground Beef', 'Taco Shells', 'Lettuce', 'Cheddar Cheese', 'Tomatoes', 'Sour Cream', 'Taco Seasoning']
  },
  {
    title: 'Vegetable Soup',
    description: 'Hearty and healthy soup packed with vegetables.',
    instructions: '1. Sauté onions, carrots, and celery.\n2. Add vegetable broth and bring to boil.\n3. Add remaining vegetables and simmer for 30 minutes.\n4. Season with herbs and serve hot.',
    prep_minutes: 15,
    cook_minutes: 45,
    servings: 8,
    image_url: 'https://images.unsplash.com/photo-1547592166-23ac45744acd?w=800',
    source_url: null,
    inventory_items: ['Carrots', 'Celery', 'Onions', 'Potatoes', 'Green Beans', 'Tomatoes', 'Vegetable Broth']
  },
  {
    title: 'Grilled Salmon',
    description: 'Perfectly grilled salmon with lemon and herbs.',
    instructions: '1. Season salmon with salt, pepper, and herbs.\n2. Brush with olive oil.\n3. Grill for 4-5 minutes per side.\n4. Squeeze fresh lemon juice over top and serve.',
    prep_minutes: 5,
    cook_minutes: 10,
    servings: 4,
    image_url: 'https://images.unsplash.com/photo-1467003909585-2f8a72700288?w=800',
    source_url: 'https://example.com/salmon',
    inventory_items: ['Salmon Fillets', 'Lemon', 'Fresh Dill', 'Olive Oil', 'Salt', 'Black Pepper']
  },
  {
    title: 'Pancakes',
    description: 'Fluffy homemade pancakes perfect for breakfast.',
    instructions: '1. Mix flour, sugar, baking powder, and salt.\n2. Whisk in milk, eggs, and melted butter.\n3. Pour batter onto hot griddle.\n4. Flip when bubbles form.\n5. Serve with maple syrup.',
    prep_minutes: 10,
    cook_minutes: 20,
    servings: 4,
    image_url: 'https://images.unsplash.com/photo-1528207776546-365bb710ee93?w=800',
    source_url: null,
    inventory_items: ['Flour', 'Sugar', 'Baking Powder', 'Milk', 'Eggs', 'Butter', 'Maple Syrup']
  },
  {
    title: 'Chicken Noodle Soup',
    description: 'Comforting classic chicken soup with vegetables and noodles.',
    instructions: '1. Simmer chicken in broth until cooked.\n2. Remove chicken and shred.\n3. Add vegetables and noodles to broth.\n4. Cook until tender.\n5. Return chicken to pot and serve.',
    prep_minutes: 15,
    cook_minutes: 35,
    servings: 6,
    image_url: 'https://images.unsplash.com/photo-1455619452474-d2be8b1e70cd?w=800',
    source_url: 'https://example.com/chicken-soup',
    inventory_items: ['Chicken Breast', 'Egg Noodles', 'Carrots', 'Celery', 'Onions', 'Chicken Broth', 'Parsley']
  },
  {
    title: 'Mushroom Risotto',
    description: 'Creamy Italian rice dish with mushrooms and parmesan.',
    instructions: '1. Sauté mushrooms and set aside.\n2. Toast arborio rice in butter.\n3. Gradually add warm broth, stirring constantly.\n4. Stir in mushrooms, butter, and parmesan.\n5. Season and serve immediately.',
    prep_minutes: 10,
    cook_minutes: 30,
    servings: 4,
    image_url: 'https://images.unsplash.com/photo-1476124369491-f7addf19eb7a?w=800',
    source_url: null,
    inventory_items: ['Arborio Rice', 'Mushrooms', 'Parmesan Cheese', 'Butter', 'Chicken Broth', 'White Wine', 'Onions']
  },
  {
    title: 'Greek Salad',
    description: 'Fresh Mediterranean salad with feta and olives.',
    instructions: '1. Chop tomatoes, cucumbers, and bell peppers.\n2. Add red onion and kalamata olives.\n3. Top with feta cheese.\n4. Dress with olive oil and lemon juice.\n5. Season with oregano.',
    prep_minutes: 15,
    cook_minutes: 0,
    servings: 4,
    image_url: 'https://images.unsplash.com/photo-1540189549336-e6e99c3679fe?w=800',
    source_url: 'https://example.com/greek-salad',
    inventory_items: ['Tomatoes', 'Cucumbers', 'Bell Peppers', 'Red Onion', 'Feta Cheese', 'Kalamata Olives', 'Olive Oil']
  },
  {
    title: 'Beef Stew',
    description: 'Hearty beef stew with root vegetables in rich gravy.',
    instructions: '1. Brown beef cubes in Dutch oven.\n2. Add onions, carrots, and potatoes.\n3. Pour in beef broth and red wine.\n4. Simmer for 2 hours until tender.\n5. Thicken with flour if needed.',
    prep_minutes: 20,
    cook_minutes: 120,
    servings: 6,
    image_url: 'https://images.unsplash.com/photo-1565557623262-b51c2513a641?w=800',
    source_url: null,
    inventory_items: ['Beef Chuck', 'Carrots', 'Potatoes', 'Onions', 'Beef Broth', 'Red Wine', 'Flour', 'Thyme']
  },
  {
    title: 'Pad Thai',
    description: 'Popular Thai stir-fried noodle dish with shrimp.',
    instructions: '1. Soak rice noodles until soft.\n2. Stir-fry shrimp and set aside.\n3. Scramble eggs in wok.\n4. Add noodles and sauce.\n5. Toss with bean sprouts, peanuts, and lime.',
    prep_minutes: 20,
    cook_minutes: 15,
    servings: 4,
    image_url: 'https://images.unsplash.com/photo-1559314809-0d155014e29e?w=800',
    source_url: 'https://example.com/pad-thai',
    inventory_items: ['Rice Noodles', 'Shrimp', 'Eggs', 'Bean Sprouts', 'Peanuts', 'Lime', 'Fish Sauce', 'Tamarind Paste']
  },
  {
    title: 'Chocolate Chip Cookies',
    description: 'Classic homemade chocolate chip cookies.',
    instructions: '1. Cream butter and sugars.\n2. Beat in eggs and vanilla.\n3. Mix in flour, baking soda, and salt.\n4. Fold in chocolate chips.\n5. Bake at 375°F for 10-12 minutes.',
    prep_minutes: 15,
    cook_minutes: 12,
    servings: 24,
    image_url: 'https://images.unsplash.com/photo-1499636136210-6f4ee915583e?w=800',
    source_url: null,
    inventory_items: ['Flour', 'Butter', 'Brown Sugar', 'White Sugar', 'Eggs', 'Vanilla Extract', 'Chocolate Chips', 'Baking Soda']
  },
  {
    title: 'Chicken Quesadilla',
    description: 'Cheesy chicken quesadilla with peppers and onions.',
    instructions: '1. Cook chicken with peppers and onions.\n2. Place tortilla in pan.\n3. Add cheese, chicken mixture, and another tortilla.\n4. Cook until golden, flip and cook other side.\n5. Cut into wedges and serve.',
    prep_minutes: 10,
    cook_minutes: 15,
    servings: 2,
    image_url: 'https://images.unsplash.com/photo-1618040996337-56904b7850b9?w=800',
    source_url: 'https://example.com/quesadilla',
    inventory_items: ['Chicken Breast', 'Flour Tortillas', 'Cheddar Cheese', 'Bell Peppers', 'Onions', 'Sour Cream']
  },
  {
    title: 'Caprese Salad',
    description: 'Simple Italian salad with tomatoes, mozzarella, and basil.',
    instructions: '1. Slice tomatoes and mozzarella.\n2. Arrange on plate alternating slices.\n3. Tuck fresh basil leaves between slices.\n4. Drizzle with balsamic glaze and olive oil.\n5. Season with salt and pepper.',
    prep_minutes: 10,
    cook_minutes: 0,
    servings: 4,
    image_url: 'https://images.unsplash.com/photo-1592417817038-d13fd7ab4195?w=800',
    source_url: null,
    inventory_items: ['Tomatoes', 'Fresh Mozzarella', 'Fresh Basil', 'Balsamic Vinegar', 'Olive Oil']
  },
  {
    title: 'French Toast',
    description: 'Sweet and custardy breakfast classic.',
    instructions: '1. Whisk eggs, milk, cinnamon, and vanilla.\n2. Dip bread slices in mixture.\n3. Cook on buttered griddle until golden.\n4. Flip and cook other side.\n5. Serve with powdered sugar and syrup.',
    prep_minutes: 5,
    cook_minutes: 15,
    servings: 4,
    image_url: 'https://images.unsplash.com/photo-1484723091739-30a097e8f929?w=800',
    source_url: 'https://example.com/french-toast',
    inventory_items: ['Bread', 'Eggs', 'Milk', 'Cinnamon', 'Vanilla Extract', 'Butter', 'Maple Syrup']
  },
  {
    title: 'Vegetable Curry',
    description: 'Flavorful Indian-style curry with mixed vegetables.',
    instructions: '1. Sauté onions and curry paste.\n2. Add coconut milk and bring to simmer.\n3. Add vegetables and cook until tender.\n4. Season with salt and lime juice.\n5. Serve over rice with cilantro.',
    prep_minutes: 15,
    cook_minutes: 25,
    servings: 6,
    image_url: 'https://images.unsplash.com/photo-1455619452474-d2be8b1e70cd?w=800',
    source_url: null,
    inventory_items: ['Coconut Milk', 'Curry Paste', 'Cauliflower', 'Carrots', 'Potatoes', 'Onions', 'Rice', 'Cilantro']
  }
];

async function seedDatabase(userEmail: string, userPassword: string) {
  console.log('🌱 Starting database seed...\n');

  // 1. Sign in or create user
  console.log('👤 Authenticating user...');
  let userId: string;

  const { data: signInData, error: signInError } = await supabase.auth.signInWithPassword({
    email: userEmail,
    password: userPassword,
  });

  if (signInError) {
    console.log('User does not exist, creating new user...');
    const { data: signUpData, error: signUpError } = await supabase.auth.signUp({
      email: userEmail,
      password: userPassword,
    });

    if (signUpError) {
      console.error('❌ Error creating user:', signUpError.message);
      return;
    }

    if (!signUpData.user) {
      console.error('❌ Failed to create user');
      return;
    }

    userId = signUpData.user.id;
    console.log(`✅ Created new user: ${userEmail}`);
  } else {
    userId = signInData.user.id;
    console.log(`✅ Signed in as: ${userEmail}`);
  }

  // 2. Create inventory items (unique list from all recipes)
  console.log('\n📦 Creating inventory items...');
  const allInventoryItems = Array.from(
    new Set(recipesData.flatMap(r => r.inventory_items))
  ).sort();

  const inventoryMap = new Map<string, string>();

  for (const itemName of allInventoryItems) {
    const { data, error } = await supabase
      .from('inventory')
      .insert([
        {
          name: itemName,
          in_stock: Math.random() > 0.3, // 70% chance of being in stock
          user_id: userId
        }
      ])
      .select()
      .single();

    if (error) {
      console.error(`  ❌ Error creating ${itemName}:`, error.message);
    } else {
      inventoryMap.set(itemName, data.id);
      console.log(`  ✅ Created: ${itemName}`);
    }
  }

  // 3. Create recipes and associate with inventory
  console.log('\n🍳 Creating recipes...');
  let recipeCount = 0;
  let associationCount = 0;

  for (const recipe of recipesData) {
    // Create recipe
    const { data: recipeData, error: recipeError } = await supabase
      .from('recipes')
      .insert([
        {
          title: recipe.title,
          description: recipe.description,
          instructions: recipe.instructions,
          prep_minutes: recipe.prep_minutes,
          cook_minutes: recipe.cook_minutes,
          servings: recipe.servings,
          image_url: recipe.image_url,
          source_url: recipe.source_url,
          user_id: userId
        }
      ])
      .select()
      .single();

    if (recipeError) {
      console.error(`  ❌ Error creating ${recipe.title}:`, recipeError.message);
      continue;
    }

    recipeCount++;
    console.log(`  ✅ Created recipe: ${recipe.title}`);

    // Associate inventory items with recipe
    for (const itemName of recipe.inventory_items) {
      const inventoryId = inventoryMap.get(itemName);
      if (!inventoryId) continue;

      const { error: assocError } = await supabase
        .from('recipes_inventory')
        .insert([
          {
            recipe_id: recipeData.id,
            inventory_id: inventoryId,
            qty: Math.floor(Math.random() * 3) + 1, // Random quantity 1-3
            unit: ['cup', 'tbsp', 'tsp', 'oz', 'lb', null][Math.floor(Math.random() * 6)]
          }
        ]);

      if (!assocError) {
        associationCount++;
      }
    }
  }

  console.log('\n✨ Seeding complete!');
  console.log(`📊 Summary:`);
  console.log(`   - User: ${userEmail}`);
  console.log(`   - Inventory items: ${inventoryMap.size}`);
  console.log(`   - Recipes: ${recipeCount}`);
  console.log(`   - Recipe-Inventory associations: ${associationCount}`);
}

// Get email and password from command line arguments
const email = process.argv[2] || 'demo@grocerybuddy.com';
const password = process.argv[3] || 'demo123456';

seedDatabase(email, password)
  .then(() => {
    console.log('\n✅ Done!');
    process.exit(0);
  })
  .catch((error) => {
    console.error('\n❌ Error:', error);
    process.exit(1);
  });

