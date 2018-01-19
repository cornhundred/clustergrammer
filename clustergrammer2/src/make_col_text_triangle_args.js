var m3 = require('./mat3_transform');

module.exports = function make_col_text_triangle_args(regl, params, zoom_function){

  var col_x_offset = d3.scale.linear()
    .domain([50, 100])
    .range([26.2, 53]);

  var offset_y = col_x_offset(params.text_zoom.col.inst_factor);

  /*
  Not using mat_translate since each label needs to be translated a specific
  amount that is saved in the batch data.
  */
  var mat_rotate = m3.rotation(Math.PI/4);
  var text_y_scale = m3.scaling(1, params.zoom_data.x.total_zoom);

  // smaller number gives smaller text
  // rc_two_cats: 0.75
  // mnist: 1
  var reduce_factor = 0.75 // 1 / params.zoom_data.x.total_zoom;
  var total_zoom = params.zoom_data.x.total_zoom;
  var mat_reduce_text_size = m3.scaling(reduce_factor, reduce_factor);

  var scale_x = params.text_zoom.col.inst_factor;

  var args = {
    vert: `
      precision mediump float;
      attribute vec2 position;
      uniform mat4 zoom;
      uniform vec2 offset;
      uniform float offset_y;
      uniform float scale_x;
      uniform float width_scale;
      uniform mat3 mat_rotate;
      uniform mat3 text_y_scale;
      uniform mat3 mat_reduce_text_size;
      uniform float total_zoom;
      uniform float col_width;
      varying vec3 rotated_text;
      varying vec3 shift_to_right;
      varying vec3 position_cols;

      // last value is a sort-of zoom
      void main () {

        // rotate, reduce size, stretch in y, and give text triangles positions
        rotated_text = text_y_scale *
                       mat_rotate *
                       mat_reduce_text_size *
                       vec3(position.y, position.x, 0.5);

        /*
          Shift text over a little by a fixed amount and then
          shift by a zoom-dependent amount so that the bottom
          of the text remains at the same lower right position
          vec3( 0.11 * total_zoom  + 0.2 , 0, 0)

          need to have
            0.11 * total_zoom
          factor scale with the number of columns
          so that the labels remain on top of the correct columns
        */
        shift_to_right = vec3( col_width * total_zoom , 0, 0);

        position_cols = vec3( offset[1] * scale_x, offset_y, 0);

        // reverse y position to get words to be upright
        gl_Position = zoom *

          vec4(

                //////////////////////
                // vec3: x, y, depth
                //////////////////////

                rotated_text + shift_to_right + position_cols,

                /////////////////////
                // vec4: zoom
                /////////////////////

                // zoom element in vec4
                scale_x

          );

      }`,
    frag: `
      precision mediump float;
      void main () {
        gl_FragColor = vec4(0.2, 0.2, 0.2, 1.0);
      }`,
    attributes: {
      position: regl.prop('positions')
    },
    elements: regl.prop('cells'),
    uniforms: {
      zoom: zoom_function,
      offset: regl.prop('offset'),
      scale_x: scale_x,
      offset_y: offset_y,
      width_scale: params.zoom_data.x.total_zoom,
      mat_rotate: mat_rotate,
      text_y_scale: text_y_scale,
      mat_reduce_text_size: mat_reduce_text_size,
      total_zoom: total_zoom,
      // need to pin down number
      col_width: 4.5/params.num_col,
    },
    depth: {
      enable: true,
      mask: true,
      func: 'less',
      // func: 'greater',
      range: [0, 1]
    },
  };

  return args;

};