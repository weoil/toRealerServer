import * as Router from 'koa-router';
import user from './user';
import item from './item';
import file from './file';
import { Result } from '../../typing/real';
import { ResultError } from '../utils/error';

const router = new Router();
router.use(async (ctx, next) => {
  const result: Result = {
    code: 200,
    message: 'ok',
    data: null
  };
  try{
    await next();
    result.data=ctx.body;
  }catch(e){
    const err:ResultError=e;
    result.code=err.code;
    result.message=err.message || 'fail';
  }
  ctx.body=result;
});
router.use(user.routes(), user.allowedMethods());
router.use(item.routes(), item.allowedMethods());
router.use(file.routes(), file.allowedMethods());
export default router;
