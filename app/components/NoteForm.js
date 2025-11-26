"use client";

import { useState } from "react";
import { createNote } from "../utils/api";
import toast from "react-hot-toast";

export default function NoteForm({ refreshNotes }) {
  const [form, setForm] = useState({
    title: "",
    content: "",
    tags: "",
    pinned: false,
  });

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;

    setForm({
      ...form,
      [name]: type === "checkbox" ? checked : value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const formattedData = {
      title: form.title,
      content: form.content,
      pinned: form.pinned,
      tags: form.tags
        ? form.tags.split(",").map((t) => t.trim().toLowerCase())
        : [],
    };

    const result = await createNote(formattedData);

    if (!result.success) {
      toast.error(result.message || "Failed to create note");
      return;
    }

    toast.success("Note created successfully!");

    setForm({ title: "", content: "", tags: "", pinned: false });
    refreshNotes();
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-4 text-black">
      {/* Title Input */}
      <div>
        <label className="block mb-1 font-semibold text-black">Title</label>
        <input
          name="title"
          placeholder="Enter title"
          value={form.title}
          onChange={handleChange}
          required
          className="w-full border rounded-lg px-4 py-2 text-black 
                     focus:ring-2 focus:ring-blue-500 outline-none"
        />
      </div>

      {/* Content Input */}
      <div>
        <label className="block mb-1 font-semibold text-black">Content</label>
        <textarea
          name="content"
          placeholder="Write your note here..."
          value={form.content}
          onChange={handleChange}
          rows={4}
          className="w-full border rounded-lg px-4 py-2 text-black 
                     focus:ring-2 focus:ring-blue-500 outline-none"
        />
      </div>

      {/* Tags Input */}
      <div>
        <label className="block mb-1 font-semibold text-black">
          Tags (comma separated)
        </label>
        <input
          name="tags"
          placeholder="work, study, idea"
          value={form.tags}
          onChange={handleChange}
          className="w-full border rounded-lg px-4 py-2 text-black 
                     focus:ring-2 focus:ring-blue-500 outline-none"
        />
      </div>

      {/* Pin Checkbox */}
      <div className="flex items-center gap-2">
        <input
          type="checkbox"
          name="pinned"
          checked={form.pinned}
          onChange={handleChange}
          className="h-4 w-4"
        />
        <label className="text-black font-medium">Pin this note 📌</label>
      </div>

      {/* Button */}
      <button
        type="submit"
        className="bg-blue-600 text-white w-full py-2 rounded-lg font-semibold
                   hover:bg-blue-700 transition"
      >
        Add Note
      </button>
    </form>
  );
}
