const http = require('http')

const format = (data?) => {
  // error handle
  return {
    success: !!data,
    data,
    message: data ? 'successful' : 'failed request'
  }
}

class Server {
  context = null

  queryData = async () => {

  }

  download = async () => {

  }

  route = async () => {
    const { req } = this.context
    const path = req.url.replace('/', '');
  
    console.log('url', path)
    // set up header
    
    if (!this[path]) {
      return format();
    }

    const data = this[path]()

    return data
  }

  onRequest = (req, res) => {
    this.context = { req, res };

    // set up header
    res.writeHead(200, { 'Content-Type': 'application/json' });

    // execute
    const result = this.route();

    // return response
    res.write(JSON.stringify(format([
      { image: 'image1', title: 'title1' },
      { image: 'image2', title: 'title2' },
      { image: 'image3', title: 'title3' }
    ])))

    // end
    res.end();
  }

  start = () => {
    http.createServer(this.onRequest).listen(3001);   
  }
}

console.log('server is running at http:127.0.0.1:3001')