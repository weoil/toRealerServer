export const database_url = 'mongodb://localhost:27017/torealer';
export const secret = 'torealersecretweoiljinke$secret031';
export const expire_time=1000*60*60*2;
export const exclude_authorization_list:Array<RegExp>=[
  /^\/login/, // 登陆
  /^\/extend/, // 续期
  /^\/register/, // 注册,
  /^\/repassword/ // 更改密码
]
export default {
  database_url: database_url
};

export const password_regexp=/^.*(?=.{6,})(?=.*\d)(?=.*[A-Z])(?=.*[a-z])(?=.*[!@#$%^&*?_]).*$/;
export const username_regexp=/^[a-zA-Z0-9_-]{4,16}$/;
export const email_regexp=/^([A-Za-z0-9_\-\.])+\@([A-Za-z0-9_\-\.])+\.([A-Za-z]{2,4})$/;
export const nickname_regexp=/^.{1,10}$/;