import ItemModel from '../database/item';
import { ObjectID } from 'mongodb';
import { ResultError } from '../utils/error';

interface Item{
  userid: String
  title: String
  tags: [any]
  files?: [any]
  type: String, // note photo video
  date: Date
  authority:String // public private
  mood:String
  introduction: String
  password?:String
  is_encrypt:Boolean
  status?:Number
  content?: String,
  cover?:String
}

export async function addItem(params:Item) {
  let res=await ItemModel.create(params);
  return res;
}

export async function findItem(itemid:string,userid:string="",pwd:string=""){
  let item:any=await ItemModel.findById(itemid);
  if(!item)throw new ResultError(1004,"该项目未找到");
  const uid:string=item.userid;
  const {is_encrypt,authority,password}=item;
  if(is_encrypt && password!==pwd){
    throw new ResultError(1005,"没有权限,需要密码!");
  }
  if(uid===userid){
    return item;
  }
  if(authority!=='public'){
    throw new ResultError(1004,"没有权限");
  }
  
  return item;
}
export async function updateItem(itemid:string,doc:any){
  let res=await ItemModel.updateOne({_id:itemid},doc);
  return res;
}
export async function deleteItem(itemid:string){
  let res=await ItemModel.deleteOne({
    _id:itemid
  });
  return res;
}