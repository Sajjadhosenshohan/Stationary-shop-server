import express from 'express';
import config from '../config';
import SSLCommerzPayment from 'sslcommerz-lts';
import mongoose from 'mongoose';
import { TOrder } from '../modules/PaymentMangement/payment.interface';
import { Product } from '../modules/productManagement/product.model';
import { Order } from '../modules/PaymentMangement/payment.model';
import { TPaymentData } from './ssl_commerz.types';
const router = express.Router();
const port = config.PORT;

const store_id = config.store_id as string;
const store_passwd = config.store_pass as string;
const is_live = false; //true for live, false for sandbox

const tran_id = new mongoose.Types.ObjectId().toString();

router.post('/', async (req, res) => {
    const orderInfo = req.body as TOrder;
    const productIds = orderInfo?.products?.map((product) => product?._id);
  console.log(productIds,)
    // Fetch the products based on the product IDs
    const products = await Product.find({ _id: { $in: productIds } });
  
    // Extract product names and categories
    const productNames = products?.map((product) => product.title).join(', ');  // Joins all product names as a comma-separated string
    const productCategories = products?.map((product) => product.category).join(', ');  // Joins all categories as a comma-separated string
  
    const userInfo = orderInfo?.userInfo;
  
    const data:TPaymentData = {
      total_amount: String(orderInfo?.total_order_amount),
      currency: 'BDT',
      tran_id: tran_id, // use unique tran_id for each api call
      success_url: `http://localhost:5000/api/v1/payment/success/${tran_id}`,
      fail_url: `http://localhost:5000/api/v1/payment/failed/${tran_id}`,
      cancel_url: 'http://localhost:5000/api/v1/payment/cancel',
      ipn_url: 'http://localhost:5000/ipn',
      shipping_method: 'Courier',
      product_name: productNames,  // Set the joined product names
      product_category: productCategories,  // Set the joined product categories
      product_profile: 'general',  // SSLCommerz expects this to be a general profile
      cus_name: userInfo?.name,
      cus_email: userInfo?.email,
      cus_add1: 'Dhaka',
      cus_add2: 'Dhaka',
      cus_city: 'Dhaka',
      cus_state: 'Dhaka',
      cus_postcode: '1000',
      cus_country: 'Bangladesh',
      cus_phone: '01711111111',
      cus_fax: '01711111111',
      ship_name: 'Customer Name',
      ship_add1: 'Dhaka',
      ship_add2: 'Dhaka',
      ship_city: 'Dhaka',
      ship_state: 'Dhaka',
      ship_postcode: 1000,
      ship_country: 'Bangladesh',
    };

    console.log(data)
  const sslcz = new SSLCommerzPayment(store_id, store_passwd, is_live);

  try {
    const apiResponse: any = await sslcz.init(data);
    // Redirect the user to payment gateway
    const GatewayPageURL = apiResponse.GatewayPageURL;
    res.send({ url: GatewayPageURL });

    const finalOrder = {
      products: productIds,
      paidStatus: false,
      transactionId: tran_id,
      userInfo,
      total_order_amount : orderInfo?.total_order_amount,
        orderStatus: "pending",
    };
    const result = await Order.create(finalOrder);
  } catch (error) {
    console.log(error)
    res.status(500).send({ error: 'Something went wrong' });
  }
});
export const ssl_commerzRoutes = router;
