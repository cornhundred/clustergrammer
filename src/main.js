/*
  Making an interactive matrix using instancing.

  use the following to run using budo:
  budo main.js --open --live -- -t es2020

  use the following command to create a bundle:
  browserify -r es2020 main.js > ../cytof_example_2/bundle.js

  Bugs
  **************
  1. resizing does not immediately redraw figure

 */

// const
var regl = require('regl')({extensions: ['angle_instanced_arrays']});
var run_viz = require('./run_viz');

// global variables
d3 = require('d3');
_ = require('underscore');

var filename = 'data/mult_view.json';

// var filename = 'data/mnist.json';
// var filename = 'data/mnist_thin.json';

// var filename = 'data/cytof_10k.json';
// var filename = 'data/cytof_25k.json';
// var filename = 'data/cytof_35k.json';

// var filename = 'data/ccle_1000x100.json';
// var filename = 'data/ccle_2000x200.json';
// var filename = 'data/ccle_5000x200.json';
// var filename = 'data/ccle_1000x200.json';

// var filename = 'data/ccle_1000x1037.json';
// var filename = 'data/ccle_2000x1037.json';

// resource loader
require('resl')({
  manifest:{
    'viz':{
      type: 'text',
      src: filename
    }
  },
  onDone: (assets) => {
    var network = JSON.parse(assets.viz);
    console.log(network)
    run_viz(regl, network);
  }
});
