import { Request, Response } from "express";
import cloudinary from "../helpers/cloudinary";
import { insertEvent } from "../helpers/googleEvents";
import Event, { IEvent } from "../models/Events";
import Volunteer from "../models/Volunteer";

export const addEvents = async (req: Request, res: Response) => {
  try {
    if (req.body.img) {
      const result = await cloudinary.uploader.upload(req.body.img, {
        folder: "products",
      });
      await Event.create({
        ...req.body,
        img: {
          public_id: result.public_id,
          url: result.secure_url,
        },
      });
    } else {
      await Event.create(req.body);
    }
    const data = {
      eventName: req.body.eventName,
      eventLocation: req.body.eventLocation,
      eventDescription: req.body.eventDescription,
      eventTime: req.body.eventTime,
      eventEndTime: req.body.eventEndTime,
    };
    await insertEvent(data);
    res.status(200).send("Event successfully created");
  } catch (err) {
    console.log(err);
    res.sendStatus(500);
  }
};

export const getAllEvents = async (req: Request, res: Response) => {
  try {
    const events = await Event.find().sort({ createdAt: -1 });
    const volunteerId = req.query.id;
    const volunteerRequest = await Volunteer.find({ volunteerId });
    const data: any = [];
    events.forEach((event: any) => {
      const request = volunteerRequest.find(
        (r) => r.eventId.toString() === event._id.toString()
      );
      if (request) {
        data.push({
          ...event._doc,
          status: request.status,
        });
      } else {
        data.push({
          ...event._doc,
          status: "open",
        });
      }
    });
    res.status(200).send(data);
  } catch (err) {
    console.log(err);
    res.sendStatus(500);
  }
};

export const eventVolunteer = async (req: Request, res: Response) => {
  try {
    const volunteerId = req.params.id;
    const organizationId = req.body.organizationId;
    const volunteer = new Volunteer({
      volunteerId,
      organizationId,
      ...req.body,
    });
    await volunteer.save();
    res
      .status(201)
      .send({ success: true, message: "Request sent successfully" });
  } catch (err) {
    console.log(err);
    res.sendStatus(500);
  }
};

export const getEventVolunteer = async (req: Request, res: Response) => {
  try {
    const eventId = req.params.id;
    const volunteers = await Volunteer.find({ eventId }).populate(
      "volunteerId",
      "name"
    );
    const formattedVolunteers = volunteers.map((volunteer: any) => {
      return {
        name: volunteer.volunteerId.name,
        _id: volunteer._id,
        address: volunteer.address,
        age: volunteer.age,
        gender: volunteer.gender,
        nationality: volunteer.nationality,
        skillSet: volunteer.skillSet,
        training: volunteer.training,
        eventId: volunteer.eventId,
        organizationId: volunteer.organizationId,
        status: volunteer.status,
      };
    });
    res.status(201).send(formattedVolunteers);
  } catch (err) {
    console.log(err);
    res.sendStatus(500);
  }
};
export const getEventsById = async (req: Request, res: Response) => {
  try {
    const orgId = req.params.id;
    const event = await Event.find({ organizationId: orgId }).sort({
      createdAt: -1,
    });
    res.status(201).send(event);
  } catch (err) {
    console.log(err);
    res.sendStatus(500);
  }
};

export const getEventByEventId = async (req: Request, res: Response) => {
  try {
    const eventId = req.params.id;
    const event = await Event.findById(eventId);
    res.status(201).send(event);
  } catch (err) {
    console.log(err);
    res.sendStatus(500);
  }
};

export const acceptVolunteer = async (req: Request, res: Response) => {
  try {
    const volunteerId = req.params.id;
    const eventId = req.body.id;
    const volunteer = await Volunteer.findById(volunteerId);
    if (volunteer) {
      volunteer.status = "approved";
      await volunteer.save();
    }
    const event = await Event.findById(eventId);
    if (event) {
      event.totalVolunteers += 1;
      await event.save();
    }
    res.status(200).send("Volunteer accepted");
  } catch (err) {
    console.log(err);
    res.sendStatus(500);
  }
};

export const rejectVolunteer = async (req: Request, res: Response) => {
  try {
    const volunteerId = req.params.id;
    const volunteer = await Volunteer.findById(volunteerId);
    if (volunteer) {
      volunteer.status = "rejected";
      await volunteer.save();
    }
    res.status(200).send("Volunteer rejected");
  } catch (err) {
    console.log(err);
    res.sendStatus(500);
  }
};
