"use client"
import { useState } from "react";
import Navbar from "../../components/Navbar";
import Calendar from "@/components/Calendar";
import { CheckCircle, Menu, X } from "lucide-react";
import Link from "next/link";

function TopHeader() {
  const [open, setOpen] = useState(false);

  return (
    <>
      <header className="flex items-center justify-between px-4 md:px-6 py-4 bg-gray-900 text-white fixed top-0 left-0 right-0 z-30 md:pl-56">
        <div className="flex items-center gap-4">
          <button className="md:hidden p-2" onClick={() => setOpen(true)} aria-label="Open menu">
            <Menu />
          </button>
          <Link href="/" className="text-2xl font-bold">
            Grocery Buddy
          </Link>
        </div>

        <div className="flex gap-4">
          <Link href="/login">
            <button className="px-4 py-2 border border-orange-500 hover:border-orange-700 transition rounded-full">
              Log In
            </button>
          </Link>
          <Link href="/signup">
            <button className="px-4 py-2 border border-orange-500 bg-orange-400 hover:bg-orange-700 transition rounded-full">
              Get Started Today
            </button>
          </Link>
        </div>
      </header>

      {/* Mobile drawer */}
      {open && (
        <div className="fixed inset-0 z-40 md:hidden">
          <div className="absolute inset-0 bg-black/50" onClick={() => setOpen(false)} />
          <aside className="absolute left-0 top-0 h-full w-64 bg-gray-800 text-white p-4">
            <div className="flex items-center justify-between mb-6">
              <div className="text-xl font-bold">Grocery Buddy</div>
              <button onClick={() => setOpen(false)} aria-label="Close menu"><X /></button>
            </div>
            <nav>
              <ul className="flex flex-col gap-3">
                <li>
                  <Link href="/recipes" onClick={() => setOpen(false)} className="block px-3 py-2 rounded hover:bg-gray-700">Recipes</Link>
                </li>
                <li>
                  <Link href="/inventory" onClick={() => setOpen(false)} className="block px-3 py-2 rounded hover:bg-gray-700">Inventory</Link>
                </li>
                <li>
                  <Link href="/grocery_list" onClick={() => setOpen(false)} className="block px-3 py-2 rounded hover:bg-gray-700">Grocery List</Link>
                </li>
              </ul>
            </nav>
          </aside>
        </div>
      )}
    </>
  );
}

function Hero(){

    return (
     <section className="px-4 py-12 text-center">
            
                {/* <h2 className="text-4xl sm:text-5xl lg:text-7xl font-bold leading-tight">
                    Simplify Your <span className="text-orange-500">Meal</span>
                </h2> */}

                <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold mt-4 leading-tight">
                    <span className="text-orange-500">Simplify Your Life</span>
                    {/* <span className="bg-orange-500 w-7 h-1 inline-block align-middle ml-2"></span> */}
                </h2>

                
                <p className="mt-6 max-w-2xl mx-auto text-base sm:text-lg md:text-xl text-gray-300 px-2">
                    Manage recipes, track ingredients, and create grocery lists—all in one
                    place, designed to save you time and make meal planning effortless.
                </p>

                
                {/* <div className="flex flex-col sm:flex-row justify-center gap-4 mt-8">
                    <button className="px-6 py-3 border border-orange-500 hover:border-orange-700 transition duration-300 rounded-full cursor-pointer text-sm sm:text-base">
                    See Pricing
                    </button>
                    <button className="px-6 py-3 border border-orange-500 bg-orange-400 hover:bg-orange-700 transition duration-300 rounded-full cursor-pointer text-sm sm:text-base">
                    Get Started Free
                    </button>
                </div> */}
        </section>
    )
}

