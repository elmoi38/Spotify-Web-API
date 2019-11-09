const config = require('./config')
const request = require('request')
const inquirer = require('inquirer')


let clientID = '**********************'; //  client id
let clientSecret = '********************'; // secret

 let ID = []// array to store artists by id 
 let pickArtist = [] // array to store artists searched 

 //  application requests authorization
  const authorization = {
    url: 'https://accounts.spotify.com/api/token',
    headers: {
      'Authorization': 'Basic ' + (Buffer.from(clientID + ':' + clientSecret).toString('base64'))
    },
    form: {
      grant_type: 'client_credentials'
    },
    json: true
  }; 

exports.artistsName = (name, type) =>{

   request.post(authorization, function(error, response, body) {
    if (!error && response.statusCode === 200) {

      // use the access token to access the Spotify Web API
      const token = body.access_token;
      const options = {
        url: `${config.url}v1/search?q=${name}&type=${type}`,
        headers: {
          'Authorization': 'Bearer ' + token
        },

        json: true
      };

    
      request.get(options,  function(error, response, body) {
      

      let item 
      let nameArtist
            //Need to iterate over the keys of the object inside the body 
           for(let bodyList in body){
              if (body.hasOwnProperty(bodyList)) {
                item = body[bodyList];
                nameArtist = item.items
              }
      // iterate over the items of the object inside the nameArtists
              for(let list in nameArtist){
                  if(nameArtist.hasOwnProperty(list)){
                    let d = nameArtist[list]
                    pickArtist.push(d.name)
                    ID.push(d.id)
                  
                  }
              } 

           }
               inquirer
                .prompt([
                  {
                    type: 'list',
                    name: 'artist',
                    message: 'Which artist are you looking for?',
                    choices: pickArtist,
                  },
                ])
                .then(answers => {
                  console.info(artists(answers.artist));
                });
      });

    }
  });

}



const artists = (id) =>{
   id = ID[0]

   request.post(authorization, function(error, response, body) {
    if (!error && response.statusCode === 200) {

      // use the access token to access the Spotify Web API
      const token = body.access_token;
      const options = {
        url: `${config.url}v1/artists/${id}`,
        headers: {
          'Authorization': 'Bearer ' + token
        },
        json: true
      };

      request.get(options, function(error, response, body) {
       console.log(body);
        // console.log(token)
      });

    }
  });

}
 

