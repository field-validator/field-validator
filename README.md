# field-validator
config-based field validator

[中文文档] (https://github.com/field-validator/field-validator/blob/master/README_zh.md)

### Get
```
bower install field-validator
```

### Open sample

fv is the alias of field-validator that you can use it like $ for jquery.

 ```
//Define restrictions
var restrictions = {
  name: {
    required: true
  },
  age: {
    required: true,
    type: 'string'
  }
};

//Generate validator by the restrictions
var validator = fv.newInstance(restrictions);

//Then perform validation
var result = validator.perform(data);

```

The result contains standard errors if data is invalid. And if you only need to know if validation is passed or not:
```
validator.getState();
```

### Contributing

#### Build
```
npm run-script build
```

#### Unit test

Open test/report/jasmine_report.html in your browser

There is an [online report] (http://field-validator.github.io/test/report/jasmine_report.online.html).


## LICENSE

MIT
