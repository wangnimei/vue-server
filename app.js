var express = require('express')
var path = require('path')
var favicon = require('serve-favicon')
var logger = require('morgan')
var cookieParser = require('cookie-parser')
var bodyParser = require('body-parser')

var app = express()

// view engine setup
app.engine('html', require('ejs').renderFile)
app.set('views', path.join(__dirname, 'views'))
app.set('view engine', 'html')

// uncomment after placing your favicon in /public
// app.use(favicon(path.join(__dirname, 'public', 'favicon.ico')));
app.use(logger('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

var { createBundleRenderer } = require('vue-server-renderer')
// read html template
var template = require('fs').readFileSync('./src/index.html', 'utf-8')
// server bundle informations
var serverBundle = require('./public/vue-ssr-server-bundle.json')
// client manifest informations
var clientManifest = require('./public/vue-ssr-client-manifest.json')
// create bundle renderer. note: same with "var renderer = require('vue-server-renderer').createRenderer()"
var renderer = createBundleRenderer(serverBundle, {
  runInNewContext: false,
  template,
  clientManifest
})

var api = require('./routes/api')
app.use('/api', api)

app.get('*', function (req, res, next) {
  const context = { url: req.url }
  renderer.renderToString(context, (err, html) => {
    if (err) next(err)
    
    res.send(html)
  })
})

// handle error
app.use(function(err, req, res, next) {
  if (err.code === 404) {
    res.send('Not Fond Page')
  } else {
    res.send(err)
  }
})

module.exports = app
