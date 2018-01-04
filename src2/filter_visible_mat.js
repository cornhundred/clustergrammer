var $ = require('jquery');

module.exports = function filter_visible_mat(arrs){

  /* Array re-calculation plan */
  /*
  Only re-calculate the array if a certain amount of zooming/panning has
  occurred so that this will not slow things down too much
  */

  // // generating arrays from mat_data is very slow
  // ///////////////////////////////////////////////
  // var arrs = make_draw_cells_arr(regl, mat_data)

  // // perform trivial slice of opacity array
  // var num_keep = 100000;
  // arrs.opacity_arr =   arrs.opacity_arr.slice(0, num_keep);
  // arrs.position_arr = arrs.position_arr.slice(0, num_keep);


  /*
    need to keep track of opacity
  */

  // // filtering based on position
  // keep_opacity = [];
  // arrs.position_arr = _.filter(arrs.position_arr, function(d,i){
  //   if (d[0] < 0.0){
  //     console.log()
  //     keep_opacity.push(arrs.opacity_arr[i])
  //     return d;
  //     }
  // })

  // // transfer keep_opacity
  // arrs.opacity_arr = keep_opacity;

  return arrs;
};