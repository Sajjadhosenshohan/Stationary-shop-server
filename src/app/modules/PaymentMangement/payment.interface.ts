// Types
interface Product {
  _id: string; // MongoDB ObjectId as a string
  title: string;
  numberOfBooks: number;
  description: string;
  price: string; // Price as a string (consider converting to number if necessary)
  category: string;
  imageUrl: string;
  authorName: string;
  authorEmail: string;
  isAvailable: boolean;
  isDeleted: boolean;
  __v: number;
}
interface UserInfo {
  name: string;
  email: string;
  role: string; // e.g., 'user', 'admin', etc.
  iat: number; // Issued at (timestamp)
  exp: number; // Expiry timestamp
}

export interface TOrder {
  product: Product;
  paidStatus: boolean;
  transactionId: string;
  orderStatus?: string;
  userInfo: UserInfo;
}
