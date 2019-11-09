const app = require('./app')
const yargs = require('yargs')


const flags = yargs.usage('$0: Usage <cmd> [options]')
   
     .command({
        command: 'search <Name> <Type>',
        desc: 'Search by Name and Type which is set to artist',
         
        handler: (argv) => {  app.fetchArtistsName(argv.name, argv.type) }
       
    })

    .help('help')
    .argv
