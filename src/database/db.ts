import * as Mongoose from 'mongoose';
import { database_url } from '../config';
const DB = Mongoose.createConnection(database_url, {
  useNewUrlParser: true
});
export default DB;
