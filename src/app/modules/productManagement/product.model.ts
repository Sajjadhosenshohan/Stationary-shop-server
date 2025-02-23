import mongoose, { model, Query, Schema } from 'mongoose';
import { TOrderProduct } from '../PaymentMangement/payment.interface';

const ProductSchema = new Schema<TOrderProduct>({

  title: { type: String, required: true },
  numberOfProduct: { type: Number, required: true },
  description: { type: String, required: true },
  price: { type: Number, required: true },
  category: { type: String, required: true },
  imageUrl: { type: String, required: true },
  authorName: { type: String, required: true },
  authorEmail: { type: String, required: true },
  isAvailable: { type: Boolean, required: true },
  availability: {
    type: String,
    enum: ['in-stock', 'out-of-stock'],
    default: "in-stock",
  },
  isDeleted: { type: Boolean, default: false },
},{
  timestamps: true
});

// Query middleware to filter out products marked as deleted
ProductSchema.pre<Query<TOrderProduct, TOrderProduct>>(
  /^find/,
  function (next) {
    this.find({ isDeleted: { $ne: true } });
    next();
  },
);
export const Product = model<TOrderProduct>('Product', ProductSchema);
