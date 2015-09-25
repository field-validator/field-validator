# field-validator
flexible field validator


## Get Started

### Open sample

 ```
//Define a pattern
var pattern = {
  name: {
    required: true
  },
  age: {
    required: true,
    type: 'string'
  }
};

//Generate validator by the pattern
var validator = fv.gen(pattern);

//Then perform validation
var result = validator.perform(data);

```

The result should contain standard errors if data is invalid. Or a empty object.
I suppose fv is the reference of field-validator. Actually, I like short name,don't you?

## LICENSE

MIT
