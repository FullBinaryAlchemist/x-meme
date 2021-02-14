const router = require('express').Router();
let Meme = require('../models/meme.model');
const checkValidImgUrl = require("../checkValidImageUrl")
/**
 * @swagger
 * definitions:
 *  Meme:
 *   type: object
 *   properties:
 *    name:
 *     type: string
 *     description: name of the author of the meme
 *     example: 'Jayaramachandran'
 *    caption:
 *     type: string
 *     description: caption of the meme
 *     example: 'Look twice before you cross the road'
 *    url:
 *     type: string
 *     description: An absolute url pointing to a "Content-type":"image/*"
 *     example: 'https://static.toiimg.com/photo/72975551.cms'
 */

/**
 * @swagger
 * /memes:
 *  get:
 *   summary: get the latest 100 memes
 *   description: get the latest 100 memes in reverse chronological order (that is latest meme will be at index 0 and oldest meme at last index)
 *   responses:
 *    200:
 *     description: success. A JSON is returned containing the memes.An empty array is returned if no meme available
 *    400:
 *     description: error
 */
router.route('/').get((req, res) => {
  Meme.find()
    .then(memes => {
            let returnedMemes=[];
            
            for (let i = 1; i <=memes.length && i<=100; i++) {
              returnedMemes.push(memes[memes.length-i].transform());
            }
    
            res.json(returnedMemes);
          }
      )

    .catch(err => res.status(400).json('Error: ' + err));
});

/**
  * @swagger
  * /memes:
  *  post:
  *   summary: create a new meme
  *   description: create a new meme and returns unique id of the newly created meme if meme is not duplicate . Otherwise returns error.
  *   requestBody:
  *    content:
  *     application/json:
  *      schema:
  *       $ref: '#/definitions/Meme'
  *   responses:
  *    200:
  *     description: meme created succesfully. Returns unique id of the newly created meme
  *    409:
  *     description: Duplicate meme(meme with same name , caption , and url) not allowed
  */
  router.route('/').post((req, res) => {
  const name = req.body.name;
  const caption = req.body.caption;
  const url = req.body.url
  

  const newMeme = new Meme({
    name,
    caption,
    url
  });

  Meme.find({name,caption,url})
  .then(async fetchedMemes => {
    //check if no duplicate MEME exists
    //console.log(fetchedMemes.length>0);
    if (fetchedMemes.length>0){
      res.status(409).json('DUPLICATE post not allowed!')
    }
    else{
      //check if URL exists
      if(url){
        let result= await checkValidImgUrl(url)
        //console.log("test for "+url+":"+result);
        
        //check if proper image URL
        if(!result){
          return res.status(400).json("Not a valid image url!");
        }
        else{
          newMeme.save()
          .then(() => res.json({"id":newMeme.transform().id}))
          .catch(err => res.status(400).json('Error: ' + err));
          }    
        }
      //use default mongoose validator to send error message
      else{    
      newMeme.save()
        .then(() => res.json({"id":newMeme.transform().id}))
        .catch(err => res.status(400).json('Error: ' + err));
      }
    }
  })
  .catch(err => res.status(400).json('Error' + err));

          
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

/**
 * @swagger
 * /memes/{meme_id}:
 *  get:
 *   summary: get a MEME with given {meme_id}
 *   description: get a MEME with given {meme_id}
 *   parameters:
 *    - in: path
 *      name: meme_id
 *      schema:
 *       type: string
 *      required: true
 *      description: id of the meme
 *      example: 6028ec4f8e42f82e88cc7245
 *   responses:
 *    200:
 *     description: success
 *    404:
 *      description: meme does not exist
 */
router.route('/:id').get((req, res) => {
    res.json(req.meme.transform());
});


/**
 * @swagger
 * /memes/{meme_id}:
 *  delete:
 *   summary: delete a MEME with given {meme_id}
 *   description: delete a MEME with given {meme_id}
 *   parameters:
 *    - in: path
 *      name: meme_id
 *      schema:
 *       type: string
 *      required: true
 *      description: id of the meme
 *      example: 6028ec4f8e42f82e88cc7245
 *   responses:
 *    209:
 *     description: meme deleted successfully
 *    404:
 *      description: meme does not exist
 */

router.route('/:id').delete((req, res) => {
  Meme.findByIdAndDelete(req.meme.id)
    .then(() => res.status(204).json("Meme with id: "+req.params.id +" deleted successfully!") )
    .catch(err => res.status(400).json('Error: ' + err));
});

/**
 * @swagger
 * /memes/{meme_id}:
 *  patch:
 *   summary: updates the URL or/and CAPTION of a meme with {meme_id}
 *   description: update the URL and/or CAPTION of a MEME with given {meme_id}. NAME cannot be modified.Even if provided no change will be made
 *   consumes:
 *    - application/json
 *   produces:
 *    - application/json
 *   parameters:
 *    - in: path
 *      name: meme_id
 *      schema:
 *       type: string
 *      required: true
 *      description: id of the meme
 *      example: 6028ec4f8e42f82e88cc7245
 *    - in: body
 *      name: body
 *      required: true
 *      description: body object containg the name,caption, url
 *      schema:
 *       $ref: '#/definitions/Meme'
 *   requestBody:
 *    content:
 *     application/json:
 *      schema:
 *       $ref: '#/definitions/Meme'  
 *   responses:
 *    200:
 *     description: successly update meme
 *    404:
 *     description: meme does not exist
 *    400:
 *     description: error occurred when trying to update meme
 */

router.route('/:id').patch((req, res) => {
    
      if(req.body.caption)
        req.meme.caption=req.body.caption;
      if(req.body.url)
        req.meme.url= req.body.url;
      
      req.meme.save()
        .then(() => res.status(200).json('Meme updated!'))
        .catch(err => res.status(400).json('Error: ' + err));
        
});

module.exports = router;