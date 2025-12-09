import Progress from "../models/Progress.js";

export const logProgress = async (req, res) => {
  const progress = await Progress.create(req.body);
  res.json(progress);
};

export const getProgress = async (req, res) => {
  const progress = await Progress.find();
  res.json(progress);
};
