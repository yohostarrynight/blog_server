const ArticleList_Col = require('../models/articlelist');

const getarticleinfo = async (ctx,next) => {
  const { limit,offset,categories } = ctx.request.query;
  if(parseInt(categories) === 999) {
    const rescount = await ArticleList_Col.countDocuments();
    const res = await ArticleList_Col.find({},{context: 0}).limit(parseInt(limit)).skip(parseInt(offset)).sort({createtime: -1});
  }
  else {
    const rescount = await ArticleList_Col.find({category: categories}).countDocuments();
    const res = await ArticleList_Col.find({category: categories},{context: 0}).limit(parseInt(limit)).skip(parseInt(offset)).sort({createtime: -1});
  }
  ctx.body = {
    code: 0,
    data: {
      res,
      rescount,
      count: Math.ceil(rescount / limit)
    }
  }
};

const getdetailarticle = async (ctx,next) => {
  const { id } = ctx.request.query;
  const res = await ArticleList_Col.findOne({
    _id: id
  });
  ctx.body = {
    code: 0,
    data: {
      res
    }
  }
};

const insertarticle = async (ctx,next) => {
  const { imageUrl,title,category,context,createtime } = ctx.request.body;
  const res = await ArticleList_Col.create({
    imgurl: imageUrl,
    title: title,
    category: category,
    context: context,
    createtime: new Date(createtime)
  });
  ctx.body = {
    code: 0,
    message: '添加成功'
  }
};

const deletearticle = async (ctx,next) => {
  const { id } = ctx.request.body;
  const res = await ArticleList_Col.deleteOne({_id: id });
  ctx.body = {
    code: 0,
    message: '删除成功'
  }
}

const editarticle = async (ctx,next) => {
  const { id,imageUrl,title,category,context,createtime } = ctx.request.body;
  const res = await ArticleList_Col.updateOne({_id: id},{
    imgurl: imageUrl,
    title: title,
    category: category,
    context: context,
    createtime: new Date(createtime)
  })
  ctx.body = {
    code: 0,
    message: '修改成功'
  }
}

module.exports = {
  getarticleinfo,
  getdetailarticle,
  insertarticle,
  deletearticle,
  editarticle
}

