const router = require('express').Router();
let Meme = require('../models/meme.model');

router.route('/').get((req, res) => {
  Meme.find()
    .then(memes => {
            let returnedMemes=[];
            
            for (let i = 0; i < memes.length; i++) {
              returnedMemes.push(memes[i].transform());
            }
    
            res.json(returnedMemes);
          }
      )

    .catch(err => res.status(400).json('Error: ' + err));
});

router.route('/').post((req, res) => {
  const name = req.body.name;
  const caption = req.body.caption;
  const url = req.body.url
  const newMeme = new Meme({
    name,
    caption,
    url
  });

  newMeme.save()
  .then(() => res.json({"id":newMeme.transform().id}))
  .catch(err => res.status(400).json('Error: ' + err));
});

 //MIDDLEWARE to check if meme with id exists
router.use('/:id', (req, res, next)=>{
    Meme.findById( req.params.id, (err,meme)=>{
        if(err || !meme)
            res.status(404).json("Meme not found with id " + req.params.id);
        else {
            req.meme = meme;
            next();
        }
    })

})


router.route('/:id').get((req, res) => {
    res.json(req.meme.transform());
});

router.route('/:id').delete((req, res) => {
  Meme.findByIdAndDelete(req.meme.id)
    .then(() => res.status(204).json("Meme with id: "+req.params.id +" deleted successfully!") )
    .catch(err => res.status(400).json('Error: ' + err));
});

router.route('/:id').patch((req, res) => {
    
      req.meme.caption = req.body.caption;
      req.meme.url = req.body.url;
      
      req.meme.save()
        .then(() => res.status(200).json('Meme updated!'))
        .catch(err => res.status(400).json('Error: ' + err));
        
});

module.exports = router;