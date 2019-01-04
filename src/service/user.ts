import userModel from "../database/user";
import * as jwt from "jsonwebtoken";
import { secret ,expire_time} from "../config";
import { ObjectId } from "mongodb";
export async function checkToken(token: string) {
  return jwt.verify(token, secret, {});
}
export async function createToken(userid: string, username: string) {
  return jwt.sign(
    {
      userid,
      username
    },
    secret,
    {
      expiresIn: expire_time+'ms'
    }
  );
}
export async function findUserForId(userid: string) {
  let res = await userModel.findById(userid);
  return res;
}

export async function findUserForUP(username: string, password: string) {
  const conditions = {
    username,
    password
  };
  let res = await userModel.findOne(conditions);
  return res;
}
export async function findUserForUserName(username: string) {
  const conditions = {
    username
  };
  let res = await userModel.findOne(conditions);
  return res;
}
export async function addUser(
  username: string,
  password: string,
  nickname: string,
  email?: string
) {
  const conditions = {
    username,
    password,
    nickname,
    email
  };
  let res = await userModel.create(conditions);
  return res;
}
export async function updateUserInfo(userid: string, params: object) {
  const _id=userid;
  let res = await userModel.updateOne({ _id: _id }, params);
  return res;
}