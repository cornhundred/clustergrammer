var $ = require('jquery');

module.exports = function filter_visible_mat(arrs_orig, zoom_data){

  var arrs = $.extend(true, {}, arrs_orig);

  // make a d3.scale to transition from 0px - 500px to -1, 1 space
  var pix_to_webgl = d3.scale.linear();

  mat_width = 500;

  pix_to_webgl
    .domain([0, mat_width])
    .range([-0.5, 0.5])
    .clamp(true);

  // panning is defined as negative pixel values
  total_pan = {}
  total_pan.x_min = -zoom_data.x.total_pan_min;
  total_pan.x_max = mat_width + zoom_data.x.total_pan_max;

  buffer_width = 0.025;

  pan_webgl = {}
  pan_webgl.x_min = pix_to_webgl(total_pan.x_min) - buffer_width;
  pan_webgl.x_max = pix_to_webgl(total_pan.x_max) + buffer_width;

  // console.log(pan_webgl)

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
    visible area filtering is starting to work
  */

  // filtering based on position
  keep_opacity = [];
  arrs.position_arr = _.filter(arrs.position_arr, function(d,i){
    if (d[0] > pan_webgl.x_min && d[0] < pan_webgl.x_max){
      console.log()
      keep_opacity.push(arrs.opacity_arr[i])
      return d;
      }
  })

  // transfer keep_opacity
  arrs.opacity_arr = keep_opacity;

  return arrs;
};