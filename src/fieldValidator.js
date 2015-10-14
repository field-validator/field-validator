(function(w) {

  function validator(pattern, options) {
    this.pattern = pattern;
    this.patternItems = Object.getOwnPropertyNames(pattern);
    this.strict = false;
    this.all = false;
    this.options = options;
    this.init();
  }

  validator.prototype.init = function() {
    var v = this,
      options = v.options;
    if (options) {
      v.strict = v.options.strict;
      v.all = v.options.all;
    }

  }

  validator.prototype.perform = function(data) {
    var v = this,
      pattern = this.pattern,
      errors = [],
      dataFields = Object.getOwnPropertyNames(data),
      patternItems = v.patternItems;

    //Passed in data precheck, it should be an object
    if (!data || (typeof data !== 'object')) {
      throw 'Passed in data is null,or undefined,or not an object';
    }

    if (v.strict && (dataFields.length > patternItems.length)) {
      throw 'Passed in data has fields which are not supported';
    }

    //Check if corrsponding fields meet the constraint
    for (var key in pattern) {
      var item = pattern[key];

      //Check required constraint
      if (item.required && (typeof data[key] === 'undefined')) {
        errors.push([key, ' is not provided'].join(''));
        if (v.all) {
          continue;
        } else {
          break;
        }
      }

      //Check type,length,range constraint
      if (item.type && (typeof data[key] !== item.type)) {
        errors.push([key, ' is not ', item.type].join(''));
        if (v.all) {
          continue;
        } else {
          break;
        }
      }
    }

    if (v.strict) {
      //Check if there are fields which are not supported
      for (var dk in data) {
        if (!pattern.hasOwnProperty(dk)) {
          errors.push([dk, ' is not supported']);
          if (v.all) {
            continue;
          } else {
            break;
          }
        }
      }
    }

    return {
      errors: errors
    };
  }

  validator.prototype.compile = function(newPattern) {
    this.pattern = newPattern;
  }

  var fv = {

    //Generate validator by pattern obj
    gen: function(pattern, options) {
      if (!pattern || (typeof pattern !== 'object')) {
        throw 'Passed in pattern should be an object';
      }
      return new validator(pattern, options);
    }
  };

  if (!w.fieldValidator) {
    w.fieldValidator = fv;
    w.fv = w.fieldValidator;
  }

})(window);
