// var filter_visible_mat = require('./filter_visible_mat');
// var make_draw_cells_props = require('./make_draw_cells_props');
var draw_text_triangles = require('./draw_text_triangles');
var draw_matrix = require('./draw_matrix');

module.exports = function draw_commands(regl, params){

    draw_matrix(regl, params);

    var allowable_zoom_factor = 3;
    var text_scale = d3.scale.linear()
      .domain([1, 10])
      .range([1, 10/allowable_zoom_factor]);

    /* Row Components */
    params.cameras['row-labels'].draw(() => {
      params.draw_labels.row();
      params.draw_dendro.row();

      /* Row Text */
      // update text information with zooming
      params.text_zoom.row = params.text_zoom.row_reference *
                             text_scale(params.zoom_data.y.total_zoom);

      // make the arguments for the draw command
      params.draw_text_triangles = draw_text_triangles(regl, params, params.zoom_function);

      // params.text_zoom.row = params.num_row;
      params.draw_text_triangles(params.row_label_text);

    });

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