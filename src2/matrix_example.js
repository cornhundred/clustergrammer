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
var zoom_rules_high_mat = require('./zoom_rules_high_mat');
zoom_rules['row-labels'] = require('./zoom_rules_general');
var make_draw_cells_props = require('./make_draw_cells_props');
var make_draw_cells_arr = require('./make_draw_cells_arr');
var filter_visible_mat = require('./filter_visible_mat');
var row_label_text = require('./row_label_text');
var calc_spillover_positions = require('./calc_spillover_positions');
var calc_viz_dim = require('./calc_viz_dim');
var ini_zoom_data = require('./ini_zoom_data');
var ini_zoom_restrict = require('./ini_zoom_restrict');
var make_cameras = require('./make_cameras');

external_draw_commands = require('./draw_commands')

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

var zoom_function = function(context){
  return context.view;
}

const draw_text_triangles = require('./draw_text_triangles')
                                   (regl, zoom_function);

var draw_spillover_rects = {};

// inst_depth is passed to spillover rects
draw_spillover_rects.mat = require('./draw_spillover_rects')
                                  (regl, zoom_function, 0.5);

draw_spillover_rects.corners = require('./draw_spillover_rects')
                                      (regl, zoom_function, 0.4);


function run_viz(regl, assets){

  network = JSON.parse(assets['viz'])

  // use data from network
  //////////////////////////
  var mat_data = network.mat

  var num_row = mat_data.length;
  var num_col = mat_data[0].length;

  // calculate the text_triangles for all rows
  var text_triangles = row_label_text(network.row_nodes);

  var zoom_data = ini_zoom_data();
  var zoom_restrict = ini_zoom_restrict(mat_data);
  var viz_dim = calc_viz_dim();

  // update zoom_data
  zoom_rules_high_mat(regl, zoom_restrict, zoom_data, viz_dim);

  var params = {}

  var zoom_infos = {};
  zoom_infos['row-labels'] = zoom_rules['row-labels'](regl, zoom_restrict, 'row-labels');

  var draw_labels = {};
  draw_labels['row'] = require('./draw_mat_labels')(regl, num_row, 'row');
  draw_labels['col'] = require('./draw_mat_labels')(regl, num_col, 'col');

  var draw_dendro = {};
  draw_dendro['row'] = require('./draw_dendro')(regl, num_row, 'row');
  draw_dendro['col'] = require('./draw_dendro')(regl, num_col, 'col');

  console.log('num_row: ' + String(num_row))
  console.log('num_col: ' + String(num_col))

  var cameras = make_cameras(zoom_data);

  params.cameras = cameras

  window.addEventListener('resize', cameras['mat'].resize);
  window.addEventListener('resize', cameras['row-labels'].resize);

  var spillover_positions = calc_spillover_positions(viz_dim);

  // generate position and opacity arrays from mat_data
  var arrs = make_draw_cells_arr(regl, mat_data)
  // generate draw_cells_props using buffers
  var draw_cells_props = make_draw_cells_props(arrs);


  regl.frame(function () {

    if (still_interacting == true || initialize_viz == true){
      console.log('draw')
      initialize_viz = false;
      internal_draw_commands(regl, params);
    }

  })

  function internal_draw_commands(regl, params){

    /* Matrix */
    params.cameras['mat'].draw(() => {
      // regl.clear({ color: [0, 0, 0, 0] });

      // // Filter
      // // do not overwrite the original arrs array
      // arrs_filt = filter_visible_mat(arrs, zoom_data);

      // no filtering
      arrs_filt = arrs;

      // // generate draw_cells_props using buffers is not slow
      // //////////////////////////////////////////////////////
      // var draw_cells_props = make_draw_cells_props(arrs_filt);

      regl(draw_cells_props.regl_props['top'])();
      regl(draw_cells_props.regl_props['bot'])();

    });


    /* Row labels and dendrogram */
    params.cameras['row-labels'].draw(() => {
      draw_labels['row']();
      draw_dendro['row']();
    });

    params.cameras['row-label-text'].draw(() => {
      draw_text_triangles(text_triangles);
    });

    /* Column labels and dendrogram */
    params.cameras['col-labels'].draw(() => {
      draw_labels['col']();
      draw_dendro['col']();
    });

    // Static components (later prevent from redrawing)
    params.cameras['static'].draw(() => {

      draw_spillover_rects.mat(spillover_positions['mat']);
      draw_spillover_rects.corners(spillover_positions['corners']);

    });

  }

}