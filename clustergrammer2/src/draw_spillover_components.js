module.exports = function draw_spillover_components(regl, params){
  // Spillover Components (may not need to redraw)
  params.cameras.static.draw(() => {

    // spillover rects to hide matrix spillover
    params.draw_spillover_rects.mat_sides(params.spillover_positions.mat);
    params.draw_spillover_rects.mat_corners(params.spillover_positions.corners);
    params.draw_spillover_rects.label_corners(params.spillover_positions.corners);

  });
};