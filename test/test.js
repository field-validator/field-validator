describe('Test suite of field-validator', function() {

    var restrictions = {
        name: {
            required: true,
            type: 'string'
        }
    };

    describe('A suite of common used alias fv', function() {

        it('fv should be alias of fieldValidator', function() {
            expect(fv).toBe(fieldValidator);
        });

    });

    describe('Test method newInstance',function(){

        it('Expect newInstance to be a function',function(){
            expect(typeof fv.newInstance).toBe('function');
        });

       it('Expect newInstance return an instane of fv',function(){
            expect(fv.newInstance(restrictions).constructor.name).toBe('fieldValidator');
        });

    });

    describe('Test method perform', function() {
        var validator = fv.newInstance(restrictions);

        it('Expect perform to be a function', function() {
            expect(typeof validator.perform).toBe('function');
        });

        it('Expect perform executes then return an object', function() {
            expect(typeof validator.perform({
                name: 'Remind'
            })).toBe('object');
        });

        it('Expect perform executes on invalid data then return an object with errors properties', function() {
            expect(validator.perform({
                name: 123
            }).errors).toBeDefined();
        });

        it('Expect perform executes on none data then throw an exception', function() {
            expect(validator.perform).toThrow();
        });

        it('Expect perform executes on emptry data then throw an exception', function() {
            expect(function() {
                validator.perform({});
            }).toThrow();
        });

        it('Expect perform executes on data which is not an object then throw an exception', function() {
            expect(function() {
                validator.perform('data');
            }).toThrow();
        });

    });

    describe('Test method getState',function(){
        var validator = fv.newInstance(restrictions);
        validator.perform({name:'Mona'});

        it('Expect getState to be a function',function(){
            expect(typeof validator.getState).toBe('function');
        });

        it('Expect getState return a boolean state',function(){
            expect(typeof validator.getState()).toBe('boolean');
        });
    });

});
