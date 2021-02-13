const fetch = require("node-fetch");
function checkBlobtype(blob){
	return blob.type.includes("image/")
}
const getBlob=async (url) => {
	try{
	const response =await fetch(url);
	const blob= await response.blob();
	return blob;
	}catch(err){
		console.log('error'+err);
	}
  	
}
const checkValidImageUrl = (url)=> {return getBlob(url).then(blob=>checkBlobtype(blob))}
module.exports=checkValidImageUrl;