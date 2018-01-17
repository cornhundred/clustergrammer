var make_position_arr = require('./make_position_arr');
var make_opacity_arr = require('./make_opacity_arr');

module.exports = function make_draw_cells_arr(regl, params){

  var mat_data = params.mat_data;

  var num_row = mat_data.length;
  var num_col = mat_data[0].length;

  // Make Arrays
  var opacity_arr = make_opacity_arr(mat_data);
  var position_arr = make_position_arr(params, num_row, num_col);

  var arrs = {};
  arrs.opacity_arr = opacity_arr;
  arrs.position_arr = position_arr;

  return arrs;

};