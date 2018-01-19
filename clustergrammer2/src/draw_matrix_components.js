// var filter_visible_mat = require('./filter_visible_mat');
// var make_cell_args = require('./make_cell_args');

module.exports = function draw_matri(regl, params){

  /* Matrix */
  params.cameras.mat.draw(() => {
    regl.clear({color: [0, 0, 0, 0]});

    /*
      Filter and regenerate args is slow
    */
    // // Filter
    // params.arrs_filt = filter_visible_mat(params.arrs, params.zoom_data);
    // // Regenerate args
    // params.cell_args = make_cell_args(regl, params);

    regl(params.cell_args.regl_props.top)();
    regl(params.cell_args.regl_props.bot)();

  });

};