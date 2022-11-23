import hospital from "../models/hospital.js";
// import hospital from "../models/hospital.js";
import vaccinator from "../models/vaccinator.js";

export const createHospital = async (req, res, next) => {
  const newHospital = new hospital(req.body);

  try {
    const savedHospital = await newHospital.save();
    res.status(200).json(savedHospital);
  } catch (err) {
    next(err);
  }
};

export const updateHospital = async (req, res, next) => {
  try {
    const updatedHospital = await hospital.findByIdAndUpdate(
      req.params.id,
      { $set: req.body },
      { new: true }
    );
    res.status(200).json(updatedHospital);
  } catch (err) {
    next(err);
  }
};

export const deleteHospital = async (req, res, next) => {
  try {
    await hospital.findByIdAndDelete(req.params.id);
    res.status(200).json("hospital has been deleted.");
  } catch (err) {
    next(err);
  }
};

export const getHospital = async (req, res, next) =>{
  try {
    const hospital = await hospital.findById(req.params.id);
    res.status(200).json(hospital);
  } catch (err) {
    next(err);
  }
};

export const getHospitals = async (req, res, next) => {
  const { min, max, ...others } = req.query;
  try {
    const Hospitals = await hospital.find({
      ...others,
      cheapestPrice: { $gt: min | 1, $lt: max || 999 },
    }).limit(req.query.limit);
    res.status(200).json(Hospitals);
  } catch (err) {
    next(err);
  }
};
export const countByCity = async (req, res, next) => {
  const cities = req.query.cities.split(",");
  try {
    const list = await Promise.all(
      cities.map((city) => {
        return hospital.countDocuments({ city: city });
      })
    );
    res.status(200).json(list);
  } catch (err) {
    next(err);
  }
};

export const countByType = async (req, res, next) => {
  try {
    const hospitalCount = await hospital.countDocuments({ type: "hospital" });
    const apartmentCount = await hospital.countDocuments({ type: "apartment" });
    const resortCount = await hospital.countDocuments({ type: "resort" });
    const villaCount = await hospital.countDocuments({ type: "villa" });
    const cabinCount = await hospital.countDocuments({ type: "cabin" });

    res.status(200).json([
      { type: "hospital", count: hospitalCount },
      { type: "apartments", count: apartmentCount },
      { type: "resorts", count: resortCount },
      { type: "villas", count: villaCount },
      { type: "cabins", count: cabinCount },
    ]);
  } catch (err) {
    next(err);
  }
};

export const getVaccinator = async (req, res, next) => {
  try {
    const hospital = await hospital.findById(req.params.id);
    const list = await Promise.all(
      hospital.vaccinators.map((vaccinator) => {
        return vaccinator.findById(vaccinator);
      })
    );
    res.status(200).json(list)
  } catch (err) {
    next(err);
  }
};