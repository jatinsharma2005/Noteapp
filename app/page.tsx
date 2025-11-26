"use client";
import Link from "next/link";

export default function Home() {
  return (
    <div className="min-h-screen bg-gray-100">
      
      {/* Navbar */}
      <nav className="w-full bg-white shadow-md py-4 px-6 flex justify-between items-center">
        <h1 className="text-2xl font-bold text-blue-600">My Notes App</h1>

        <div className="space-x-4">
          <Link href="/login">
            <button className="px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700">
              Login
            </button>
          </Link>

          <Link href="/register">
            <button className="px-4 py-2 bg-green-600 text-white rounded-md hover:bg-green-700">
              Register
            </button>
          </Link>
        </div>
      </nav>

      {/* Hero Section */}
      <section className="flex flex-col items-center justify-center text-center mt-20 px-4">
        <h2 className="text-4xl font-bold text-gray-800">
          Organize Your Notes Easily 📒
        </h2>

        <p className="text-gray-600 mt-4 max-w-xl">
          A secure and simple notes app built with Next.js and Node.js.  
          Create, store and manage your personal notes in one place.
        </p>

        <div className="mt-6 space-x-4">
          <Link href="/login">
            <button className="px-6 py-3 bg-blue-600 text-white rounded-lg text-lg hover:bg-blue-700">
              Get Started
            </button>
          </Link>

          <Link href="/register">
            <button className="px-6 py-3 bg-gray-800 text-white rounded-lg text-lg hover:bg-gray-900">
              Create an Account
            </button>
          </Link>
        </div>
      </section>

    </div>
  );
}
