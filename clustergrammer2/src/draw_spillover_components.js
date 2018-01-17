module.exports = function draw_spillover_components(regl, params){
  // Spillover Components (may not need to redraw)
  params.cameras.static.draw(() => {

    // spillover rects to hide matrix spillover
    regl(params.spillover_args.mat_sides)(params.spillover_positions.mat);
    regl(params.spillover_args.mat_corners)(params.spillover_positions.corners);
    regl(params.spillover_args.label_corners)(params.spillover_positions.corners);

  });
};