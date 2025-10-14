"use client";

import { useEffect, useState } from "react";

interface Recipe {
  id: string;
  title: string;
  image_url?: string;
  prep_minutes?: number;
  cook_minutes?: number;
  servings?: number;
}

interface CalendarDay {
  day: string;
  recipes?: Recipe | null;
}

const daysOfWeek = ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"];

export default function Calendar() {
  const [calendar, setCalendar] = useState<CalendarDay[]>([]);
  const [recipes, setRecipes] = useState<Recipe[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [removingAll, setRemovingAll] = useState(false);

  useEffect(() => {
    Promise.all([fetchCalendar(), fetchRecipes()]).finally(() => setLoading(false));
  }, []);

  async function fetchCalendar() {
    try {
      const res = await fetch("/api/calendar");
      if (!res.ok) throw new Error("Failed to load calendar");
      const data = await res.json();
      setCalendar(data);
    } catch (err) {
      setError(err instanceof Error ? err.message : "Unknown error");
    }
  }

  async function fetchRecipes() {
    try {
      const res = await fetch("/api/recipes");
      if (!res.ok) throw new Error("Failed to load recipes");
      const data = await res.json();
      setRecipes(data);
    } catch (err) {
      console.error(err);
    }
  }

  async function assignRecipe(day: string, recipeId: string) {
    try {
      const res = await fetch("/api/calendar", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ recipe_id: recipeId, day_of_week: day }),
      });

      if (!res.ok) throw new Error("Failed to assign recipe");
      await fetchCalendar();
    } catch (err) {
      alert(err instanceof Error ? err.message : "Error assigning recipe");
    }
  }

  async function removeRecipe(day: string) {
    try {
      const res = await fetch("/api/calendar", {
        method: "DELETE",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ day }),
      });
      if (!res.ok) throw new Error("Failed to remove recipe");
      await fetchCalendar();
    } catch (err) {
      alert(err instanceof Error ? err.message : "Error removing recipe");
    }
  }

  async function removeAllRecipes() {
    if (!confirm("Are you sure you want to clear the entire calendar?")) return;
    setRemovingAll(true);
    try {
      const assignedDays = calendar.filter((c) => c.recipes);
      await Promise.all(assignedDays.map((day) => removeRecipe(day.day)));
      await fetchCalendar();
    } catch (err) {
        alert("Error removing all recipes");
      } finally {
        setRemovingAll(false);
      }
    }

  if (loading)
    return <p className="text-center text-gray-300">Loading calendar...</p>;
  if (error)
    return <p className="text-center text-red-500">{error}</p>;

return (
    <div className="bg-gray-800 p-4 sm:p-6 rounded-lg shadow-lg max-w-6xl mx-auto">

      <div className="flex flex-col md:flex-row justify-between items-center mb-6 gap-4">
        <h3 className="text-2xl font-bold text-white text-center md:text-left">
          Weekly Meal Planner
        </h3>

        <div className="flex flex-col sm:flex-row gap-3 w-full sm:w-auto">
          <button
            onClick={removeAllRecipes}
            disabled={removingAll}
            className={`px-4 py-2 rounded-lg font-semibold text-sm w-full sm:w-auto ${
              removingAll
                ? "bg-red-400 cursor-not-allowed"
                : "bg-red-600 hover:bg-red-700"
            } text-white transition`}
          >
            {removingAll ? "Removing..." : "Remove All"}
          </button>

          {/* <button
            onClick={() => alert("Grocery items feature coming soon!")}
            className="px-4 py-2 rounded-lg font-semibold text-sm bg-green-600 hover:bg-green-700 text-white transition w-full sm:w-auto"
          >
            Grocery Items
          </button> */}
        </div>
      </div>

      <div
        className="
          grid 
          grid-cols-1 
          sm:grid-cols-2 
          md:grid-cols-3 
          lg:grid-cols-4 
          xl:grid-cols-7 
          gap-4
        "
      >
        {daysOfWeek.map((day) => {
          const entry = calendar.find((c) => c.day === day);
          const recipe = entry?.recipes;

          return (
            <div
              key={day}
              className="bg-gray-700 p-4 rounded-lg text-center text-white flex flex-col justify-between transition-transform hover:scale-[1.02]"
            >
              <h4 className="font-semibold mb-2">{day}</h4>

              <div className="min-h-[120px] flex flex-col items-center justify-center gap-2">
                {recipe ? (
                  <>
                    {recipe.image_url && (
                      <img
                        src={recipe.image_url}
                        alt={recipe.title}
                        className="w-16 h-16 object-cover rounded-md"
                      />
                    )}
                    <p className="text-sm font-medium">{recipe.title}</p>
                    <button
                      onClick={() => removeRecipe(day)}
                      className="text-xs text-red-400 hover:text-red-200"
                    >
                      Remove
                    </button>
                  </>
                ) : (
                  <p className="text-gray-400 text-sm">No recipe assigned</p>
                )}
              </div>

              <select
                onChange={(e) => assignRecipe(day, e.target.value)}
                defaultValue=""
                className="mt-3 w-full bg-gray-600 text-sm text-white rounded p-2 focus:outline-none focus:ring-2 focus:ring-indigo-400"
              >
                <option value="">Assign recipe...</option>
                {recipes.map((r) => (
                  <option key={r.id} value={r.id}>
                    {r.title}
                  </option>
                ))}
              </select>
            </div>
          );
        })}
      </div>
    </div>
  );
}