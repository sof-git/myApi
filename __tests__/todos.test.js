const chai = require('chai');
const chaiHttp = require('chai-http');
const faker = require('faker');
const mongoose = require('mongoose');
const { expect } = chai;

const server = require('../index');

chai.use(chaiHttp);


describe('todos route',()=>{
    const addTodo = '/api/addTodo';

    const todo = {
        name:           faker.lorem.sentence(5,5),
        description:    faker.lorem.paragraphs(),
        difficulty:     faker.datatype.number(1,6),
        creation_date:  Date.now(),
        priority:     faker.datatype.number(1,5)     
    }

    const preSaved = {
        name:           faker.lorem.sentence(5,5),
        description:    faker.lorem.paragraphs(),
        difficulty:     faker.datatype.number(1,6),
        creation_date:  Date.now(),
        priority:     faker.datatype.number(1,5)    
    }

    before(async ()=>{
        const result = await chai
            .request(server)
            .post(addTodo)
            .send(preSaved)
            expect(result.status).to.equal(200);
            console.log('res before',result.text)
    })
    after('dropping db test', async ()=>{
        await mongoose.connection.dropDatabase(()=>{
            console.log('\n Test database dropped')
        })
        await mongoose.connection.close();
    });

    describe('Add a todo',()=>{
        it('should create a new todo', async ()=>{
            try{
                const result = await chai
                    .request(server)
                    .post(addTodo)
                    .send(todo)
                    expect(result.status).to.equal(200);
                    expect(result.res).not.to.be.empty;
            }catch (error){
                console.log('err:',error)
            }
        })

        it('should return status 400 if todo name was already taken',async ()=>{
            try{
                const result = await chai
                    .request(server)
                    .post(addTodo)
                    .send(preSaved)
                    expect(result.Status).to.equal(400);
            } catch (error){
                console.log('err!',error);
            }
        })

    })
    

})

