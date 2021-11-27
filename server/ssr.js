const path = require('path')
const express = require('express')
const fs = require('fs')
const { renderToString } = require('@vue/server-renderer')
const manifest = require('../dist/server/ssr-manifest.json')

const server = express()

const appPath = path.join(__dirname, '../dist', 'server', manifest['app.js'])
const createApp = require(appPath).default

server.use('/img', express.static(path.join(__dirname, '../dist/client', 'img')))
server.use('/js', express.static(path.join(__dirname, '../dist/client', 'js')))
server.use('/css', express.static(path.join(__dirname, '../dist/client', 'css')))
server.use(
  '/favicon.ico',
  express.static(path.join(__dirname, '../dist/client', 'favicon.ico'))
)

const LRU = require('lru-cache')
const microCache = new LRU({
  max: 100,
  maxAge: 1000 * 60 * 60
})


server.get('*', async (req, res) => {
  const hit = microCache.get(req.url)
  if (hit) {
    return res.send(hit)
  }

  const { app, router, store } = createApp()

  await router.push(req.url.replace('/loutube', ''))
  await router.isReady()

  const matchedComponents = router.currentRoute.value.matched;

  Promise.all(matchedComponents.map(Component => {
    if (Component.components.default.methods.asyncData) {
      return Component.components.default.methods.asyncData(
        store,
        router.currentRoute
      );
    }
  })).then(async () => {
    const appContent = await renderToString(app);

    fs.readFile(path.join(__dirname, '../dist/client/index.html'), (err, html) => {
      if (err) {
        throw err
      }

      html = html
        .toString()
        .replace('<div id="app">', `<div id="app">${appContent}`)
        .replace(
          '</script>',
          `</script><script type="application/javascript">window.__INITIAL_STATE__=${JSON.stringify(store.state)}</script>`
        )
      res.setHeader('Content-Type', 'text/html')
      res.send(html)
      microCache.set(req.url, html)
    })
  }).catch(error => {
    console.error(error);
    res.sendStatus(500)
  });
})

module.exports = server;