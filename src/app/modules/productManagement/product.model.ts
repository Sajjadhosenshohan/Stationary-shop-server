import { model, Query, Schema } from 'mongoose';
import { TProduct } from './product.interface';

const ProductSchema = new Schema<TProduct>({
  title: { type: String, required: true },
  numberOfBooks: { type: Number, required: true },
  description: { type: String, required: true },
  price: { type: String, required: true },
  category: { type: String, required: true },
  imageUrl: { type: String, required: true },
  authorName: { type: String, required: true },
  authorEmail: { type: String, required: true },
  isAvailable: { type: Boolean, required: true },
  isDeleted: { type: Boolean, default: false },
});

// Query middleware to filter out products marked as deleted
ProductSchema.pre<Query<TProduct, TProduct>>(/^find/, function (next) {
  this.find({ isDeleted: { $ne: true } });
  next();
});
export const Product = model<TProduct>('Product', ProductSchema);
