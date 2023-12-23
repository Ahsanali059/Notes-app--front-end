import axios from 'axios';
import { useEffect, useState } from 'react';
import './App.css';

function App() {
  const [notes, setNotes] = useState([]);
  const [newNotes, setNewNotes] = useState({ title: '', content: '' });

  useEffect(() => {
    axios.get('http://localhost:1999/api/notes')
      .then(response => setNotes(response.data))
      .catch(error => console.error('Error fetching notes: ', error));
  }, []);

  const addNotes = () => {
    axios.post('http://localhost:1999/api/notes', newNotes)
      .then(response => {
        setNotes(prevNotes => [...prevNotes, response.data]);
        setNewNotes({ title: '', content: '' });
      })
      .catch(error => console.error("Error occurred creating Notes ", error));
  };

  return (
    <div className="App">
      <h1>Notes app</h1>

      <div>
        <h2>My Notes</h2>

        <ul>
          {notes.map(note => (
            <li key={note.id}>{note.title} - {note.content}</li>
          ))}
        </ul>
      </div>

      <div>
        <input
          type='text'
          placeholder='title'
          value={newNotes.title}
          onChange={e => setNewNotes({ ...newNotes, title: e.target.value })}
        />
        <br />
        <textarea
          placeholder="Content"
          value={newNotes.content}
          onChange={e => setNewNotes({ ...newNotes, content: e.target.value })}
        />
        <br />
        <button onClick={addNotes}>Add Note</button>
      </div>
    </div>
  );
}

export default App;
