var COS = require('cos-nodejs-sdk-v5');
const cosConfig = require('./config')
const fs = require('fs');
const path = require('path');

var cos = new COS({
    SecretId: cosConfig.tencentCos.SecretId,
    SecretKey: cosConfig.tencentCos.SecretKey
});

/**
 * 遍历指定目录下的所有文件
 * @param {*} dir 
 */
const getAllFile = (dir) => {
  return new Promise((resolve, reject) => {
    let res = []
    function traverse (dir) {
        fs.readdirSync(dir).forEach((file) => {
            const pathname = path.join(dir, file)
            if (fs.statSync(pathname).isDirectory()) {
                traverse(pathname)
            } else {
                res.push(pathname)
            }
        })
    }
    traverse(dir);
    resolve(res);
  });
}

const putCos = (dir, files) => {
  for (let i = 0; i < files.length; i++) {
    const file = files[i]
    const target = `${file}`.replace(dir, '')

    cos.putObject({
      Bucket: cosConfig.tencentCos.Bucket, /* 必须 */
      Region: cosConfig.tencentCos.Region,    /* 必须 */
      Key: target,              /* 必须 */
      StorageClass: 'STANDARD',
      Body: fs.createReadStream(file), // 上传文件对象
      // onProgress: function(progressData) {
      //     console.log(JSON.stringify(progressData));
      // }
    }, function(err, data) {
      // console.log(err || data);
    });
  }
}

const dir = 'docs'
getAllFile(dir).then((files) => {
  putCos(dir, files);
})