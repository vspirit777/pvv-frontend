const express = require('express')
const next = require('next')
const dev = process.env.NODE_ENV !== 'production'
const app = next({ dev,quiet:true })
const handle = app.getRequestHandler()

app.prepare()
.then(() => {
  const server = express()
  
  server.use(express.static(__dirname + '/public'));

  server.get('/ib_online', (req, res) => {
    res.redirect('/');
  })

  server.get('/attraction/:alias', (req, res) => {
    const actualPage = '/attraction'
    const queryParams = { alias: req.params.alias } 
    app.render(req, res, actualPage, queryParams)
  })
  server.get('/tour-du-lich/*', (req, res) => {
    const actualPage = '/tour-du-lich'
    const queryParams = { } 
    app.render(req, res, actualPage, queryParams)
  })
  server.get('/supplierinfo/*', (req, res) => {
    const actualPage = '/supplierinfo'
    const queryParams = { } 
    app.render(req, res, actualPage, queryParams)
  })

  server.get('/tour/:alias', (req, res) => {
    const actualPage = '/tour'
    const queryParams = { } 
    app.render(req, res, actualPage, queryParams)
  })
  server.get('/profile/:alias', (req, res) => {
    const actualPage = '/profile'
    const queryParams = { } 
    app.render(req, res, actualPage, queryParams)
  })
  server.get('/invite/:alias', (req, res) => {
    const actualPage = '/invite'
    const queryParams = { } 
    app.render(req, res, actualPage, queryParams)
  })

  server.get('*', (req, res) => {
    return handle(req, res)
  })

  server.listen(3000, (err) => {
    if (err) throw err
    console.log('> Ready on http://localhost:3000')
  })
})
.catch((ex) => {
  console.error(ex.stack)
  process.exit(1)
})