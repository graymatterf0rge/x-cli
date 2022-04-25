var _ = require('lodash')
var fs = require('fs')
var path = require('path')
const { program } = require('commander')

const file2string = (file) => {
    return fs.readFileSync(path.join(__dirname,file), 'utf8')
}

program
    .option('--')
    .option('-s, --separator <char>')

program.parse()

const options = program.opts()
const template = options.CSF ? 'stories' : 'spec'


var file = file2string(`${template}.js`)
var imports =  { 
    'imports': { 
        '_': _ 
    } 
}
var compiled = _.template(file,imports)
console.log(compiled({ 'user': 'mustache' }))
console.warn(process.cwd())
 
/* // Use the `source` property to inline compiled templates for meaningful
// line numbers in error messages and stack traces.
fs.writeFileSync(path.join(process.cwd(), 'jst.js'), '\
  var JST = {\
    "main": ' + _.template(mainText).source + '\
  };\
'); */