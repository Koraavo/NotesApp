/*
The main routes for the notes
- All these routes would only work, after the user is logged in, 
therefore the initial page requires a check for the setlogin
the usestate is set to false, when not logged in and true after verification
// A drill down is done for setislogin from the main app to the notes app and further to Nav Menu
*/ 

import React from "react";
import { Nav } from "./notes/Nav";
import { EditNotes } from "./notes/EditNotes";
import { CreateNote } from "./notes/CreateNote";
import { Home } from "./notes/Home";
import { Routes, Route } from "react-router-dom";
import { useState, useEffect } from "react";

export function Notes({ setisLogin }) {

  return (
    <div>
      <Nav setisLogin={setisLogin} className="header" />
      <section className="notes-container">
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/create" element={<CreateNote />} />
          <Route path="/edit/:id" element={<EditNotes />} />
        </Routes>
      </section>
    </div>
  );
}
