import mongoose from 'mongoose';
import app from './app';
import dotenv from 'dotenv';

dotenv.config();

const port = process.env.PORT;
const uri = process.env.DB_URI || '';

const main = async () => {
  try {
    await mongoose.connect(uri);
    app.listen(port, () => {
      console.log('[server] running on http://localhost:8080/');
    });
  } catch (error) {
    console.error(error);
  }
};

main();
