const File_Col = require('../models/filelist');
const OSS = require('ali-oss');

const client = new OSS({
  region: 'oss-cn-hangzhou',
  accessKeyId: '',
  accessKeySecret: '',
  bucket: 'yohostarrynight'
});

const uploadSDK = async (ctx,next) => {
  const fileName = ctx.request.files.file.name;
  const suffix = fileName.split('.')[1];
  const localFile = ctx.request.files.file.path;
  try {
    var result = await File_Col.create({
      name: fileName
    })
    const { _id } = result;
    var res = await client.put(_id + '.' + suffix,localFile);
  }
  catch (e) {
    console.log(e);
  }
  ctx.body = {
    code: 0,
    data: {
      res
    }
  }
}

module.exports = {
  uploadSDK
}
