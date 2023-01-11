/*
Mongo DB schema for Notes
- title
-comments
-date
-user id
- user name
*/
import mongoose from "mongoose";

const noteSchema = new mongoose.Schema(
  {
    title: {
      type: String,
      required: true,
    },

    content: {
      type: String,
      required: true,
    },

    date: {
      type: Date,
      default: new Date().toLocaleDateString("en-GB", {
        hour: "2-digit",
        minute: "2-digit",
      }),
    },

    user_id: {
      type: String,
      required: true,
    },

    name: {
      type: String,
      required: true,
    },
  },
  {
    timestamps: true,
  }
);

// usual way to export a mongo model
const noteModel = mongoose.model("Notes", noteSchema);

export default noteModel;
