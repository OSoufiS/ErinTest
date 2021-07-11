// Mocha & chai imports
import { expect, } from 'chai';
// Guard Test imports
import { Guard } from '../controllers/Guard'; //To test Guard Class
import { DI } from '../server'
import { UserController } from '../controllers/User.controller'
import { User } from '../entities';
import { wrap } from '@mikro-orm/core';
// API Test imports
//import {server} from '../server'

// Mocha and chai consts
// Guard Test consts
const GuardTestVars = new Guard();
// API Test consts
let chai = require('chai');
let chaiHttp = require('chai-http');
chai.use(chaiHttp);

//  expect(options.detectRetina).to.be.false; // Do I need to explain anything? It's like writing in English!
//expect(options.fpsLimit).to.equal(30); // As I said 3 lines above
//expect(options.interactivity.modes.emitters).to.be.empty; // emitters property is an array and for this test must be empty, this syntax works with strings too
//expect(options.particles.color).to.be.an("object").to.have.property("value").to.equal("#fff"); // this is a little more complex, but still really clear

describe('Guard Tests', () => {
    describe('Guard Class tests: isString()', () => {
        it('Check isString with String with no CheckOnly Option', () => {
            expect(GuardTestVars.isString("Hello")).to.be.equal("Hello");
        });
        it('Check isString with String with CheckOnly Option', () => {
            expect(GuardTestVars.isString("Hello", true)).to.be.equal(true);
        });
        it('Check isString with AlphaNumeric with no CheckOnly Option', () => {
            expect(GuardTestVars.isString("Hello1")).to.be.equal(false);
        });
        it('Check isString with AlphaNumeric with CheckOnly Option', () => {
            expect(GuardTestVars.isString("Hello1", true)).to.be.equal(false);
        });
        it('Check isString with Numeric with no CheckOnly Option', () => {
            expect(GuardTestVars.isString("123")).to.be.equal(false);
        });
        it('Check isString with Numeric with CheckOnly Option', () => {
            expect(GuardTestVars.isString("123", true)).to.be.equal(false);
        });
        it('Check isNumeric with Date with no CheckOnly Option', () => {
            expect(GuardTestVars.isString("25/08/2990")).to.be.equal(false);
        });
        it('Check isNumeric with Date with CheckOnly Option', () => {
            expect(GuardTestVars.isString("25/08/2990", true)).to.be.equal(false);
        });
        it('Check isString with nonSQL injection with no CheckOnly Option', () => {
            expect(GuardTestVars.isString("'a'; sleep(5000)")).to.be.equal(false);
        });
        it('Check isString with nonSQL injection with CheckOnly Option', () => {
            expect(GuardTestVars.isString("'a'; sleep(5000)", true)).to.be.equal(false);
        });
    });


    describe('Guard Class tests: isNumeric()', () => {
        it('Check isNumeric with Number with no CheckOnly Option', () => {
            expect(GuardTestVars.isNumeric(123)).to.be.equal(123);
        });
        it('Check isNumeric with Number with CheckOnly Option', () => {
            expect(GuardTestVars.isNumeric(123, true)).to.be.equal(true);
        });
    });


    describe('Guard Class tests: isAlphaNumeric()', () => {
        it('Check isAlphaNumeric with String with no CheckOnly Option', () => {
            expect(GuardTestVars.isAlphaNumeric("Hello")).to.be.equal("Hello");
        });
        it('Check isAlphaNumeric with String with CheckOnly Option', () => {
            expect(GuardTestVars.isAlphaNumeric("Hello", true)).to.be.equal(true);
        });
        it('Check isAlphaNumeric with AlphaNumeric with no CheckOnly Option', () => {
            expect(GuardTestVars.isAlphaNumeric("Hello1")).to.be.equal("Hello1");
        });
        it('Check isAlphaNumeric with AlphaNumeric with CheckOnly Option', () => {
            expect(GuardTestVars.isAlphaNumeric("Hello1", true)).to.be.equal(true);
        });
        it('Check isAlphaNumeric with Numeric with no CheckOnly Option', () => {
            expect(GuardTestVars.isAlphaNumeric("123")).to.be.equal("123");
        });
        it('Check isAlphaNumeric with Numeric with CheckOnly Option', () => {
            expect(GuardTestVars.isAlphaNumeric("123", true)).to.be.equal(true);
        });
        it('Check isNumeric with Date with no CheckOnly Option', () => {
            expect(GuardTestVars.isAlphaNumeric("25/08/2990")).to.be.equal(false);
        });
        it('Check isNumeric with Date with CheckOnly Option', () => {
            expect(GuardTestVars.isAlphaNumeric("25/08/2990", true)).to.be.equal(false);
        });
        it('Check isAlphaNumeric with nonSQL injection with no CheckOnly Option', () => {
            expect(GuardTestVars.isAlphaNumeric("'a'; sleep(5000)")).to.be.equal(false);
        });
        it('Check isAlphaNumeric with nonSQL injection with CheckOnly Option', () => {
            expect(GuardTestVars.isAlphaNumeric("'a'; sleep(5000)", true)).to.be.equal(false);
        });
    });


    describe('Guard Class tests: isValidLocation()', () => {
        it('Check isValidLocation with String with no CheckOnly Option', () => {
            expect(GuardTestVars.isValidLocation("Hello")).to.be.equal(false);
        });
        it('Check isValidLocation with String with CheckOnly Option', () => {
            expect(GuardTestVars.isValidLocation("Hello", true)).to.be.equal(false);
        });
        it('Check isValidLocation with AlphaNumeric with no CheckOnly Option', () => {
            expect(GuardTestVars.isValidLocation("Hello1")).to.be.equal(false);
        });
        it('Check isValidLocation with AlphaNumeric with CheckOnly Option', () => {
            expect(GuardTestVars.isValidLocation("Hello1", true)).to.be.equal(false);
        });
        it('Check isValidLocation with Numeric with no CheckOnly Option', () => {
            expect(GuardTestVars.isValidLocation("123")).to.be.equal(false);
        });
        it('Check isValidLocation with Numeric with CheckOnly Option', () => {
            expect(GuardTestVars.isValidLocation("123", true)).to.be.equal(false);
        });
        it('Check isNumeric with Date with no CheckOnly Option', () => {
            expect(GuardTestVars.isValidLocation("25/08/2990")).to.be.equal(false);
        });
        it('Check isNumeric with Date with CheckOnly Option', () => {
            expect(GuardTestVars.isValidLocation("25/08/2990", true)).to.be.equal(false);
        });
        it('Check isValidLocation with nonSQL injection with no CheckOnly Option', () => {
            expect(GuardTestVars.isValidLocation("'a'; sleep(5000)")).to.be.equal(false);
        });
        it('Check isValidLocation with nonSQL injection with CheckOnly Option', () => {
            expect(GuardTestVars.isValidLocation("'a'; sleep(5000)", true)).to.be.equal(false);
        });
        it('Check isValidLocation with Location: Correct Format', () => {
            expect(GuardTestVars.isValidLocation("Australia/Melbourne")).to.be.equal("Australia/Melbourne");
        });
        it('Check isValidLocation with Location: no Country', () => {
            expect(GuardTestVars.isValidLocation("Melbourne")).to.be.equal(false);
        });
        it('Check isValidLocation with Location: no City', () => {
            expect(GuardTestVars.isValidLocation("Australia")).to.be.equal(false);
        });
        it('Check isValidLocation with Location: Wrong Format', () => {
            expect(GuardTestVars.isValidLocation("Melbourne/Australia")).to.be.equal(false);
        });
        it('Check isValidLocation with Location: Wrong Format', () => {
            expect(GuardTestVars.isValidLocation("Melbourne Australia")).to.be.equal(false);
        });
        it('Check isValidLocation with Location: Correct Format with CheckOnly Option', () => {
            expect(GuardTestVars.isValidLocation("Australia/Melbourne", true)).to.be.equal(true);
        });
        it('Check isValidLocation with Location: no Country with CheckOnly Option', () => {
            expect(GuardTestVars.isValidLocation("Melbourne", true)).to.be.equal(false);
        });
        it('Check isValidLocation with Location: no City with CheckOnly Option', () => {
            expect(GuardTestVars.isValidLocation("Australia", true)).to.be.equal(false);
        });
        it('Check isValidLocation with Location: Wrong Format with CheckOnly Option', () => {
            expect(GuardTestVars.isValidLocation("Melbourne/Australia", true)).to.be.equal(false);
        });
        it('Check isValidLocation with Location: Wrong Format with CheckOnly Option', () => {
            expect(GuardTestVars.isValidLocation("Melbourne Australia", true)).to.be.equal(false);
        });

    });

    describe('Guard Class tests: isValidDay()', () => {
        it('Check isValidDay with String with no CheckOnly Option', () => {
            expect(GuardTestVars.isValidDay("Hello")).to.be.equal(false);
        });
        it('Check isValidDay with String with CheckOnly Option', () => {
            expect(GuardTestVars.isValidDay("Hello", true)).to.be.equal(false);
        });
        it('Check isValidDay with AlphaNumeric with no CheckOnly Option', () => {
            expect(GuardTestVars.isValidDay("Hello1")).to.be.equal(false);
        });
        it('Check isValidDay with AlphaNumeric with CheckOnly Option', () => {
            expect(GuardTestVars.isValidDay("Hello1", true)).to.be.equal(false);
        });
        it('Check isValidDay with Numeric with no CheckOnly Option', () => {
            expect(GuardTestVars.isValidDay("123")).to.be.equal(false);
        });
        it('Check isValidDay with Numeric with CheckOnly Option', () => {
            expect(GuardTestVars.isValidDay("123", true)).to.be.equal(false);
        });
        it('Check isValidDay with Date (DD-MM-YYYY) with no CheckOnly Option', () => {
            expect(GuardTestVars.isValidDay("25-08-2990")).to.be.equal(false);
        });
        it('Check isValidDay with Date (DD-MM-YYYY) with CheckOnly Option', () => {
            expect(GuardTestVars.isValidDay("25-08-2990", true)).to.be.equal(false);
        });
        it('Check isValidDay with Date (YYYY-MM-DD) with no CheckOnly Option', () => {
            expect(GuardTestVars.isValidDay("2009-08-01")).to.be.equal("2009-08-01");
        });
        it('Check isValidDay with Date (YYYY-MM-DD) with CheckOnly Option', () => {
            expect(GuardTestVars.isValidDay("2009-08-01", true)).to.be.equal(true);
        });
        it('Check isValidDay with Date (YY-M-D) with no CheckOnly Option', () => {
            expect(GuardTestVars.isValidDay("09-8-1")).to.be.equal(false);
        });
        it('Check isValidDay with Date (YY-M-D) with CheckOnly Option', () => {
            expect(GuardTestVars.isValidDay("09-8-1", true)).to.be.equal(false);
        });
        it('Check isValidDay with Date (YY-MM-D) with no CheckOnly Option', () => {
            expect(GuardTestVars.isValidDay("09-12-1")).to.be.equal(false);
        });
        it('Check isValidDay with Date (YY-MM-D) with CheckOnly Option', () => {
            expect(GuardTestVars.isValidDay("09-12-1", true)).to.be.equal(false);
        });
        it('Check isValidDay with Date (YY-MM-DD) with no CheckOnly Option', () => {
            expect(GuardTestVars.isValidDay("09-12-11")).to.be.equal(false);
        });
        it('Check isValidDay with Date (YY-MM-DD) with CheckOnly Option', () => {
            expect(GuardTestVars.isValidDay("09-12-11", true)).to.be.equal(false);
        });
        it('Check isValidDay with Date (DD/MM/YYYY) with no CheckOnly Option', () => {
            expect(GuardTestVars.isValidDay("25/08/2990")).to.be.equal(false);
        });
        it('Check isValidDay with Date (DD/MM/YYYY) with CheckOnly Option', () => {
            expect(GuardTestVars.isValidDay("25/08/2990", true)).to.be.equal(false);
        });
        it('Check isValidDay with nonSQL injection with no CheckOnly Option', () => {
            expect(GuardTestVars.isValidDay("'a'; sleep(5000)")).to.be.equal(false);
        });
        it('Check isValidDay with nonSQL injection with CheckOnly Option', () => {
            expect(GuardTestVars.isValidDay("'a'; sleep(5000)", true)).to.be.equal(false);
        });
    });



});