function Features(){

  return(
    <section id="features" className="py-16">
            <div className="max-w-6xl mx-auto px-6">
            
                <h2 className="font-bold text-center mb-12 text-violet-500 md:text-xl ">
                    Explore Features to Simplify Your Kitchen
                </h2>

        
                <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-3">
                    
                    <Link href="/recipes">
                      <div className="bg-violet-700 p-6 rounded-xl shadow hover:shadow-lg transition">
                          <div className="text-4xl mb-4">🍳</div>
                          <h3 className="text-xl font-semibold mb-2">Recipe Management</h3>
                          <p className="text-white-200">Browse, add, and save your favorite recipes with ease.</p>
                      </div>
                    </Link>

                
                    {/* <div className="bg-violet-700 p-6 rounded-xl shadow hover:shadow-lg transition">
                        <div className="text-4xl mb-4">📅</div>
                        <h3 className="text-xl font-semibold mb-2">Meal Planner</h3>
                        <p className="text-white-200">Drag-and-drop meals into your weekly calendar for stress-free planning.</p>
                    </div> */}

                    <Link href="/inventory">
                      <div className="bg-violet-700 p-6 rounded-xl shadow hover:shadow-lg transition">
                          <div className="text-4xl mb-4">🏠</div>
                          <h3 className="text-xl font-semibold mb-2">Inventory Tracking</h3>
                          <p className="text-white-200">Always know what’s in your pantry so you never overbuy or run out.</p>
                      </div>
                    </Link>

                    <Link href="/grocery_items">
                      <div className="bg-violet-700 p-6 rounded-xl shadow hover:shadow-lg transition">
                          <div className="text-4xl mb-4">🛒</div>
                          <h3 className="text-xl font-semibold mb-2">Smart Grocery Lists</h3>
                          <p className="text-white-200">Assign grocery items to different stores and keep your list organized.</p>
                      </div>
                    </Link>

            
                    {/* <div className="bg-violet-700 p-6 rounded-xl shadow hover:shadow-lg transition">
                        <div className="text-4xl mb-4">👨‍👩‍👧</div>
                        <h3 className="text-xl font-semibold mb-2">Multi-User Accounts</h3>
                        <p className="text-white-200">Share one grocery space with your family or roommates for easy coordination.</p>
                    </div> */}
                
               </div>
            </div>
        </section>

    )
}

// function Testimonials() {
//   const testimonials = [
//     {
//       quote:
//         "This app has revolutionized my grocery shopping. I save time and money every week!",
//       author: "Alex Johnson",
//       role: "Busy Parent",
//     },
//     {
//       quote:
//         "The best meal planning and list-making tool I've ever used. Highly recommended.",
//       author: "Samantha Lee",
//       role: "Food Blogger",
//     },
//     {
//       quote:
//         "Grocery Buddy helps me stick to my budget and reduce food waste. It's a must-have.",
//       author: "Michael Brown",
//       role: "Student",
//     },
//   ];

//   return (
//     <section id="testimonials" className="py-16">
//             <h2 className="font-bold text-center mb-12 text-cyan-500 text-xl">What Our Users Say</h2>

//             <div className="grid gap-8 mx-7 md:grid-cols-3">
//                 {testimonials.map((testimonial, index) => (
//                   <article key={index} className="bg-cyan-700 p-6 rounded-lg shadow">
//                     <blockquote className="text-white-700 italic">
//                       &quot;{testimonial.quote}&quot;
//                     </blockquote>
//                     <cite className="block mt-4 text-sm font-semibold text-white-900">
//                       – {testimonial.author}, {testimonial.role}
//                     </cite>
//                   </article>
//                 ))}
//             </div>
//     </section>
//     )
// }
// Benefits section components
// function Benefits() {
//   return (
//     <section className="py-16 px-6 md:px-16 bg-gray-900 text-white">
//       <h2 className="text-4xl md:text-5xl font-bold text-center mb-8">
//         Why <span className="text-orange-500">Grocery Buddy?</span>
//       </h2>

//       <div className="grid grid-cols-1 md:grid-cols-2 gap-6 max-w-4xl mx-auto">
//         {[
//           "Save time on meal planning",
//           "Reduce food waste with inventory tracking",
//           "Stress-free grocery shopping",
//           "Stay organized across multiple users",
//         ].map((benefit, idx) => (
//           <div
//             key={idx}
//             className="flex items-start gap-3 bg-gray-800 p-5 rounded-2xl shadow-md hover:shadow-lg transition"
//           >
//             <CheckCircle className="w-6 h-6 text-green-400 flex-shrink-0" />
//             <p className="text-lg text-gray-200">{benefit}</p>
//           </div>
//         ))}
//       </div>
//     </section>
//   );
// }
// function Pricing() {
//   const plans = [
//     {
//       name: "Starter",
//       price: "Free",
//       description: "Perfect for individuals starting out with meal planning.",
//       features: [
//         "Basic recipe management",
//         "Simple grocery lists",
//         "1 user account",
//       ],
//       highlight: false,
//     },
//     {
//       name: "Pro",
//       price: "$9/mo",
//       description: "Best for families who want to stay fully organized.",
//       features: [
//         "Unlimited recipes",
//         "Smart grocery lists",
//         "Pantry inventory tracking",
//         "Up to 5 user accounts",
//       ],
//       highlight: true, // main plan
//     },
//     {
//       name: "Team",
//       price: "$19/mo",
//       description: "For larger households and teams who collaborate often.",
//       features: [
//         "All Pro features",
//         "Advanced meal planning",
//         "Shared shopping lists",
//         "Unlimited user accounts",
//       ],
//       highlight: false,
//     },
//   ];

