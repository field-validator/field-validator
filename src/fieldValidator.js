(function(w) {

  function validator(pattern){
    this.pattern = pattern;
  }

  validator.prototype.perform = function(data){
    var pattern = this.pattern,
        errors = [];
    for(var key in pattern){
      var item = pattern[key];

      if(item.required&&(typeof data[key] === 'undefined')){
        errors.push([key,' ','is not provided'].join(''));
      }

    }
    return errors;
  }

  validator.prototype.compile = function(newPattern){
    this.pattern = newPattern;
  }


  var fv = {

    //Generate validator by pattern obj
    gen:function(pattern){
      return new validator(pattern);
    }
  };

  if(!w.fieldValidator){
    w.fieldValidator = fv;
    w.fv = w.fieldValidator;
  }

})(window);
