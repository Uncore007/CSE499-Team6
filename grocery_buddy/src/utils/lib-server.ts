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

