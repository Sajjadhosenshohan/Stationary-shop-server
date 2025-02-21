import { Types } from "mongoose";

// Types
export type TOrderProduct = {
  _id: Types.ObjectId; // MongoDB ObjectId as a string
  title: string;
  numberOfProduct: number;
  description: string;
  price: number; // Price as a string (consider converting to number if necessary)
  category: string;
  imageUrl: string;
  authorName: string;
  authorEmail: string;
  isAvailable: boolean;
  isDeleted: boolean;
  __v: number;
}
export type TUserInfo = {
  name: string;
  email: string;
  role: string; // e.g., 'user', 'admin', etc.
  iat: number; // Issued at (timestamp)
  exp: number; // Expiry timestamp
}

export type TOrder = {
  product: TOrderProduct[];
  paidStatus: boolean;
  total_order_amount: number;
  transactionId: string;
  orderStatus?: string;
  userInfo: TUserInfo;
}
