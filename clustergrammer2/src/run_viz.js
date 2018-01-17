var initialize_params = require('./initialize_params');
var draw_commands = require('./draw_commands');
module.exports = function run_viz(regl, assets){
  /* eslint-disable */

  // console.log('****************');
  // console.log('** initialize **');
  // console.log('****************');

  var network = JSON.parse(assets.viz);

  // var tick = 0;
  // var has_been_both = false;
  var initialize_viz = true;

  params = initialize_params(regl, network);

  // gparams = params;

  regl.frame(function () {

    if (params.still_interacting == true || initialize_viz == true){

      // console.log('draw');
      initialize_viz = false;

      draw_commands(regl, params);

    }

  });

};