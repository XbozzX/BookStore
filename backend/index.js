import express, { request } from "express";
import { PORT, Smart_DM_URL } from "./config.js";
import { mongoose } from "mongoose";
import Bookroute from "./routes/Bookroute.js";
import cors from "cors";

const app = express();

//create middleware for parsing the body
app.use(express.json());
//create middleware for parsing the page location to the http req
app.use("/books", Bookroute);

//create middleware for handling CORS POLICY
//Option 1: Allow all Origin with default of cors(*)
//app.use(cors());
//Option 2: Allow custom origins
app.use(
  cors({
    origin: "http://localhost:5555",
    methods: ["GET", "POST", "PUT", "DELETE"],
    allowedHeaders: ["Content-Type"],
  })
);

mongoose
  .connect(Smart_DM_URL)
  .then(() => {
    console.log("Connect");

    // localport setup
    app.listen(PORT, () => {
      console.log(`App is listening to port: ${PORT}`);
    });

    // route for http setup
    app.get("/", (req, res) => {
      console.log(req);
      return res.status(234).send("Welcome bro");
    });
  })
  .catch((error) => {
    console.log(error);
  });
