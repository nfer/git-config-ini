module.exports = [
  {
    target: 'web',
    entry: {
      index: './ini.js'
    },
    output: {
      filename: 'ini.min.js',
      path: __dirname,
      library: 'gitConfigIni',
      libraryTarget: 'var'
    }
  }
]
