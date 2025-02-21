import { Types } from "mongoose";

export interface TProduct {
  _id: Types.ObjectId;
  title: string;
  numberOfBooks: number;
  description: string;
  price: number;
  category: string;
  imageUrl: string;
  authorName: string;
  authorEmail: string;
  isAvailable: boolean;
  isDeleted?: boolean;
}