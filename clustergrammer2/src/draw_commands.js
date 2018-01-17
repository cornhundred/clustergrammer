// var filter_visible_mat = require('./filter_visible_mat');
// var make_draw_cells_props = require('./make_draw_cells_props');
var draw_matrix = require('./draw_matrix');
var draw_row_components = require('./draw_row_components');

module.exports = function draw_commands(regl, params){

    draw_matrix(regl, params);

    draw_row_components(regl, params);

    /* Column Components */
    params.cameras['col-labels'].draw(() => {
      params.draw_labels.col();
      params.draw_dendro.col();
    });

    // Spillover Components (may not need to redraw)
    params.cameras.static.draw(() => {

      // spillover rects to hide matrix spillover
      params.draw_spillover_rects.mat_sides(params.spillover_positions.mat);
      params.draw_spillover_rects.mat_corners(params.spillover_positions.corners);
      params.draw_spillover_rects.label_corners(params.spillover_positions.corners);

    });

};