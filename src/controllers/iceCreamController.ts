import { Request, Response } from 'express';
import { IceCream } from '../models/IceCream';
import { AppError } from '../utils/appError';

export const getAllIceCreams = async (req: Request, res: Response) => {
  try {
    const iceCreams = await IceCream.findAll({
      order: [['name', 'ASC']]
    });
    
    res.status(200).json({
      status: 'success',
      data: iceCreams
    });
  } catch (error) {
    throw new AppError('Failed to fetch ice creams', 500);
  }
};

export const getIceCreamById = async (req: Request, res: Response) => {
  try {
    const { id } = req.params;
    const iceCream = await IceCream.findByPk(id);
    
    if (!iceCream) {
      throw new AppError('Ice cream not found', 404);
    }
    
    res.status(200).json({
      status: 'success',
      data: iceCream
    });
  } catch (error) {
    if (error instanceof AppError) throw error;
    throw new AppError('Failed to fetch ice cream', 500);
  }
};

export const createIceCream = async (req: Request, res: Response) => {
  try {
    const { name, flavor, price, stock } = req.body;
    
    const iceCream = await IceCream.create({
      name,
      flavor,
      price,
      stock: stock || 0
    });
    
    res.status(201).json({
      status: 'success',
      data: iceCream
    });
  } catch (error) {
    throw new AppError('Failed to create ice cream', 500);
  }
};

export const updateIceCream = async (req: Request, res: Response) => {
  try {
    const { id } = req.params;
    const { name, flavor, price, stock } = req.body;
    
    const iceCream = await IceCream.findByPk(id);
    
    if (!iceCream) {
      throw new AppError('Ice cream not found', 404);
    }
    
    await iceCream.update({
      name,
      flavor,
      price,
      stock
    });
    
    res.status(200).json({
      status: 'success',
      data: iceCream
    });
  } catch (error) {
    if (error instanceof AppError) throw error;
    throw new AppError('Failed to update ice cream', 500);
  }
};

export const deleteIceCream = async (req: Request, res: Response) => {
  try {
    const { id } = req.params;
    
    const iceCream = await IceCream.findByPk(id);
    
    if (!iceCream) {
      throw new AppError('Ice cream not found', 404);
    }
    
    await iceCream.destroy();
    
    res.status(204).json({
      status: 'success',
      data: null
    });
  } catch (error) {
    if (error instanceof AppError) throw error;
    throw new AppError('Failed to delete ice cream', 500);
  }
};

export const updateStock = async (req: Request, res: Response) => {
  try {
    const { id } = req.params;
    const { stock } = req.body;
    
    const iceCream = await IceCream.findByPk(id);
    
    if (!iceCream) {
      throw new AppError('Ice cream not found', 404);
    }
    
    await iceCream.update({ stock });
    
    res.status(200).json({
      status: 'success',
      data: iceCream
    });
  } catch (error) {
    if (error instanceof AppError) throw error;
    throw new AppError('Failed to update stock', 500);
  }
}; 