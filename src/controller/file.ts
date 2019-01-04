import { ResultError } from '../utils/error';
import * as Service from '../service/file';
import { IRouterContext } from 'koa-router';

export async function uploadFile(ctx: IRouterContext, next: () => Promise<any>){
  console.log(ctx.request.files,'files')
  ctx.body=ctx.request.body;
}