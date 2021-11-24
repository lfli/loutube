const server = require('./ssr')

const port = 8080;

console.log('You can navigate to http://localhost:' + port)
server.listen(port)