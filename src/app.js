import express from "express";
import cors from "cors";
import errorHandler from "./middleware/errorHandler.js";
// import router from "./modules/user/user.routes.js";
import dotenv from "dotenv";
dotenv.config({
  path: "../.env",
});

const app = express();

const whitelist = [`http://localhost:${process.env.PORT}`];
const corsOptions = {
  origin: function (origin, callback) {
    if (whitelist.indexOf(origin || "") !== -1 || !origin) {
      callback(null, true);
    } else {
      callback(new Error("Not allowed by CORS"));
    }
  },
  methods: ["GET", "POST", "PUT", "DELETE"],
  credentials: true,
};

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cors(corsOptions));

//ROUTES
/* app.use("/", router); */

//GLOBAL ERROR HANDLER
app.use(errorHandler);

export default app;
