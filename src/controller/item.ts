import { ResultError } from '../utils/error';
import * as Service from '../service/item';
import { IRouterContext } from 'koa-router';

export async function addItem(ctx: IRouterContext, next: () => Promise<any>) {
  const body = ctx.request.body;
  const { userid } = ctx.params.userinfo;
  let {
    itemid,
    title,
    tags = [],
    files = [],
    introduction = '',
    content = '',
    status = 1,
    is_encrypt = false,
    password = '',
    mood = 'happy',
    authority = 'public',
    date = Date.now(),
    type,
    cover = ''
  } = body;
  if (!title) {
    throw new ResultError(1011, '请填写标题');
  }
  if (!mood) {
    throw new ResultError(1011, '心情选择错误');
  }
  if (!type) {
    throw new ResultError(1011, '类型错误');
  }
  if (!cover && files.length > 0) {
    files.some((f: any) => {
      if (f.type === 'image') {
        cover = f.url;
        return true;
      }
    });
  }
  const item = {
    userid,
    title,
    tags,
    files,
    introduction,
    content,
    status,
    is_encrypt,
    password,
    type,
    cover,
    mood,
    authority,
    date
  };
  if (itemid) {
    try {
      let res = await Service.updateItem(itemid, item);
      if (res.n < 1) {
        throw new Error();
      }
      ctx.body={
        itemid:itemid
      }
      return;
    } catch (err) {
      throw new ResultError(1013, '更新失败:'+err.message);
    }
  }
  let res = await Service.addItem(item);
  if (!res) {
    throw new ResultError(1012, '创建失败');
  }
  itemid = res._id;
  ctx.body = {
    itemid,
    title
  };
}
export async function removeItem(
  ctx: IRouterContext,
  next: () => Promise<any>
) {
  const { itemid, password } = ctx.request.query;
  const { userid } = ctx.params.userinfo;
  const item = await Service.findItem(itemid, userid, password);
  if (item['userid'] !== userid) {
    throw new ResultError(1013, '没有权限删除该项目!');
  }
  if (item['status'] === 4 || item['status'] === 1) {
    const res = await Service.deleteItem(itemid);
    if (res.n < 1) {
      throw new ResultError(1013, '删除失败!');
    }
    ctx.body = {
      itemid
    };
    return;
  }
  let res = await Service.updateItem(itemid, { status: 4 });
  ctx.body = {
    itemid
  };
}
export async function getItem(ctx: IRouterContext, next: () => Promise<any>) {
  const { itemid, password } = ctx.request.query;
  const { userid } = ctx.params.userinfo;
  const item = await Service.findItem(itemid, userid, password);
  ctx.body = item;
}
