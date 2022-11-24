import Hospital from "../models/hospital.js";
import vaccinator from "../models/vaccinator.js";

export const createHospital = async (req, res, next) => {
  const newHospital = new Hospital(req.body);

  try {
    const savedHospital = await newHospital.save();
    res.status(200).json(savedHospital);
  } catch (err) {
    next(err);
  }
};
export const updateHospital = async (req, res, next) => {
  try {
    const updatedHospital = await Hospital.findByIdAndUpdate(
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
    await Hospital.findByIdAndDelete(req.params.id);
    res.status(200).json("Hospital has been deleted.");
  } catch (err) {
    next(err);
  }
};
export const getHospital = async (req, res, next) => {
  try {
    const hospital = await Hospital.findById(req.params.id);
    res.status(200).json(hospital);
  } catch (err) {
    next(err);
  }
};
export const getHospitals = async (req, res, next) => {
  const { min, max, ...others } = req.query;
  try {
    const hospitals = await Hospital.find({
      ...others,
      cheapestPrice: { $gt: min | 1, $lt: max || 999 },
    }).limit(req.query.limit);
    res.status(200).json(hospitals);
  } catch (err) {
    next(err);
  }
};
export const countByCity = async (req, res, next) => {
  const cities = req.query.cities.split(",");
  try {
    const list = await Promise.all(
      cities.map((city) => {
        return Hospital.countDocuments({ city: city });
      })
    );
    res.status(200).json(list);
  } catch (err) {
    next(err);
  }
};
export const countByType = async (req, res, next) => {
  try {
    const hospitalCount = await Hospital.countDocuments({ type: "hospital" });
    const apartmentCount = await Hospital.countDocuments({ type: "apartment" });
    const resortCount = await Hospital.countDocuments({ type: "resort" });
    const villaCount = await Hospital.countDocuments({ type: "villa" });
    const cabinCount = await Hospital.countDocuments({ type: "cabin" });

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

export const getHospitalvaccinators = async (req, res, next) => {
  try {
    const hospital = await Hospital.findById(req.params.id);
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