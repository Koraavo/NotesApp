/*
The following operations can be done on a note
- get all the notes
- create a note
- edit a note
- delete the note
- get just one note to do those actions
Since they are all crud based requirements and easily available on mongodb
*/
import noteModel from "../models/noteModel.js";

const noteCtrl = {
  getAllNotes: async (req, res) => {
    try {
      // find the user_id from the notes model which is equal to the user that is logged in
      // if the user is logged in, generate the notes of that user
      const notes = await noteModel.find({ user_id: req.user.id });
      res.json(notes);
    } catch (error) {
      return res.status(500).json({ msg: error.message });
    }
  },

  createNote: async (req, res) => {
    try {
      // destructuring all the schema
      /* getting information via req.body to get user's id and name */
      const { title, content, date } = req.body;
      const newNote = new noteModel({
        title,
        content,
        date,
        user_id: req.user.id,
        name: req.user.name,
      });
      // post requests require you to save the data posted by the user
      await newNote.save();
      res.json({ msg: "Note Created Successfully" });
    } catch (error) {
      return res.status(500).json({ msg: error.message });
    }
  },
  deleteNote: async (req, res) => {
    try {
      await noteModel.findByIdAndDelete(req.params.id);
      res.json({ msg: "Note Deleted Successfully" });
    } catch (error) {
      return res.status(500).json({ msg: error.message });
    }
  },

  updateNote: async (req, res) => {
    try {
      const { title, content, date } = req.body;
      await noteModel.findOneAndUpdate(
        { _id: req.params.id },
        {
          title,
          content,
          date,
        }
      );
      res.json({ msg: "Note Updated Successfully" });
    } catch (error) {
      return res.status(500).json({ msg: error.message });
    }
  },

  getNote: async (req, res) => {
    try {
      const note = await noteModel.findById(req.params.id);
      res.json(note);
    } catch (error) {
      return res.status(500).json({ msg: error.message });
    }
  },
};

export default noteCtrl;
