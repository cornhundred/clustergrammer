var make_row_text_triangle_args = require('./make_row_text_triangle_args');
var calc_viz_area = require('./calc_viz_area');

module.exports = function draw_row_components(regl, params, slow_draw=false){

  /* Row Components */
  params.cameras['row-labels'].draw(() => {

    regl(params.viz_aid_tri_args.row)();
    regl(params.dendro_args.row)();


    /* Row Text */
    // update text information with zooming
    params.text_zoom.row.inst_factor = params.text_zoom.row.reference *
                                       params.text_scale(params.zoom_data.y.total_zoom);

    // make the arguments for the draw command
    var text_triangle_args = make_row_text_triangle_args(regl, params,
                                                         params.zoom_function);

    if (slow_draw){

      calc_viz_area(params);

      // // draw using text_triangle_args and row_text_triangles
      // regl(text_triangle_args)(params.row_text_triangles);

    }

  });

};