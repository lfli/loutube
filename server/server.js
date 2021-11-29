const server = require('./ssr')

const port = 80;

console.log('You can navigate to http://localhost:' + port)
server.listen(port)