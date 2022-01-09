const { Dog,Temperament, conn } = require('../../src/db.js');
const { expect } = require('chai');

describe('Dog model', () => {
  before(() => conn.authenticate()
    .catch((err) => {
      console.error('Unable to connect to the database:', err);
    }));
  describe('Validators', () => {
    beforeEach(() => Dog.sync({ force: true }));
    describe('name', () => {
      it('should throw an error if name is null', (done) => {
        Dog.create({})
          .then(() => done(new Error('It requires a valid name')))
          .catch(() => done());
      });
      it('should work when its a valid name', () => {
        Dog.create({ name: 'Pug' });
      });
    });
  });
});
describe('temperament model',()=>{
  before(()=>conn.authenticate()
  .catch((err)=>{
    console.log(error+":"+ err)
  })
  );
  describe('return temperaments',()=>{
    beforeEach(() => Dog.sync({ force: true }));
    it('array lis type',()=>{
     Temperament.findAll().then(resp=>{
       expect(resp).equal([])
     })
      
    })
  })

})
