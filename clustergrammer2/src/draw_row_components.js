var make_text_triangle_args = require('./make_text_triangle_args');

module.exports = function draw_row_components(regl, params){

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
    // params.draw_text_triangles = draw_text_triangles(regl, params, params.zoom_function);
    text_triangle_args = make_text_triangle_args(regl, params, params.zoom_function);

    // draw using text_triangle_args and row_label_text
    regl(text_triangle_args)(params.row_label_text);

  });

};