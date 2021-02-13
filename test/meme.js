process.env.NODE_ENV = 'test';

let mongoose = require("mongoose");
let Meme = require('../models/meme.model');

let chai = require('chai');
let chaiHttp = require('chai-http');
let server = require('../server');
let should = chai.should();


chai.use(chaiHttp);

describe('Memes', () => {
    beforeEach((done) => {
        Meme.remove({}, (err) => {
           done();
        });
    });
  describe('/GET memes', () => {
      it('it should GET all the memes', (done) => {
            chai.request(server)
            .get('/memes')
            .end((err, res) => {
                  res.should.have.status(200);
                  res.body.should.be.a('array');
                  res.body.length.should.be.eql(0);
              done();
            });
      });
  });
  
  describe('/POST meme', () => {
      it('it should not POST a meme without url field', (done) => {
          let meme = {
              caption: "The Lord of the Rings",
              name: "J.R.R. Tolkien",
              //url is missing
          }
            chai.request(server)
            .post('/meme')
            .send(meme)
            .end((err, res) => {
                  res.should.have.status(400);
                  res.body.should.be.eql("Error: ValidationError: url: Path `url` is required.");
              done();
            });
      });
 //      it('it should POST a meme ', (done) => {
 //          let meme = {
 //              caption: "The Lord of the Rings",
 //              name: "J.R.R. Tolkien",
 //              url: "https://i.pinimg.com/originals/af/8d/63/af8d63a477078732b79ff9d9fc60873f.jpg"
 //          }
 //            chai.request(server)
 //            .post('/memes')
 //            .send(meme)
 //            .end((err, res) => {
 //                  res.should.have.status(200);
 //                  res.body.should.be.a('object');
 //                  //since we have only a single meme 
 //                  Meme.find(meme,(err,fetchedMemes) => res.body.should.have.property('id').eql(fetchedMemes[0].id))

                  
                  
 //              done();
 //            });
 //      });
 //  });
 //  describe('/GET/:id meme', () => {
 //      it('it should GET a meme by the given id', (done) => {
 //          let meme = new Meme({ caption: "The Lord of the Rings", name: "J.R.R. Tolkien", url: "https://i.pinimg.com/originals/af/8d/63/af8d63a477078732b79ff9d9fc60873f.jpg" });
 //          meme.save((err, meme) => {
 //              chai.request(server)
 //            .get('/memes/' + meme.id)
 //            .send(meme)
 //            .end((err, res) => {
 //                  res.should.have.status(200);
 //                  res.body.should.be.a('object');
 //                  res.body.should.have.property('caption');
 //                  res.body.should.have.property('name');
 //                  res.body.should.have.property('url');
 //                  res.body.should.have.property('id').eql(meme.id);
 //              done();
 //            });
 //          });

 //      });
 //  });
 //  describe('/PUT/:id meme', () => {
 //      it('it should UPDATE a meme given the id', (done) => {
 //          let meme = new Meme({title: "The Chronicles of Narnia", name: "C.S. Lewis", year: 1948, pages: 778})
 //          meme.save((err, meme) => {
 //                chai.request(server)
 //                .put('/meme/' + meme.id)
 //                .send({title: "The Chronicles of Narnia", name: "C.S. Lewis", year: 1950, pages: 778})
 //                .end((err, res) => {
 //                      res.should.have.status(200);
 //                      res.body.should.be.a('object');
 //                      res.body.should.have.property('message').eql('Meme updated!');
 //                      res.body.meme.should.have.property('year').eql(1950);
 //                  done();
 //                });
 //          });
 //      });
 //  });
 // /*
 //  * Test the /DELETE/:id route
 //  */
 //  describe('/DELETE/:id meme', () => {
 //      it('it should DELETE a meme given the id', (done) => {
 //          let meme = new Meme({title: "The Chronicles of Narnia", name: "C.S. Lewis", year: 1948, pages: 778})
 //          meme.save((err, meme) => {
 //                chai.request(server)
 //                .delete('/meme/' + meme.id)
 //                .end((err, res) => {
 //                      res.should.have.status(200);
 //                      res.body.should.be.a('object');
 //                      res.body.should.have.property('message').eql('Meme successfully deleted!');
 //                      res.body.result.should.have.property('ok').eql(1);
 //                      res.body.result.should.have.property('n').eql(1);
 //                  done();
 //                });
 //          });
 //      });
 //  });
});