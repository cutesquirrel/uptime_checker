const dotenv = require('dotenv')
dotenv.config()
var check = require('uptime-check')
var sendPushover = require('./pushover_notifier')

check({
  url: 'http://cutesquirrel.hd.free.fr:8080/#/Dashboard',
  keyword: 'Domoticz',
  redirectsLimit: 0,
})
  .then((result) => {
    // console.log('ok', result)
    /*
    result = {
      httpCode: '{number}',
      httpCodeLang: 'English translation for http code (e.x. "Bad Request")',
      effectiveUrl: '{string} see curl documentation',
      response: '{string} full response (header + body)',
      body: '{string} body (response without header)',
      bodyLength: '{Number} body.length'
      headers: '{Object} parsed headers',
      status: '{bool} true if test passed, false if failed',
      totalTime: '{Number} total request time',
      errorCode: '{String} in case of request error, e.x. ETIMEDOUT',
    }
    */
    if (result.httpCode != 200) {
      const title = `Domoticz error: ${result.httpCodeLang}`
      const msg = `Domoticz error: ${result.errorCode}: ${result.httpCodeLang} (${result.httpCode})`
      return sendPushover(title, msg)
    }
    return
  })
  .catch((err) => {
    const title = `Domoticz error: ${err}`
    return sendPushover(title, title)
  })
