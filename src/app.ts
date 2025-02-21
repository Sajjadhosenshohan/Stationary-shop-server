import express, { Application, Request, Response } from 'express';
import cors from 'cors';
import notFound from './app/middlewares/notFound';
import cookieParser from 'cookie-parser';
import bodyParser from 'body-parser';
import SSLCommerzPayment from 'sslcommerz-lts';
import config from './app/config';
import { Product } from './app/modules/productManagement/product.model';
import mongoose from 'mongoose';
import { paymentRoutes } from './app/modules/PaymentMangement/payment.route';
import { Order } from './app/modules/PaymentMangement/payment.model';
import globalErrorHandler from './app/middlewares/globalErrorHandler';
import router from './app/routes';

const store_id = config.store_id as string;
const store_passwd = config.store_pass as string;
const is_live = false; //true for live, false for sandbox

const app: Application = express();

// Middleware
app.use(express.json());
app.use(cookieParser());
app.use(
  cors({
    origin: ["https://bookbazzar-online-ph-a4.vercel.app","http://localhost:5173","http://localhost:5174"],
    credentials: true,
  })
);
app.use(bodyParser.json());


// app.use('/order', orderRoutes);

// Test route
const test = async (req: Request, res: Response) => {
  res.send('BookBazaar server is running...');
};

app.get('/', test);
app.use('/api/v1', router);
app.use('/payment', paymentRoutes);

const tran_id = new mongoose.Types.ObjectId().toString();
app.post('/order', async (req, res) => {
  const orderInfo = req.body;
  //   console.log(orderInfo);
  const product = await Product.findById({ _id: orderInfo.productId });
    // console.log(product);

  const userInfo = orderInfo.userInfo;
  const data = {
    total_amount: product?.price as string,
    currency: 'BDT',
    tran_id: tran_id, // use unique tran_id for each api call
    success_url: `https://bookbazzar-server-ph-a4.vercel.app/payment/success/${tran_id}`,
    fail_url: `https://bookbazzar-server-ph-a4.vercel.app/payment/failed/${tran_id}`,
    cancel_url: 'http://localhost:3030/cancel',
    ipn_url: 'http://localhost:3030/ipn',
    shipping_method: 'Courier',
    product_name: 'Computer.',
    product_category: 'Books',
    product_profile: orderInfo.productId,
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

  const sslcz = new SSLCommerzPayment(store_id, store_passwd, is_live);

  try {
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    const apiResponse: any = await sslcz.init(data); // Use await here
    // Redirect the user to payment gateway
    const GatewayPageURL = apiResponse.GatewayPageURL;
    res.send({ url: GatewayPageURL });

    const finalOrder = {
      product,
      paidStatus: false,
      transactionId: tran_id,
      userInfo,
    };
    // console.log('Final Order : ', finalOrder);
    await Order.create(finalOrder); // Use await here
    // console.log('Order Saved: ', result);

    // console.log('Redirecting to: ', GatewayPageURL);
  // eslint-disable-next-line no-unused-vars, @typescript-eslint/no-unused-vars
  } catch (error) {
    // console.error('Error occurred:', error);
    res.status(500).send({ error: 'Something went wrong' });
  }
});

// Error handlers
app.use(globalErrorHandler);
app.use(notFound);

export default app;
