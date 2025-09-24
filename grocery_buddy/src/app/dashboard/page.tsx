import Image from "next/image";

export default function Home() {
  const recipeIdeas = ["recipe", "ideas", "can", "go", "here"];

  return (
    <div className="font-sans flex flex-col h-screen bg-white text-gray-800">
      {/* Header */}
      <header className="bg-gray-800 text-white shadow-md">
        <div className="container mx-auto px-6 py-4">
          <h1 className="text-3xl font-bold">Grocery Buddy</h1>
        </div>
      </header>

      <div className="flex flex-1 overflow-hidden">
        {/* Sidebar */}
        <aside className="w-56 bg-gray-700 text-white p-4">
          <nav>
            <ul>
              <li className="mb-2">
                <a
                  href="#"
                  className="block p-3 rounded hover:bg-gray-600 font-semibold"
                >
                  Home
                </a>
              </li>
              <li className="mb-2">
                <a href="#" className="block p-3 rounded hover:bg-gray-600">
                  Recipes
                </a>
              </li>
              <li className="mb-2">
                <a href="#" className="block p-3 rounded hover:bg-gray-600">
                  List
                </a>
              </li>
              <li className="mb-2">
                <a href="#" className="block p-3 rounded hover:bg-gray-600">
                  Pantry
                </a>
              </li>
            </ul>
          </nav>
        </aside>

        {/* Main Content */}
        <main className="flex-1 p-6 overflow-y-auto">
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {recipeIdeas.map((idea) => (
              <div
                key={idea}
                className="bg-gray-200 h-48 rounded-lg flex items-center justify-center shadow"
              >
                <span className="text-gray-500">{idea}</span>
              </div>
            ))}
            {/* Add an extra empty one to fill out the grid */}
            <div className="bg-gray-200 h-48 rounded-lg flex items-center justify-center shadow">
              <span className="text-gray-500"></span>
            </div>
          </div>
        </main>
      </div>
    </div>
  );
}
