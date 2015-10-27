# field-validator
flexible field validator


## Get Started

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
var validator = fv.gen(restrictions);

//Then perform validation
var result = validator.perform(data);

```

The result should contain standard errors if data is invalid. Or a empty object.
I suppose fv is the reference of field-validator. Actually, I like short name,don't you?


### Additional Usage

* Strict Model

By default the validator is relax model, it means these fields which are not defined in restriction object are not going to make validation errors.

The strict property could be configed when init validator like following
```
fv.gen(patterns,{ strict: true });
```

* Check all fields

By default the validation will be breaked when it meet a invalid field.  And there is another model that all fields will be verified no matter any invalid fields.  You can enable this model by following.

```
fv.gen(patterns,{ all: true });
```

And it is called allSettled model;


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
