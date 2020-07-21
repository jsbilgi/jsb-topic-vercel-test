const express = require('express')
const next = require('next')
// const { parse } = require('url')

const dev = process.env.NODE_ENV !== 'production'
const app = next({ dev })
const handle = app.getRequestHandler()

app.prepare()
.then(() => {
    const server = express()

    server.get('/topic/:slug_string', (req, res) => {

        const actualPage = '/index'
        const queryParams = { slug_string: req.params.slug_string } 
        app.render(req, res, actualPage, queryParams)
    })

    server.get('/homepage', (req, res) => {

        const actualPage = '/index'
        const queryParams = { slug_string: 'home_page' } 
        app.render(req, res, actualPage, queryParams)
    })

    server.get('/bundle/:bundle_ids', (req, res) => {

        const actualPage = '/bundle'
        const queryParams = { bundle_ids: req.params.bundle_ids } 
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