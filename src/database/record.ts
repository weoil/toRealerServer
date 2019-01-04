import * as Mongoose from 'mongoose';
import db from './db';

const recordScheme = new Mongoose.Schema({
  userid: {
    type: String,
    required: true
  },
  tags: {
    type: Number,
    default: []
  },
  browse_list: {
    type: Array,
    default: []
  },
  star_list: {
    type: Array,
    default: []
  }
});
export default db.model('record', recordScheme, 'record');
