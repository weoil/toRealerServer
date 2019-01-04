import * as Mongoose from 'mongoose';
import db from './db';

const userScheme = new Mongoose.Schema({
  username: {
    type: String,
    unique: true
  },
  password: String,
  avatar:String,
  nickname:String,
  email: String,
  status:{
    type:Number,
    default:1 // 1:正常用户 2:已删除用户 3:待审核用户
  }
});
export default db.model('user', userScheme, 'user');
