/*
  Making an interactive matrix using instancing.

  use the following to run using budo:
  budo matrix_example.js --open --live -- -t es2020

  use the following command to create a bundle:
  browserify -r es2020 matrix_example.js > ../cytof_example_2/bundle.js

  Bugs
  **************
  1. resizing causes errors with tracking zooming/panning
  2. resizing does not immediately redraw figure

 */

// const
regl = require('regl')({extensions: ['angle_instanced_arrays']})
var zoom_rules = {};
zoom_rules['row-labels'] = require('./zoom_rules_general');
var filter_visible_mat = require('./filter_visible_mat');
var initialize_params = require('./initialize_params');

draw_commands = require('./draw_commands')

// global variables
d3 = require('d3');
_ = require('underscore')

tick = 0
has_been_both = false

still_interacting = false;
initialize_viz = true;

var filename = 'data/mult_view.json'
// var filename = 'data/mnist.json'
// var filename = 'data/mnist_thin.json'
// var filename = 'data/cytof_10k.json'
// var filename = 'data/cytof_25k.json'
// var filename = 'data/cytof_35k.json'

// resource loader
require('resl')({
  manifest:{
    'viz':{
      type: 'text',
      src: filename
    }
  },
  onDone: (assets) => {
    run_viz(regl, assets);
  }
})

function run_viz(regl, assets){

  var zoom_function = function(context){
    return context.view;
  }

  console.log('****************')
  console.log('** initialize **')
  console.log('****************')

  network = JSON.parse(assets['viz'])

  // use data from network
  //////////////////////////
  var mat_data = network.mat

  var params = initialize_params(mat_data);

  regl.frame(function () {

    if (still_interacting == true || initialize_viz == true){
      console.log('draw')
      initialize_viz = false;

      draw_commands(regl, params);
    }

  })

}