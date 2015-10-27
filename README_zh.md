# field-validator

基于配置的字段验证

## 安装
未来会提供 npm 和 bower 的安装。

## 使用
 ```
//定义验证规则
var restrictions = {
  name: {
    required: true
  },
  age: {
    required: true,
    type: 'string'
  }
};

//生成验证对象
var validator = fv.newInstance(restrictions);

//验证数据对象
var result = validator.perform(data);

```
如果验证失败，result中会包含错误信息。

## 协作开发

### 构建
```
npm run-script build
```
### 测试报告
在浏览器中打开 test/report/jasmine_report.html 文件


### 在线的测试报告
测试脚本提交之后，可以在线查看测试报告。
(online report] (http://field-validator.github.io/test/report/jasmine_report.online.html)



## 更多用法

## LICENSE
MIT
