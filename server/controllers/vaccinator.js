import vaccinator from "../models/vaccinator.js";
import Hospital from "../models/hospital.js";
import { createError } from "../utils/error.js";

export const createvaccinator = async (req, res, next) => {
  const hospitalId = req.params.hospitalid;
  const newvaccinator = new vaccinator(req.body);

  try {
    const savedvaccinator = await newvaccinator.save();
    try {
      await Hospital.findByIdAndUpdate(hospitalId, {
        $push: { vaccinators: savedvaccinator._id },
      });
    } catch (err) {
      next(err);
    }
    res.status(200).json(savedvaccinator);
  } catch (err) {
    next(err);
  }
};

export const updatevaccinator = async (req, res, next) => {
  try {
    const updatedvaccinator = await vaccinator.findByIdAndUpdate(
      req.params.id,
      { $set: req.body },
      { new: true }
    );
    res.status(200).json(updatedvaccinator);
  } catch (err) {
    next(err);
  }
};
export const updatevaccinatorAvailability = async (req, res, next) => {
  try {
    await vaccinator.updateOne(
      { "vaccinatorNumbers._id": req.params.id },
      {
        $push: {
          "vaccinatorNumbers.$.unavailableDates": req.body.dates
        },
      }
    );
    res.status(200).json("vaccinator status has been updated.");
  } catch (err) {
    next(err);
  }
};
export const deletevaccinator = async (req, res, next) => {
  const hospitalId = req.params.hospitalid;
  try {
    await vaccinator.findByIdAndDelete(req.params.id);
    try {
      await Hospital.findByIdAndUpdate(hospitalId, {
        $pull: { vaccinators: req.params.id },
      });
    } catch (err) {
      next(err);
    }
    res.status(200).json("vaccinator has been deleted.");
  } catch (err) {
    next(err);
  }
};
export const getvaccinator = async (req, res, next) => {
  try {
    const vaccinator = await vaccinator.findById(req.params.id);
    res.status(200).json(vaccinator);
  } catch (err) {
    next(err);
  }
};
export const getvaccinators = async (req, res, next) => {
  try {
    const vaccinators = await vaccinator.find();
    res.status(200).json(vaccinators);
  } catch (err) {
    next(err);
  }
};