module.exports = function draw_column_components(regl, params){

  /* Column Components */
  params.cameras['col-labels'].draw(() => {

    regl(params.label_args.col)();

    params.draw_dendro.col();
  });

};