var make_col_text_triangle_args = require('./make_col_text_triangle_args');

module.exports = function draw_column_components(regl, params){

  /* Column Components */
  params.cameras['col-labels'].draw(() => {

    regl(params.label_args.col)();
    regl(params.dendro_args.col)();


    /* control allowable zoom for column text */


    // /* Col Text */
    // // update text information with zooming
    // params.text_zoom.col.inst_factor = params.text_zoom.col.reference *
    //                                    params.text_scale(params.zoom_data.x.total_zoom);



    // make the arguments for the draw command
    var text_triangle_args = make_col_text_triangle_args(regl, params,
                                                         params.zoom_function);

    // draw using text_triangle_args and col_text_triangles
    regl(text_triangle_args)(params.col_text_triangles);

  });

};