import {
  Table,
  Column,
  Model,
  DataType,
  PrimaryKey,
  AllowNull,
  CreatedAt,
  UpdatedAt,
  HasMany,
  Unique
} from 'sequelize-typescript';
import { Order } from './Order';

@Table({
  tableName: 'customers',
  timestamps: true
})
export class Customer extends Model {
  @Column({
    type: DataType.INTEGER,
    primaryKey: true,
    autoIncrement: true
  })
  id!: number;

  @Column({
    type: DataType.STRING(100),
    allowNull: false
  })
  name!: string;

  @Column({
    type: DataType.STRING(100),
    allowNull: false,
    unique: true
  })
  email!: string;

  @Column({
    type: DataType.STRING(20),
    allowNull: true
  })
  phone!: string;

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

  @HasMany(() => Order)
  orders!: Order[];
} 