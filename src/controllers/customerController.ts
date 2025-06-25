import { Request, Response } from 'express';
import { Customer } from '../models/Customer';
import { AppError } from '../utils/appError';

export const getAllCustomers = async (req: Request, res: Response) => {
  try {
    const customers = await Customer.findAll({
      order: [['name', 'ASC']]
    });
    
    res.status(200).json({
      status: 'success',
      data: customers
    });
  } catch (error) {
    throw new AppError('Failed to fetch customers', 500);
  }
};

export const getCustomerById = async (req: Request, res: Response) => {
  try {
    const { id } = req.params;
    const customer = await Customer.findByPk(id);
    
    if (!customer) {
      throw new AppError('Customer not found', 404);
    }
    
    res.status(200).json({
      status: 'success',
      data: customer
    });
  } catch (error) {
    if (error instanceof AppError) throw error;
    throw new AppError('Failed to fetch customer', 500);
  }
};

export const createCustomer = async (req: Request, res: Response) => {
  try {
    const { name, email, phone } = req.body;
    
    const customer = await Customer.create({
      name,
      email,
      phone
    });
    
    res.status(201).json({
      status: 'success',
      data: customer
    });
  } catch (error) {
    throw new AppError('Failed to create customer', 500);
  }
};

export const updateCustomer = async (req: Request, res: Response) => {
  try {
    const { id } = req.params;
    const { name, email, phone } = req.body;
    
    const customer = await Customer.findByPk(id);
    
    if (!customer) {
      throw new AppError('Customer not found', 404);
    }
    
    await customer.update({
      name,
      email,
      phone
    });
    
    res.status(200).json({
      status: 'success',
      data: customer
    });
  } catch (error) {
    if (error instanceof AppError) throw error;
    throw new AppError('Failed to update customer', 500);
  }
};

export const deleteCustomer = async (req: Request, res: Response) => {
  try {
    const { id } = req.params;
    
    const customer = await Customer.findByPk(id);
    
    if (!customer) {
      throw new AppError('Customer not found', 404);
    }
    
    await customer.destroy();
    
    res.status(204).json({
      status: 'success',
      data: null
    });
  } catch (error) {
    if (error instanceof AppError) throw error;
    throw new AppError('Failed to delete customer', 500);
  }
};

export const getCustomerByEmail = async (req: Request, res: Response) => {
  try {
    const { email } = req.params;
    const customer = await Customer.findOne({
      where: { email }
    });
    
    if (!customer) {
      throw new AppError('Customer not found', 404);
    }
    
    res.status(200).json({
      status: 'success',
      data: customer
    });
  } catch (error) {
    if (error instanceof AppError) throw error;
    throw new AppError('Failed to fetch customer', 500);
  }
}; 