import { IRouterContext } from 'koa-router';
import {
  exclude_authorization_list,
  username_regexp,
  password_regexp,
  email_regexp,
  nickname_regexp,
  expire_time
} from '../config';
import {
  findUserForUserName,
  findUserForId,
  updateUserInfo,
  addUser,
  createToken,
  checkToken,
  findUserForUP
} from '../service/user';
import { ResultError } from '../utils/error';
import * as MD5 from 'blueimp-md5';
import * as uuid from 'uuid/v1';
export async function auth(ctx: IRouterContext, next: () => Promise<any>) {
  const url = ctx.url;
  const flag = exclude_authorization_list.some(value => {
    if (value.test(url)) {
      return true;
    }
  });
  if (flag) {
    await next();
    return;
  }
  const headers = ctx.headers;
  const authorization = headers['authorization'];
  try {
    const userinfo = await checkToken(authorization);
    ctx.params.userinfo = userinfo;
    await next();
  } catch (e) {
    throw new ResultError(101, e.message);
  }
}

export async function login(ctx: IRouterContext, next: () => Promise<any>) {
  const { username, password } = ctx.request.body;
  try {
    let user: any = await findUserForUP(username, password);
    if (!user) {
      throw new Error('用户或密码错误!');
    }
    const { _id } = user;
    const token = await createToken(_id, username);
    ctx.body = {
      authorization: token,
      expire: expire_time + Date.now()
    };
  } catch (err) {
    throw new ResultError(1002, err.message);
  }
}

export async function register(ctx: IRouterContext, next: () => Promise<any>) {
  const body = ctx.request.body;
  const { username, password, email, nickname } = body;
  // const userid = MD5(uuid() + username, 'torealer08' + Math.random());
  if (!username_regexp.test(username)) {
    throw new ResultError(1001, '用户名输入错误');
  }
  let o_user: any = await findUserForUserName(username);
  if (o_user && o_user['username'] === username) {
    throw new ResultError(1001, '用户名已经存在!');
  }
  if (!password_regexp.test(password)) {
    throw new ResultError(1001, '密码输入错误');
  }
  if (email && !email_regexp.test(email)) {
    throw new ResultError(1001, '邮箱格式错误');
  }
  if (!nickname_regexp.test(nickname)) {
    throw new ResultError(1001, '用户昵称错误');
  }
  try {
    let res=await addUser(username, password, nickname, email);
    const userid=res._id;
    console.log(res,'new user')
    const token = await createToken(userid, username);
    ctx.body = {
      userid,
      authorization: token,
      expire: Date.now() + expire_time,
      username
    };
  } catch (err) {
    throw new ResultError(1001, '注册失败!');
  }
}
export async function updatePassWord(
  ctx: IRouterContext,
  next: () => Promise<any>
) {
  let { old_password, new_password, username } = ctx.request.body;
  let userid: string;
  if (
    !password_regexp.test(old_password) ||
    !password_regexp.test(new_password)
  ) {
    throw new ResultError(1003, '密码格式错误!');
  }
  if (old_password === new_password) {
    throw new ResultError(1003, '不可以于旧密码相同!');
  }
  if (!username && ctx.params.userinfo) {
    username = ctx.params.userinfo.username;
    userid = ctx.params.userinfo.userid;
  }
  let res: any = await findUserForUP(username, old_password);
  if (!res) {
    throw new ResultError(1003, '用户信息填写错误!');
  }
  if (!userid) {
    userid = res['_id'];
  }
  res = await updateUserInfo(userid, {
    password: new_password
  });
  console.log(res);
  if (res.n === 0) {
    throw new ResultError(1003, '用户信息更改失败!');
  }
  const token = await createToken(userid, username);
  ctx.body = {
    userid,
    authorization: token,
    username,
    expire: Date.now() + expire_time
  };
}
