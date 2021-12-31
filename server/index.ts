const http = require('http')
const axios = require('axios')
const url = require('url')
const htmlParse = require('node-html-parser')
const XLSX = require('xlsx')
const fs = require('fs')
const Path = require('path')
const OS = require('os')
const stringRandom = require('string-random')

const format = ({ data, message }) => {
  // error handle
  return {
    success: !!data,
    data,
    message: data ? 'successful' : message || 'failed request'
  }
}

class Server {
  context = null

  queryData = async () => {
    const { body } = this.context

    const domain = 'https://www.amazon.com'
    const url = body.url ? body.url : `${domain}/s?k=${body.keyword}&sprefix=${body.keyword}&ref=glow_cls`
    const config = {}
    let response = null
    let result = []
    let childrens = []

    if ('cookie' in body && body.cookie) {
      // @ts-ignore
      config.headers = {
        'Cookie': body.cookie
      }
    }

    // fetch page data
    const data = await axios.get(url, config)

    const $ = htmlParse.parse(data.data)

    try {
      switch (body.tenant) {
        case 'amazon':
          {
            childrens = $.querySelector('.s-main-slot').querySelectorAll('.s-widget-spacing-small')

            childrens.forEach(ele => {
              const root = ele.childNodes[0].querySelector('div.s-include-content-margin')
              const target = root.querySelector('span.rush-component')
      
              const href = decodeURIComponent(target.querySelector('a.a-link-normal')?.getAttribute('href') || '')
              const detailUrl = `${domain}${decodeURIComponent(href)}`
      
              const image = target.querySelector('img.s-image')?.getAttribute('src')
      
              const title = root.querySelector('div.s-title-instructions-style h2 a span').text
      
              const price = root.querySelector('div.s-price-instructions-style div a span.a-offscreen')?.text
      
              const review = root.querySelector('div.a-spacing-top-micro div.a-size-small a span.a-size-base')?.text
      
              const asin = detailUrl.split('/dp/')[1]?.split('/')[0]
      
              const shippings = root.querySelectorAll('div.a-spacing-top-micro div.s-align-children-center div.a-row span').map(ele => ele.text)
      
              result.push({
                detailUrl,
                image,
                title,
                review,
                price,
                shipping: shippings.pop(),
                asin
              })
            })
          }
          break
      }

      response = { data: result }
    } catch (err) {
      response = {
        message: err.message
      }
    }

    return response
  }

  download = async () => {
    const { body } = this.context

    // create ws
    const ws = XLSX.utils.json_to_sheet(body.data)
    const targetDir = Path.join(OS.homedir(), `Desktop/${body.tenant}_analyse`)

    // create wb
    const wb = XLSX.utils.book_new()

    wb.SheetNames = ['sheet1']
    wb.Sheets['sheet1'] = ws

    try {
      fs.accessSync(targetDir, fs.constants.R_OK | fs.constants.W_OK)
    } catch (err) {
      fs.mkdirSync(targetDir)
    }

    XLSX.writeFile(wb, `${targetDir}/${body.tenant}_${stringRandom()}.xlsx`)

    return { data: true }
  }

  excute = async () => {
    const { res, path } = this.context

    // set up header
    res.writeHead(200, { 'Content-Type': 'application/json' });


    if (!this[path]) {
      // @ts-ignore
      return format({ data: null });
    }

    const data = await this[path]()

    // return response
    res.write(JSON.stringify(format(data)))

    // end
    res.end();
  }

  onRequest = async (req, res) => {
    const path = req.url.split('?')[0]?.replace('/', '')
    const params = url.parse(req.url, true).query
    let dataStr = ''

    this.context = { req, res, params, path };

    req.on('data', (chunk) => {
      dataStr += chunk
    })

    req.on('end', () => {
      console.log('body data finished')

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



