module.exports = function draw_column_components(regl, params){

  /* Column Components */
  params.cameras['col-labels'].draw(() => {

    regl(params.label_args.col)();
    regl(params.dendro_args.col)();

  });

};