describe('API Tests', function () {
    // This function will run before every test to clear database
    beforeEach(function (done) {
        done();
    });
    describe('Post API', function () {
        it('post api with correct information', done => {
            chai.request('http://localhost:3000')
                .post('/User')
                .send({
                    firstName: "Omar",
                    lastName: "Test",
                    birthdate: "2001-06-01",
                    location: "Australia/Melbourne"
                })
                .then(function (res) {
                    expect(res.status).to.be.equal(201);
                    expect(res.body.message).to.be.equal(null);
                    
                })
                .catch(function (err) {
                    throw err;
                });
                done();
        });
        it('post api with incorrect firstName', done => {
            chai.request('http://localhost:3000') 
                .post('/User')
                .send({
                    firstName: "Omar123",
                    lastName: "Test",
                    birthdate: "2001-06-01",
                    location: "Australia/Melbourne"
                })
                .then(function (res) {
                    expect(res.status).to.be.equal(400);
                    expect(res.body.message).to.be.equal('Error: Please check values and try again');
                    
                })
                .catch(function (err) {
                    throw err;
                    
                });
                done();
                
        });
        it('post api with incorrect lastName', done => {
            chai.request('http://localhost:3000') 
                .post('/User')
                .send({
                    firstName: "Omar",
                    lastName: "Test123",
                    birthdate: "2001-06-01",
                    location: "Australia/Melbourne"
                })
                .then(function (res) {
                    expect(res.status).to.be.equal(400);
                    expect(res.body.message).to.be.equal('Error: Please check values and try again');
                    
                })
                .catch(function (err) {
                    throw err;
                });
                done();
        });
        it('post api with incorrect date', done => {
            chai.request('http://localhost:3000') 
                .post('/User')
                .send({
                    firstName: "Omar",
                    lastName: "Test",
                    birthdate: "31/2/2019",
                    location: "Australia/Melbourne"
                })
                .then(function (res) {
                    expect(res.status).to.be.equal(400);
                    expect(res.body).to.be.equal('Error: Please check values and try again');
                    
                })
                .catch(function (err) {
                    throw err;
                });
                done();
        });
        it('post api with incorrect location', done => {
            chai.request('http://localhost:3000') 
                .post('/User')
                .send({
                    firstName: "Omar123",
                    lastName: "Test",
                    birthdate: "2001-06-01",
                    location: "Melbourne"
                })
                .then(function (res) {
                    expect(res.status).to.be.equal(400);
                    expect(res.body).to.be.equal('Error: Please check values and try again');
                    
                })
                .catch(function (err) {
                    throw err;
                });
                done();
        });
        it('post api with numeric firstName', done => {
            chai.request('http://localhost:3000') 
                .post('/User')
                .send({
                    firstName: 123,
                    lastName: "Test",
                    birthdate: "2001-06-01",
                    location: "Melbourne"
                })
                .then(function (res) {
                    expect(res.status).to.be.equal(400);
                    expect(res.body).to.be.equal('Error: Please check values and try again');
                    
                })
                .catch(function (err) {
                    throw err;
                });
                done();
        });
        it('post api with nonSql injection', done => {
            chai.request('http://localhost:3000') 
                .post('/User')
                .send({
                    firstName: "'a'; sleep(5000)",
                    lastName: "Test",
                    birthdate: "2001-06-01",
                    location: "Melbourne"
                })
                .then(function (res) {
                    expect(res.status).to.be.equal(400);
                    expect(res.body).to.be.equal('Error: Please check values and try again');
                   
                })
                .catch(function (err) {
                    throw err;
                });
                done();
        });
    });

});

