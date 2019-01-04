import * as Mongoose from 'mongoose';
import db from './db';

const itemScheme = new Mongoose.Schema({
  userid: {
    type: String,
    required: true
  },
  title: String,
  tags: [Mongoose.Schema.Types.Mixed],
  files: {
    type:[Mongoose.Schema.Types.Mixed],
    default:[]
  },
  type: String,  // note photo video
  date: {
    type: Date,
    default: Date.now()
  },
  authority:String, // public private
  mood:String,
  introduction: String,
  password:{ // 加密
    type:String,
    default:""
  },
  is_encrypt:Boolean,
  status:{
    type:Number,
    default:1 // 1:草稿 2:正常 3:隐藏 4:删除
  },
  content: String
});
export default db.model('item', itemScheme, 'item');
