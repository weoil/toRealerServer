import * as path from 'path';
import * as Koa from 'koa2';
import * as KoaBody from 'koa-body';
import router from './routers/index';
import { File } from 'formidable';

const app = new Koa();
app.use(KoaBody({
  multipart:true,
  stict:true,
  formidable:{
    uploadDir:path.resolve(__dirname,'../file/'),
    keepExtensions:true,
    maxFieldsSize:1024*1024*1024,
    hash:"md5",
    onFileBegin:(name:string,file:File)=>{
    }
  }
}));
app.use(router.routes(), router.allowedMethods());
app.use(async (ctx: any, next: Function) => {
  await next();
});
app.listen(3000);
