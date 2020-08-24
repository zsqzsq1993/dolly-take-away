const express = require('express')
const data = require('./data')
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

app.listen(port, (err) => {
  if (err) {
    console.log(err)
  } else {
    console.log('listen at http://localhost:' + port)
  }
})
