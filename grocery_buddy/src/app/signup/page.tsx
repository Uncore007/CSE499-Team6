
'use client'
import { useState } from "react";
import { Mail, Lock, User } from "lucide-react";

export default function SignUp() {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "",
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    console.log("Sign up data:", formData);
    // TODO: connect to backend or Firebase auth
  };

  return (
    <section className="flex items-center justify-center min-h-screen bg-gray-900 text-white px-6">
      <div className="w-full max-w-md bg-gray-800 rounded-2xl shadow-lg p-8">
        {/* Heading */}
        <h2 className="text-3xl font-bold text-center mb-2">
          Create Your <span className="text-orange-500">Account</span>
        </h2>
        <p className="text-gray-400 text-center mb-6">
          Start organizing your meals and groceries today.
        </p>

        {/* Form */}
        <form onSubmit={handleSubmit} className="space-y-5">
          {/* Name */}
          <div className="flex items-center border border-gray-700 rounded-lg px-3 py-2 focus-within:border-orange-500">
            <User className="w-5 h-5 text-gray-400 mr-2" />
            <input
              type="text"
              name="name"
              placeholder="Full Name"
              value={formData.name}
              onChange={handleChange}
              required
              className="w-full bg-transparent outline-none text-white"
            />
          </div>

          {/* Email */}
          <div className="flex items-center border border-gray-700 rounded-lg px-3 py-2 focus-within:border-orange-500">
            <Mail className="w-5 h-5 text-gray-400 mr-2" />
            <input
              type="email"
              name="email"
              placeholder="Email Address"
              value={formData.email}
              onChange={handleChange}
              required
              className="w-full bg-transparent outline-none text-white"
            />
          </div>

          {/* Password */}
          <div className="flex items-center border border-gray-700 rounded-lg px-3 py-2 focus-within:border-orange-500">
            <Lock className="w-5 h-5 text-gray-400 mr-2" />
            <input
              type="password"
              name="password"
              placeholder="Password"
              value={formData.password}
              onChange={handleChange}
              required
              className="w-full bg-transparent outline-none text-white"
            />
          </div>

          {/* Submit Button */}
          <button
            type="submit"
            className="w-full py-3 bg-orange-500 hover:bg-orange-600 rounded-lg font-semibold transition"
          >
            Sign Up
          </button>
        </form>

        {/* Footer */}
        <p className="text-sm text-center text-gray-400 mt-6">
          Already have an account?{" "}
          <a href="/signin" className="text-orange-400 hover:underline">
            Sign In
          </a>
        </p>
      </div>
    </section>
  );
}




