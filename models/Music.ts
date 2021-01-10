import mongoose, { Schema, Document } from "mongoose";

interface IMusic extends Document {
  name: string;
  link: string;
  author: string;
  album: string;
  liked: boolean;
}

const musicSchema = new Schema({
  name: {
    type: String,
    required: true,
  },
  link: {
    type: String,
    required: true,
  },
  author: {
    type: String,
    required: true,
  },
  album: {
    type: String,
    required: true,
  },
  liked: {
    type: Boolean,
    required: true,
  },
  image: {
    type: String,
    required: true,
  },
});

const Music = mongoose.model<IMusic>("Music", musicSchema);

export default Music;
