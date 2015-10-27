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
var validator = fv.gen(restrictions);

//验证数据对象
var result = validator.perform(data);

```
如果验证失败，result中会包含错误信息。


## 更多用法

## LICENSE
MIT
