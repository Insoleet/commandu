module.exports = config:

  files:
    javascripts:
      joinTo:
        'js/libraries.js': /^(bower_components|node_modules|vendor)[\\/]/
        'js/app.js': /^app/
      order:
        before: [/app\/controllers\//]
    stylesheets: joinTo: 'css/app.css'
    templates: joinTo: 'js/templates.js'

  plugins:
    fbFlo:
      resolverReload: true
    babel:
      presets: ['es2015','stage-0']

  overrides:
    production:
      sourceMaps: true

  server:
    hostname: '127.0.0.1'
