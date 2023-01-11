import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import axios from "axios";
import ReactMarkdown from "react-markdown";
import {MdDeleteForever} from 'react-icons/md'
import { CreateNote } from "./CreateNote";
import { EditNotes } from "./EditNotes";

export const Home = () => {
  // by default notes are an empty array of objects
  // the token is saved as an empty string
  const [notes, setNotes] = useState([]);
  const [token, setToken] = useState("");

  /*
  As soon as the website first loads, get the token saved as token store from local storage
  and store it as the token value
  if the token is valid, get all the notes of that user
  Since there is no dependency list, this will only run once
  */ 
  
  useEffect(() => {
    const token = localStorage.getItem("tokenStore");
    setToken(token);
    if (token) {
      getNotes(token);
    }
  }, []);

  /*
  Getting the data from the server using the API, and giving authorization headers
  change the notes data from the response
  */ 
  
  const getNotes = async (token) => {
    const res = await axios.get("http://localhost:5000/api/notes/", {
      headers: { Authorization: token },
    });
    setNotes(res.data);
  };

  /*
  deleting a note is another simple API call after authorizing the user
  Deleting requires the id of the note as a parameter to delete that particular id only
  */ 


  const deleteNote = async (id) => {
    try {
      if (token) {
        await axios.delete(`http://localhost:5000/api/notes/${id}`, {
          headers: { Authorization: token },
        });
        getNotes(token);
      }
    } catch (error) {
      window.location.href = "/";
    }
  };

  /*
  JSX Return 
  */
  return (
    <div className="home-page">
      <div className="note-wrapper">
        {notes.map((note) => {
          return (
            <div className="card" key={note._id}>
              <div className="note-header">
                <h4 title={note.title}>{note.title}</h4>
                <MdDeleteForever className='delete-icon' size='1.2em' onClick={() => deleteNote(note._id)} />
              </div>
              <ReactMarkdown className="app-main-note-preview-home">{note.content}</ReactMarkdown>
              <div className="card-footer">
                <p className="note-user">{note.name}</p>
                <Link className="edit" to={`/edit/${note._id}`}>EDIT</Link>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};


// after markdown
/* <p className="date">{note.date}</p> */ 
