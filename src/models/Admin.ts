import mongoose, { Schema } from "mongoose";

interface IAdmin {
  username: string;
  password: string;
  profilePic: string;
  email: string;
}

const AdminSchema = new Schema(
  {
    profilePic: {
      type: String,
    },
    username: {
      type: String,
      required: true,
    },
    password: {
      type: String,
      required: true,
    },
    email: {
      type: String,
    },
  },
  {
    timestamps: true,
  }
);

const AdminModel = mongoose.model<IAdmin>("Admin", AdminSchema);

export default AdminModel;
