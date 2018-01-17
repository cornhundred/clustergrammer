var calc_row_label_triangles = require('./calc_row_label_triangles');
var calc_viz_dim = require('./calc_viz_dim');
var ini_zoom_data = require('./ini_zoom_data');
var ini_zoom_restrict = require('./ini_zoom_restrict');
var zoom_rules_high_mat = require('./zoom_rules_high_mat');
var make_cameras = require('./make_cameras');
var calc_spillover_triangles = require('./calc_spillover_triangles');

var make_cell_args = require('./make_cell_args');
var make_label_args = require('./make_label_args');
var make_dendro_args = require('./make_dendro_args');
var make_spillover_args = require('./make_spillover_args');

module.exports = function initialize_params(regl, network){

  // console.log('** initialize_params');
  var params = {};

  // use data from network
  //////////////////////////
  params.network = network;

  var zoom_function = function(context){
    return context.view;
  };

  params.zoom_function = zoom_function;

  params.still_interacting = false;

  params.mat_data = network.mat;

  params.num_row = params.mat_data.length;
  params.num_col = params.mat_data[0].length;

  // console.log('num_row: ' + String(params.num_row));
  // console.log('num_col: ' + String(params.num_col));

  params.label_args = {};
  params.label_args.row = make_label_args(regl, params.num_row, 'row');
  params.label_args.col = make_label_args(regl, params.num_col, 'col');

  params.dendro_args = {};
  params.dendro_args.row = make_dendro_args(regl, params.num_row, 'row');
  params.dendro_args.col = make_dendro_args(regl, params.num_col, 'col');

  var spillover_args = {};

  // inst_depth is passed to spillover rects
  spillover_args.mat_sides = make_spillover_args(regl, zoom_function, 0.5);
  spillover_args.mat_corners = make_spillover_args(regl, zoom_function, 0.4);
  spillover_args.label_corners = make_spillover_args(regl, zoom_function, 0.0);

  params.spillover_args = spillover_args;

  params.viz_dim = calc_viz_dim(regl);

  params.zoom_data = ini_zoom_data();

  params.text_zoom = {};

  // this scaling factor can be set to the number of rows
  params.text_zoom.row = params.num_row;
  params.text_zoom.row_reference = params.text_zoom.row;
  params.text_zoom.row_factor = 1;

  // calculate the text_triangles for all rows
  params.row_label_triangles = calc_row_label_triangles(params);

  // do not need to calc text triangles args since I'm re-calculating later

  params.zoom_restrict = ini_zoom_restrict(params);

  // update zoom_data
  zoom_rules_high_mat(regl, params);

  params.cameras = make_cameras(regl, params);

  params.spillover_triangles = calc_spillover_triangles(params);

  window.addEventListener('resize', params.cameras.mat.resize);
  window.addEventListener('resize', params.cameras['row-labels'].resize);

  // generate cell_args using buffers
  params.cell_args = make_cell_args(regl, params);

  return params;

};