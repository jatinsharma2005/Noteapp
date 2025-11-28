"use client";

import Link from "next/link";

export default function Home() {
  return (
    <main className="min-h-screen bg-gray-100 text-black">
      
      {/* NAVBAR — matches dashboard */}
      <nav className="bg-white shadow-md px-6 py-4 flex justify-between items-center border-b border-gray-200">
        <h1 className="text-2xl font-bold text-blue-600">My Notes App</h1>

        <div className="space-x-4">
          <Link
            href="/login"
            className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition"
          >
            Login
          </Link>

          <Link
            href="/register"
            className="px-4 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700 transition"
          >
            Register
          </Link>
        </div>
      </nav>

      {/* HERO SECTION — Same theme as dashboard cards */}
      <section className="max-w-4xl mx-auto mt-20 px-6 text-center">
        <h2 className="text-4xl font-bold text-gray-800">
          Organize Your Notes Easily 📒
        </h2>

        <p className="text-gray-600 mt-4 text-lg max-w-2xl mx-auto">
          A secure and simple notes app built with Next.js and Node.js.  
          Create, store, and manage your personal notes from anywhere.
        </p>

        {/* CTA BUTTONS */}
        <div className="mt-6 flex justify-center gap-4">
          <Link
            href="/login"
            className="px-6 py-3 bg-blue-600 text-white rounded-lg text-lg hover:bg-blue-700 transition"
          >
            Get Started
          </Link>

          <Link
            href="/register"
            className="px-6 py-3 bg-gray-800 text-white rounded-lg text-lg hover:bg-gray-900 transition"
          >
            Create an Account
          </Link>
        </div>
      </section>

      {/* INFO CARDS — same UI as dashboard white cards */}
      <section className="max-w-5xl mx-auto mt-20 px-6 grid grid-cols-1 md:grid-cols-3 gap-8">

        <div className="bg-white p-6 rounded-xl shadow-md border border-gray-200">
          <h3 className="text-xl font-semibold text-blue-600">Fast & Easy</h3>
          <p className="text-gray-600 mt-2">
            Create and organize notes effortlessly with a clean interface.
          </p>
        </div>

        <div className="bg-white p-6 rounded-xl shadow-md border border-gray-200">
          <h3 className="text-xl font-semibold text-green-600">Secure Storage</h3>
          <p className="text-gray-600 mt-2">
            Your notes are saved safely and accessible anytime.
          </p>
        </div>

        <div className="bg-white p-6 rounded-xl shadow-md border border-gray-200">
          <h3 className="text-xl font-semibold text-yellow-600">Pin Notes</h3>
          <p className="text-gray-600 mt-2">
            Highlight important notes just like in the dashboard.
          </p>
        </div>

      </section>
    </main>
  );
}
