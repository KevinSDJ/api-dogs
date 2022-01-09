/* eslint-disable import/no-extraneous-dependencies */
const { expect } = require('chai');
const session = require('supertest-session');
const app = require('../../src/app.js');
const { Dog, conn } = require('../../src/db.js');

const agent = session(app);
const dog = {
  name: 'Pug',
  weight:"2-3",
  height:"4-5",
  age:"5-10",
  image:"dsadsadsadsad"
};

describe('Dogs routes', () => {
  before(() => conn.authenticate()
  .catch((err) => {
    console.error('Unable to connect to the database:', err);
  }));
  beforeEach(() => Dog.sync({ force: true })
    .then(() => Dog.create(dog)));
  describe('GET /dogs', () => {
    it('should get 200', () =>
      agent.get('/dogs').expect(200)
    );
  });
});

describe('GET /temperament',()=>{
    it('should get 200',()=>agent.get('/temperament').expect(200));
    it('response with data type array',()=>
    agent.get('/temperament').then((res)=>{
      expect(Array.isArray(res.body)).equal(true)
    }))
})