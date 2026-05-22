function notesReducer(state, action) {
  switch (action.type) {

    case 'Add Note':
      return {
        ...state,
        notes: [
          ...state.notes,
          {
            id: Date.now(),
            title: action.payload.title,
            content: action.payload.content,
            pinned: false,
            createdAt: new Date().toISOString()
          }
        ]
      }

    case 'Delete Note':
      return {
        ...state,
        notes: state.notes.filter(
          note => note.id !== action.payload.id
        )
      }

    case 'Update Note':
      return {
        ...state,
        notes: state.notes.map(note =>
          note.id === action.payload.id
            ? { ...note, ...action.payload.changes }
            : note
        )
      }

    case 'Pin Note':
      return {
        ...state,
        notes: state.notes.map(note =>
          note.id === action.payload.id
            ? { ...note, pinned: !note.pinned }
            : note
        )
      }

    default:
      return state
  }
}

export default notesReducer