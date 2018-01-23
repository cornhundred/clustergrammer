// var filter_visible_mat = require('./filter_visible_mat');
// var make_matrix_args = require('./make_matrix_args');

module.exports = function draw_matrix_components(regl, params){

  /* Matrix */
  params.cameras.mat.draw(() => {
    regl.clear({color: [0, 0, 0, 0]});

    /*
      Filter and regenerate args is slow
    */
    // // Filter
    // params.arrs_filt = filter_visible_mat(params.arrs, params.zoom_data);
    // // Regenerate args
    // params.matrix_args = make_matrix_args(regl, params);

    regl(params.matrix_args.regl_props.top)();
    regl(params.matrix_args.regl_props.bot)();

  });

};