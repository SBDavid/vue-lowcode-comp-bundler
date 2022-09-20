var exec = require('child_process').execSync;
var rollup = require('rollup').rollup;

var nodeResolve = require('@rollup/plugin-node-resolve').nodeResolve;
var commonjs = require('@rollup/plugin-commonjs');

// var child = exec('npm install vue',
//  function (error, stdout, stderr) {
//      console.log('stdout: ' + stdout);
//      console.log('stderr: ' + stderr);
//      if (error !== null) {
//           console.log('exec error: ' + error);
//      }
// });

// var child1 = exec('npm install ant-design-vue@3.2.12',
//  function (error, stdout, stderr) {
//      console.log('stdout: ' + stdout);
//      console.log('stderr: ' + stderr);
//      if (error !== null) {
//           console.log('exec error: ' + error);
//      }
// });

// var child2 = exec('npm install lodash@4.17.21',
//  function (error, stdout, stderr) {
//      console.log('stdout: ' + stdout);
//      console.log('stderr: ' + stderr);
//      if (error !== null) {
//           console.log('exec error: ' + error);
//      }
// });

const inputOptions = {
    input: 'main.js',
    plugins: [nodeResolve(), commonjs(),],

};
const outputOptionsList = [{
    dir: 'output2',
    format: 'umd',
    name: 'rollupName',
    plugins: [],

}]

async function build() {
    let bundle;
    let buildFailed = false;
    try {
      // create a bundle
      bundle = await rollup(inputOptions);
  
      await generateOutputs(bundle);
    } catch (error) {
      buildFailed = true;
      // do some error reporting
      console.error(error);
    }
    if (bundle) {
      // closes the bundle
      await bundle.close();
    }
    process.exit(buildFailed ? 1 : 0);
  }
  
  async function generateOutputs(bundle) {
    for (const outputOptions of outputOptionsList) {
      // generate output specific code in-memory
      // you can call this function multiple times on the same bundle object
      // replace bundle.generate with bundle.write to directly write to disk
      const { output } = await bundle.write(outputOptions);
  
      for (const chunkOrAsset of output) {
        if (chunkOrAsset.type === 'asset') {
        } else {
        }
      }
    }
  }

  build()