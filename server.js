const Koa = require('koa')
const Router = require('koa-router')
const statics = require('koa-static')
const consola = require('consola')
const data = require('./data')

const HOST = 'localhost'
const PORT = 8080
const goods = data.goods
const seller = data.seller
const ratings = data.ratings
const app = new Koa()
const router = new Router({
  prefix: '/api'
})

router.get('/seller', ctx => {
  ctx.body = {
    errno: 0,
    data: seller
  }
})

router.get('/goods', ctx => {
  ctx.body = {
    errno: 0,
    data: goods
  }
})

router.get('/ratings', ctx => {
  ctx.body = {
    errno: 0,
    data: ratings
  }
})

app.use(router.routes())
app.use(statics('./dist'))
app.listen(PORT, HOST)
consola.ready({
  message: `Server listening on http://localhost:${PORT}`,
  badge: true
})
