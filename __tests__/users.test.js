const chai = require('chai');
const chaiHttp = require('chai-http');
const faker = require('faker');
const mongoose = require('mongoose');
const { expect } = chai;
const server = require('../index');

const register = "/api/register"
chai.use(chaiHttp);

const user = {
    firstname:  faker.name.lastName(),
    lastname:   faker.name.firstName(),
    email:      faker.internet.email(faker.name.firstName(),faker.name.lastName(),'gmail.com'),
    password:   faker.internet.password(8)
}

after('dropping db test', async ()=>{
    await mongoose.connection.dropDatabase(()=>{
        console.log('\n Test database dropped')
    })
    await mongoose.connection.close();
});
describe('user tests',()=>{
    it('should register a new user',async()=>{
        try{
            const result = await chai
                .request(server)
                .post(register)
                .send(user)
                expect(result.status).to.equal(200)
                expect(result.body).to.be.a('object')
                expect(result.body).to.have.property('message').to.equal('User have been registered')
        } catch(error){
            console.log('err!',error);
        }
    })
})
