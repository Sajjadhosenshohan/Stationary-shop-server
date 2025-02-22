import mongoose, { model } from 'mongoose';
import { TOrder, TUserInfo } from './payment.interface';
import { boolean } from 'zod';

// UserInfo Schema
const UserInfoSchema = new mongoose.Schema<TUserInfo>({
  name: {
    type: String,
    required: true,
  },
  email: {
    type: String,
    required: true,
  },
  role: {
    type: String,
    required: true,
    enum: ['user', 'admin'],
  },
  iat: {
    type: Number,
    required: true,
  },
  exp: {
    type: Number,
    required: true,
  },
});

// Order Schema
const OrderSchema = new mongoose.Schema<TOrder>({
  products: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Product', // Reference the Product model
      required: true,
    },
  ],
  paidStatus: {
    type: Boolean,
    required: true,
  },
  total_order_amount: {
    type: Number,
    required: true,
  },

  transactionId: {
    type: String,
    required: true,
  },
  isDeleted: {
    type: Boolean,
    default: true,
  },
  orderStatus: {
    type: String,
    enum: ['pending', 'accepted', 'shipping', 'canceled', 'delivered'],
    default: 'pending',
  },
  userInfo: {
    type: UserInfoSchema,
    required: true,
  },
});

export const Order = model<TOrder>('Order', OrderSchema);
