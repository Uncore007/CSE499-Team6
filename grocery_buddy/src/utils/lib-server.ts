import { createClient } from '@/utils/supabase/server';

// Recipe Functions
export async function fetchRecipes(userId: string) {
  const supabase = await createClient();
  const { data, error } = await supabase
    .from('recipes')
    .select('*')
    .eq('user_id', userId)
    .order('id', { ascending: false });
  
  if (error) throw error;
  return data;
}

export async function fetchRecipeById(id: string, userId: string) {
  const supabase = await createClient();
  const { data, error } = await supabase
    .from('recipes')
    .select('*')
    .eq('id', id)
    .eq('user_id', userId)
    .single();
  
  if (error) throw error;
  return data;
}

export async function createRecipe(recipe: any) {
  const supabase = await createClient();
  const { data, error } = await supabase
    .from('recipes')
    .insert([recipe])
    .select();
  
  if (error) throw error;
  return data;
}

export async function updateRecipe(id: string, userId: string, updates: any) {
  const supabase = await createClient();
  const { data, error } = await supabase
    .from('recipes')
    .update(updates)
    .eq('id', id)
    .eq('user_id', userId)
    .select();
  
  if (error) throw error;
  return data;
}

export async function deleteRecipe(id: string, userId: string) {
  const supabase = await createClient();
  const { error } = await supabase
    .from('recipes')
    .delete()
    .eq('id', id)
    .eq('user_id', userId);
  
  if (error) throw error;
}

// Store Functions
export async function fetchStores(userId: string) {
  const supabase = await createClient();
  const { data, error } = await supabase
    .from('stores')
    .select('*')
    .eq('user_id', userId)
    .order('id', { ascending: false });
  
  if (error) throw error;
  return data;
}

export async function fetchStoreById(id: string, userId: string) {
  const supabase = await createClient();
  const { data, error } = await supabase
    .from('stores')
    .select('*')
    .eq('id', id)
    .eq('user_id', userId)
    .single();
  
  if (error) throw error;
  return data;
}

export async function createStore(store: any) {
  const supabase = await createClient();
  const { data, error } = await supabase
    .from('stores')
    .insert([store])
    .select();
  
  if (error) throw error;
  return data;
}

export async function updateStore(id: string, userId: string, updates: any) {
  const supabase = await createClient();
  const { data, error } = await supabase
    .from('stores')
    .update(updates)
    .eq('id', id)
    .eq('user_id', userId)
    .select();
  
  if (error) throw error;
  return data;
}

export async function deleteStore(id: string, userId: string) {
  const supabase = await createClient();
  const { error } = await supabase
    .from('stores')
    .delete()
    .eq('id', id)
    .eq('user_id', userId);
  
  if (error) throw error;
}

// Inventory Functions
export async function fetchInventory(userId: string) {
  const supabase = await createClient();
  const { data, error } = await supabase
    .from('inventory')
    .select('*')
    .eq('user_id', userId)
    .order('id', { ascending: false });
  
  if (error) throw error;
  return data;
}

export async function fetchInventoryById(id: string, userId: string) {
  const supabase = await createClient();
  const { data, error } = await supabase
    .from('inventory')
    .select('*')
    .eq('id', id)
    .eq('user_id', userId)
    .single();
  
  if (error) throw error;
  return data;
}

export async function createInventoryItem(item: any) {
  const supabase = await createClient();
  const { data, error } = await supabase
    .from('inventory')
    .insert([item])
    .select();
  
  if (error) throw error;
  return data;
}

export async function updateInventoryItem(id: string, userId: string, updates: any) {
  const supabase = await createClient();
  const { data, error } = await supabase
    .from('inventory')
    .update(updates)
    .eq('id', id)
    .eq('user_id', userId)
    .select();
  
  if (error) throw error;
  return data;
}

export async function deleteInventoryItem(id: string, userId: string) {
  const supabase = await createClient();
  const { error } = await supabase
    .from('inventory')
    .delete()
    .eq('id', id)
    .eq('user_id', userId);
  
  if (error) throw error;
}

// Grocery Items Functions
export async function fetchGroceryItems(userId: string) {
  const supabase = await createClient();
  const { data, error } = await supabase
    .from('grocery_items')
    .select('*')
    .eq('user_id', userId)
    .order('id', { ascending: false });
  
  if (error) throw error;
  return data;
}

export async function fetchGroceryItemById(id: string, userId: string) {
  const supabase = await createClient();
  const { data, error } = await supabase
    .from('grocery_items')
    .select('*')
    .eq('id', id)
    .eq('user_id', userId)
    .single();
  
  if (error) throw error;
  return data;
}

export async function createGroceryItem(item: any) {
  const supabase = await createClient();
  const { data, error } = await supabase
    .from('grocery_items')
    .insert([item])
    .select();
  
  if (error) throw error;
  return data;
}

export async function updateGroceryItem(id: string, userId: string, updates: any) {
  const supabase = await createClient();
  const { data, error } = await supabase
    .from('grocery_items')
    .update(updates)
    .eq('id', id)
    .eq('user_id', userId)
    .select();
  
  if (error) throw error;
  return data;
}

export async function deleteGroceryItem(id: string, userId: string) {
  const supabase = await createClient();
  const { error } = await supabase
    .from('grocery_items')
    .delete()
    .eq('id', id)
    .eq('user_id', userId);
  
  if (error) throw error;
}

