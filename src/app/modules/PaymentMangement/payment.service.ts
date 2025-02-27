import { TProduct } from '../productManagement/product.interface';
import { Product } from '../productManagement/product.model';
import { TOrder, TOrderProduct } from './payment.interface';
import { Order } from './payment.model';


const paymentSuccessfullIntoDB = async (transactionId: string) => {
  const result = await Order.findOneAndUpdate(
    { transactionId: transactionId },
    { paidStatus: true },
    { new: true }
  ).populate('products'); // Populate products with full product details

  if (result?.products) {
    // Loop through each product in the order
    for (const product of result.products) {
      const findProduct = await Product.findById(product._id);
      if (findProduct && findProduct.numberOfProduct > 0) {
        // Update the stock count of the product
        const updatedBookCount = findProduct.numberOfProduct - 1;
        await Product.findByIdAndUpdate(
          { _id: findProduct._id },
          { numberOfBooks: updatedBookCount }
        );
      } else {
        console.log(`Product with ID: ${product._id} not found or out of stock`);
      }
    }
  }

  return result;
};


const getAdminOrderDataFromDB = async () => {
  // Step 1: Find all orders that are paid and contain products
  const orders = await Order.find({ paidStatus: true }).populate("products");

  // Step 2: Filter products by authorEmail
  const filteredOrders = [];

  for (const order of orders) {
    // Order থেকে product collection-এর ObjectId নিয়ে আসা
    const productIds = order.products.map((product: any) => product._id);

    // Product collection থেকে matching product খোঁজা
    const matchingProducts = await Product.find({
      _id: { $in: productIds },
      // authorEmail: email, // Match author email
    });

    if (matchingProducts.length > 0) {
      // Order-এর মধ্যে থাকা শুধুমাত্র matching products রাখবো
      order.products = matchingProducts;
      filteredOrders.push(order);
    }
  }
  return filteredOrders;
};
const getUserOrderDataFromDB = async (email: string) => {
  const result = await Order.find({
    paidStatus: true,
    'userInfo.email': email,
  }).populate({
    path: 'products',
  });
return result 
};
const changeOrderStatusIntoDB = async (id:string,orderStatus:string) => {
  const result = await Order.findByIdAndUpdate(id, {
    orderStatus: orderStatus,
  });
  return result;
};
const deleteOrderFromDB = async (id: string) => {
  const result = await Order.findByIdAndDelete(id);
  return result;
};
export const paymentService = {
  paymentSuccessfullIntoDB,
  getAdminOrderDataFromDB,
  getUserOrderDataFromDB,
  changeOrderStatusIntoDB,
  deleteOrderFromDB,
};
