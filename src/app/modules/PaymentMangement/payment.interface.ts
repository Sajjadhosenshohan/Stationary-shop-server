import { Types } from "mongoose";

// Types for Order Products
export type TOrderProduct = {
  _id: Types.ObjectId; // MongoDB ObjectId type
  title: string;
  numberOfProduct: number; // Assuming this represents the quantity of the product ordered
  description: string;
  price: number; // Price should be a number, not a string
  category: string;
  imageUrl: string;
  authorName: string;
  authorEmail: string;
  isAvailable: boolean;
  isDeleted: boolean;
  availability: "in-stock"|"out-of-stock";
  __v?: number; // Optional since it might not always be needed
};

// Types for User Info
export type TUserInfo = {
  name: string;
  email: string;
  role: "user" | "admin"; // Using a union type for predefined roles
  iat: number; // Issued at (timestamp)
  exp: number; // Expiry timestamp
};

// Types for Order
export type TOrder = {
  products: TOrderProduct[] | Types.ObjectId[]; // Array of product ObjectId references
  paidStatus: boolean;
  total_order_amount: number; // Total order amount as a number
  transactionId: string;
  orderStatus?: "pending"| "accepted"| "shipping" | "canceled" | "delivered"; // Optional status, default to 'pending' in the schema
  userInfo: TUserInfo;
  isDeleted: boolean
};
