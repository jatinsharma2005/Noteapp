"use client";

import { useState } from "react";
import API, { updateNote, togglePin } from "../utils/api";
import toast from "react-hot-toast";
import EditModal from "./EditModal";

export default function NoteList({ notes, refreshNotes }) {
  const [editNote, setEditNote] = useState(null);
  const [modalOpen, setModalOpen] = useState(false);

  // Delete popup state
  const [deleteId, setDeleteId] = useState(null);
  const [showDeletePopup, setShowDeletePopup] = useState(false);

  const openEdit = (note) => {
    setEditNote({ ...note });
    setModalOpen(true);
  };

  const handleSaveEdit = async (field, value) => {
    if (field !== "submit") {
      setEditNote({ ...editNote, [field]: value });
      return;
    }

    const res = await updateNote(editNote._id, {
      title: editNote.title,
      content: editNote.content,
    });

    if (res.data.success) {
      toast.success("Note updated!");
      setModalOpen(false);
      refreshNotes();
    } else {
      toast.error("Update failed");
    }
  };

  const handlePin = async (id) => {
    const res = await togglePin(id);
    if (res.data.success) {
      toast.success("Pin updated");
      refreshNotes();
    }
  };

  // Open popup
  const confirmDelete = (id) => {
    setDeleteId(id);
    setShowDeletePopup(true);
  };

  // Delete final
  const handleDelete = async () => {
    const res = await API.delete(`/notes/${deleteId}`);
    if (res.data.success) {
      toast.success("Note deleted");
      refreshNotes();
    }
    setShowDeletePopup(false);
    setDeleteId(null);
  };

  return (
    <div className="grid gap-4">
      {/* Edit Modal */}
      <EditModal
        open={modalOpen}
        note={editNote}
        onClose={() => setModalOpen(false)}
        onSave={handleSaveEdit}
      />

      {/* 🔥 BEAUTIFUL ANIMATED DELETE POPUP */}
      {showDeletePopup && (
        <div className="fixed inset-0 flex items-center justify-center z-50">
          {/* BACKDROP */}
          <div
            className="absolute inset-0 bg-black/50 backdrop-blur-sm animate-fadeIn"
            onClick={() => setShowDeletePopup(false)}
          ></div>

          {/* MODAL */}
          <div className="relative bg-white p-6 rounded-2xl shadow-xl w-full max-w-sm animate-scaleIn border">
            <div className="flex items-center gap-3 mb-3">
              <span className="text-3xl">⚠️</span>
              <h3 className="text-xl font-bold text-black">Delete Note?</h3>
            </div>

            <p className="text-gray-700 mb-6">
              Are you sure you want to delete this note? This action cannot be
              undone.
            </p>

            <div className="flex justify-end gap-3">
              <button
                className="px-4 py-2 bg-gray-200 text-black rounded-lg hover:bg-gray-300 transition shadow-sm"
                onClick={() => setShowDeletePopup(false)}
              >
                Cancel
              </button>

              <button
                className="px-4 py-2 bg-red-600 text-white rounded-lg hover:bg-red-700 transition shadow-sm"
                onClick={handleDelete}
              >
                Delete
              </button>
            </div>
          </div>
        </div>
      )}

      {/* NOTES LIST */}
      {notes.map((note) => (
        <div
          key={note._id}
          className="bg-white border rounded-xl shadow p-5 hover:shadow-lg transition"
        >
          {/* Header */}
          <div className="flex justify-between">
            <h2 className="text-xl font-bold text-black">{note.title}</h2>

            <div className="flex gap-4 items-center">
              {/* Pin Button + Tooltip */}
              <div className="relative group">
                <button
                  onClick={() => handlePin(note._id)}
                  className={note.pinned ? "text-yellow-600" : "text-gray-600"}
                >
                  📌
                </button>

                <span
                  className="
      absolute -top-8 left-1/2 -translate-x-1/2
      whitespace-nowrap
      px-2 py-1
      text-xs font-medium text-black
      bg-white/40 backdrop-blur-sm
      border border-gray-300
      rounded-md shadow-sm
      opacity-0 group-hover:opacity-100
      transition-opacity duration-200
      pointer-events-none
    "
                >
                  {note.pinned ? "Unpin note" : "Pin note"}
                </span>
              </div>
              {/* Edit Button + Tooltip */}
              <div className="relative group">
                <button
                  onClick={() => openEdit(note)}
                  className="text-blue-600"
                >
                  ✏️
                </button>

                <span
                  className="
      absolute -top-8 left-1/2 -translate-x-1/2
      whitespace-nowrap
      px-2 py-1
      text-xs font-medium text-black
      bg-white/40 backdrop-blur-sm
      border border-gray-300
      rounded-md shadow-sm
      opacity-0 group-hover:opacity-100
      transition-opacity duration-200
      pointer-events-none
    "
                >
                  Edit note
                </span>
              </div>

              {/* Delete Button + Tooltip */}
              <div className="relative group">
                <button
                  onClick={() => confirmDelete(note._id)}
                  className="text-red-600"
                >
                  🗑️
                </button>

                <span
                  className="
      absolute -top-8 left-1/2 -translate-x-1/2
      whitespace-nowrap
      px-2 py-1
      text-xs font-medium text-black
      bg-white/40 backdrop-blur-sm
      border border-gray-300
      rounded-md shadow-sm
      opacity-0 group-hover:opacity-100
      transition-opacity duration-200
      pointer-events-none
    "
                >
                  Delete note
                </span>
              </div>
            </div>
          </div>

          {/* Content */}
          <p className="text-gray-700 mt-2">{note.content}</p>

          {/* Tags */}
          {note.tags?.length > 0 && (
            <div className="flex flex-wrap gap-2 mt-3">
              {note.tags.map((tag, i) => (
                <span
                  key={i}
                  className="px-3 py-1 bg-blue-100 text-blue-700 rounded-full text-sm"
                >
                  #{tag}
                </span>
              ))}
            </div>
          )}
        </div>
      ))}
    </div>
  );
}