let setDB = true;
describe('API Tests', function () {
    // This function will run before every test to clear database
    
    beforeEach(function (done) {
         if(setDB){
            chai.request('http://localhost:3000')
                .post('/User')
                .send({
                    firstName: "Omar",
                    lastName: "PreTest",
                    birthdate: "2001-06-01",
                    location: "Australia/Melbourne"
                })
                .then(function (res) {
                    expect(res.status).to.be.equal(201);
                    expect(res.body.message).to.be.equal(null);
                    
                })
                .catch(function (err) {
                    throw err;
                });
                setDB = false;
                
        }
        done();
            
        
    });
    describe('Delete API', function () {
        it('Delete api with incorrect UID', done => {
            chai.request('http://localhost:3000')
                .delete('/User/:id/T21hclRlc3QyMDAxLTA2LTAx')
                .then(function (res) {
                    expect(res.status).to.be.equal(400);
                    expect(res.body.message).to.be.equal('');
                    
                })
                .catch(function (err) {
                    throw err;
                });
                done();
        });
        it('Delete api with correct information', done => {
            chai.request('http://localhost:3000')
                .delete('/User/:id/eyJmaXJzdE5hbWUiOiJPbWFyIiwibGFzdE5hbWUiOiJQcmVUZXN0IiwiYmlydGhkYXRlIjoiMjAwMS0wNi0wMSJ9')
                .then(function (res) {
                    expect(res.status).to.be.equal(200);
                    expect(res.body.message).to.be.equal('');
                    
                })
                .catch(function (err) {
                    throw err;
                });
                done();
        });
        it('Delete api with nonSql injection', done => {
            chai.request('http://localhost:3000') 
                .delete('/User/:id/{$neq: null}')
                .then(function (res) {
                    expect(res.status).to.be.equal(400);
                    expect(res.body.message).to.be.equal('Error: Please check values and try again');
                    
                })
                .catch(function (err) {
                    throw err;
                });
                done();
        });
        it('Delete api with numeric', done => {
            chai.request('http://localhost:3000') 
                .delete('/User/:id/123')
                .then(function (res) {
                    expect(res.status).to.be.equal(400);
                    expect(res.body).to.be.equal('Error: Please check values and try again');
                    
                })
                .catch(function (err) {
                    throw err;
                });
                done();
        });
        it('Delete api with sneaky nonsql injection in json', done => {
            chai.request('http://localhost:3000') 
                .delete('/User/:id/e2ZpcnN0TmFtZTp7JG5lOm51bGx9LGxhc3ROYW1lOmFzZCxiaXJ0aGRhdGU6MjAwMS0wOC0wMX0=')
                .then(function (res) {
                    expect(res.status).to.be.equal(400);
                    expect(res.body).to.be.equal('Error: Please check values and try again');
                    
                })
                .catch(function (err) {
                    throw err;
                });
                done();
        });
        
    });

});


