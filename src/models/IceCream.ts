import {
  Table,
  Column,
  Model,
  DataType,
  PrimaryKey,
  AllowNull,
  CreatedAt,
  UpdatedAt,
  HasMany
} from 'sequelize-typescript';
import { OrderItem } from './OrderItem';

@Table({
  tableName: 'icecreams',
  timestamps: true
})
export class IceCream extends Model {
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
    allowNull: false
  })
  flavor!: string;

  @Column({
    type: DataType.DECIMAL(5, 2),
    allowNull: false
  })
  price!: number;

  @Column({
    type: DataType.INTEGER,
    allowNull: false,
    defaultValue: 0
  })
  stock!: number;

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

  @HasMany(() => OrderItem)
  orderItems!: OrderItem[];
} 