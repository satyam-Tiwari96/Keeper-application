import React, { useState, useEffect } from "react";
import Header from "./Header";
import Footer from "./Footer";
import Note from "./Note";
import CreateArea from "./CreateArea";


function App() {
  const [notes, setNotes] = useState([]);

  function addNote(newNote) {
    setNotes(prevNotes => {
      return [...prevNotes, newNote];
    });
  }
  useEffect(() => {
    fetchData();
  }, [])


  const fetchData = async () => {
    const response = await fetch("/getdata");
    const data = await response.json();
    
    return setNotes(data);
  }

  function deleteNote(ids, id) {
    setNotes(prevNotes => {
       
      return prevNotes.filter((noteItem, index) => {
        fetch(`/delete/${id}`);
        return index !== ids;

      });
    });
  }

  return (
    <div>
      <Header />
      <CreateArea onAdd={addNote} />
      {notes.map((noteItem, index) => {
        return (
          <Note
            key={index}
            ids={index}
            id={noteItem._id}
            title={noteItem.title}
            content={noteItem.content}
            onDelete={deleteNote}
          />
        );
      })}
      <Footer />
    </div>
  );
}

export default App;