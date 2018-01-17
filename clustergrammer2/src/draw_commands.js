// var filter_visible_mat = require('./filter_visible_mat');
// var make_draw_cells_props = require('./make_draw_cells_props');
var draw_matrix_components = require('./draw_matrix_components');
var draw_row_components = require('./draw_row_components');
var draw_col_components = require('./draw_col_components');
var draw_spillover_components = require('./draw_spillover_components');

module.exports = function draw_commands(regl, params){

  draw_matrix_components(regl, params);

  draw_row_components(regl, params);

  draw_col_components(regl, params);

  draw_spillover_components(regl, params);

};