const fetch = require("node-fetch");
function checkBlobtype(blob){
	if (blob)//check if successfully converted into blob
		return blob.type.includes("image/");
	else
		return false;
}
const getBlob=async (url) => {
	try{
	const response =await fetch(url); //get the respone object
	const blob= await response.blob(); //convert it to Blob
	return blob; //return the promise
	}catch(err){
		console.log('getBlob Error:'+err);
	}
  	
}
const checkValidImageUrl = (url)=> {return getBlob(url).then(blob=>checkBlobtype(blob))}
module.exports=checkValidImageUrl;