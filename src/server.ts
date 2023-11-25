import mongoose from 'mongoose';
import app from './app';
import { DB_URI, PORT } from './app/config';

const main = async () => {
  try {
    await mongoose.connect(DB_URI);
    app.listen(PORT, () => {
      console.log('[server] running on http://localhost:8080/');
    });
  } catch (error) {
    console.error(error);
  }
};

main();
