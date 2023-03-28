import { Response, Request } from "express";
import mongoose from "mongoose";
import { bloodRequestMail, bloodRequestStatus } from "../helpers/mailer";
import PatientRequest from "../models/PatientRequest";
import DonorRequest from "../models/Request";
import User from "../models/User";

export const bloodDonationRequests = async (req: Request, res: Response) => {
  try {
    //find the donor by their id
    // const donor:any = await User.DonorModel.findById(req.params.id)
    // const organization:any = await User.OrganizationModel.findById(req.body.organizationId.id)
    const donorId = req.params.id;
    const organizationId = req.query.organizationId;
    const request = new DonorRequest({ donorId, organizationId, ...req.body });
    await request.save();
    res
      .status(201)
      .send({ success: true, message: "Request sent successfully" });
  } catch (err) {
    console.log(err);
    res.sendStatus(500);
  }
};

export const getDonationRequests = async (req: Request, res: Response) => {
  try {
    const organizationId = req.params.id;
    const requests = await DonorRequest.find({ organizationId }).populate(
      "donorId",
      ["email", "name", "bloodType", "contact"]
    );
    res.status(200).send(requests);
  } catch (err) {
    console.log(err);
    res.sendStatus(500);
  }
};

export const updateDonationRequestStatus = async (
  req: Request,
  res: Response
) => {
  try {
    const id = req.params.id;
    const donor = await DonorRequest.findById(id);
    if (donor) {
      if (req.body.status === "approved") {
        donor.status = "approved";
        donor.orgStatus = "approved";
        await donor.save();
        return res.status(500).send("Donor request approved");
      } else if (req.body.status === "rejected") {
        donor.status = "rejected";
        donor.orgStatus = "rejected";
        await donor.save();
        return res.status(500).send("Donor request rejected");
      }
    }
  } catch (err) {
    console.log(err);
    res.sendStatus(500);
  }
};

export const patientBloodRequest = async (req: Request, res: Response) => {
  try {
    const patientId = req.params.id;
    const patient: any = await User.PatientModel.findById(patientId);
    let user: any = "";
    if (req.body.donorId) {
      user = await User.DonorModel.findById(req.body.donorId);
    }
    if (req.body.organizationId) {
      user = await User.OrganizationModel.findById(req.body.organizationId);
    }
    const data = {
      sender: patient.email,
      receiver: user.email,
      name: patient.name,
      bloodType: req.body.bloodType,
      age: req.body.age,
      gender: req.body.gender,
      about: req.body.about,
    };
    const request = new PatientRequest({ patientId, ...req.body });
    await request.save();
    await bloodRequestMail(data);
    res
      .status(201)
      .send({ success: true, message: "Request sent successfully" });
  } catch (err) {
    console.log(err);
    res.sendStatus(500);
  }
};

export const getPatientBloodRequestsDonor = async (
  req: Request,
  res: Response
) => {
  try {
    const donorId = req.params.id;
    const requests = await PatientRequest.find({ donorId }).populate(
      "patientId",
      ["email", "name", "contact"]
    );
    res.status(200).send(requests);
  } catch (err) {
    console.log(err);
    res.sendStatus(500);
  }
};

export const getPatientsBloodRequestsBloodBank = async (
  req: Request,
  res: Response
) => {
  try {
    const organizationId = req.params.id;
    const requests = await PatientRequest.find({ organizationId }).populate(
      "patientId",
      ["email", "name", "contact"]
    );
    res.status(200).send(requests);
  } catch (err) {
    console.log(err);
    res.sendStatus(500);
  }
};

export const updatePatientRequestStatus = async (
  req: Request,
  res: Response
) => {
  try {
    const id = req.params.id;
    const request = await PatientRequest.findById(id);
    const patId = request?.patientId;
    const pat: any = await User.PatientModel.findById(patId);
    const donId = request?.donorId || request?.organizationId;
    const don: any = await User.UserModel.findById(donId);
    const data = {
      receiver: pat.email,
      sender: don.email,
      status: req.body.status,
      name: don.name,
    };
    await bloodRequestStatus(data);
    if (request) {
      if (req.body.status === "approved") {
        request.status = "approved";
        request.orgStatus = "approved";
        await request.save();
        return res.status(500).send("patient request approved");
      } else if (req.body.status === "rejected") {
        request.status = "rejected";
        request.orgStatus = "rejected";
        await request.save();
        return res.status(500).send("patient request rejected");
      }
    }
  } catch (err) {
    console.log(err);
    res.sendStatus(500);
  }
};

export const getPatientRequestById = async (req: Request, res: Response) => {
  try {
    const data = await PatientRequest.findById(req.params.id);
    res.status(200).send(data);
  } catch (err) {
    console.log(err);
    res.sendStatus(500);
  }
};
