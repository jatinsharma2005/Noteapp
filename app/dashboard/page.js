"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { getNotes } from "../utils/api";
import NoteForm from "../components/NoteForm";
import NoteList from "../components/NoteList";
import toast from "react-hot-toast";

export default function Dashboard() {
  const router = useRouter();
  const [notes, setNotes] = useState([]);
  const [user, setUser] = useState(null);
  const [search, setSearch] = useState("");

  useEffect(() => {
    const token = localStorage.getItem("token");
    const storedUser = localStorage.getItem("user");

    if (!token) {
      router.push("/login");
      return;
    }

    if (storedUser) {
      setUser(JSON.parse(storedUser));
    }

    fetchNotes();
  }, []);

  const logout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("user");
    toast.success("Logged out successfully");
    router.push("/login");
  };

  const fetchNotes = async () => {
    try {
      const res = await getNotes();

      if (res.success && Array.isArray(res.notes)) {
        setNotes(res.notes);
        return;
      }

      console.error("Unexpected API response:", res);
    } catch (err) {
      console.error("Fetch error:", err);
    }
  };

  // FILTER NOTES
  const filteredNotes = notes.filter((n) => {
    return (
      n.title.toLowerCase().includes(search.toLowerCase()) ||
      n.content.toLowerCase().includes(search.toLowerCase())
    );
  });

  // SPLIT PINNED & NORMAL NOTES
  const pinnedNotes = filteredNotes.filter((n) => n.pinned);
  const normalNotes = filteredNotes.filter((n) => !n.pinned);

  return (
    <div className="min-h-screen bg-gray-100">
      {/* NAVBAR */}
      <nav className="bg-white shadow-md px-6 py-4 flex justify-between items-center sticky top-0">
        <h1 className="text-2xl font-bold text-blue-600">Notes App</h1>

        <div className="flex items-center gap-6">
          {user && (
            <p className="text-black font-medium">
              👋 Hi, <span className="font-semibold">{user.name}</span>
            </p>
          )}

          <button
            onClick={logout}
            className="bg-red-500 text-white px-4 py-2 rounded-lg hover:bg-red-600 transition"
          >
            Logout
          </button>
        </div>
      </nav>

      {/* MAIN 2-COLUMN LAYOUT */}
      <div className="max-w-6xl mx-auto mt-10 px-4 grid grid-cols-1 md:grid-cols-3 gap-8">
        {/* LEFT SIDE – NOTE CREATION */}
        <div className="bg-white p-5 rounded-xl shadow-md h-fit sticky top-24">
          <h3 className="text-xl font-semibold text-black mb-3">
            ➕ Add a New Note
          </h3>
          <NoteForm refreshNotes={fetchNotes} />
        </div>

        {/* RIGHT SIDE – NOTES LIST */}
        <div className="md:col-span-2 space-y-8">
          {/* SEARCH BAR */}
          <div className="bg-white p-4 rounded-xl shadow-md">
            <input
              type="text"
              placeholder="Search notes..."
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              className="w-full border rounded-lg px-4 py-2 text-black focus:ring-2 focus:ring-blue-500 outline-none"
            />
          </div>

          {/* PINNED NOTES */}
          {pinnedNotes.length > 0 && (
            <div className="bg-white p-5 rounded-xl shadow-md">
              <h3 className="text-xl font-semibold text-yellow-600 mb-3">
                📌 Pinned Notes
              </h3>
              <NoteList notes={pinnedNotes} refreshNotes={fetchNotes} />
            </div>
          )}

          {/* ALL NOTES */}
          <div className="bg-white p-5 rounded-xl shadow-md">
            <h3 className="text-xl font-semibold text-black mb-3">All Notes</h3>
            <NoteList notes={normalNotes} refreshNotes={fetchNotes} />
          </div>
        </div>
      </div>
    </div>
  );
}
