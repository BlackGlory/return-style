import typescript from '@rollup/plugin-typescript'

function createOptions({ directory, target }) {
  return [
    {
      input: 'src/index.ts'
    , output: createOutput('index')
    , plugins: createPlugins(target)
    }
  ]

  function createOutput(name) {
    return [
      {
        file: `dist/${directory}/${name}.mjs`
      , format: 'es'
      , sourcemap: true
      }
    , {
        file: `dist/${directory}/${name}.umd.js`
      , format: 'umd'
      , name: 'ReturnStyle'
      , sourcemap: true
      }
    ]
  }

  function createPlugins(target) {
    return [
      typescript({ target })
    ]
  }
}

export default [
  ...createOptions({
    directory: 'es2015'
  , target: 'ES2015'
  })
, ...createOptions({
    directory: 'es2018'
  , target: 'ES2018'
  })
]
