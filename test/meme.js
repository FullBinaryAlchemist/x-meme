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
            .post('/memes')
            .send(meme)
            .end((err, res) => {
                  res.should.have.status(400);
                  res.body.should.be.eql("Error: ValidationError: url: Path `url` is required.");
              done();
            });
      });
      it('it should POST a meme ', (done) => {
          let meme = {
              caption: "The Lord of the Rings",
              name: "J.R.R. Tolkien",
              url: "https://i.pinimg.com/originals/af/8d/63/af8d63a477078732b79ff9d9fc60873f.jpg"
          }
            chai.request(server)
            .post('/memes')
            .send(meme)
            .end((err, res) => {
                  res.should.have.status(200);
                  res.body.should.be.a('object');
                  //since we have only a single meme 
                  Meme.find(meme,(err,fetchedMemes) => {res.body.should.have.property('id').eql(fetchedMemes[0].id);
                  
                  done();

                })

            });
      });

      it('it should NOT POST a duplicate meme with same payload {caption,name,url}', (done) => {
          let meme = new Meme({ caption: "The Lord of the Rings", name: "J.R.R. Tolkien", url: "https://i.pinimg.com/originals/af/8d/63/af8d63a477078732b79ff9d9fc60873f.jpg" });
          meme.save((err, meme) => {
              chai.request(server)
            .post('/memes' )
            .send(meme)
            .end((err, res) => {
                  res.should.have.status(409);
                  res.body.should.be.eql('DUPLICATE post not allowed!');
              done();
            });
          });

      });
  });
  describe('/GET/:id meme', () => {
      it('it should GET a meme by the given id', (done) => {
          let meme = new Meme({ caption: "The Lord of the Rings", name: "J.R.R. Tolkien", url: "https://i.pinimg.com/originals/af/8d/63/af8d63a477078732b79ff9d9fc60873f.jpg" });
          meme.save((err, meme) => {
              chai.request(server)
            .get('/memes/' + meme.id)
            .send(meme)
            .end((err, res) => {
                  res.should.have.status(200);
                  res.body.should.be.a('object');
                  res.body.should.have.property('caption');
                  res.body.should.have.property('name');
                  res.body.should.have.property('url');
                  res.body.should.have.property('id').eql(meme.id);
              done();
            });
          });

      });
      it('it should NOT GET a meme that does not exist ', (done) => {
          
              chai.request(server)
            .get('/memes/' + "a")
            .end((err, res) => {
                  res.should.have.status(404);
                  res.body.should.be.eql("Meme not found with id " + "a");
              done();
            });
          });

  });
  describe('/PATCH/:id meme', () => {
      it('it should UPDATE only URL,CAPTION of a meme given the id', (done) => {
          let meme = new Meme({caption: "The Chronicles of Narnia", name: "C.S. Lewis", url:"https://i.pinimg.com/originals/af/8d/63/af8d63a477078732b79ff9d9fc60873f.jpg"})
          meme.save((err, meme) => {
                chai.request(server)
                .patch('/memes/' + meme.id)
                .send({caption: "The Lord of The Rings", name: "L.R. Tolkien", url:"https://www.google.com" })
                .end((err, res) => {
                      res.should.have.status(200);
                      Meme.findById(meme.id,(err,fetchedMeme)=>{
                        //console.log(fetchedMeme);
                        chai.assert.equal(fetchedMeme.name,meme.name,"name should NOT have changed")  
                        chai.assert.equal(fetchedMeme.caption,"The Lord of The Rings","caption should have CHANGED") 
                        chai.assert.equal(fetchedMeme.url,"https://www.google.com","url should have CHANGED") 
                        done();
                      })
                  
                });
          });
      });

      it('it should NOT PATCH a meme that does not exist ', (done) => {
          
              chai.request(server)
            .get('/memes/' + "a")
            .end((err, res) => {
                  res.should.have.status(404);
                  res.body.should.be.eql("Meme not found with id " + "a");
              done();
            });
          });

  });
 /*
  * Test the /DELETE/:id route
  */
  describe('/DELETE/:id meme', () => {
      it('it should DELETE a meme given the id', (done) => {
          let meme = new Meme({caption: "The Chronicles of Narnia", name: "C.S. Lewis", url:"https://www.google.com"})
          meme.save((err, meme) => {
                chai.request(server)
                .delete('/memes/' + meme.id)
                .end((err, res) => {
                      res.should.have.status(204);
                      res.body.should.be.a('object');
                      Meme.find(meme,(err,fetchedMeme)=>{
                        //console.log(fetchedMeme);
                        chai.expect(fetchedMeme).to.be.a('array',"empty array should be returned")
                        chai.assert.lengthOf(fetchedMeme,0,"length of the array should be 0")  
                        done();
                      })
                      
                });
          });
      });

      it('it should NOT DELETE a meme that does not exist ', (done) => {
          
              chai.request(server)
            .get('/memes/' + "a")
            .end((err, res) => {
                  res.should.have.status(404);
                  res.body.should.be.eql("Meme not found with id " + "a");
              done();
            });
          });


  });
});