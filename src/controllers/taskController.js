
import Task from '../models/taskModel.js';

export const getTasks = async (req, res, next) => {
  try {
    const tasks = await Task.findAll();
    res.json(tasks);
  } catch (err) {
    next(err);
  }
};

export const createTask = async (req, res, next) => {
  try {
    const { title, description } = req.body;
    const task = await Task.create({ title, description });
    res.status(201).json(task);
  } catch (err) {
    next(err);
  }
};
















