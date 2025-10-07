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

