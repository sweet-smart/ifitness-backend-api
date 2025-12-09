import express from "express";
import { logProgress, getProgress } from "../controller/progressController.js";

const router = express.Router();

router.post("/", logProgress);
router.get("/", getProgress);

export default router;
