const fetch = require("node-fetch");
function checkBlobtype(blob){
	if (blob)
		return blob.type.includes("image/");
	else
		return false;
}
const getBlob=async (url) => {
	try{
	const response =await fetch(url);
	const blob= await response.blob();
	return blob;
	}catch(err){
		console.log('getBlob Error:'+err);
	}
  	
}
const checkValidImageUrl = (url)=> {return getBlob(url).then(blob=>checkBlobtype(blob))}
module.exports=checkValidImageUrl;