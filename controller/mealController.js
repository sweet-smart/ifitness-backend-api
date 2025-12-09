import MealLog from "../models/MealLog.js";

export const logMeal = async (req, res) => {
  const meal = await MealLog.create(req.body);
  res.json(meal);
};

export const getMeals = async (req, res) => {
  const meals = await MealLog.find();
  res.json(meals);
};
