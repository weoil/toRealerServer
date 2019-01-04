declare module "koa" {
  interface Request extends BaseRequest {
    body: any;
    files:any;
  }
}
export interface Result {
  code: Number;
  message: String;
  data: Object;
}
export interface User {
  userid:string;
  username:string;
  password:string;
  avatar:string,
  nickname:string,
  email: string
}