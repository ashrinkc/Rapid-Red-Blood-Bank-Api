import mongoose, { Schema } from "mongoose";
import User from "./User";

export interface IEvent {
  organizationId: mongoose.Schema.Types.ObjectId;
  eventName: string;
  eventLocation: string;
  locationLink: string;
  eventOrganizer: string;
  maxVolunteers: number;
  totalVolunteers: number;
  eventDescription: string;
  eventTime: Date;
  eventEndTime: Date;
  img: {};
}

const eventSchema = new Schema(
  {
    organizationId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: User.OrganizationModel,
      required: true,
    },
    eventName: {
      type: String,
      required: true,
    },
    eventLocation: {
      type: String,
      required: true,
    },
    locationLink: {
      type: String,
      // required:true
    },
    eventOrganizer: {
      type: String,
    },
    maxVolunteers: {
      type: Number,
    },
    totalVolunteers: {
      type: Number,
      default: 0,
    },
    eventDescription: {
      type: String,
      required: true,
    },
    eventTime: {
      type: Date,
      required: true,
    },
    eventEndTime: {
      type: Date,
    },
    img: {
      public_id: {
        type: String,
      },
      url: {
        type: String,
      },
    },
  },
  {
    timestamps: true,
  }
);

const eventModel = mongoose.model<IEvent>("Event", eventSchema);

export default eventModel;
