import * as Router from "koa-router";
import * as it from "../controller/file";

const r = new Router();
r.prefix('/file');
r.post("/upload", it.uploadFile);
export default r;
