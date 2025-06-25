import { Request, Response } from 'express';
import { Order, OrderItem, Customer, IceCream } from '../models';
import { AppError } from '../utils/appError';
import sequelize from '../config/database';

export const getAllOrders = async (req: Request, res: Response) => {
  try {
    const orders = await Order.findAll({
      include: [
        {
          model: Customer,
          attributes: ['id', 'name', 'email', 'phone']
        },
        {
          model: OrderItem,
          include: [
            {
              model: IceCream,
              attributes: ['id', 'name', 'flavor']
            }
          ]
        }
      ],
      order: [['orderDate', 'DESC']]
    });
    
    res.status(200).json({
      status: 'success',
      data: orders
    });
  } catch (error) {
    throw new AppError('Failed to fetch orders', 500);
  }
};

export const getOrderById = async (req: Request, res: Response) => {
  try {
    const { id } = req.params;
    const order = await Order.findByPk(id, {
      include: [
        {
          model: Customer,
          attributes: ['id', 'name', 'email', 'phone']
        },
        {
          model: OrderItem,
          include: [
            {
              model: IceCream,
              attributes: ['id', 'name', 'flavor']
            }
          ]
        }
      ]
    });
    
    if (!order) {
      throw new AppError('Order not found', 404);
    }
    
    res.status(200).json({
      status: 'success',
      data: order
    });
  } catch (error) {
    if (error instanceof AppError) throw error;
    throw new AppError('Failed to fetch order', 500);
  }
};

export const createOrder = async (req: Request, res: Response) => {
  const transaction = await sequelize.transaction();
  
  try {
    const { customerId, items } = req.body;
    
    // Validate customer exists
    const customer = await Customer.findByPk(customerId);
    if (!customer) {
      throw new AppError('Customer not found', 404);
    }
    
    // Calculate total and validate stock
    let total = 0;
    const orderItems = [];
    
    for (const item of items) {
      const iceCream = await IceCream.findByPk(item.icecreamId);
      if (!iceCream) {
        throw new AppError(`Ice cream with id ${item.icecreamId} not found`, 404);
      }
      
      if (iceCream.stock < item.quantity) {
        throw new AppError(`Insufficient stock for ${iceCream.name}`, 400);
      }
      
      const itemTotal = iceCream.price * item.quantity;
      total += itemTotal;
      
      orderItems.push({
        icecreamId: item.icecreamId,
        quantity: item.quantity,
        price: iceCream.price
      });
      
      // Update stock
      await iceCream.update(
        { stock: iceCream.stock - item.quantity },
        { transaction }
      );
    }
    
    // Create order
    const order = await Order.create({
      customerId,
      total,
      orderDate: new Date()
    }, { transaction });
    
    // Create order items
    for (const item of orderItems) {
      await OrderItem.create({
        orderId: order.id,
        ...item
      }, { transaction });
    }
    
    await transaction.commit();
    
    // Fetch the complete order with relations
    const completeOrder = await Order.findByPk(order.id, {
      include: [
        {
          model: Customer,
          attributes: ['id', 'name', 'email', 'phone']
        },
        {
          model: OrderItem,
          include: [
            {
              model: IceCream,
              attributes: ['id', 'name', 'flavor']
            }
          ]
        }
      ]
    });
    
    res.status(201).json({
      status: 'success',
      data: completeOrder
    });
  } catch (error) {
    await transaction.rollback();
    if (error instanceof AppError) throw error;
    throw new AppError('Failed to create order', 500);
  }
};

export const getOrdersByCustomer = async (req: Request, res: Response) => {
  try {
    const { customerId } = req.params;
    
    const orders = await Order.findAll({
      where: { customerId },
      include: [
        {
          model: OrderItem,
          include: [
            {
              model: IceCream,
              attributes: ['id', 'name', 'flavor']
            }
          ]
        }
      ],
      order: [['orderDate', 'DESC']]
    });
    
    res.status(200).json({
      status: 'success',
      data: orders
    });
  } catch (error) {
    throw new AppError('Failed to fetch customer orders', 500);
  }
};

export const getOrderStats = async (req: Request, res: Response) => {
  try {
    const totalOrders = await Order.count();
    const totalRevenue = await Order.sum('total');
    const avgOrderValue = totalRevenue / totalOrders;
    
    res.status(200).json({
      status: 'success',
      data: {
        totalOrders,
        totalRevenue,
        avgOrderValue: avgOrderValue || 0
      }
    });
  } catch (error) {
    throw new AppError('Failed to fetch order stats', 500);
  }
}; 