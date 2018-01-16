module.exports = function draw_commands(params){

  /* Matrix */
  cameras['mat'].draw(() => {
    // regl.clear({ color: [0, 0, 0, 0] });

    // // Filter
    // // do not overwrite the original arrs array
    // arrs_filt = filter_visible_mat(arrs, zoom_data);

    // no filtering
    arrs_filt = arrs;

    // // generate draw_cells_props using buffers is not slow
    // //////////////////////////////////////////////////////
    // var draw_cells_props = make_draw_cells_props(arrs_filt);

    regl(draw_cells_props.regl_props['top'])();
    regl(draw_cells_props.regl_props['bot'])();


  });


  /* Row labels and dendrogram */
  cameras['row-labels'].draw(() => {
    draw_labels['row']();
    draw_dendro['row']();
  });

  cameras['row-label-text'].draw(() => {
    draw_text_triangles(text_triangles);
  });

  /* Column labels and dendrogram */
  cameras['col-labels'].draw(() => {
    draw_labels['col']();
    draw_dendro['col']();
  });

  // Static components (later prevent from redrawing)
  cameras['static'].draw(() => {

    draw_spillover_rects.mat(spillover_positions['mat']);
    draw_spillover_rects.corners(spillover_positions['corners']);

  });

};