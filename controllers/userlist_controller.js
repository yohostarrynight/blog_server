const UserList_Col = require('../models/userlist');
const jwt = require('jsonwebtoken');

const login = async (ctx,next) => {
  const req = ctx.request.body;
  const res = await UserList_Col.findOne({
    username: req.username,
    password: req.password
  });
  if(res) {
    const token  = jwt.sign({
      data: res.username
    },'',{ expiresIn: '2h' });
    ctx.body = {
      code: 0,
      message: 'login successfully',
      data: {
	token
      }
    }
  } else {
    ctx.body = {
      code: 1,
      message: '账号或密码错误'
    }
  }
}

const getuserinfo = async (ctx,next) => {
  const req = ctx.request.query;
  if(req.searchkey.length === 0) {
    const rescount = await UserList_Col.countDocuments();
    const res = await UserList_Col.find({},{password: 0}).limit(parseInt(req.limit)).skip(parseInt(req.offset));
  }
  else {
    const evalusername = eval('/' + req.searchkey + '/');
    const evalphone = eval('/' + req.searchkey + '/');
    const rescount = await UserList_Col.find({$or: [
      {username: {$regex: evalusername}},
      {phone: {$regex: evalphone}}
    ]}).countDocuments();
    const res = await UserList_Col.find({$or: [
      {username: {$regex: evalusername}},
      {phone: {$regex: evalphone}}
    ]},{password: 0}).limit(parseInt(req.limit)).skip(parseInt(req.offset));
  }
  ctx.body = {
    code: 0,
    data: {
      res,
      rescount
    }
  }
}

const deleteuserinfo = async (ctx,next) => {
  const req = ctx.request.body;
  const res = await UserList_Col.deleteOne({_id: req.id});
  ctx.body = {
    code: 0,
    message: '删除成功'
  }
}

const edituserinfo = async (ctx,next) => {
  const req = ctx.request.body;
  const res = await UserList_Col.find({$and: [{_id: {$ne: req.id}},{$or: [
    { username: req.username },
    { phone: req.phone },
    { email: req.email }
  ]}]});
  if(res.length !== 0) {
    ctx.body = {
      code: 1,
      message: '用户名,电话或邮箱已存在'
    }
  } else {
    const update = await UserList_Col.updateOne({_id: req.id},{ 
      username: req.username,
      phone: req.phone,
      email: req.email
    })
    ctx.body = {
      code: 0,
      message: '修改成功'
    }
  }
}

const register = async (ctx,next) => {
  const req = ctx.request.body;
  const resusername = await UserList_Col.findOne({
    username: req.username
  })
  const res = await UserList_Col.find({$or: [
    { username: req.username },
    { phone: req.phone },
    { email: req.email }
  ]})
  if(res.length !== 0) {
    ctx.body = {
      code: 1,
      message: '该用户已存在'
    }
  } else {
    const add = await UserList_Col.create({
      username: req.username,
      password: req.password,
      email: req.email,
      phone: req.phone
    })
    ctx.body = {
      code: 0,
      message: '添加成功'
    }
  }
}

module.exports = {
  login,
  getuserinfo,
  register,
  deleteuserinfo,
  edituserinfo
}

