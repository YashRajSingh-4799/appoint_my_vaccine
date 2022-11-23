import  express  from "express";
import  dotenv  from "dotenv";
import  mongoose  from "mongoose";
import auth from "./routes/auth.js";
import hospital from "./routes/hospital.js";
import users from "./routes/users.js";
import vaccinator from "./routes/vaccinator.js";

const app = express()
dotenv.config()

const connect = async () => {
    try {
        await mongoose.connect(process.env.MONGO);
        console.log("mongoDB")
    } catch (error) {
        throw error
    }
};

mongoose.connection.on("disconnected", ()=>{
    console.log("mongoDB disconnected!")
})

mongoose.connection.on("connected", ()=>{
    console.log("mongoDB connected!")
})

app.get("/", (req,res)=>{
    res.send("hello first man")
})

app.use(express.json())

app.use("/server/auth", auth);
app.use("/server/hospital", hospital);
app.use("/server/users", users);
app.use("/server/vaccinator", vaccinator);

app.use((err, req, res, next) => {
    const errorStatus = err.status || 500;
    const errorMessage = err.message || "Something went wrong!";
    return res.status(errorStatus).json({
      success: false,
      status: errorStatus,
      message: errorMessage,
      stack: err.stack,
    });
  });

app.listen(8800, ()=>{
    connect()
    console.log("connected to my laptop")
})