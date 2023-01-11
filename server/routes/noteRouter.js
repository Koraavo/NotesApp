import express from "express";
import isPasswordCorrect from "../middleware/authMiddleware.js";
import noteCtrl from "../controllers/noteCtrl.js";

const noteRouter = express.Router();

// link = localhost:5000/users/register
// note router has a get and a post for creating and get all posts
// it also has specific actions to take for singular posts

/*
isPasswordCorrect is the middleware used to authorise users 
after they have logged in (authentication)
Since users can only see their notes and not the notes of others, 
users need to be authorised to see those notes
*/

noteRouter
  .route("/")
  .get(isPasswordCorrect, noteCtrl.getAllNotes)
  .post(isPasswordCorrect, noteCtrl.createNote);

noteRouter
  .route("/:id")
  .get(isPasswordCorrect, noteCtrl.getNote)
  .put(isPasswordCorrect, noteCtrl.updateNote)
  .delete(isPasswordCorrect, noteCtrl.deleteNote);

export default noteRouter;
