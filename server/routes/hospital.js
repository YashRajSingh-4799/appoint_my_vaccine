import express  from "express";
import hospital from "../models/hospital.js";

const router = express.Router();

// create
router.post("/", async (req,res)=>{
const newHospital =new hospital(req.body)
try{
    const savedHospital =await newHospital.save()
    res.status(200).json(savedHospital)
}catch(err){
    res.status(500).json(err)
}
})

// update
router.put("/:id", async (req,res)=>{
    // const newHospital =new hospital(req.body)
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
    // const newHospital =new hospital(req.body)
    try{
        await hospital.findByIdAndDelete(req.params.id);
        res.status(200).json("Hospital is been deleted")
    }catch(err){
        res.status(500).json(err)
    }
    })

// get

router.get("/:id", async (req,res)=>{
    // const newHospital =new hospital(req.body)
    try{
        const Hospital =await hospital.findById(req.params.id)
        res.status(200).json(Hospital)
    }catch(err){
        res.status(500).json(err)
    }
    })

// get all
router.get("/", async (req,res)=>{
    // const newHospital =new hospital(req.body)
    try{
        const Hospitals =await hospital.find(req.params.id)
        res.status(200).json(Hospitals)
    }catch(err){
        res.status(500).json(err)
    }
    })


export default router