// var filter_visible_mat = require('./filter_visible_mat');
// var make_draw_cells_props = require('./make_draw_cells_props');
var draw_text_triangles = require('./draw_text_triangles');

module.exports = function draw_commands(regl, params){

    /* Matrix */
    params.cameras.mat.draw(() => {
      // regl.clear({ color: [0, 0, 0, 0] });

      // // Filter
      // // do not overwrite the original arrs array
      // arrs_filt = filter_visible_mat(arrs, params.zoom_data);

      // // no filtering
      // var arrs_filt = params.arrs;

      // // generate draw_cells_props using buffers is not slow
      // //////////////////////////////////////////////////////
      // var draw_cells_props = make_draw_cells_props(regl, arrs_filt);

      regl(params.draw_cells_props.regl_props.top)();
      regl(params.draw_cells_props.regl_props.bot)();

    });


    /* Row labels and dendrogram */
    params.cameras['row-labels'].draw(() => {
      params.draw_labels.row();
      params.draw_dendro.row();
    });

    params.cameras['row-label-text'].draw(() => {
      params.draw_text_triangles = draw_text_triangles(regl, params, params.zoom_function);
      // params.text_zoom.row = params.num_row;
      params.draw_text_triangles(params.row_label_text);
    });

    /* Column labels and dendrogram */
    params.cameras['col-labels'].draw(() => {
      params.draw_labels.col();
      params.draw_dendro.col();
    });

    // Static components (later prevent from redrawing)
    params.cameras.static.draw(() => {

      // spillover rects to hide matrix spillover
      params.draw_spillover_rects.mat_sides(params.spillover_positions.mat);
      params.draw_spillover_rects.mat_corners(params.spillover_positions.corners);
      params.draw_spillover_rects.label_corners(params.spillover_positions.corners);

    });

};