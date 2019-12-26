var fs = require('fs');
var path = require('path'); //解析需要遍历的文件夹
var dir = path.resolve('./');
const express = require('express')
const app = express()
let obj = {};

travel(dir, callback);
console.log(obj)
app.get('/getData', (req, res) => res.send(obj))
app.listen(3000, () => console.log('Example app listening on port 3000!'))

function travel(dir, callback) {
  fs.readdirSync(dir).forEach(function (file) {
    if (file !== "node_modules") {
      var pathname = path.join(dir, file);
      if (fs.statSync(pathname).isDirectory()) {
        travel(pathname, callback);
      } else {
        callback(pathname);
      }
    }
  });
}

function callback(pathname) {
  var content = fs.readFileSync(path.resolve(pathname), 'utf-8').match(/(?<=import[\s\S]*from ').*(?=')/mg)
  obj[pathname] = content;
}
// //调用文件遍历方法
// fileDisplay(filePath);
// //文件遍历方法
// function fileDisplay(filePath) {
//   //根据文件路径读取文件，返回文件列表
//   fs.readdirSync(filePath, function (err, files) {
//     if (err) {
//       console.warn(err)
//     } else {
//       //遍历读取到的文件列表
//       files.forEach(function (filename) {
//         //获取当前文件的绝对路径
//         var filedir = path.join(filePath, filename);
//         //根据文件路径获取文件信息，返回一个fs.Stats对象
//         fs.stat(filedir, function (eror, stats) {
//           if (eror) {
//             console.warn('获取文件stats失败');
//           } else {
//             var isFile = stats.isFile(); //是文件
//             var isDir = stats.isDirectory(); //是文件夹
//             if (isFile) {
//               console.log(filedir);
//               // 读取文件内容
//               var content = fs.readFile(filedir + '', 'utf-8', function (a, b, c) {
//                 b.match(/(?<=import[\s\S]*from ').*(?=')/mg)
//               });
//               console.log(content);
//             }
//             if (isDir) {
//               fileDisplay(filedir); //递归，如果是文件夹，就继续遍历该文件夹下面的文件
//             }
//           }
//         })
//       });
//     }
//   });
// }