// Recipe-Inventory Association Functions
export async function fetchRecipeInventory(recipeId: string, userId: string) {
  const supabase = await createClient();
  
  // First verify the recipe belongs to the user
  const { data: recipe, error: recipeError } = await supabase
    .from('recipes')
    .select('id')
    .eq('id', recipeId)
    .eq('user_id', userId)
    .single();
  
  if (recipeError) throw recipeError;
  
  // Fetch inventory items associated with this recipe
  const { data, error } = await supabase
    .from('recipes_inventory')
    .select(`
      id,
      qty,
      unit,
      inventory:inventory_id (
        id,
        name,
        in_stock
      )
    `)
    .eq('recipe_id', recipeId);
  
  if (error) throw error;
  return data;
}

export async function addInventoryToRecipe(recipeId: string, userId: string, inventoryId: string, qty?: number, unit?: string) {
  const supabase = await createClient();
  
  // Verify recipe belongs to user
  const { data: recipe, error: recipeError } = await supabase
    .from('recipes')
    .select('id')
    .eq('id', recipeId)
    .eq('user_id', userId)
    .single();
  
  if (recipeError) throw recipeError;
  
  // Verify inventory item belongs to user
  const { data: inventory, error: inventoryError } = await supabase
    .from('inventory')
    .select('id')
    .eq('id', inventoryId)
    .eq('user_id', userId)
    .single();
  
  if (inventoryError) throw inventoryError;
  
  // Create association
  const { data, error } = await supabase
    .from('recipes_inventory')
    .insert([{
      recipe_id: recipeId,
      inventory_id: inventoryId,
      qty: qty || null,
      unit: unit || null
    }])
    .select();
  
  if (error) throw error;
  return data;
}

export async function updateRecipeInventory(id: string, recipeId: string, userId: string, updates: { qty?: number; unit?: string }) {
  const supabase = await createClient();
  
  // Verify recipe belongs to user
  const { data: recipe, error: recipeError } = await supabase
    .from('recipes')
    .select('id')
    .eq('id', recipeId)
    .eq('user_id', userId)
    .single();
  
  if (recipeError) throw recipeError;
  
  // Update association
  const { data, error } = await supabase
    .from('recipes_inventory')
    .update({
      qty: updates.qty ?? null,
      unit: updates.unit ?? null
    })
    .eq('id', id)
    .eq('recipe_id', recipeId)
    .select();
  
  if (error) throw error;
  return data;
}

export async function removeInventoryFromRecipe(id: string, recipeId: string, userId: string) {
  const supabase = await createClient();
  
  // Verify recipe belongs to user
  const { data: recipe, error: recipeError } = await supabase
    .from('recipes')
    .select('id')
    .eq('id', recipeId)
    .eq('user_id', userId)
    .single();
  
  if (recipeError) throw recipeError;
  
  // Delete association
  const { error } = await supabase
    .from('recipes_inventory')
    .delete()
    .eq('id', id)
    .eq('recipe_id', recipeId);
  
  if (error) throw error;
}

// New function to create grocery items for a recipe
export async function createGroceryItemsForRecipe(recipeId: number, userId: string) {
    const supabase = await createClient();
    
    // Get all inventory items needed for the recipe that are not in stock
    const { data: recipeInventory, error: fetchError } = await supabase
        .from('recipes_inventory')
        .select(`
            inventory_id,
            qty,
            unit,
            inventory:inventory_id (
                id,
                name,
                in_stock
            )
        `)
        .eq('recipe_id', recipeId);

    if (fetchError) {
        throw new Error(`Failed to fetch recipe inventory: ${fetchError.message}`);
    }

    if (!recipeInventory || recipeInventory.length === 0) {
        return { message: 'No inventory items found for this recipe', created: 0 };
    }

    // Filter for items not in stock
    const outOfStockItems = recipeInventory.filter(
        item => item.inventory && !item.inventory.in_stock
    );

    if (outOfStockItems.length === 0) {
        return { message: 'All items are in stock', created: 0 };
    }

    // Check which items already have grocery list entries
    const inventoryIds = outOfStockItems.map(item => item.inventory_id);
    const { data: existingGroceryItems } = await supabase
        .from('grocery_items')
        .select('inventory_id')
        .eq('user_id', userId)
        .in('inventory_id', inventoryIds);

    const existingInventoryIds = new Set(
        existingGroceryItems?.map(item => item.inventory_id) || []
    );

    // Create grocery items for items that don't already have entries
    const itemsToCreate = outOfStockItems
        .filter(item => !existingInventoryIds.has(item.inventory_id))
        .map(item => ({
            name: item.inventory.name,
            quantity: item.qty || 1,
            units: item.unit || 'unit',
            is_purchased: false,
            user_id: userId,
            inventory_id: item.inventory_id,
            store_id: null
        }));

    if (itemsToCreate.length === 0) {
        return { message: 'All out-of-stock items already have grocery list entries', created: 0 };
    }

    const { data, error: insertError } = await supabase
        .from('grocery_items')
        .insert(itemsToCreate)
        .select();

    if (insertError) {
        throw new Error(`Failed to create grocery items: ${insertError.message}`);
    }

    return { 
        message: `Created ${itemsToCreate.length} grocery list item(s)`, 
        created: itemsToCreate.length,
        items: data 
    };
}

