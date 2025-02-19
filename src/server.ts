import app from './app';
import { Server } from 'http';
import mongoose from 'mongoose';
import config from './app/config';
let server: Server;

async function main() {
  try {
    await mongoose.connect(config.DATABASE_URL as string);
    // Server Connection
    server = app.listen(config.PORT, () => {
      console.log(`✅ Stationary shop listening on PORT ${config.PORT}`);
    });
  } catch (error) {
    console.log(error);
  }
}
main();

process.on('unhandledRejection', () => {
  console.log('😈 unhandledRejection is Detected Shutting Down... ');
  if (server) {
    server.close(() => {
      process.exit(1);
    });
  }
  process.exit(1);
});
process.on('uncaughtException', () => {
  console.log('😈 uncaughtException is Detected Shutting Down... ');
  process.exit(1);
});
