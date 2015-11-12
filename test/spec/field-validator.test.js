const chai = require('chai')
const should = chai.should()


describe('Test suite of field-validator', function() {

    var restrictions = {
        name: {
            required: true,
            type: 'string'
        },
        children:{
            type:'Array',
            uniq:true
        }
    }

    var fv = require('../../lib/field-validator')

    describe('Test method newInstance',function(){

        it('Expect newInstance to be a function',function(){
            fv.should.be.a('function')
        })

       it('Expect newInstance return an instane of fv',function(){
            (fv.newInstance(restrictions).constructor.name).should.equal('fieldValidator')
        })

    })

    describe('Test method perform', function() {
        var validator = fv.newInstance(restrictions)
        var throwMsg = 'Passed in data has no attributes, or is null, or undefined, or not an object'

        it('Expect perform to be a function', function() {
           validator.perform.should.be.a('function')
        })

        it('Expect perform executes then return an object', function() {
           validator.perform({
                name: 'Remind'
            }).should.be.a('object')
        })

        it('Expect perform executes with array that has duplicate elements', function() {
            validator.perform({
                name: 'Remind',
                children:['Bob','Lily','Bob']
            }).errors[0].should.equal('children has duplicate elements')
        })

        it('Expect perform executes on invalid data then return an object with errors properties', function() {
            validator.perform({
                name: 123
            }).should.have.property('errors')
        })

        it('Expect perform executes on none data then throw an exception', function() {
           (function() {
                validator.perform({})
            }).should.Throw(throwMsg)
        })

        it('Expect perform executes on emptry data then throw an exception', function() {
           (function() {
                validator.perform({})
            }).should.Throw(throwMsg)
        })

        it('Expect perform executes on data which is not an object then throw an exception', function() {
            (function() {
                validator.perform('data')
            }).should.Throw(throwMsg)
        })

    })

    describe('Test method getState',function(){
        var validator = fv.newInstance(restrictions)
        validator.perform({name:'Mona'})

        it('Expect getState to be a function',function(){
           validator.getState.should.be.a('function')
        })

        it('Expect getState return a boolean state',function(){
            validator.getState().should.be.a('boolean')
        })
    })

})
