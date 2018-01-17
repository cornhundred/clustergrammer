var draw_text_triangles = require('./draw_text_triangles');

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
    params.draw_text_triangles = draw_text_triangles(regl, params, params.zoom_function);

    // params.text_zoom.row = params.num_row;
    params.draw_text_triangles(params.row_label_text);

  });

}