setDB = true;
describe('API Tests', function () {
    // This function will run before every test to clear database
    
    beforeEach(function (done) {
         if(setDB){
            chai.request('http://localhost:3000')
                .post('/User')
                .send({
                    firstName: "Omar",
                    lastName: "PreTest",
                    birthdate: "2001-06-01",
                    location: "Australia/Melbourne"
                })
                .then(function (res) {
                    expect(res.status).to.be.equal(201);
                    expect(res.body.message).to.be.equal(null);
                    
                })
                .catch(function (err) {
                    throw err;
                });
                setDB = false;
                
        }
        done();
            
        
    });
    describe('Update API', function () {
        it('Update api with incorrect UID', done => {
            chai.request('http://localhost:3000')
                .put('/User/:id/T21hclRlc3QyMDAxLTA2LTAx')
                .then(function (res) {
                    expect(res.status).to.be.equal(400);
                    expect(res.body.message).to.be.equal('');
                    
                })
                .catch(function (err) {
                    throw err;
                });
                done();
        });
        it('Update api with correct information: firstname change only', done => {
            chai.request('http://localhost:3000')
                .put('/User/:id/eyJmaXJzdE5hbWUiOiJPbWFyIiwibGFzdE5hbWUiOiJQcmVUZXN0IiwiYmlydGhkYXRlIjoiMjAwMS0wNi0wMSJ9')
                .send({
                    firstName: "Ramo"
                })
                .then(function (res) {
                    expect(res.status).to.be.equal(200);
                    expect(res.body.message).to.be.equal('');
                    
                })
                .catch(function (err) {
                    throw err;
                });
                done();
        });
        it('Update api with correct information: lastname change only', done => {
            chai.request('http://localhost:3000')
                .put('/User/:id/eyJmaXJzdE5hbWUiOiJPbWFyIiwibGFzdE5hbWUiOiJQcmVUZXN0IiwiYmlydGhkYXRlIjoiMjAwMS0wNi0wMSJ9')
                .send({
                    firstName: "TestPre"
                })
                .then(function (res) {
                    expect(res.status).to.be.equal(200);
                    expect(res.body.message).to.be.equal('');
                    
                })
                .catch(function (err) {
                    throw err;
                });
                done();
        });
        it('Update api with correct information: birthdate change only', done => {
            chai.request('http://localhost:3000')
                .put('/User/:id/eyJmaXJzdE5hbWUiOiJPbWFyIiwibGFzdE5hbWUiOiJQcmVUZXN0IiwiYmlydGhkYXRlIjoiMjAwMS0wNi0wMSJ9')
                .send({
                    birthdate: "1990-01-01"
                })
                .then(function (res) {
                    expect(res.status).to.be.equal(200);
                    expect(res.body.message).to.be.equal('');
                    
                })
                .catch(function (err) {
                    throw err;
                });
                done();
        });
        it('Update api with correct information: location change only', done => {
            chai.request('http://localhost:3000')
                .put('/User/:id/eyJmaXJzdE5hbWUiOiJPbWFyIiwibGFzdE5hbWUiOiJQcmVUZXN0IiwiYmlydGhkYXRlIjoiMjAwMS0wNi0wMSJ9')
                .send({
                    location: "Europe/Berlin"
                })
                .then(function (res) {
                    expect(res.status).to.be.equal(200);
                    expect(res.body.message).to.be.equal('');
                    
                })
                .catch(function (err) {
                    throw err;
                });
                done();
        });
        it('Update api with correct information: firstname and lastname change only', done => {
            chai.request('http://localhost:3000')
                .put('/User/:id/eyJmaXJzdE5hbWUiOiJPbWFyIiwibGFzdE5hbWUiOiJQcmVUZXN0IiwiYmlydGhkYXRlIjoiMjAwMS0wNi0wMSJ9')
                .send({
                    firstName: "Ramo",
                    lastName: "TestPre"
                })
                .then(function (res) {
                    expect(res.status).to.be.equal(200);
                    expect(res.body.message).to.be.equal('');
                    
                })
                .catch(function (err) {
                    throw err;
                });
                done();
        });
        it('Update api with correct information: birthdate and location change only', done => {
            chai.request('http://localhost:3000')
                .put('/User/:id/eyJmaXJzdE5hbWUiOiJPbWFyIiwibGFzdE5hbWUiOiJQcmVUZXN0IiwiYmlydGhkYXRlIjoiMjAwMS0wNi0wMSJ9')
                .send({
                    location: "Europe/Berlin",
                    birthdate: "1990-01-01"
                })
                .then(function (res) {
                    expect(res.status).to.be.equal(200);
                    expect(res.body.message).to.be.equal('');
                    
                })
                .catch(function (err) {
                    throw err;
                });
                done();
        });
        it('Update api with correct information: all change ', done => {
            chai.request('http://localhost:3000')
                .put('/User/:id/eyJmaXJzdE5hbWUiOiJPbWFyIiwibGFzdE5hbWUiOiJQcmVUZXN0IiwiYmlydGhkYXRlIjoiMjAwMS0wNi0wMSJ9')
                .send({
                    firstName: "Ramo",
                    lastName: "TestPRe",
                    birthdate: "2002-06-01",
                    location: "Australia/Perth"
                })
                .then(function (res) {
                    expect(res.status).to.be.equal(200);
                    expect(res.body.message).to.be.equal('');
                    
                })
                .catch(function (err) {
                    throw err;
                });
                done();
        });
        it('Update api with nonSql injection', done => {
            chai.request('http://localhost:3000') 
                .put('/User/:id/{$neq: null}')
                .then(function (res) {
                    expect(res.status).to.be.equal(400);
                    expect(res.body.message).to.be.equal('Error: Please check values and try again');
                    
                })
                .catch(function (err) {
                    throw err;
                });
                done();
        });
        it('Update api with numeric', done => {
            chai.request('http://localhost:3000') 
                .put('/User/:id/123')
                .then(function (res) {
                    expect(res.status).to.be.equal(400);
                    expect(res.body).to.be.equal('Error: Please check values and try again');
                    
                })
                .catch(function (err) {
                    throw err;
                });
                done();
        });
        it('Update api with sneaky nonsql injection in json', done => {
            chai.request('http://localhost:3000') 
                .put('/User/:id/e2ZpcnN0TmFtZTp7JG5lOm51bGx9LGxhc3ROYW1lOmFzZCxiaXJ0aGRhdGU6MjAwMS0wOC0wMX0=')
                .then(function (res) {
                    expect(res.status).to.be.equal(400);
                    expect(res.body).to.be.equal('Error: Please check values and try again');
                    
                })
                .catch(function (err) {
                    throw err;
                });
                done();
        });
        
    });

});