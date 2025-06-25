import {
  Table,
  Column,
  Model,
  DataType,
  PrimaryKey,
  AllowNull,
  CreatedAt,
  UpdatedAt,
  ForeignKey,
  BelongsTo
} from 'sequelize-typescript';
import { Order } from './Order';
import { IceCream } from './IceCream';

@Table({
  tableName: 'order_items',
  timestamps: true
})
export class OrderItem extends Model {
  @Column({
    type: DataType.INTEGER,
    primaryKey: true,
    autoIncrement: true
  })
  id!: number;

  @ForeignKey(() => Order)
  @Column({
    type: DataType.INTEGER,
    allowNull: false
  })
  orderId!: number;

  @ForeignKey(() => IceCream)
  @Column({
    type: DataType.INTEGER,
    allowNull: false
  })
  icecreamId!: number;

  @Column({
    type: DataType.INTEGER,
    allowNull: false,
    defaultValue: 1
  })
  quantity!: number;

  @Column({
    type: DataType.DECIMAL(5, 2),
    allowNull: false
  })
  price!: number;

  @CreatedAt
  @Column({
    type: DataType.DATE,
    defaultValue: DataType.NOW,
  })
  createdAt!: Date;

  @UpdatedAt
  @Column({
    type: DataType.DATE,
    defaultValue: DataType.NOW,
  })
  updatedAt!: Date;

  @BelongsTo(() => Order)
  order!: Order;

  @BelongsTo(() => IceCream)
  icecream!: IceCream;
} 