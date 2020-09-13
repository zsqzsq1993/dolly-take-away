const express = require('express')
const data = require('./data')
const https = require('https')
const fs = require('fs')
const credential = {
  key: fs.readFileSync('/etc/nginx/2_dollylosingweight.today.key'),
  cert: fs.readFileSync('/etc/nginx/1_dollylosingweight.today_bundle.crt')
}

const port = 9001
const goods = data.goods
const seller = data.seller
const ratings = data.ratings
const app = express()
const router = express.Router()

router.get('/seller', (req, res) => {
  res.json({
    errno: 0,
    data: seller
  })
})

router.get('/goods', (req, res) => {
  res.json({
    errno: 0,
    data: goods
  })
})

router.get('/ratings', (req, res) => {
  res.json({
    errno: 0,
    data: ratings
  })
})

app.use('/api', router)

app.use(express.static('./dist'))

const httpsServer = https.createServer(credential, app)

httpsServer.listen(port, (err) => {
  if (err) {
    console.log(err)
  } else {
    console.log('listen at https://localhost:' + port)
  }
})
