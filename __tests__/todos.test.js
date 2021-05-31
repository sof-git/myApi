const chai = require('chai');
const chaiHttp = require('chai-http');
const faker = require('faker');
const mongoose = require('mongoose');
const { expect } = chai;

const server = require('../index');

chai.use(chaiHttp);


describe('todos route',()=>{

    const addTodo = '/api/addTodo';
    const updateTodo = '/api/updateTodo' ;
    const getTodo = '/api/getTodo'

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
        priority:       faker.datatype.number(1,5)    
    }

    const update = {
        name:           preSaved.name,
        description:    faker.lorem.paragraphs(),
        difficulty:     faker.datatype.number(1,6),
        priority:       faker.datatype.number(1,5)     
    }

    before(async ()=>{
        const result = await chai
            .request(server)
            .post(addTodo)
            .send(preSaved)
            expect(result.status).to.equal(200)
    })


    describe('Todo tests',()=>{
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

        it('should return status 409 if todo name was already taken',async ()=>{
            try{
                const result = await chai
                    .request(server)
                    .post(addTodo)
                    .send(preSaved)
                    expect(result.status).to.equal(409);
            } catch (error){
                console.log('err!',error);
            }
        });
        /* 
        it('should update an existing todo', async (done)=>{
            try{
                const result = await chai
                    .request(server)
                    .post(updateTodo)
                    .send(update)
                    expect(result.status).to.equal(200)
                    done()
            } catch(error){
                console.log('err!',error);
            }
        }); */
        it ('should get a todo by his name',async ()=>{
            try{
                const result = await chai 
                    .request(server)
                    .get(getTodo)
                    .query({name:preSaved.name})
                    expect(result.status).to.equal(200)
            } catch(error){
                console.log('err!',error);
            }
        })
    });
})
