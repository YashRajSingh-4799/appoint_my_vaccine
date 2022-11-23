import express  from "express";
import hospital from "../models/hospital.js";
import { createHospital } from "../controllers/hospital.js";

router = express.Router();

// create
router.post("/", createHospital);

// update
router.put("/:id", async (req,res)=>{
   
    try{
        const updateHospital =await hospital.findByIdAndUpdate(req.params.id, 
            { $set: req.body},
            {new: true})
        res.status(200).json(updateHospital)
    }catch(err){
        res.status(500).json(err)
    }
    })
    
// delete
router.delete("/:id", async (req,res)=>{
  
    try{
        await hospital.findByIdAndDelete(req.params.id);
        res.status(200).json("Hospital is been deleted")
    }catch(err){
        res.status(500).json(err)
    }
    })

// get
router.get("/:id", async (req,res)=>{

    try{
        const Hospital =await hospital.findById(req.params.id)
        res.status(200).json(Hospital)
    }catch(err){
        res.status(500).json(err)
    }
    })

// get all
router.get("/", async (req,res)=>{
    try{
        const Hospitals =await hospital.find();
        res.status(200).json(Hospitals);
    }catch(err){
        next(err);
    }
});


export default router;