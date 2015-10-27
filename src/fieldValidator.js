(function(w) {

    var dataTypes = {
      UNDEFINED: 'undefined'
    };

    function validator(restrictions, options) {
      this.restrictions = restrictions;
      this.restrictionNames = Object.getOwnPropertyNames(restrictions);
      this.strict = false;
      this.all = false;
      this.options = options;

      this.errors = [];

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
        restrictions = this.restrictions,
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
      for (var k in restrictionNames) {
        var key = restrictionNames[k];
        var restriction = restrictions[key];
        var item = data[key];

        //Check required fields, they should all be filled
        if (restriction.required && (typeof item === dataTypes.UNDEFINED || item === null)) {
          errors.push([key, ' is not provided'].join(''));

          /*        if (v.all) {
                    continue;
                  } else {
                    break;
                  }*/

        }

        //Check constraint type,length,range if item is filled
        if ((typeof item !== dataTypes.UNDEFINED) && (item !== null)) {

          //Check type
          if (
            restriction.type && (
              //Check referece type
              (typeof item === 'object' && item.constructor.name !== restriction.type) ||
              //Check prinative type
              (typeof item !== 'object' && typeof item !== restriction.type)
            )
          ) {
            errors.push([key, ' is not ', item.type].join(''));
          }

          //Check length, currently it supports string and array
          if (item.hasOwnProperty('length') {

              if (restriction.maxLength && item.length > restriction.maxLength) {
                errors.push(['Max length of ', key, ' is ', restriction.maxLength])
              }

              if (restriction.minLength && item.length < restriction.maxLength) {
                errors.push(['Min length of ', key, ' is ', restriction.maxLength])
              }
            }

          }

          //Check number range. TODO

          //Check array elements type


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

      validator.prototype.compile = function(newPattern) {
        this.pattern = newPattern;
      }

      validator.prototype.isPassed = function() {
        return this.isPassed;
      }

      var fv = {

        //Generate validator by pattern obj
        gen: function(pattern, options) {
          return new validator(pattern, options);
        }

      };

      if (!w.fieldValidator) {
        w.fieldValidator = fv;
        w.fv = w.fieldValidator;
      }

    })(window);
