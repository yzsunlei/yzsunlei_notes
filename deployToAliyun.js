const OSS = require('ali-oss')
const ossConfig = require('./config')
const fs = require('fs');
const path = require('path');

let client = new OSS({
  region: ossConfig.alioss.region,
  accessKeyId: ossConfig.alioss.accessKeyId,
  accessKeySecret: ossConfig.alioss.accessKeySecret,
  bucket: ossConfig.alioss.bucket,
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

/**
 * 上传指定目录下的所有文件
 * @param {*} dir 
 * @param {*} files 
 */
const putOss = (dir, files) => {
  for (let i = 0; i < files.length; i++) {
    const file = files[i]
    const target = `${file}`.replace(dir, '')
    // console.log(file)
    client.put(target, file).then(res => {
      // console.log(res);
    }).catch(err => {
      console.error(err)
    })
  }
}

const dir = 'docs'
getAllFile(dir).then((files) => {
  putOss(dir, files);
})