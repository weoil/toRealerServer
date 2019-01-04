import * as Mongoose from 'mongoose';
import db from './db';

const fileScheme = new Mongoose.Schema({
  filename:String,
  md5:String,
  path:String,
  filesize:Number,
  ref_users:{
    type:Array,
    default:[]
  },
  upload_date:{
    type:Date,
    default:Date.now()
  },
  update_date:{
    type:Date,
    default:Date.now()
  }
});
export default db.model('file', fileScheme, 'file');
