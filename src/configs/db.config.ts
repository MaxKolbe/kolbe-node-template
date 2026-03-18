import mongoose from "mongoose";
import dotenv from "dotenv";
import logger from "./logger.config.js";

dotenv.config({
  path: "../../.env",
});

const dbMap = new Map([
  ["development", process.env.PG_DATABASE_DEV_URL],
  ["test", process.env.PG_DATABASE_TEST_URL],
  ["production", process.env.PG_DATABASE_PROD_URL],
]);

const dburl = dbMap.get(process.env.NODE_ENV!);

mongoose.connection.on("connected", () =>
  logger.info(`Connected to the mongo database successfully`),
);

mongoose.connection.on("error", (err) => logger.error(`Database connection error: ${err} \n`));

const connectToDb = async () => {
  await mongoose.connect(dburl!);
};

export default connectToDb;
