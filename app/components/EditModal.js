"use client";

export default function EditModal({ open, note, onClose, onSave }) {
  if (!open) return null;

  return (
    <div className="fixed inset-0 bg-black/40 flex items-center justify-center">
      <div className="bg-white p-6 rounded-xl shadow-lg w-full max-w-md">
        <h3 className="text-2xl font-bold text-black mb-4">Edit Note</h3>

        <input
          value={note.title}
          onChange={(e) => onSave("title", e.target.value)}
          className="w-full border rounded-lg px-4 py-2 text-black mb-3"
        />

        <textarea
          value={note.content}
          onChange={(e) => onSave("content", e.target.value)}
          rows={4}
          className="w-full border rounded-lg px-4 py-2 text-black mb-3"
        />

        <button
          onClick={onClose}
          className="bg-gray-300 py-2 px-4 rounded-lg mr-2"
        >
          Cancel
        </button>

        <button
          onClick={() => onSave("submit")}
          className="bg-blue-600 text-white py-2 px-4 rounded-lg"
        >
          Save Changes
        </button>
      </div>
    </div>
  );
}
