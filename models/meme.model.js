const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const memeSchema = new Schema({
  name: { type: String, required: true },
  caption: { type: String, required: true },
  url: { type: String, required: true },
  
}, {
  timestamps: true,
});

/**Removes "_id" and transform it to "id"
*Removes "__v"
*Removes "createdAt"
*Removes "updatedAt"
*/
memeSchema.method('transform', function() {
    var obj = this.toObject();
 
    //Rename fields
    obj.id = obj._id;
    delete obj._id;
    delete obj.createdAt;
    delete obj.updatedAt;
    delete obj.__v;
 
    return obj;
});

const Meme = mongoose.model('Meme', memeSchema);

module.exports = Meme;