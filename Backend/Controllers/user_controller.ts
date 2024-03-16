import { Request, Response } from 'express';
import db from '../models';

const { Users } = db;

// INDEX
export const getUsers = async (req: Request, res: Response): Promise<void> => {
  try {
    const foundUsers = await Users.findAll();
    res.status(200).json({ foundUsers });
  } catch (error) {
    res.status(500).json(error);
  }
};

// SHOW
export const getUserById = async (req: Request, res: Response): Promise<void> => {
  try {
    const foundUser = await Users.findOne({
      where: { user_id: req.params.id }
    });
    res.status(200).json(foundUser);
  } catch (error) {
    res.status(500).json(error);
  }
};

// CREATE
export const createUser = async (req: Request, res: Response): Promise<void> => {
  try {
    const newUser = await Users.create(req.body);
    res.status(200).json({
      message: 'Successfully inserted a new store',
      data: newUser
    });
  } catch (err) {
    res.status(500).json(err);
  }
};

// Update
export const updateUser = async (req: Request, res: Response): Promise<void> => {
  try {
    const updateUser = await Users.update(req.body, {
      where: {
        user_id: req.params.id
      }
    });
    res.status(200).json({
      message: `Successfully updated ${updateUser} user(s)`
    });
  } catch (err) {
    res.status(500).json(err);
  }
};

// DELETE
export const deleteUser = async (req: Request, res: Response): Promise<void> => {
  try {
    const deleteUser = await Users.destroy({
      where: {
        user_id: req.params.id
      }
    });
    res.status(500).json({
      message: `Successfully deleted ${deleteUser} user(s)`
    });
  } catch (err) {
    res.status(200).json(err);
  }
};
