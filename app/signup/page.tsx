
"use client";

import { FormEvent, useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";

export default function SignupPage() {
  const router = useRouter();

  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const [showPassword, setShowPassword] = useState(false);
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  async function handleSubmit(e: FormEvent) {
    e.preventDefault();

    setError("");
    setLoading(true);

    try {
      const response = await fetch("/api/auth/signup", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          name,
          email,
          password,
        }),
      });

      const data = await response.json();

      if (!response.ok) {
        setError(data.message);
        return;
      }

      router.push("/login");
    } catch {
      setError("Unable to create account");
    } finally {
      setLoading(false);
    }
  }

  return (
    <main className="min-h-screen bg-slate-50 flex items-center justify-center p-4">
      <div className="w-full max-w-5xl overflow-hidden rounded-3xl bg-white shadow-2xl md:flex">

        {/* Left Section */}
        <div className="hidden md:flex md:w-1/2 bg-gradient-to-br from-blue-600 via-indigo-600 to-purple-700 p-12 text-white flex-col justify-between">

          <div>
            <div className="flex items-center gap-3 mb-12">
              <div className="flex h-11 w-11 items-center justify-center rounded-xl bg-white text-blue-600 font-bold text-xl">
                L
              </div>

              <span className="text-2xl font-bold">
                Learniee
              </span>
            </div>

            <h2 className="text-4xl font-bold leading-tight">
              Learning starts
              <br />
              with the right choice.
            </h2>

            <p className="mt-6 max-w-md text-blue-100 leading-7">
              Create your parent account and discover the right courses,
              teachers, and learning opportunities for your child.
            </p>
          </div>

          <div className="space-y-4 text-sm text-blue-100">
            <div className="flex items-center gap-3">
              <span className="flex h-7 w-7 items-center justify-center rounded-full bg-white/20">
                ✓
              </span>
              Find courses easily
            </div>

            <div className="flex items-center gap-3">
              <span className="flex h-7 w-7 items-center justify-center rounded-full bg-white/20">
                ✓
              </span>
              Compare teachers and ratings
            </div>

            <div className="flex items-center gap-3">
              <span className="flex h-7 w-7 items-center justify-center rounded-full bg-white/20">
                ✓
              </span>
              Choose the best learning experience
            </div>
          </div>
        </div>

        {/* Right Section */}
        <div className="w-full md:w-1/2 p-7 sm:p-10 lg:p-12">

          {/* Mobile Logo */}
          <div className="mb-8 flex items-center justify-center gap-2 md:hidden">
            <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-blue-600 text-white font-bold text-lg">
              L
            </div>

            <span className="text-2xl font-bold text-gray-900">
              Learniee
            </span>
          </div>

          <div className="mb-8">
            <p className="text-sm font-semibold text-blue-600">
              GET STARTED
            </p>

            <h1 className="mt-2 text-3xl font-bold text-gray-900">
              Create your account
            </h1>

            <p className="mt-2 text-gray-500">
              Sign up to start exploring courses for your child.
            </p>
          </div>

          {error && (
            <div className="mb-5 rounded-xl border border-red-200 bg-red-50 px-4 py-3 text-sm text-red-600">
              {error}
            </div>
          )}

          <form onSubmit={handleSubmit} className="space-y-5">

            {/* Name */}
            <div>
              <label className="mb-2 block text-sm font-semibold text-gray-700">
                Full Name
              </label>

              <div className="relative">
                <span className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400">
                  👤
                </span>

                <input
                  type="text"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  placeholder="Enter your full name"
                  required
                  className="w-full rounded-xl border border-gray-200 bg-gray-50 py-3.5 pl-11 pr-4 text-gray-900 outline-none transition focus:border-blue-500 focus:bg-white focus:ring-4 focus:ring-blue-100"
                />
              </div>
            </div>

            {/* Email */}
            <div>
              <label className="mb-2 block text-sm font-semibold text-gray-700">
                Email Address
              </label>

              <div className="relative">
                <span className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400">
                  ✉
                </span>

                <input
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="you@example.com"
                  required
                  className="w-full rounded-xl border border-gray-200 bg-gray-50 py-3.5 pl-11 pr-4 text-gray-900 outline-none transition focus:border-blue-500 focus:bg-white focus:ring-4 focus:ring-blue-100"
                />
              </div>
            </div>

            {/* Password */}
            <div>
              <label className="mb-2 block text-sm font-semibold text-gray-700">
                Password
              </label>

              <div className="relative">
                <span className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400">
                  🔒
                </span>

                <input
                  type={showPassword ? "text" : "password"}
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  placeholder="Minimum 6 characters"
                  required
                  minLength={6}
                  className="w-full rounded-xl border border-gray-200 bg-gray-50 py-3.5 pl-11 pr-12 text-gray-900 outline-none transition focus:border-blue-500 focus:bg-white focus:ring-4 focus:ring-blue-100"
                />

                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute right-4 top-1/2 -translate-y-1/2 text-sm text-gray-500 hover:text-blue-600"
                >
                  {showPassword ? "Hide" : "Show"}
                </button>
              </div>

              <p className="mt-2 text-xs text-gray-400">
                Use at least 6 characters.
              </p>
            </div>

            {/* Terms */}
            <div className="flex items-start gap-2 text-sm text-gray-500">
              <input
                type="checkbox"
                required
                className="mt-1 h-4 w-4 rounded border-gray-300 text-blue-600 focus:ring-blue-500"
              />

              <p>
                I agree to the{" "}
                <span className="font-medium text-blue-600">
                  Terms & Conditions
                </span>
              </p>
            </div>

            {/* Button */}
            <button
              type="submit"
              disabled={loading}
              className="w-full rounded-xl bg-blue-600 py-3.5 font-semibold text-white shadow-lg shadow-blue-200 transition hover:bg-blue-700 hover:shadow-xl disabled:cursor-not-allowed disabled:opacity-60"
            >
              {loading ? "Creating account..." : "Create Account"}
            </button>
          </form>

          {/* Login */}
          <p className="mt-7 text-center text-sm text-gray-500">
            Already have an account?{" "}
            <Link
              href="/login"
              className="font-semibold text-blue-600 hover:text-blue-700 hover:underline"
            >
              Login
            </Link>
          </p>

        </div>
      </div>
    </main>
  );
}

