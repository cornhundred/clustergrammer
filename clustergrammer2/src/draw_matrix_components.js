module.exports = function draw_matri(regl, params){

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

    regl(params.cell_args.regl_props.top)();
    regl(params.cell_args.regl_props.bot)();

  });

};