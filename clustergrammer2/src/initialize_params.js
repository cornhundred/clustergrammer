var row_label_text = require('./row_label_text');
var calc_viz_dim = require('./calc_viz_dim');
var ini_zoom_data = require('./ini_zoom_data');
var ini_zoom_restrict = require('./ini_zoom_restrict');
var zoom_rules_high_mat = require('./zoom_rules_high_mat');
var make_cameras = require('./make_cameras');
var calc_spillover_positions = require('./calc_spillover_positions');

var make_draw_cells_arr = require('./make_draw_cells_arr');
var make_draw_cells_props = require('./make_draw_cells_props');

module.exports = function initialize_params(regl, network){

  console.log('** initialize_params')
  var params = {}

  // use data from network
  //////////////////////////
  params.network = network;

  var zoom_function = function(context){
    return context.view;
  }

  params.still_interacting = false;

  params.mat_data = network.mat;

  params.num_row = params.mat_data.length;
  params.num_col = params.mat_data[0].length;

  console.log('num_row: ' + String(params.num_row))
  console.log('num_col: ' + String(params.num_col))

  // calculate the text_triangles for all rows
  params.text_triangles = row_label_text(network.row_nodes);

  params.draw_labels = {};
  params.draw_labels['row'] = require('./draw_mat_labels')(regl, params.num_row, 'row');
  params.draw_labels['col'] = require('./draw_mat_labels')(regl, params.num_col, 'col');

  params.draw_dendro = {};
  params.draw_dendro['row'] = require('./draw_dendro')(regl, params.num_row, 'row');
  params.draw_dendro['col'] = require('./draw_dendro')(regl, params.num_col, 'col');

  params.draw_text_triangles = require('./draw_text_triangles')
                                     (regl, zoom_function);

  var draw_spillover_rects = {};

  // inst_depth is passed to spillover rects
  draw_spillover_rects.mat = require('./draw_spillover_rects')
                                    (regl, zoom_function, 0.5);

  draw_spillover_rects.corners = require('./draw_spillover_rects')
                                        (regl, zoom_function, 0.4);

  params.draw_spillover_rects = draw_spillover_rects;

  params.viz_dim = calc_viz_dim(regl);

  params.zoom_data = ini_zoom_data();

  params.zoom_restrict = ini_zoom_restrict(params);

  // update zoom_data
  zoom_rules_high_mat(regl, params);

  params.cameras = make_cameras(regl, params);

  params.spillover_positions = calc_spillover_positions(params);

  window.addEventListener('resize', params.cameras['mat'].resize);
  window.addEventListener('resize', params.cameras['row-labels'].resize);

  // generate position and opacity arrays from params.mat_data
  var arrs = make_draw_cells_arr(regl, params)

  // generate draw_cells_props using buffers
  params.draw_cells_props = make_draw_cells_props(regl, params, arrs);

  params.arrs = arrs;

  return params;

};