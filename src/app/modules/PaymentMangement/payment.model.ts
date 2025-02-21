import mongoose, { model } from 'mongoose';
import { TOrder } from './payment.interface';

// Product Schema
const ProductSchema = new mongoose.Schema({
  _id: {
    type: mongoose.Schema.Types.ObjectId,
    required: true,
  },
  title: {
    type: String,
    required: true,
  },
  numberOfBooks: {
    type: Number,
    required: true,
  },
  description: {
    type: String,
    required: true,
  },
  price: {
    type: String,
    required: true,
  },
  category: {
    type: String,
    required: true,
  },
  imageUrl: {
    type: String,
    required: true,
  },
  authorName: {
    type: String,
    required: true,
  },
  authorEmail: {
    type: String,
    required: true,
  },
  isAvailable: {
    type: Boolean,
    required: true,
    default: true,
  },
  isDeleted: {
    type: Boolean,
    required: true,
    default: false,
  },
  __v: {
    type: Number,
    select: false,
  },
});
// UserInfo Schema
const UserInfoSchema = new mongoose.Schema({
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
    enum: ['user', 'admin'], // Add roles as needed
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
const OrderSchema = new mongoose.Schema({
  product: {
    type: ProductSchema,
    required: true,
  },
  paidStatus: {
    type: Boolean,
    required: true,
  },
  transactionId: {
    type: String,
    required: true,
  },
  orderStatus: { type: String, default: 'pending' },
  userInfo: {
    type: UserInfoSchema,
    required: true,
  },
});

export const Order = model<TOrder>('Order', OrderSchema);
