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

// var filename = 'data/mult_view.json';

// const
var run_viz = require('./run_viz');

// global variables
// d3 = require('d3');

function Clustergrammer2(args){

  var network = args.network;

  run_viz(network);

}

// necessary for exporting function
module.exports = Clustergrammer2;