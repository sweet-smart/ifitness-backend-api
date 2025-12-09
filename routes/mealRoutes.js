import express from "express";
import { logMeal, getMeals } from "../controller/mealController.js";

const router = express.Router();

router.post("/", logMeal);
router.get("/", getMeals);

export default router;
