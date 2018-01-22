/* eslint-disable */

var initialize_params = require('./initialize_params');
var draw_commands = require('./draw_commands');
module.exports = function run_viz(regl, assets){

  // console.log('****************');
  // console.log('** initialize **');
  // console.log('****************');

  var network = JSON.parse(assets.viz);

  // var tick = 0;
  // var has_been_both = false;
  var initialize_viz = true;

  // global params
  params = initialize_params(regl, network);

  var first_frame = true;

  regl.frame(function () {

    if (params.still_interacting == true || initialize_viz == true){

      // console.log('frame-animation');

      params.zoom_data.x.total_int = params.zoom_data.x.total_int + 1;

      draw_commands(regl, params);

      setTimeout(function(){
        params.zoom_data.x.total_int = params.zoom_data.x.total_int - 1;

        // console.log('total_int: ', params.zoom_data.x.total_int);

        if (params.zoom_data.x.total_int == 0 && initialize_viz == false){

          // preventing from running on first frame
          if (first_frame == false){

            console.log('\n------------------\nFINAL INTERACTION');

            // console.log('initialize_viz', initialize_viz)

            // run draw commands
            draw_commands(regl, params, slow_draw=true);

            // console.log(params.kept_row_y);

          } else {
            first_frame = false;
          }
        }

      }, 100)

      // console.log('draw');
      initialize_viz = false;

    } else {

      /*
        Consider setting up something to run background calculations if
        necessary when the visualization is not being updated. For instance,
        we could calculate the text triangles of all rows a little at a time
        in the background.
      */

    }

  });

};