//   return (
//     <section id="pricing" className="py-20 px-6 md:px-16 bg-gray-900 text-white">
//       <h2 className="text-4xl md:text-5xl font-bold text-center mb-6">
//         Choose Your <span className="text-orange-500">Plan</span>
//       </h2>
//       <p className="text-center text-gray-400 mb-12">
//         Simple pricing for every household. Cancel anytime.
//       </p>

//       <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-6xl mx-auto">
//         {plans.map((plan, idx) => (
//           <div
//             key={idx}
//             className={`p-8 rounded-2xl border shadow-lg transition hover:shadow-xl ${
//               plan.highlight
//                 ? "bg-gray-800 border-orange-500 scale-105"
//                 : "bg-gray-800 border-gray-700"
//             }`}
//           >
//             <h3 className="text-2xl font-bold mb-4">{plan.name}</h3>
//             <p className="text-4xl font-bold text-orange-500 mb-2">
//               {plan.price}
//             </p>
//             <p className="text-gray-400 mb-6">{plan.description}</p>

//             <ul className="space-y-3 mb-6">
//               {plan.features.map((feature, fIdx) => (
//                 <li key={fIdx} className="flex items-center gap-2">
//                   <span className="text-green-400">✔</span>
//                   <span>{feature}</span>
//                 </li>
//               ))}
//             </ul>

//             <button
//               className={`w-full px-4 py-2 rounded-full font-semibold transition ${
//                 plan.highlight
//                   ? "bg-orange-500 hover:bg-orange-600 text-white"
//                   : "border border-orange-500 hover:border-orange-700 text-orange-400 hover:text-orange-500"
//               }`}
//             >
//               {plan.highlight ? "Get Started" : "Choose Plan"}
//             </button>
//           </div>
//         ))}
//       </div>
//     </section>
//   );
// }

function Footer() {
  return (
    <footer className="bg-gray-900 text-gray-300 py-12 px-6 md:px-16">
      <div className="max-w-6xl mx-auto grid grid-cols-1 md:grid-cols-4 gap-10">
        {/* Brand */}
        <div>
          <h3 className="text-2xl font-bold text-white mb-4">Grocery Buddy</h3>
          <p className="text-gray-400 mb-4">
            Simplify meal planning, track ingredients, and manage grocery lists all in one place.
          </p>
          <p className="text-sm text-gray-500">© {new Date().getFullYear()} Grocery Buddy. All rights reserved.</p>
        </div>

        {/* Links */}
        <div>
          <h4 className="text-xl font-semibold text-white mb-4">Product</h4>
          <ul className="space-y-2">
            <li><a href="#features" className="hover:text-orange-500">Features</a></li>
            <li><a href="#pricing" className="hover:text-orange-500">Pricing</a></li>
            <li><a href="#testimonials" className="hover:text-orange-500">Testimonials</a></li>
          </ul>
        </div>

        {/* Company */}
        <div>
          <h4 className="text-xl font-semibold text-white mb-4">Company</h4>
          <ul className="space-y-2">
            <li><a href="#about" className="hover:text-orange-500">About Us</a></li>
            <li><a href="#blog" className="hover:text-orange-500">Blog</a></li>
            <li><a href="#careers" className="hover:text-orange-500">Careers</a></li>
          </ul>
        </div>

        {/* Newsletter */}
        {/* <div>
          <h4 className="text-xl font-semibold text-white mb-4">Stay Updated</h4>
          <p className="text-gray-400 mb-4">Subscribe to get the latest updates and tips.</p>
          <form className="flex flex-col sm:flex-row gap-3">
            <input
              type="email"
              placeholder="Enter your email"
              className="px-4 py-2 rounded-lg text-gray-900 focus:outline-none w-full"
            />
            <button
              type="submit"
              className="px-4 py-2 bg-orange-500 hover:bg-orange-600 rounded-lg font-semibold transition"
            >
              Subscribe
            </button>
          </form>
        </div> */}
      </div>

      {/* Bottom border */}
      <div className="border-t border-gray-700 mt-10 pt-6 text-center text-sm text-gray-500">
        Built by team 6 for CSE 499
      </div>
    </footer>
  );
}

export default function LandingPage(){
    return (
      <main className="bg-gray-900 pt-16 md:pt-0 md:ml-56 min-h-screen flex flex-col">
        <TopHeader />
        <Navbar />
        <div className="pt-6">
          <Hero/>
          <Calendar />
          <Features/>
          {/* <Testimonials/>
          <Benefits/>
          <Pricing/> */}
          <Footer/>
        </div>
      </main>
    )
}