const http = require('http')
const axios = require('axios')
const url = require('url')
const cheerio = require('cheerio')
const XLSX = require('xlsx')
const fs = require('fs')
const Path = require('path')
const OS = require('os')

const format = (data) => {
  // error handle
  return {
    success: !!data,
    data,
    message: data ? 'successful' : 'failed request'
  }
}

class Server {
  context = null

  queryData = async (params) => {
    const url = params.url ? params.url : `https://www.amazon.com/s?k=${params.keyword}&sprefix=${params.keyword}`

    // fetch page data
    const data = await axios.get(url)


    return [
      { image: 'image1', title: 'title1', asin: 'asin1' },
      { image: 'image2', title: 'title2', asin: 'asin2' },
      { image: 'image3', title: 'title3', asin: 'asin3' },
      { image: 'image4', title: 'title4', asin: 'asin4' }
    ]
    // const $ = cheerio.load(data.data)

  }

  dir

  download = async () => {
    const { body } = this.context

    // create ws
    const ws = XLSX.utils.json_to_sheet(body.data)
    const targetDir = Path.join(OS.homedir(), 'Desktop/amazon_analyse')

    // create wb
    const wb = XLSX.utils.book_new()

    wb.SheetNames = ['sheet1']
    wb.Sheets['sheet1'] = ws

    try {
      fs.accessSync(targetDir, fs.constants.R_OK | fs.constants.W_OK)      
    } catch (err) {
      fs.mkdirSync(targetDir)
    }

    XLSX.writeFile(wb, `${targetDir}/amazon_product.xlsx`)

    return true
  }

  excute = async () => {
    const { res, path, params } = this.context

    // set up header
    res.writeHead(200, { 'Content-Type': 'application/json' });
    
    
    if (!this[path]) {
      return format(0);
    }

    const data = await this[path](params)

    // return response
    res.write(JSON.stringify(format(data)))

    // end
    res.end();
  }

  onRequest = async (req, res) => {
    const path = req.url.split('?')[0]?.replace('/', '')
    const params  = url.parse(req.url, true).query
    let dataStr = ''

    this.context = { req, res, params, path };

    req.on('data', (chunk) => {
      dataStr += chunk
    })

    req.on('end', () => {
      console.log('data str', dataStr)

      try {
        this.context.body = JSON.parse(dataStr)
      } catch (e) {
        this.context.body = {}
      }

      this.excute()
    })
  }

  start = () => {
    http.createServer(this.onRequest).listen(3001);

    console.log('server is running at http:127.0.0.1:3001')
  }
}

new Server().start()

