import mongoose from 'mongoose';
import { password, db_name } from './utils/env.js';

const db = async () => {
  try {
    // Mongroose Conection
    await mongoose.connect(
      `mongodb+srv://test:${password}@cluster0.jurxuwg.mongodb.net/${db_name}?retryWrites=true&w=majority`,
    );

    console.log('Conexion exitosa con DB');
  } catch (error) {
    console.error(error);
  }
};

export default db;
