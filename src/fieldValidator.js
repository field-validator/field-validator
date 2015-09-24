(function(w) {

  function validator(pattern){
    this.pattern = pattern;
  }

  validator.prototype.perform = function(data){
    var pattern = this.pattern,
        errors = [];

    //Passed in data precheck, it should be an object
    if(!data||(typeof data !== 'object')){
      throw 'Passed in data is null,or undefined,or not an object';
    }

    for(var key in pattern){
      var item = pattern[key];

      if(item.required&&(typeof data[key] === 'undefined')){
        errors.push([key,' is not provided'].join(''));
        continue;
      }

      if(item.type&&(typeof data[key] !== item.type)){
        errors.push([key,' is not ',item.type].join(''));
        continue;
      }

    }
    return {errors:errors};
  }

  validator.prototype.compile = function(newPattern){
    this.pattern = newPattern;
  }

  var fv = {

    //Generate validator by pattern obj
    gen:function(pattern){
      if(!pattern||(typeof pattern !== 'object')){
        throw 'Passed in pattern should be an object';
      }
      return new validator(pattern);
    }
  };

  if(!w.fieldValidator){
    w.fieldValidator = fv;
    w.fv = w.fieldValidator;
  }

})(window);
