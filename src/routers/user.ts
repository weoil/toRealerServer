import * as Router from "koa-router";
import * as uc from "../controller/user";

const r = new Router();
r.all("auth", "*", uc.auth);
r.post("/login", uc.login);
r.post("/register", uc.register);
r.post('/repassword',uc.updatePassWord);
r.get("/hello", async (ctx, next) => {
  ctx.body = ctx.params.userinfo;
});
export default r;
