var row_label_text = require('./row_label_text');
var calc_viz_dim = require('./calc_viz_dim');
var ini_zoom_data = require('./ini_zoom_data');
var ini_zoom_restrict = require('./ini_zoom_restrict');
var zoom_rules_high_mat = require('./zoom_rules_high_mat');
var make_cameras = require('./make_cameras');
var calc_spillover_positions = require('./calc_spillover_positions');

var make_draw_cells_props = require('./make_draw_cells_props');
var draw_mat_labels = require('./draw_mat_labels');
var draw_dendro = require('./draw_dendro');
var draw_text_triangles = require('./draw_text_triangles');
var draw_spillover_rects = require('./draw_spillover_rects');

module.exports = function initialize_params(regl, network){

  // console.log('** initialize_params');
  var params = {};

  // use data from network
  //////////////////////////
  params.network = network;

  var zoom_function = function(context){
    return context.view;
  };

  params.still_interacting = false;

  params.mat_data = network.mat;

  params.num_row = params.mat_data.length;
  params.num_col = params.mat_data[0].length;

  // console.log('num_row: ' + String(params.num_row));
  // console.log('num_col: ' + String(params.num_col));

  // calculate the text_triangles for all rows
  params.row_label_text = row_label_text(params);

  params.draw_labels = {};
  params.draw_labels.row = draw_mat_labels(regl, params.num_row, 'row');
  params.draw_labels.col = draw_mat_labels(regl, params.num_col, 'col');

  params.draw_dendro = {};
  params.draw_dendro.row = draw_dendro(regl, params.num_row, 'row');
  params.draw_dendro.col = draw_dendro(regl, params.num_col, 'col');

  params.draw_text_triangles = draw_text_triangles(regl, zoom_function);

  params.draw_spillover_rects = {};

  // inst_depth is passed to spillover rects
  params.draw_spillover_rects.mat = draw_spillover_rects(regl, zoom_function, 0.5);

  params.draw_spillover_rects.corners = draw_spillover_rects(regl, zoom_function, 0.4);

  params.viz_dim = calc_viz_dim(regl);

  params.zoom_data = ini_zoom_data();

  params.zoom_restrict = ini_zoom_restrict(params);

  // update zoom_data
  zoom_rules_high_mat(regl, params);

  params.cameras = make_cameras(regl, params);

  params.spillover_positions = calc_spillover_positions(params);

  window.addEventListener('resize', params.cameras.mat.resize);
  window.addEventListener('resize', params.cameras['row-labels'].resize);

  // generate draw_cells_props using buffers
  params.draw_cells_props = make_draw_cells_props(regl, params);

  return params;

};