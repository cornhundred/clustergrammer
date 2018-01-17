module.exports = function draw_column_components(regl, params){

  /* Column Components */
  params.cameras['col-labels'].draw(() => {
    params.draw_labels.col();
    params.draw_dendro.col();
  });

};