const artistsID = require('artists-module')
const yargs = require('yargs').agrv


let artistName = process.argv[3]
let artistType = process.argv[4]




async function fetchArtistsName(){

   const a = await artistsID.artistsName(artistName, artistType);
     
}


module.exports =  {
	fetchArtistsName
	
}


