import React, { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import ReactMarkdown from "react-markdown";

export const CreateNote = () => {
  
  // initial state of the note
  
  const [createNote, setCreateNote] = useState([
    {
      title: "",
      content: "",
      date: "",
    },
  ]);

  const navigate = useNavigate();

  const onChangeInput = (e) => {
    const { name, value } = e.target;
    setCreateNote({ ...createNote, [name]: value });
  };

  // on submitting the form, save the note and navigate to the home page
  const saveNote = async (e) => {
    e.preventDefault();
    try {
      const token = localStorage.getItem("tokenStore");
      if (token) {
        const { title, content} = createNote;
        const newNote = {
          title,
          content,
        };
        // get the details of the new note and make a post request
        await axios.post("http://localhost:5000/api/notes", newNote, {
          headers: {
            Authorization: token,
          },
        });
        navigate("/");
      }
    } catch (error) {
      window.location.href = "/";
      // console.log("cannot create note")
    }
  };

  return (
    
    <div className="app-main">
      <form onSubmit={saveNote} autoComplete="off">
        <div className="input-fields">
          <div className="row">
            <input
              type="text"
              name="title"
              id="title"
              value={createNote.title}
              required
              onChange={onChangeInput}
              placeholder="Untitled"
              autoFocus
            />
          </div>
          <div className="app-main-note-edit">
              <textarea
                rows={10}
                type="text"
                name="content"
                id="content"
                value={createNote.content}
                onChange={onChangeInput}
                required
                placeholder="Place Your Content Here"
              />
          </div>
          
        </div>
        <div className="preview-and-save">
          <div className="app-main-note-preview">
              <ReactMarkdown className="markdown-preview">
                {createNote.content}
              </ReactMarkdown>
          </div>
            <button type="submit">Save</button>
        </div>
      </form>
    </div>
  );
};