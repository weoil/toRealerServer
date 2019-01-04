import * as Router from "koa-router";
import * as it from "../controller/item";

const r = new Router();
r.prefix('/item');
r.post("/", it.addItem);
r.del("/",it.removeItem);
r.get("/",it.getItem);
export default r;
