//ROUTES
import express from "express";
import { getController, postController, putController, deleteController } from "./user.controller.js";
const router = express.Router();

router.get("/", getController);
router.post("/", postController);
router.put("/", putController);
router.delete("/", deleteController);

export default router;
