# field-validator
flexible field validator


## Get Started

### Open sample

 ```
//Define patterns
var patterns = {
  name: {
    required: true
  },
  age: {
    required: true,
    type: 'string'
  }
};

//Generate validator by the patterns
var validator = fv.gen(patterns);

//Then perform validation
var result = validator.perform(data);

```

The result should contains standard errors if data is invalid. Or a empty object.
I suppose fv is the reference of field-validator. Actually, I like short name,don't you?


### Additional Usage

* Strict Model

By default the validator is not strict model, it means these passed fields will not make error occurs even if part of them are not defined in patterns.

The strict property could be passed when init validator follwing
```
fv.gen(patterns,{ strict: true });
```

* Check all fields

By default the validation will be breaked when it meet a invalid field.  And there is another model that all fields will be verified no matter any invalid fields.  You can enable this model by following.

```
fv.gen(patterns,{ all: true });
```

And it is called allSettled model;


### Local development

#### Build
```
npm run-script build
```

#### Unit test
```
npm test
```

## LICENSE

MIT
