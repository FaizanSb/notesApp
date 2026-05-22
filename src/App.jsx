import { useReducer, useState } from "react"
import notesReducer from "./notesReducer"
import { initialState } from "./initialState"

function App() {
  const [state, dispatch] = useReducer(notesReducer, initialState);
  const [title, settitle] = useState('');
  
  // ✅ ye 2 new states add karo
  const [editingId, setEditingId] = useState(null);   // kaun si note edit ho rahi hai
  const [editTitle, setEditTitle] = useState('');      // edit input ki value

  function handleAddNotes(title) {
    if (!title.trim()) return;   // ✅ empty check
    dispatch({
      type: 'Add Note',
      payload: { title, content: '' }
    })
    settitle('');
  }

  function handlePin(id) {
    dispatch({
      type: 'Pin Note',
      payload: { id }
    })
  }

  function handleDelete(id) {
    dispatch({
      type: 'Delete Note',
      payload: { id }
    })
  }

  // ✅ Edit button dabane par — editing mode ON karo
  function handleEditStart(note) {
    setEditingId(note.id);          // is note ki editing shuru
    setEditTitle(note.title);       // purana title input mein daal do
  }

  // ✅ Save button dabane par — actually update karo
  function handleUpdate(id) {
    if (!editTitle.trim()) return;  // empty check
    dispatch({
      type: 'Update Note',
      payload: {
        id,
        changes: { title: editTitle }
      }
    });
    setEditingId(null);    // editing mode OFF
    setEditTitle('');
  }

  return (
    <>
      <h1>My notes App ({state.notes.length})</h1>
      <input 
        type="text" 
        placeholder="Title" 
        value={title} 
        onChange={(e) => settitle(e.target.value)} 
      />
      <button onClick={() => handleAddNotes(title)}>Add Note</button>

      {state.notes.map(note => (
        <div key={note.id}>
          
          {/* ✅ agar ye note edit ho rahi hai to input dikhao */}
          {editingId === note.id ? (
            <>
              <input
                type="text"
                value={editTitle}
                onChange={(e) => setEditTitle(e.target.value)}
              />
              <button onClick={() => handleUpdate(note.id)}>Save</button>
              <button onClick={() => setEditingId(null)}>Cancel</button>
            </>
          ) : (
            <>
              <h3>{note.title}</h3>
              <button onClick={() => handlePin(note.id)}>
                {note.pinned ? 'Unpin' : 'Pin'}
              </button>
              <button onClick={() => handleDelete(note.id)}>Delete</button>
              <button onClick={() => handleEditStart(note)}>Edit</button>
            </>
          )}

        </div>
      ))}
    </>
  )
}

export default App