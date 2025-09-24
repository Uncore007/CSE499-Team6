import { login, signup } from "./actions";
import { Mail, Lock } from "lucide-react";

export default function LoginPage() {
  return (
    <section className="flex items-center justify-center min-h-screen bg-gray-900 text-white px-6">
      <div className="w-full max-w-md bg-gray-800 rounded-2xl shadow-lg p-8">
        {/* Heading */}
        <h2 className="text-3xl font-bold text-center mb-2">
          Welcome to Grocery Buddy
        </h2>
        <p className="text-gray-400 text-center mb-6">
          Sign in or create an account to continue.
        </p>

        {/* Form */}
        <form className="space-y-5">
          {/* Email */}
          <div className="flex items-center border border-gray-700 rounded-lg px-3 py-2 focus-within:border-orange-500">
            <Mail className="w-5 h-5 text-gray-400 mr-2" />
            <input
              id="email"
              name="email"
              type="email"
              placeholder="Email Address"
              required
              className="w-full bg-transparent outline-none text-white"
            />
          </div>

          {/* Password */}
          <div className="flex items-center border border-gray-700 rounded-lg px-3 py-2 focus-within:border-orange-500">
            <Lock className="w-5 h-5 text-gray-400 mr-2" />
            <input
              id="password"
              name="password"
              type="password"
              placeholder="Password"
              required
              className="w-full bg-transparent outline-none text-white"
            />
          </div>

          {/* Action Buttons */}
          <div className="flex flex-col sm:flex-row gap-4 pt-4">
            <button
              formAction={login}
              className="w-full py-3 bg-orange-500 hover:bg-orange-600 rounded-lg font-semibold transition"
            >
              Log In
            </button>
            <button
              formAction={signup}
              className="w-full py-3 bg-gray-600 hover:bg-gray-700 rounded-lg font-semibold transition"
            >
              Register
            </button>
          </div>
        </form>
      </div>
    </section>
  );
}