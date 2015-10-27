# field-validator
config-based field validator

[中文文档] (https://github.com/field-validator/field-validator/blob/master/doc_zh.md)

### Open sample

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

The result should contain standard errors if data is invalid. Or a empty object.
I suppose fv is the reference of field-validator. Actually, I like short name,don't you?

### Contributing

It's welcome every one who are intersted this to take part in this work. You can fork this repo and finish development on it. And each pull request will be handled as soon as possible.

#### Build
```
npm run-script build
```

#### Unit test
Open [jasmine_report.html] ()

## LICENSE

MIT
