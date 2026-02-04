import React, { useState, useEffect, useRef } from "react";
import "./style.css";

export default function App() {
  const [notes, setNotes] = useState(() => {
      const saved = localStorage.getItem("notes");
          return saved ? JSON.parse(saved) : [];
            });

              const [text, setText] = useState("");
                const [editId, setEditId] = useState(null);
                  const inputRef = useRef(null);

                    useEffect(() => {
                        localStorage.setItem("notes", JSON.stringify(notes));
                          }, [notes]);

                            const addOrUpdateNote = () => {
                                if (!text.trim()) return;

                                    if (editId) {
                                          setNotes(
                                                  notes.map((n) =>
                                                            n.id === editId ? { ...n, text } : n
                                                                    )
                                                                          );
                                                                                setEditId(null);
                                                                                    } else {
                                                                                          setNotes([...notes, { id: Date.now(), text }]);
                                                                                              }

                                                                                                  setText("");
                                                                                                      inputRef.current.focus();
                                                                                                        };

                                                                                                          const editNote = (note) => {
                                                                                                              setText(note.text);
                                                                                                                  setEditId(note.id);
                                                                                                                      inputRef.current.focus();
                                                                                                                        };

                                                                                                                          const deleteNote = (id) => {
                                                                                                                              setNotes(notes.filter((n) => n.id !== id));
                                                                                                                                };

                                                                                                                                  return (
                                                                                                                                      <div className="app">
                                                                                                                                            <h1>📝 Notes App</h1>

                                                                                                                                                  <div className="input-box">
                                                                                                                                                          <input
                                                                                                                                                                    ref={inputRef}
                                                                                                                                                                              value={text}
                                                                                                                                                                                        placeholder="Write a note..."
                                                                                                                                                                                                  onChange={(e) => setText(e.target.value)}
                                                                                                                                                                                                          />
                                                                                                                                                                                                                  <button onClick={addOrUpdateNote}>
                                                                                                                                                                                                                            {editId ? "Update" : "Add"}
                                                                                                                                                                                                                                    </button>
                                                                                                                                                                                                                                          </div>

                                                                                                                                                                                                                                                <ul>
                                                                                                                                                                                                                                                        {notes.map((note) => (
                                                                                                                                                                                                                                                                  <li key={note.id}>
                                                                                                                                                                                                                                                                              {note.text}
                                                                                                                                                                                                                                                                                          <div>
                                                                                                                                                                                                                                                                                                        <button onClick={() => editNote(note)}>Edit</button>
                                                                                                                                                                                                                                                                                                                      <button onClick={() => deleteNote(note.id)}>Delete</button>
                                                                                                                                                                                                                                                                                                                                  </div>
                                                                                                                                                                                                                                                                                                                                            </li>
                                                                                                                                                                                                                                                                                                                                                    ))}
                                                                                                                                                                                                                                                                                                                                                          </ul>
                                                                                                                                                                                                                                                                                                                                                              </div>
                                                                                                                                                                                                                                                                                                                                                                );
                                                                                                                                                                                                                                                                                                                                                                }
