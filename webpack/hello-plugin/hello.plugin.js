const { Compilation, sources } = require('webpack');

class HelloWebpackPlugin {
    apply(compiler) {
        compiler.hooks.thisCompilation.tap('HelloWebpackPlugin', (compilation) => {
            compilation.hooks.processAssets.tap(
              {
                name: 'HelloWebpackPlugin',
                stage: Compilation.PROCESS_ASSETS_STAGE_OPTIMIZE,
              },
              () => {
                const file = compilation.getAsset('index.min.js');
                compilation.updateAsset(
                  'index.min.js',
                  new sources.RawSource(file.source.source()+";console.log('write')")
                );

                compilation.emitAsset(
                    'README.md',
                    new sources.RawSource("# HelloWebpackPlugin")
                );
              }
            );
        });
      }
  }
  
  module.exports = HelloWebpackPlugin