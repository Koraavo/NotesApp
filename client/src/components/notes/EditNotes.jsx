import React, { useState, useEffect } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { useParams } from "react-router-dom";
import ReactMarkdown from "react-markdown";

export const EditNotes = () => {
  // since the edit notes component route requires id as a parameter
  // get the parameter using useParams 
  const routeParams = useParams();
  
  const [editNote, setEditNote] = useState([
    {
      title: "",
      content: "",
      date: "",
      id: "",
    },
  ]);

  const navigate = useNavigate();
  // console.log(routeParams);


  /* 
  Everytime there is a change in the data of the note (id in the dependency list)
  change the editnote to the data entered
  */ 
  useEffect(() => {
    const getNote = async () => {
      const token = localStorage.getItem("tokenStore");
      // if you are able to find the id, get the note
      if (routeParams.id) {
        const res = await axios.get(
          `http://localhost:5000/api/notes/${routeParams.id}`,
          {
            headers: {
              Authorization: token,
            },
          }
        );
        // console.log(routeParams.id);
        // console.log(res);
        // use all the details of the note and set it on the edit note page
        setEditNote({
          title: res.data.title,
          content: res.data.content,
          date: new Date(res.data.date).toLocaleDateString(),
          id: res.data._id,
        });
      }
    };
    getNote();
  }, [routeParams.id]);

  /*
  Since these are all inputs and forms 
  the input onchange destructures the data and sets the values
  */ 
  const onChangeInput = (e) => {
    const { name, value } = e.target;
    setEditNote({ ...editNote, [name]: value });
  };

  /*
  on form submission, authorize the user
  and get new values to the edited note
  */ 
  const saveEditedNote = async (e) => {
    e.preventDefault();
    try {
      const token = localStorage.getItem("tokenStore");
      if (token) {
        const { title, content, id } = editNote;
        const newNote = {
          title,
          content,
        };

        /*
        edit the values here via the put request
        */ 
        await axios.put(`http://localhost:5000/api/notes/${id}`, newNote, {
          headers: {
            Authorization: token,
          },
        });
        navigate("/");
      }
    } catch (error) {
      window.location.href = "/";
    }
  };

  return (
    <div className="app-main">
      <form onSubmit={saveEditedNote} autoComplete="off">
        <div className="input-fields">
          <div className="row">
            <input
              type="text"
              name="title"
              id="title"
              value={editNote.title}
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
                value={editNote.content}
                onChange={onChangeInput}
                required
                placeholder="Place Your Content Here"
              />
          </div>
          
        </div>
        <div className="preview-and-save">
          <div className="app-main-note-preview">
              <ReactMarkdown className="markdown-preview">
                {editNote.content}
              </ReactMarkdown>
          </div>
            <button type="submit">Save</button>
        </div>
      </form>
    </div>
  );
};


