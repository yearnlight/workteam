let fs = require('fs');
let marked = require('marked');
// 读取第3步创建的模板html文件
let headFile = fs.readFileSync('doc.html');// 读取将要被转换的md文件

console.log('----正在转换...');

let mdStr = mdFile.toString()// 调用marked将md文件转换成html
let mdToHtmlStr = marked(mdStr);
// 将md转换成html字符串替换到html模板文件中replace_area的位置
var content = headFile.toString().replace('replace_area',mdToHtmlStr);

console.log("准备写入文件");

fs.writeFile('output.doc', content, function(err) {
   if (err) {
       return console.error(err);
   }
   console.log("数据写入成功！");
});
console.log(content);