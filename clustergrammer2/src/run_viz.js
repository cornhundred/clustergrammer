var initialize_params = require('./initialize_params');
var draw_commands = require('./draw_commands')

module.exports = function run_viz(regl, assets){

  console.log('****************')
  console.log('** initialize **')
  console.log('****************')

  network = JSON.parse(assets['viz'])

  tick = 0
  has_been_both = false
  var initialize_viz = true;

  // use data from network
  //////////////////////////
  var mat_data = network.mat

  var params = initialize_params(regl, mat_data);

  regl.frame(function () {

    if (params.still_interacting == true || initialize_viz == true){
      console.log('draw')
      initialize_viz = false;

      draw_commands(regl, params);
    }

  });

};