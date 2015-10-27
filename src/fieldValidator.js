(function(w) {

  var dataTypes = {
    UNDEFINED: 'undefined'
  };

  function errorGen() {
    var argArr = [];
    for (var x in arguments) {
      argArr.push(arguments[x]);
    }
    return argArr.join(' ');
  };

  function validator(restrictions, options) {

    //TODO. Check restrictions, throw errors for unsupported features and bad declaration

    this.restrictions = restrictions;
    this.restrictionNames = Object.getOwnPropertyNames(restrictions);
    this.strict = false;
    this.all = false;
    this.options = options;

    this.errors = [];

    this.init();
  }

  validator.newInstance = function(restrictions, options) {
    return new validator(restrictions, options);
  };

  validator.prototype.init = function() {
    var v = this,
      options = v.options;
    if (options) {
      v.strict = v.options.strict ? v.options.strict : false;
    }
  }

  validator.prototype.perform = function(data) {
    var v = this,
      restrictions = this.restrictions,
      errors = [],
      dataFields = Object.getOwnPropertyNames(data),
      patternItems = v.patternItems;

    var isType = function(variable, type) {

      //Check referece type. Current, it only support common types like Array
      return (typeof variable === 'object' && variable.constructor.name === type) ||
        //Check prinative type
        (typeof variable !== 'object' && typeof variable === type);
    }

    //Passed in data precheck, it should be an object
    if (!data || (typeof data !== 'object')) {
      throw 'Passed in data is null,or undefined,or not an object';
    }

    //Check if corrsponding fields meet the constraint
    for (var key in restrictions) {
      var restriction = restrictions[key];
      var item = data[key];

      //Check required fields, they should all be filled
      if (restriction.required && (typeof item === dataTypes.UNDEFINED || item === null)) {
        errors.push(errorGen(key, 'is not provided'));
      }

      //Check constraint type,length,range if item is filled
      if (typeof item !== dataTypes.UNDEFINED && item !== null) {

        //Check type
        if (restriction.type && !isType(item, restriction.type)) {
          errors.push(errorGen(key, 'is not', restriction.type));
        }

        //Check length, currently it supports string and array
        if (item.hasOwnProperty('length')) {

          if (restriction.maxLength && item.length > restriction.maxLength) {
            errors.push(errorGen('Max length of', key, 'is', restriction.maxLength));
          }

          if (restriction.minLength && item.length < restriction.maxLength) {
            errors.push(errorGen('Min length of', key, 'is', restriction.maxLength));
          }
        }

        //Check number range. TODO
        if (typeof item === 'number') {

          if (restriction.max !== null && item > restriction.max) {
            errors.push(errorGen('Max', key, 'is', restriction.max));
          }

          if (restriction.min !== null && item < restriction.min) {
            errors.push(errorGen('Min', key, 'is', restriction.min));
          }

        }


        if (item.constructor.name === 'Array') {

          //Check include elements
          if (restriction.include) {
            item.forEach(function(element) {
              if (restriction.include.indexOf(element) === -1) {
                errors.push(errorGen(key, 'has element', element, 'which is not in predefined include'));
              }
            });
          }

          //Check elements type of array
          if (restriction.elementType) {
            item.forEach(function(element) {
              if (!isType(element, restriction.elementType)) {
                errors.push(errorGen(key, 'has element', element, 'whose type is not', restriction.elementType));
              }
            });
          }

        }

      }

    }



    if (v.strict) {
      //Check if there are fields which are not defined in restrictions
      for (var dk in data) {
        if (!pattern.hasOwnProperty(dk)) {
          errors.push([dk, ' is not supported']);
        }
      }
    }

    if (errors.length > 0) {
      v.errors = errors;
      v.isPassed = false;
    }

    return {
      errors: errors
    };
  }

  validator.prototype.compile = function(restrictions) {
    this.restrictions = restrictions;
  }

  validator.prototype.isPassed = function() {
    return this.isPassed;
  }


  w.fieldValidator = validator;
  w.fv = validator;


})(window);
